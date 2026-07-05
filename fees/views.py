from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import Sum
from datetime import date
import os
from django.conf import settings
from .models import Fee
from .serializers import FeeSerializer
from students.models import Student
from django.http import HttpResponse
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from reportlab.platypus import Image

# CRUD for Fees
class FeeViewSet(viewsets.ModelViewSet):
    queryset = Fee.objects.all().order_by('-payment_date')
    serializer_class = FeeSerializer


# All fee payments report
@api_view(['GET'])
def fee_report(request):
    fees = Fee.objects.all().values(
        'student__id',
        'student__name',
        'amount',
        'payment_mode',
        'payment_date',
        'remarks'
    )
    return Response(fees)


# Pending fees report
@api_view(['GET'])
def pending_report(request):
    data = []

    students = Student.objects.all()

    for student in students:
        total_paid = (
            Fee.objects.filter(student=student)
            .aggregate(total=Sum('amount'))['total']
            or 0
        )

        pending = student.fees - total_paid

        if pending > 0:
            data.append({
                'student_id': student.id,
                'student_name': student.name,
                'total_fees': student.fees,
                'paid_amount': total_paid,
                'pending_amount': pending,
            })

    return Response(data)


# Today's collection report
@api_view(['GET'])
def daily_collection(request):
    today = date.today()

    fees = Fee.objects.filter(
        payment_date=today
    ).values(
        'student_id',
        'student__name',
        'amount',
        'payment_mode',
        'payment_date'
    )

    total = Fee.objects.filter(
        payment_date=today
    ).aggregate(
        total_collection=Sum('amount')
    )

    return Response({
        'total_collection': total['total_collection'] or 0,
        'payments': list(fees)
    })


@api_view(['GET'])
def generate_receipt(request, pk):
    from io import BytesIO
    import os
    import tempfile
    import qrcode

    from django.conf import settings
    from django.http import HttpResponse
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.platypus import (
        SimpleDocTemplate,
        Table,
        TableStyle,
        Paragraph,
        Spacer,
        Image,
    )

    fee = Fee.objects.select_related(
        'student',
        'student__course'
    ).get(pk=pk)

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        rightMargin=30,
        leftMargin=30,
        topMargin=30,
        bottomMargin=30,
    )

    styles = getSampleStyleSheet()
    elements = []

    # ======================
    # PATHS
    # ======================
    logo_path = os.path.join(
        settings.BASE_DIR,
        'media',
        'logo.jpeg'
    )

    signature_path = os.path.join(
        settings.BASE_DIR,
        'media',
        'signature.jpeg'
    )

    paid_path = os.path.join(
        settings.BASE_DIR,
        'media',
        'paid.jpeg'
    )

    # ======================
    # RECEIPT NUMBER
    # ======================
    receipt_no = (
        f"RCPT-{fee.payment_date.year}-{fee.id:04d}"
    )

    # ======================
    # HEADER
    # ======================
    logo = (
        Image(logo_path, width=65, height=65)
        if os.path.exists(logo_path)
        else ""
    )

    header = Table(
        [[
            logo,
            Paragraph(
                """
                <b>ABC INSTITUTE OF TECHNOLOGY</b><br/>
                Noida, Uttar Pradesh<br/>
                Phone: +91-XXXXXXXXXX<br/>
                Email: info@abcinstitute.com
                """,
                styles['Normal']
            ),
            Paragraph(
                f"""
                <b>FEE RECEIPT</b><br/><br/>
                Receipt No: {receipt_no}<br/>
                Date: {fee.payment_date}
                """,
                styles['Normal']
            )
        ]],
        colWidths=[90, 260, 180]
    )

    elements.append(header)
    elements.append(Spacer(1, 25))

    # ======================
    # STUDENT DETAILS
    # ======================
    student_data = [
        ["Student Name", fee.student.name],
        ["Student ID", str(fee.student.id)],
        ["Course", fee.student.course.name],
        ["Email", fee.student.email],
        ["Contact", fee.student.contact],
        ["Payment Mode", fee.payment_mode],
    ]

    student_table = Table(
        student_data,
        colWidths=[180, 340]
    )

    student_table.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 1,
         colors.black),
        ('BACKGROUND', (0, 0), (0, -1),
         colors.lightgrey),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))

    elements.append(student_table)
    elements.append(Spacer(1, 20))

    # ======================
    # PAYMENT DETAILS
    # ======================
    fee_table = Table(
        [
            ["Particular", "Amount"],
            ["Fee Paid", f"₹ {fee.amount}"],
        ],
        colWidths=[350, 170]
    )

    fee_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0),
         colors.darkblue),
        ('TEXTCOLOR', (0, 0), (-1, 0),
         colors.white),
        ('GRID', (0, 0), (-1, -1), 1,
         colors.black),
        ('BACKGROUND', (0, 1), (-1, -1),
         colors.beige),
        ('PADDING', (0, 0), (-1, -1), 10),
    ]))

    elements.append(fee_table)
    elements.append(Spacer(1, 30))

    # ======================
    # QR CODE
    # ======================
    verify_url = (
        f"http://127.0.0.1:8000/api/fees/receipt/{fee.id}/"
    )

    qr = qrcode.make(verify_url)

    tmp = tempfile.NamedTemporaryFile(
        suffix=".png",
        delete=False
    )

    qr.save(tmp.name)

    qr_img = Image(
        tmp.name,
        width=70,
        height=70
    )

    # ======================
    # PAID STAMP
    # ======================
    paid_img = (
        Image(
            paid_path,
            width=90,
            height=90
        )
        if os.path.exists(paid_path)
        else ""
    )

    # ======================
    # SIGNATURE
    # ======================
    sig_img = (
        Image(
            signature_path,
            width=130,
            height=50
        )
        if os.path.exists(signature_path)
        else "________________"
    )

    footer = Table(
        [
            [qr_img, paid_img, sig_img],
            [
                "Scan to Verify",
                "",
                "Authorized Signatory"
            ]
        ],
        colWidths=[150, 170, 200]
    )

    footer.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1),
         'CENTER'),
        ('VALIGN', (0, 0), (-1, -1),
         'MIDDLE'),
    ]))

    elements.append(footer)
    elements.append(Spacer(1, 20))

    # ======================
    # FOOTER TEXT
    # ======================
    elements.append(
        Paragraph(
            "This is a computer generated receipt.",
            styles['Italic']
        )
    )

    elements.append(
        Paragraph(
            "<b>Thank you for your payment.</b>",
            styles['Normal']
        )
    )

    # ======================
    # BUILD PDF
    # ======================
    doc.build(elements)

    pdf = buffer.getvalue()
    buffer.close()

    # ======================
    # SEND EMAIL
    # ======================
    from django.core.mail import EmailMessage

    email = EmailMessage(
        subject=f'Fee Receipt - {receipt_no}',
        body=f"""
    Dear {fee.student.name},

    Your payment of ₹{fee.amount} has been received successfully.

    Receipt Number: {receipt_no}
    Course: {fee.student.course.name}

    Please find your fee receipt attached.

    Regards,
    ABC Institute of Technology
    """,
        to=[fee.student.email]
    )

    email.attach(
        f"{receipt_no}.pdf",
        pdf,
        "application/pdf"
    )

    sent=email.send(fail_silently=False)
    
    if sent:
        print(f"Receipt sent to {fee.student.email}")
    else:
        print("Email not sent")

    # ======================
    # DOWNLOAD RESPONSE
    # ======================
    response = HttpResponse(
        content_type='application/pdf'
    )
    response['Content-Disposition'] = (
        f'attachment; filename="{receipt_no}.pdf"'
    )
    response.write(pdf)

    return response
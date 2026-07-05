from django.shortcuts import render
from .models import Student
from rest_framework.response import Response
from .serializers import StudentSerializer
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import StudentSerializer
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib import colors
from students.models import Student
import qrcode
import io


# Create your views here.

def dashboard(request):
    students_count = Student.objects.count()
    return render(request, 'dashboard.html', {
        'students_count': students_count
    })

    
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    
@api_view(['GET'])
def students_by_course(request, course_id):
    students = Student.objects.filter(course_id=course_id)
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)


def generate_id_card(request, id):
    student = Student.objects.get(id=id)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename=ID_{student.name}.pdf'

    p = canvas.Canvas(response)

    # Card border
    p.setStrokeColor(colors.darkblue)
    p.setLineWidth(3)
    p.roundRect(100, 450, 350, 220, 10)

    # Institute Name
    p.setFont("Helvetica-Bold", 16)
    p.drawCentredString(275, 640, "ABC Institute of Technology")

    p.setFont("Helvetica", 10)
    p.drawCentredString(275, 625, "Student Identity Card")

    # Student Photo
    if student.photo:
        photo = ImageReader(student.photo.path)
        p.drawImage(photo, 120, 520, width=80, height=90)

    # Student Details
    p.setFont("Helvetica-Bold", 11)

    p.drawString(220, 590, f"Name : {student.name}")
    p.drawString(220, 570, f"ID : STU{student.id:03}")
    p.drawString(220, 550, f"Course : {student.course.name}")
    p.drawString(220, 530, f"Contact : {student.contact}")

    # QR Code
    qr_data = (
        f"Name: {student.name}\n"
        f"Course: {student.course.name}\n"
        f"Contact: {student.contact}"
    )

    qr = qrcode.make(qr_data)

    buffer = io.BytesIO()
    qr.save(buffer)
    buffer.seek(0)

    qr_img = ImageReader(buffer)

    p.drawImage(qr_img, 120, 460, width=60, height=60)

    # Signature
    p.line(330, 480, 420, 480)
    p.drawString(345, 465, "Principal")

    # Footer
    p.setFont("Helvetica", 8)
    p.drawCentredString(
        275,
        440,
        "ABC Institute of Technology | www.abcinstitute.com"
    )

    p.showPage()
    p.save()

    return response
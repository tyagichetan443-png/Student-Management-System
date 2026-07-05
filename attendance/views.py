from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Attendance
from .serializers import AttendanceSerializer
from students.models import Student


@api_view(['GET'])
def attendance_list(request):
    attendance = Attendance.objects.all()
    serializer = AttendanceSerializer(attendance, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def mark_attendance(request):
    data = request.data

    for item in data:
        student = Student.objects.get(id=item['student'])

        Attendance.objects.update_or_create(
            student=student,
            date=item['date'],
            defaults={
                'status': item['status']
            }
        )

    return Response({
        'message': 'Attendance saved successfully'
    })
    
@api_view(['GET'])
def attendance_by_date(request, date):
    attendance = Attendance.objects.filter(date=date)
    serializer = AttendanceSerializer(attendance, many=True)
    return Response(serializer.data)



    
from datetime import datetime

@api_view(['GET'])
def student_monthly_attendance(request, student_id, year, month):
    attendance = Attendance.objects.filter(
        student_id=student_id,
        date__year=year,
        date__month=month
    )

    total_days = attendance.count()
    present_days = attendance.filter(status='Present').count()
    absent_days = attendance.filter(status='Absent').count()

    percentage = 0
    if total_days > 0:
        percentage = round((present_days / total_days) * 100, 2)

    return Response({
        "total_days": total_days,
        "present_days": present_days,
        "absent_days": absent_days,
        "percentage": percentage,
        "attendance": AttendanceSerializer(attendance, many=True).data
    })
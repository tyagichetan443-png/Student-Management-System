from django.urls import path
from .views import attendance_list, mark_attendance, attendance_by_date,student_monthly_attendance

urlpatterns = [
    path('',attendance_list, name='attendance_list'),
    path('mark/', mark_attendance, name='mark_attendance'),
    path('date/<str:date>/', attendance_by_date, name='attendance_by_date'),
    path('student/<int:student_id>/<int:year>/<int:month>/', student_monthly_attendance, name='student_monthly_attendance'),
]
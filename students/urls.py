
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet
from .models import Student
from .views import students_by_course
from students.views import generate_id_card

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
urlpatterns=[
    path('course/<int:course_id>/', students_by_course),
    path('', include(router.urls)),
    path("id-card/<int:id>/", generate_id_card, name="id-card"),
]


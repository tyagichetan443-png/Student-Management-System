from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)

    class Meta:
        model = Student
        fields = "__all__"
        extra_kwargs = {
            'email': {'required': False},
            'contact': {'required': False},
            'address': {'required': False},
            'fees': {'required': False},
            'admission_date': {'required': False},
        }
from rest_framework import serializers
from .models import Fee


class FeeSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    class Meta:
        model = Fee
        fields =[
            'id',
            'student',
            'student_name',
            'amount',
            'payment_date',
            'payment_mode',
            'remarks'
        ]
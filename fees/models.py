from django.db import models
from students.models import Student

class Fee(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="payments"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    payment_mode = models.CharField(
        max_length=20,
        choices=[
            ('Cash', 'Cash'),
            ('UPI', 'UPI'),
            ('Card', 'Card'),
        ]
    )
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"{self.student.name} - ₹{self.amount}"

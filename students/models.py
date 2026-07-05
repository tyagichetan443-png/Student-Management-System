from django.db import models

from courses.models import Course

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=15)
    address = models.TextField()
    admission_date = models.DateField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    photo= models.ImageField(upload_to='students/', blank=True, null=True)
    
    fee_status = models.CharField(
    max_length=20,
    choices=[
        ('Paid', 'Paid'),
        ('Pending', 'Pending')
    ],
    default='Pending'
    )
    
    
    def __str__(self):
        return self.name
    
    
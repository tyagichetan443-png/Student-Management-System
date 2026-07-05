from django.contrib import admin
from .models import Student

admin.site.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'contact', 'address', 'admission_date')
    readonly_fields=('admission_date',)

# Register your models here.

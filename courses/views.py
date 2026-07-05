# courses/views.py

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from .serializers import CourseSerializer
from rest_framework import viewsets
from .models import Course
# @api_view(['GET'])
# def course_list(request):
#     courses = Course.objects.all()
#     serializer = CourseSerializer(courses, many=True)
#     return Response(serializer.data)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
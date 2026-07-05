"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from rest_framework_simplejwt.views import(
TokenObtainPairView, TokenRefreshView)
from django.contrib import admin
from django.urls import path, include
from students.views import dashboard
from .views import admin_profile
from django.conf.urls.static import static
from django.conf import settings




urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', dashboard, name='dashboard'),
    path('api/', include('students.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('fees.urls')),
    path('api/attendance/', include('attendance.urls')),
    path('api/students/', include('students.urls')),
    path('api/profile/', admin_profile),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
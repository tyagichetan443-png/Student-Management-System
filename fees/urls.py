from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    FeeViewSet,
    fee_report,
    pending_report,
    daily_collection,
    generate_receipt,
)

router = DefaultRouter()
router.register(r'fees', FeeViewSet)

urlpatterns = [
    path('fees/report/', fee_report),
    path('fees/pending-report/', pending_report),
    path('fees/daily-collection/', daily_collection),
    path('fees/receipt/<int:pk>/', generate_receipt),
    path("", include(router.urls)),
]
from django.urls import path
from . import views

urlpatterns = [
    path('api/delivery-stats/', views.get_delivery_stats, name='delivery_stats'),
    path('api/detect-anomalies/', views.detect_anomalies, name='detect_anomalies'),
    path('api/optimize-route/', views.optimize_route, name='optimize_route'),
]


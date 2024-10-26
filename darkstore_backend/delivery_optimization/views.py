from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .genai_models.route_optimizer import RouteOptimizer
from .genai_models.delivery_predictor import DeliveryPredictor
from .genai_models.anomaly_detector import AnomalyDetector

# Create your views here.

route_optimizer = RouteOptimizer()
delivery_predictor = DeliveryPredictor()
anomaly_detector = AnomalyDetector()

@api_view(['GET'])
def get_delivery_stats(request):
    stats = delivery_predictor.get_stats()
    return Response(stats)

@api_view(['GET'])
def detect_anomalies(request):
    anomalies = anomaly_detector.detect()
    return Response(anomalies)

@api_view(['POST'])
def optimize_route(request):
    addresses = request.data.get('addresses', [])
    optimized_route = route_optimizer.optimize(addresses)
    return Response(optimized_route)

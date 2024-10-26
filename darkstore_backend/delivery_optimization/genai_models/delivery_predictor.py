import numpy as np
from sklearn.ensemble import IsolationForest
import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

class DeliveryPredictor:
    def get_stats(self):
        prompt = "Generate delivery statistics including totalDeliveries, averageTime, onTimePercentage, latePercentage, deliveryStatus (On Time and Late), and vehicleUtilization (Utilized and Idle). Return the result as a JSON object."
        
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            max_tokens=200,
            n=1,
            stop=None,
            temperature=0.5,
        )
        
        return response.choices[0].text.strip()

class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1)

    def detect(self):
        prompt = "Analyze the delivery data and detect any anomalies or unusual patterns. Return the result as a JSON array of anomaly descriptions."
        
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            max_tokens=200,
            n=1,
            stop=None,
            temperature=0.5,
        )
        
        return response.choices[0].text.strip()

import sys
import joblib
import pandas as pd
import json


# Load model and columns
model = joblib.load("diabetes_risk_model.pkl")
model_columns = joblib.load("model_columns.pkl")

# Read input from stdin
raw_input = sys.stdin.read()
input_data = json.loads(raw_input)

# Create DataFrame with expected columns
df = pd.DataFrame([input_data], columns=model_columns)

# Make prediction (probability)
prob = model.predict_proba(df)[0][1]
risk_percent = round(prob * 100)

# Print output to Node.js
print(risk_percent)
# GlucoInsight 

**AI-Based System for Predicting Type 2 Diabetes Risk**  
Master's Final Project – MSc in Data Science  
**Goldsmiths, University of London**  
Author: Dario A. G. P.  
Date: July 2025

---

## Overview

**GlucoInsight** is a web-based application designed to estimate an individual's risk of developing Type 2 Diabetes using machine learning. The tool integrates a predictive model trained on BRFSS 2023 data from the CDC, offering users a quick, evidence-based assessment along with lifestyle recommendations.

---

##  Machine Learning Approach

-  **Dataset**: BRFSS 2023 (CDC – USA)
- Data Preprocessing:
  - Null value handling
  - Class balancing (oversampling)
  - Feature normalization and transformation
-  Models evaluated:
  - Logistic Regression
  - Random Forest
  - HistGradientBoostingClassifier  (Final)
  - Artificial Neural Networks
- **Final Model**: HistGradientBoostingClassifier with hyperparameter tuning (AUC = 0.71)
-  Model exported with `joblib` as `diabetes_risk_model.pkl`

---

## Web Application

Built with:
-  Node.js + Express
-  Tailwind CSS
-  Python for prediction via `child_process`
-  MongoDB for storing feedback
-  Nodemailer for sending results

---

##  Getting Started

### Requirements
- Python 3.10+
- Node.js 18+
- MongoDB Atlas URI
- Create a `.env` file:

```env
EMAIL_USER=youremail@example.com
EMAIL_PASS=your-email-app-password
MONGO_URI=mongodb+srv://yourMongoURI
```

### Installation

```bash
# 1. Clone the project
git clone https://github.com/Dagp8/glucoinsight-deploy.git
cd glucoinsight-deploy

# 2. Install Node dependencies
npm install

# 3. Set up Tailwind CSS
npm run build:css

# 4. (Optional) Create Python virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Run Locally

```bash
# Terminal 1 (Start web server)
node app.js

# Terminal 2 (Tailwind watcher)
npm run build:css
```

Visit: [http://localhost:3000](http://localhost:3000)

---

##  File Structure

```
glucoinsight-deploy/
│
├── app.js                 # Main Express app
├── routes/                # Express routes
├── config/                # MongoDB config
├── views/                 # EJS templates
├── public/                # Static assets
├── predict.py            # Python prediction script
├── model_columns.pkl      # Features used by model
├── diabetes_risk_model.pkl # Trained ML model
├── .env                   # Environment secrets
└── README.md              # You're here
```

---

##  License

© 2025 Dario A. G. P. — All rights reserved.

This project is part of my official Master’s dissertation at Goldsmiths, University of London.  
**Copying, reproducing, or distributing any part of this project without explicit permission is prohibited.**

For academic inquiries or collaborations, please contact me directly.

---

##  Demo

 Soon to be deployed on a public platform for testing.

---

##  Acknowledgments

- CDC - BRFSS Open Data
- Scikit-learn & TensorFlow
- Tailwind CSS
- MongoDB Atlas

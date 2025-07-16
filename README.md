# GlucoInsight

**AI-Based System for Predicting Type 2 Diabetes Risk**  
Master's Final Project – MSc in Data Science  
**Goldsmiths, University of London**  
Author: Dario A. G. P.  
Date: July 2025

---

## Overview

**GlucoInsight** is a web-based application designed to estimate an individual's risk of developing Type 2 Diabetes using machine learning. It integrates a predictive model trained on BRFSS 2023 data from the CDC, offering users a quick, evidence-based assessment along with lifestyle recommendations.

**Live demo**: [https://glucoinsight-deploy.onrender.com](https://glucoinsight-deploy.onrender.com)

---

## Machine Learning Approach

- **Dataset**: BRFSS 2023 (CDC – USA)
- **Data preprocessing**:
  - Null value handling
  - Class balancing (oversampling)
  - Feature normalization and transformation
- **Models evaluated**:
  - Logistic Regression
  - Random Forest
  - HistGradientBoostingClassifier (final)
  - Artificial Neural Networks
- **Final Model**: `HistGradientBoostingClassifier`
  - Hyperparameter tuned
  - Exported via `joblib`
  - Final AUC: **0.71**
- **Model files**:
  - `diabetes_risk_model.pkl`
  - `model_columns.pkl`

---

## Web Application Stack

- **Node.js + Express** – API and routing
- **EJS** – Template rendering
- **Tailwind CSS** – Responsive design
- **Python** – ML predictions via `child_process.spawn`
- **MongoDB Atlas** – Feedback storage
- **Nodemailer** – Email functionality

---

## Getting Started

### Requirements

- Python 3.10+
- Node.js 18+
- MongoDB Atlas URI

### `.env` File Example

```env
EMAIL_USER=youremail@example.com
EMAIL_PASS=your-email-app-password
MONGO_URI=mongodb+srv://yourMongoURI
```

---

## Installation

```bash
# 1. Clone the project
git clone https://github.com/Dagp8/glucoinsight-deploy.git
cd glucoinsight-deploy

# 2. Install Node dependencies
npm install

# 3. Build Tailwind CSS
npm run build:css

# 4. (Optional) Set up Python environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## Run Locally

```bash
# Terminal 1 – Run Node server
node app.js

# Terminal 2 – Run Tailwind build (only if working on styles)
npm run build:css
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## File Structure

```bash
glucoinsight-deploy/
├── app.js                  # Main Express app
├── config/db.js            # MongoDB connection
├── routes/                 # Express routes
├── views/                  # EJS templates (form, result, error, etc.)
├── public/                 # Static assets (CSS, images)
├── models/Rating.js        # Feedback model
├── predict.py              # Python ML interface
├── model_columns.pkl       # ML model feature columns
├── diabetes_risk_model.pkl # Trained ML model
├── start.sh                # Startup script for Render
├── requirements.txt        # Python dependencies
├── package.json            # Node dependencies
├── render.yaml             # Render deployment config
└── .env                    # Environment secrets (not tracked)
```

---

## Deployment Details

- **Platform**: Render
- **Type**: Web service
- **Region**: Frankfurt (EU Central)
- **Runtime**: Node.js 20.x with Python 3.11 (via `start.sh`)
- **Deployment**: On every push to main
- **Python Setup**: Installed in runtime via virtualenv

---

## Acknowledgments

- CDC BRFSS Open Data
- Scikit-learn
- Tailwind CSS
- MongoDB Atlas
- Render Deployment

---

© 2025 Dario A. G. P.  
For license information, see [`LICENSE`](./LICENSE).

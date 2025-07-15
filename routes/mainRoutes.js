const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const nodemailer = require("nodemailer");
const Rating = require("../models/Rating");
require("dotenv").config();

// Home Page with average rating
router.get("/", async (req, res) => {
  try {
    const ratings = await Rating.find();
    let avgRating = 0;
    let totalRatings = ratings.length;

    if (totalRatings > 0) {
      const total = ratings.reduce((sum, r) => sum + r.stars, 0);
      avgRating = (total / totalRatings).toFixed(1);
    }

    res.render("index", {
      title: "Welcome to GlucoInsight",
      avgRating,
      totalRatings,
    });
  } catch (err) {
    console.error("Error loading ratings:", err);
    res.render("index", {
      title: "Welcome to GlucoInsight",
      avgRating: "N/A",
      totalRatings: 0,
    });
  }
});

// Input form
router.get("/form", (req, res) => {
  res.render("form", { title: "Evaluate Your Diabetes Risk" });
});

// Info Page (About / Info)
router.get("/info", (req, res) => {
  res.render("info", { title: "About GlucoInsight" });
});

// Contact Page
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact GlucoInsight", success: null });
});

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "glucoinsight3@gmail.com",
    subject: "New message from GlucoInsight Contact Page",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Email error:", err);
      res.render("error", {
        title: "Error",
        message: "Failed to send message",
      });
    } else {
      res.render("contact", {
        title: "Contact GlucoInsight",
        success: "Message sent successfully!",
      });
    }
  });
});

// Predict
router.post("/predict", (req, res) => {
  const { age, sex, weight, height, bmi, activity, health, insurance } =
    req.body;

  // Calculate BMI if it comes wrong
  let parsedBMI = parseFloat(bmi);
  if (isNaN(parsedBMI) && weight && height) {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      parsedBMI = w / (h * h);
    }
  }

  // Prepare data for Python (use names equal to model_columns.pkl)
  const inputData = {
    _AGEG5YR: parseInt(age),
    _SEX: parseInt(sex),
    _BMI5: Math.round(parsedBMI * 100), // BRFSS use *100
    _TOTINDA: parseInt(activity),
    _RFHLTH: parseInt(health),
    _HLTHPL1: parseInt(insurance),
  };

  const { spawn } = require("child_process");
  const path = require("path");

  const py = spawn("python3", [path.join(__dirname, "../predict.py")]);
  py.stdin.write(JSON.stringify(inputData));
  py.stdin.end();

  let result = "";
  let errorOccurred = false;

  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  py.stderr.on("data", (err) => {
    if (!errorOccurred) {
      errorOccurred = true;
      console.error("Python error:", err.toString());
      res.render("error", {
        title: "Prediction Error",
        message: "Something went wrong: " + err.toString(),
      });
    }
  });

  py.on("close", () => {
    if (errorOccurred) return;

    const risk = parseInt(result);
    let level = "";
    let color = "";
    let message = "";

    if (risk >= 86) {
      level = "Very High";
      color = "red";
      message =
        "Your result suggests a very high risk of developing type 2 diabetes. We strongly encourage consulting a healthcare provider.";
    } else if (risk >= 70) {
      level = "High";
      color = "orange";
      message =
        "Your result indicates a high risk. Please consider preventive actions like healthy eating, activity, and regular checkups.";
    } else if (risk >= 50) {
      level = "Medium";
      color = "yellow";
      message =
        "You have a moderate risk. It’s a good moment to review lifestyle habits and talk to your GP if needed.";
    } else if (risk >= 30) {
      level = "Low";
      color = "green";
      message =
        "Your risk level is low. Maintaining healthy habits can keep it that way.";
    } else {
      level = "Very Low";
      color = "teal";
      message =
        "Excellent! Your current risk is very low. Keep up the great lifestyle!";
    }

    res.render("result", {
      title: "Your Diabetes Risk",
      risk,
      level,
      color,
      message,
    });
  });
});

// Rating
router.post("/rate", async (req, res) => {
  const stars = parseInt(req.body.stars);
  if (stars >= 1 && stars <= 5) {
    await Rating.create({ stars });
  }
  res.redirect("/");
});

module.exports = router;

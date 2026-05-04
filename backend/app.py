from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager
from datetime import timedelta
from models import db, User, Contact
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import requests
import pandas as pd
from analysis import analyze_data
import json
from analysis import auto_map_columns

import os

app = Flask(__name__)

bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:959869@localhost:5432/client_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "a8f3c1d9e7b2a4f6c9d1e3b5a7f2c4d6"
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

db.init_app(app)
with app.app_context():
    db.create_all()

jwt = JWTManager(app)

DATAFRAME = None

@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return jsonify({"msg": "OK"}), 200

    data = request.get_json()

    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.check_password_hash(user.password, data["password"]):
        token = create_access_token(identity=user.email,expires_delta=timedelta(minutes=15) )
        return jsonify({"msg":"success", "token":token}), 200

    return jsonify({"msg":"Invalid email or password"}), 401

@app.route("/live-stats", methods=["GET"])
def live_stats():
    return jsonify({
        "2023": {"accidents": 120000, "deaths": 45000},
        "2022": {"accidents": 127300, "deaths": 90000},
        "2021": {"accidents": 128430, "deaths": 45350}
    })

@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.json

    message = data.get("message")
    rating = data.get("rating")

    new_feedback = Feedback(message=message, rating=rating)
    db.session.add(new_feedback)
    db.session.commit()

    return {"status": "saved"}


@app.route("/register", methods=["POST","OPTIOND"])
def register():
    if request.method == "OPTIONS":
        return jsonify({"msg": "OK"}), 200

    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        hashed = bcrypt.generate_password_hash(password).decode("utf-8")

        user = User(name=name,email=email, password=hashed)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "User created successfully"}), 200
    except Exception as e:
        print("error:", e)
        return jsonify({"error":str(e)}), 500


@app.route("/logout", methods=["POST"])
def logout():
    return jsonify({"msg": "logout success"}), 200

@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()

    new_message = Contact(
        name=data["name"],
        email=data["email"],
        message=data["message"]
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({"msg": "Message saved successfully"}), 201


@app.route("/upload", methods=["POST"])
def upload_file():
    global DATAFRAME

    try:
        file = request.files.get("file")

        if not file:
            return jsonify({"error": "No file uploaded"})

        if not file.filename.lower().endswith(".csv"):
            return jsonify({"error": "Only CSV allowed"})

        df = pd.read_csv(file.stream)

        df = auto_map_columns(df)

        if df.empty:
            return jsonify({"error": "CSV is empty"})

        # 🔥 SAFE LOCATION
        if "location" not in df.columns:
            if "state" in df.columns and "city" in df.columns:
                df["location"] = df["state"] + " - " + df["city"]

        DATAFRAME = df

        result = analyze_data(df)

        return jsonify(result)

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        return jsonify({"error": str(e)})

@app.route("/filter", methods=["POST"])
def filter_data():
    global DATAFRAME

    try:
        # ✅ NEVER return 400 (frontend breaks)
        if DATAFRAME is None:
            return jsonify({
                "total_accidents": 0,
                "vehicle": {},
                "weather": {},
                "hourly": {}
            })

        df = auto_map_columns(DATAFRAME.copy())

        filters = request.json or {}
        print("FILTERS:", filters)  # 🔥 debug

        # ---------------- STATE ----------------
        states = filters.get("states", [])
        if states and "location" in df.columns:
            df = df[df["location"].str.contains(
                "|".join(states),
                case=False,
                na=False
            )]

        # ---------------- VEHICLE ----------------
        vehicles = filters.get("vehicles", [])
        if vehicles and "vehicle" in df.columns:
            df = df[df["vehicle"].isin(vehicles)]

        # ---------------- WEATHER ----------------
        weather = filters.get("weather", [])
        if weather and "weather" in df.columns:
            df = df[df["weather"].isin(weather)]

        # ---------------- CLEANING ----------------
        cat_cols = [
            "weather", "vehicle", "road_type",
            "road_condition", "lighting",
            "gender", "license", "alcohol"
        ]

        for col in cat_cols:
            if col in df.columns:
                df[col] = df[col].fillna("Unknown")

        num_cols = ["age", "speed", "casualties", "fatalities"]

        for col in num_cols:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors="coerce")
                df[col] = df[col].fillna(df[col].median())

        # ---------------- AGE ----------------
        age_min = filters.get("age_min")
        age_max = filters.get("age_max")

        if "age" in df.columns:
            if age_min is not None:
                df = df[df["age"] >= age_min]
            if age_max is not None:
                df = df[df["age"] <= age_max]

        # ---------------- SPEED ----------------
        speed_min = filters.get("speed_min")
        speed_max = filters.get("speed_max")

        if "speed" in df.columns:
            if speed_min is not None:
                df = df[df["speed"] >= speed_min]
            if speed_max is not None:
                df = df[df["speed"] <= speed_max]

        # ---------------- FINAL ----------------
        result = analyze_data(df)

        return jsonify(result)

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({
            "total_accidents": 0,
            "error": str(e)
        })
@app.route("/meta", methods=["GET"])
def get_meta():
    global DATAFRAME

    # ✅ NEVER return 400
    if DATAFRAME is None:
        return jsonify({
            "states": [],
            "districts": [],
            "vehicles": []
        })

    df = DATAFRAME

    states = []
    if "location" in df.columns:
        states = [{"label": s, "value": s} for s in df["location"].dropna().unique()]

    vehicles = []
    if "vehicle" in df.columns:
        vehicles = [{"label": v, "value": v} for v in df["vehicle"].dropna().unique()]

    return jsonify({
        "states": states,
        "districts": states,
        "vehicles": vehicles
    })

@app.route("/save-preset", methods=["POST"])
def save_preset():
    data = request.json

    conn = get_db()
    conn.execute(
        "INSERT INTO presets (user_id, name, filters) VALUES (?, ?, ?)",
        (1, data["name"], json.dumps(data["filters"]))
    )
    conn.commit()

    return jsonify({"message": "Saved"})

@app.route("/get-presets", methods=["GET"])
def get_presets():
    conn = get_db()
    rows = conn.execute("SELECT * FROM presets WHERE user_id = 1").fetchall()

    presets = [
        {
            "id": r["id"],
            "name": r["name"],
            "filters": json.loads(r["filters"])
        }
        for r in rows
    ]

    return jsonify(presets)

@app.route("/export-csv", methods=["GET"])
def export_csv():
    global DATAFRAME

    if DATAFRAME is None:
        return jsonify({"error": "No dataset uploaded"}), 400

    df = DATAFRAME
    df.to_csv("export.csv", index=False)
    return send_file("export.csv", as_attachment=True)

@app.route("/export-pdf", methods=["GET"])
def export_pdf():
    doc = SimpleDocTemplate("report.pdf")
    styles = getSampleStyleSheet()

    content = [
        Paragraph("Accident Dashboard Report", styles["Title"]),
        Paragraph("Generated Insights...", styles["Normal"]),
    ]

    doc.build(content)
    return send_file("report.pdf", as_attachment=True)

@app.route("/filters", methods=["GET"])
def get_filters():
    global DATAFRAME

    # ✅ NEVER return 400 here
    if DATAFRAME is None:
        return jsonify({
            "states": [],
            "vehicles": [],
            "weather": []
        })

    df = auto_map_columns(DATAFRAME.copy())

    return jsonify({
        "states": df["location"].dropna().unique().tolist() if "location" in df else [],
        "vehicles": df["vehicle"].dropna().unique().tolist() if "vehicle" in df else [],
        "weather": df["weather"].dropna().unique().tolist() if "weather" in df else [],
    })

rule_data = {
    "India": [
        {
            "title": "COVID-19 Travel Restrictions",
            "description": "India has implemented various travel restrictions and quarantine measures for international travelers due to the COVID-19 pandemic. Travelers may be required to provide negative COVID-19 test results, undergo quarantine, or follow specific health protocols upon arrival."
        },
        {
            "title": "Visa Requirements",
            "description": "Most travelers to India require a visa, which can be obtained through the Indian embassy or consulate in their home country. There are different types of visas available, including tourist visas, business visas, and e-visas."
        },
        {
            "title": "Cultural Etiquette",
            "description": "When traveling to India, it's important to respect local customs and traditions. This includes dressing modestly, removing shoes before entering homes and temples, and being mindful of religious practices."
        }
    ],
    "USA": [
        {
            "title": "ESTA Visa Waiver Program",
            "description": "Citizens of certain countries can travel to the United States for tourism or business purposes without obtaining a visa, under the ESTA Visa Waiver Program. Travelers must apply for authorization through the Electronic System for Travel Authorization (ESTA) before their trip."
        },
        {
            "title": "Customs and Border Protection",
            "description": "Upon arrival in the United States, travelers are subject to customs and border protection procedures. This includes declaring any items being brought into the country, undergoing security screenings, and providing necessary documentation."
        },
        {
            "title": "Health and Safety Guidelines",
            "description": "Travelers to the United States should be aware of health and safety guidelines, including vaccination requirements, COVID-19 protocols, and general safety tips for tourists."
        }
    ],
    "UK": [
        {
            "title": "Visa Requirements",
            "description": "Most travelers to the United Kingdom require a visa, which can be obtained through the UK embassy or consulate in their home country. There are different types of visas available, including tourist visas, business visas, and student visas."
        },
        {
            "title": "Customs and Border Control",
            "description": "Upon arrival in the UK, travelers are subject to customs and border control procedures. This includes declaring any items being brought into the country, undergoing security screenings, and providing necessary documentation."
        },
        {
            "title": "Health and Safety Guidelines",
            "description": "Travelers to the UK should be aware of health and safety guidelines, including vaccination requirements, COVID-19 protocols, and general safety tips for tourists."
        }
    ],
}

@app.route("/api/countries")
def get_countries():
    return jsonify(list(rule_data.keys()))

@app.route("/api/rules/<country>")
def get_rules(country):
    return jsonify(rule_data.get(country, []))

@app.route("/api/ai-tips/<rule>")
def ai_tips(rule):
    tips = {
        "Speed Limits": "Always maintain safe distance...",
        "Helmet Rule": "Use ISI certified helmet..."
    }
    return jsonify({"tip": tips.get(rule, "Drive safely!")})

# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port)
if __name__ == "__main__":
     app.run(debug=True)
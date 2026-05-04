import pandas as pd
import numpy as np
import math

def analyze_data(df: pd.DataFrame) -> dict:
    result = {}
    warnings = []

    # ------------------ OVERVIEW ------------------
    result["total_accidents"] = len(df)
    result["total_casualties"] = df.get("casualties", pd.Series()).sum()
    result["total_fatalities"] = df.get("fatalities", pd.Series()).sum()

    # ------------------ SMART WARNINGS ------------------

    required_columns = {
        "severity": "Severity Distribution",
        "age": "Age vs Severity",
        "speed": "Speeding Impact",
        "hour": "Day vs Night",
        "lat": "Geo Map",
        "lng": "Geo Map"
    }

    for col, feature in required_columns.items():
        if col not in df.columns:
            warnings.append(f"⚠ Missing {col} data → {feature} disabled")

    result["warnings"] = warnings
    if "warnings" not in result:
        result["warnings"] = []

    # ------------------ TIME ------------------
    if "hour" in df:
        result["hourly"] = df["hour"].value_counts().sort_index().to_dict()

    if "month" in df:
        result["monthly"] = df["month"].value_counts().to_dict()

    if "day" in df:
        result["daily"] = df["day"].value_counts().to_dict()

    # ------------------ SEVERITY ------------------
    if "severity" in df:
        result["severity"] = df["severity"].value_counts().to_dict()

    # ------------------ LOCATION ------------------
    if "location" in df:
        result["top_locations"] = (
            df["location"].value_counts().head(10).to_dict()
        )

    # ------------------ VEHICLE ------------------
    if "vehicle" in df:
        result["vehicle"] = df["vehicle"].value_counts().to_dict()

    # ------------------ WEATHER ------------------
    if "weather" in df:
        result["weather"] = df["weather"].value_counts().to_dict()

    # ------------------ ROAD ------------------
    if "road_type" in df:
        result["road_type"] = df["road_type"].value_counts().to_dict()

    if "road_condition" in df:
        result["road_condition"] = df["road_condition"].value_counts().to_dict()

    # ------------------ DRIVER ------------------
    if "age_group" in df:
        result["age_group"] = df["age_group"].value_counts().to_dict()

    if "gender" in df:
        result["gender"] = df["gender"].value_counts().to_dict()

    if "license" in df:
        result["license"] = df["license"].value_counts().to_dict()

    # ------------------ RISK FACTORS ------------------
    if "alcohol" in df:
        result["alcohol"] = df["alcohol"].value_counts().to_dict()

    if "speed" in df:
        result["avg_speed"] = float(df["speed"].mean())

    # ------------------ RELATIONSHIPS (IMPORTANT) ------------------
    if "weather" in df and "severity" in df:
        result["weather_vs_severity"] = (
            df.groupby("weather")["severity"].value_counts().unstack(fill_value=0).to_dict()
        )

    if "age_group" in df and "severity" in df:
        result["age_vs_severity"] = (
            df.groupby("age_group", observed=False)["severity"].value_counts().unstack(fill_value=0).to_dict()
        )

    # ------------------ GEO ------------------
    if "lat" in df and "lng" in df:
        result["geo"] = df[["lat", "lng"]].dropna().values.tolist()

    # ------------------ SMART INSIGHTS ------------------
    insights = []

    if "top_locations" in result:
        top_loc = max(result["top_locations"], key=result["top_locations"].get)
        insights.append(f"Most accidents occur in {top_loc}")

    if "vehicle" in result:
        top_vehicle = max(result["vehicle"], key=result["vehicle"].get)
        insights.append(f"Most involved vehicle: {top_vehicle}")

    if "hourly" in result:
        peak_hour = max(result["hourly"], key=result["hourly"].get)
        insights.append(f"Peak accident hour: {peak_hour}:00")
    # ✅ Injuries = casualties - fatalities
    if "casualties" in df.columns and "fatalities" in df.columns:
        result["injuries"] = int(df["casualties"].sum() - df["fatalities"].sum())
    else:
        result["injuries"] = 0

    # ✅ Average accidents per day
    if "date" in df.columns:
        days = df["date"].nunique()
        if days > 0:
            result["avg_per_day"] = round(len(df) / days, 2)
        else:
            result["avg_per_day"] = 0
    else:
        result["avg_per_day"] = 0

        # result["insights"] = insights
    
    result["correlation"] = correlation_matrix(df)
    result["risk"] = risk_analysis(df)
    result["summary"] = generate_summary(df, result)
    result["insights"] = generate_insights(df, result)
    result["preview"] = df.head(5).to_dict(orient="records")
    df = df.replace({np.nan: None})

    return convert_to_native(result)


def correlation_matrix(df):
    numeric_df = df.select_dtypes(include=np.number)
    return numeric_df.corr().fillna(0).values.tolist()

def risk_analysis(df):
    result = {}

    if "alcohol" in df.columns:
        result["alcohol"] = df["alcohol"].value_counts().to_dict()

    if "is_night" in df.columns:
        result["night"] = df["is_night"].value_counts().to_dict()

    if "speeding" in df.columns:
        result["speeding"] = df["speeding"].value_counts().to_dict()

    return result

import pandas as pd


def auto_map_columns(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = [c.strip().lower() for c in df.columns]
    df_cols = df.columns.tolist()

    # -------------------- GENERIC FINDER --------------------
    def find_col(candidates):
        for c in df_cols:
            if c in candidates:
                return c
        return None

    # -------------------- TIME DETECTION --------------------
    time_col = find_col(["time", "accident_time", "timestamp", "time of day"])

    if time_col:
        try:
            if pd.api.types.is_numeric_dtype(df[time_col]):
                df["hour"] = df[time_col].astype(int)
            else:
                parsed = pd.to_datetime(
                    df[time_col].astype(str).str.strip(),
                    errors="coerce",
                    infer_datetime_format=True
                )

                if parsed.notna().sum() > 0:
                    df["hour"] = parsed.dt.hour
        except:
            pass

    # SPLIT hour + am/pm
    if "hour" not in df.columns:
        hour_col = find_col(["hour"])
        ampm_col = find_col(["am_pm", "ampm"])

        if hour_col and ampm_col:
            def convert(row):
                try:
                    h = int(row[hour_col])
                    ap = str(row[ampm_col]).lower()
                    if ap == "pm" and h != 12:
                        return h + 12
                    if ap == "am" and h == 12:
                        return 0
                    return h
                except:
                    return None

            df["hour"] = df.apply(convert, axis=1)
            

    # -------------------- DATE --------------------
    year_col = find_col(["year"])
    month_col = find_col(["month"])
    day_col = find_col(["day", "day of month"])

    if year_col and month_col:
        try:
            if day_col:
                df["date"] = pd.to_datetime(
                    df[year_col].astype(str) + "-" +
                    df[month_col].astype(str) + "-" +
                    df[day_col].astype(str),
                    errors="coerce"
                )
            else:
                df["date"] = pd.to_datetime(
                    df[year_col].astype(str) + "-" +
                    df[month_col].astype(str),
                    errors="coerce"
                )
        except:
            pass

    # -------------------- LOCATION --------------------
    state_col = find_col(["state", "state name"])
    city_col = find_col(["city", "city name", "district", "district name"])

    if state_col and city_col:
        df["location"] = df[state_col].astype(str) + " - " + df[city_col].astype(str)
    elif state_col:
        df["location"] = df[state_col].astype(str)

    # -------------------- FULL COLUMN MAPPING --------------------
    mapping = {
        "severity": ["accident severity", "severity"],
        "vehicle": ["vehicle type involved"],
        "vehicles_count": ["number of vehicles involved"],
        "casualties": ["number of casualties"],
        "fatalities": ["number of fatalities", "number_of_death"],
        "weather": ["weather conditions"],
        "road_type": ["road type"],
        "road_condition": ["road condition"],
        "lighting": ["lighting conditions"],
        "traffic": ["traffic control presence"],
        "speed": ["speed limit (km/h)"],
        "age": ["driver age"],
        "gender": ["driver gender"],
        "license": ["driver license status"],
        "alcohol": ["alcohol involvement"],
        "lat": ["latitude"],
        "lng": ["longitude"],
    }

    for new_col, options in mapping.items():
        for opt in options:
            if opt in df_cols:
                df[new_col] = df[opt]
                break

    # -------------------- DATA CLEANING --------------------
    numeric_cols = ["age", "speed", "casualties", "fatalities", "vehicles_count"]

    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    # -------------------- DERIVED FEATURES --------------------
    if "age" in df.columns:
        df["age_group"] = pd.cut(
            df["age"],
            bins=[0, 18, 30, 45, 60, 100],
            labels=["Teen", "Young", "Adult", "Mid-age", "Senior"]
        )

    if "day of week" in df.columns:
        df["is_weekend"] = df["day of week"].isin(["Saturday", "Sunday"])

    # -------------------- FINAL SAFETY --------------------
    df = df.dropna(subset=["location"])
    # -------------------- DERIVED FEATURES (CRITICAL FIX) --------------------

    # ✅ Day vs Night
    if "hour" in df.columns:
        df["is_night"] = df["hour"].apply(
            lambda x: "Night" if pd.notna(x) and (x < 6 or x > 18) else "Day"
        )

    # ✅ Speeding
    if "speed" in df.columns:
        df["speeding"] = df["speed"].apply(
            lambda x: "Yes" if x > 80 else "No"
        )

    # ✅ Ensure severity always exists
    if "severity" not in df.columns:
        for col in df.columns:
            if "severity" in col:
                df["severity"] = df[col]
                break

    # ✅ Clean severity (important)
    if "severity" in df.columns:
        df["severity"] = df["severity"].astype(str).str.strip()

    # ✅ Ensure age numeric
    if "age" in df.columns:
        df["age"] = pd.to_numeric(df["age"], errors="coerce")

    return df

def convert_to_native(obj):
    if isinstance(obj, dict):
        return {str(k): convert_to_native(v) for k, v in obj.items()}
    
    elif isinstance(obj, list):
        return [convert_to_native(i) for i in obj]
    
    elif isinstance(obj, (np.integer,)):
        return int(obj)
    
    elif isinstance(obj, (np.floating,)):
        # 🔥 FIX: handle NaN
        if math.isnan(obj):
            return None
        return float(obj)
    
    elif isinstance(obj, float):
        if math.isnan(obj):
            return None
        return obj
    
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    
    else:
        return obj

def generate_summary(df, result):
    parts = []

    total = result.get("total_accidents", 0)
    parts.append(f"A total of {total} accidents were recorded.")

    # Peak hour
    if "hour" in df.columns:
        peak_hour = df["hour"].value_counts().idxmax()
        parts.append(f"Most accidents occur around {peak_hour}:00.")

    # Location
    if "location" in df.columns:
        top_loc = df["location"].value_counts().idxmax()
        parts.append(f"The most accident-prone area is {top_loc}.")

    # Severity
    if "severity" in df.columns:
        top_sev = df["severity"].value_counts().idxmax()
        parts.append(f"Majority of accidents are categorized as {top_sev} severity.")

    # Vehicle
    if "vehicle" in df.columns:
        top_vehicle = df["vehicle"].value_counts().idxmax()
        parts.append(f"The most involved vehicle type is {top_vehicle}.")

    # Combine into paragraph
    summary = " ".join(parts)

    return summary

def generate_insights(df, result):
    insights = []

    # Peak hour
    if "hour" in df.columns:
        peak_hour = df["hour"].value_counts().idxmax()
        insights.append(f"Peak accidents occur around {peak_hour}:00.")

    # Top location
    if "location" in df.columns:
        top_loc = df["location"].value_counts().idxmax()
        insights.append(f"Highest accidents in {top_loc}.")

    # Severity
    if "severity" in df.columns:
        top_sev = df["severity"].value_counts().idxmax()
        insights.append(f"Most accidents are {top_sev} severity.")

    # Vehicle
    if "vehicle" in df.columns:
        top_vehicle = df["vehicle"].value_counts().idxmax()
        insights.append(f"Most involved vehicle: {top_vehicle}.")

    return insights
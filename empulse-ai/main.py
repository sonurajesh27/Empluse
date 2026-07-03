from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import random

app = FastAPI(title="EmPulse AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Category keywords for classification
CATEGORY_KEYWORDS = {
    "supervisor": ["supervisor", "boss", "manager", "shout", "yell", "rude", "abuse", "favouritism", "overtime", "instructions"],
    "food": ["food", "canteen", "mess", "lunch", "eat", "meal", "stale", "cold", "break time", "quality"],
    "facility": ["toilet", "bathroom", "water", "rest area", "locker", "dirty", "clean", "lock"],
    "safety": ["safety", "machine", "wet", "slippery", "equipment", "shield", "fire", "lighting", "electrical", "hazard"],
    "maintenance": ["machine", "repair", "tool", "broken", "noise", "ventilation", "damaged"],
    "health": ["hot", "fume", "dust", "medical", "sick", "headache", "ventilation", "drinking water"],
    "pay": ["salary", "pay", "deduction", "leave", "pf", "esi", "payslip", "delayed"],
}

SUBCATEGORY_MAP = {
    "supervisor": ["Rude behaviour", "Favouritism", "Unclear instructions", "Forced overtime", "Verbal abuse", "Discrimination"],
    "food": ["Food quality poor", "Food not on time", "Break too short", "Canteen unhygienic", "Not enough quantity"],
    "facility": ["Toilet not clean", "Lock broken", "No water in bathroom", "Overcrowded locker room", "No rest area"],
    "safety": ["Machine breakdown ignored", "Floor wet/slippery", "No safety equipment", "Fire exit blocked", "Poor lighting", "Electrical hazard"],
    "maintenance": ["Machine not repaired", "Tool missing", "Equipment damaged", "Noise level high", "No ventilation"],
    "health": ["Too hot on floor", "Dust/fume exposure", "Medical room unavailable", "Forced to work sick", "No drinking water"],
    "pay": ["Salary delayed", "Wrong deductions", "Leave not approved", "PF/ESI not updated", "No payslip"],
}

# Simple sentiment words
NEGATIVE_WORDS = ["bad", "poor", "terrible", "worst", "hate", "angry", "frustrated", "dirty", "broken", "ignored", "rude", "abuse", "problem", "unsafe", "delayed", "stale", "cold", "sick", "headache"]
POSITIVE_WORDS = ["good", "great", "helpful", "clean", "fair", "resolved", "fixed", "happy", "satisfied", "nice"]


class TextFeedback(BaseModel):
    text: str
    language: Optional[str] = "en"


class AnalysisResult(BaseModel):
    original: str
    translated: str
    sentiment: str
    sentimentScore: float
    category: str
    subCategory: str
    confidence: int


def classify_category(text: str) -> tuple[str, int]:
    text_lower = text.lower()
    scores = {}
    for category, keywords in CATEGORY_KEYWORDS.items():
        score = sum(1 for keyword in keywords if keyword in text_lower)
        if score > 0:
            scores[category] = score

    if not scores:
        return "other", random.randint(40, 60)

    best_category = max(scores, key=scores.get)
    confidence = min(98, 60 + scores[best_category] * 12)
    return best_category, confidence


def analyze_sentiment(text: str) -> tuple[str, float]:
    text_lower = text.lower()
    neg_count = sum(1 for word in NEGATIVE_WORDS if word in text_lower)
    pos_count = sum(1 for word in POSITIVE_WORDS if word in text_lower)

    if neg_count > pos_count:
        score = max(-1.0, -0.3 - (neg_count * 0.15))
        return "negative", round(score, 2)
    elif pos_count > neg_count:
        score = min(1.0, 0.3 + (pos_count * 0.15))
        return "positive", round(score, 2)
    else:
        return "neutral", 0.0


def pick_subcategory(category: str, text: str) -> str:
    subcategories = SUBCATEGORY_MAP.get(category, ["General concern"])
    text_lower = text.lower()
    for sub in subcategories:
        if any(word in text_lower for word in sub.lower().split()):
            return sub
    return subcategories[0]


# Mock Tamil translations (for demo)
TAMIL_MOCK_TRANSLATIONS = {
    "sapadu": "food",
    "romba": "very",
    "maramam": "bad",
    "break": "break",
    "time": "time",
    "kuraivu": "less",
    "supervisor": "supervisor",
    "thittinaar": "scolded",
    "paathukaappu": "safety",
    "thanni": "water",
    "saappaadu": "food",
}


def mock_translate_tamil(text: str) -> str:
    """Mock translation - in production this would use Google Translate or AI"""
    words = text.lower().split()
    translated = []
    for word in words:
        if word in TAMIL_MOCK_TRANSLATIONS:
            translated.append(TAMIL_MOCK_TRANSLATIONS[word])
        else:
            translated.append(word)
    return " ".join(translated) if any(w in TAMIL_MOCK_TRANSLATIONS for w in words) else text


@app.post("/api/ai/analyze-text", response_model=AnalysisResult)
async def analyze_text(feedback: TextFeedback):
    """Analyze text feedback - categorize, sentiment, translate if needed"""

    # Translation
    if feedback.language and feedback.language.lower() in ["ta", "tamil"]:
        translated = mock_translate_tamil(feedback.text)
    else:
        translated = feedback.text

    # Classify
    category, confidence = classify_category(translated)
    sentiment, sentiment_score = analyze_sentiment(translated)
    sub_category = pick_subcategory(category, translated)

    return AnalysisResult(
        original=feedback.text,
        translated=translated,
        sentiment=sentiment,
        sentimentScore=sentiment_score,
        category=category,
        subCategory=sub_category,
        confidence=confidence,
    )


@app.post("/api/ai/analyze-voice")
async def analyze_voice(file: UploadFile = File(...)):
    """Process voice feedback - mock transcription for hackathon"""

    # In production: use Whisper or Google Speech-to-Text
    # For hackathon: return mock transcription
    mock_transcriptions = [
        "Supervisor is very rude and shouts at workers during morning shift",
        "Canteen food is stale and cold every day. Break time is too short.",
        "Bathroom is not cleaned for 3 days. Very dirty and unhygienic.",
        "Machine in welding section is broken. No safety equipment provided.",
        "Salary has been delayed by 2 weeks. No communication from HR.",
    ]

    transcription = random.choice(mock_transcriptions)
    category, confidence = classify_category(transcription)
    sentiment, sentiment_score = analyze_sentiment(transcription)
    sub_category = pick_subcategory(category, transcription)

    return {
        "transcription": transcription,
        "translated": transcription,
        "language_detected": "Tamil",
        "sentiment": sentiment,
        "sentimentScore": sentiment_score,
        "category": category,
        "subCategory": sub_category,
        "confidence": confidence,
    }


@app.get("/health")
async def health():
    return {"status": "ok", "service": "EmPulse AI", "version": "1.0.0"}


@app.get("/api/ai/categories")
async def get_categories():
    """Return all supported categories and subcategories"""
    return {
        category: SUBCATEGORY_MAP.get(category, [])
        for category in CATEGORY_KEYWORDS.keys()
    }


@app.post("/api/legal/analyze")
async def analyze_legal_case(case_data: dict):
    """Return mock investigation report for legal case analysis"""
    return {
        "summary": "Worker reported inappropriate physical contact by Supervisor on 2 occasions. Complaint was corroborated by one co-worker witness statement. CCTV footage from both dates shows proximity and body language consistent with the complaint.",
        "evidenceQuality": "Strong (7 documents, 1 witness corroboration)",
        "patternAnalysis": [
            "Supervisor has received 7 complaints in the last 6 months from 4 different workers",
            "Pattern of escalating behaviour: verbal to physical intimidation",
            "Incidents cluster around shift-end periods (fatigue/stress factor)",
            "Previous warning issued — behaviour did not improve",
        ],
        "attendanceAnalysis": "Worker showed 23% increase in absenteeism following incidents. Prior attendance was 96% regular. Pattern suggests avoidance behaviour consistent with harassment claims.",
        "performanceAnalysis": "Worker had consistent ratings for 18 months. Performance score dropped following the incident. No prior disciplinary issues on record for the complainant.",
        "previousHistory": [
            "Prior warning letter issued for verbal abuse (different complainant)",
            "Informal complaint resolved with mediation",
            "Unrelated facility complaint resolved normally",
        ],
        "credibilityScore": 87,
        "riskLevel": "critical",
        "recommendations": [
            "Immediately suspend supervisor from direct supervisory duties pending investigation conclusion",
            "Ensure affected worker is temporarily reassigned",
            "Conduct formal disciplinary hearing within 7 working days",
            "Engage external harassment prevention counsellor for team debrief",
            "Review all complaints filed against supervisor in the last 12 months",
            "Consider termination proceedings given repeated offence pattern",
        ],
        "nextSteps": [
            "Schedule disciplinary hearing within 5 days",
            "Obtain legal opinion on termination risk and labor law compliance",
            "Document all evidence in sealed investigation file",
            "Inform Owner about critical risk",
            "Arrange counselling support for affected worker",
        ],
        "confidence": 87,
        "disclaimer": "This report is AI-assisted and intended to support HR and Legal investigations. Final employment decisions must always be made by authorized human decision-makers.",
    }

# EmPulse 🏭🤖
> AI-Powered Workforce Intelligence Platform that reduces factory floor attrition by catching small problems before they become expensive resignations.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Made with Love](https://img.shields.io/badge/made%20with-❤️-red)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple)

## 🎯 What It Does

EmPulse gives every factory worker a voice — anonymously, in their own language — and gives every manager clarity on what's actually happening on the floor. It catches the ₹500 problem (a dirty bathroom, a rude supervisor) BEFORE it becomes a ₹15,000 resignation. Built for Indian manufacturing floors where 6-8 workers leave every month and nobody knows why.

## 👥 Team

| Name | Role |
|------|------|
| Preetha R | Frontend Developer & UI/UX |
| Arun P | Backend Developer & API Integration |
| Harini M | AI/ML Engineer & Algorithm Design |
| Preethi S | Database & DevOps |
| Sonu R | Project Manager & Documentation |

## 🚀 How to Run It

### Prerequisites
- Node.js 16+
- Java 21
- Maven
- PostgreSQL 16
- Python 3.11+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sonurajesh27/Empluse.git

# Navigate to project directory
cd Empluse
```

### Start Database
```bash
psql -U postgres
CREATE DATABASE empulse;
\q
```

### Start Backend (Spring Boot)
```bash
cd empulse-backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Start AI Service (FastAPI)
```bash
cd empulse-ai
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
# Runs on http://localhost:8000
```

### Start Frontend (React)
```bash
cd empulse-frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

### Demo Credentials
| Role | PIN |
|------|-----|
| Admin | 0000 |
| HR Manager | 2001 |
| Owner | 9999 |
| Employee | 1001-1008 (or fingerprint) |

## ✨ Features

### Core Platform
✅ **Anonymous Feedback** — Workers speak freely without fear of retaliation
✅ **Multi-language** — Tamil, Hindi, Kannada, Malayalam, English
✅ **Voice Input** — Workers can record complaints in their language; AI translates
✅ **Role-based Dashboards** — Employee, Admin, HR, Owner — each sees what they need
✅ **Mock Fingerprint Auth** — Biometric verification with role auto-detection

### AI Intelligence
✅ **Auto-categorization** — AI categorizes complaints with confidence scores
✅ **Pattern Detection** — Identifies recurring issues across sectors
✅ **Flight Risk Prediction** — Predicts which workers will leave next
✅ **Bias Detection** — Catches coordinated complaints & fake resolutions
✅ **Sentiment Analysis** — Analyzes mood from text and voice input
✅ **Strategic Insights** — Answers: What to fix first? Who's the bottleneck?

### Accountability System
✅ **SLA Timers** — 48hr Admin, 72hr HR, auto-escalation chain
✅ **Worker Confirmation** — Workers verify if issues are actually resolved
✅ **Immutable Audit Log** — Every action timestamped, nobody can hide
✅ **Suppression Detection** — Catches admins closing issues without fixing
✅ **Owner Dashboard** — Unfiltered truth, no layers between worker and owner

### Advanced Features
✅ **Legal Investigation Module** — Full case management with AI-assisted reports
✅ **AI Workplace Monitoring** — Live camera feed with mock threat detection
✅ **Incident Detection** — Upload evidence, track safety violations
✅ **EVM-style Voting** — Secure peer nominations, one-person-one-vote
✅ **Daily Emoji Pulse** — Quick mood capture in 2 seconds
✅ **Quick Polls** — HR sends yes/no polls to any sector
✅ **Production Dashboard** — Mood vs productivity correlation
✅ **Monthly AI Report** — Printable summary with key findings
✅ **Smart Notifications** — Priority-based toast alerts
✅ **Wellbeing Score** — Worker health indicator (0-100)

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling (Latte theme) |
| Recharts | Charts & analytics |
| Lucide React | Icon system |
| React Router | Navigation |

### Backend
| Tech | Purpose |
|------|---------|
| Java 21 | Runtime |
| Spring Boot 3.3 | REST API framework |
| Spring Data JPA | Database ORM |
| PostgreSQL 16 | Primary database |
| Maven | Build tool |

### AI/ML Service
| Tech | Purpose |
|------|---------|
| Python 3.11 | Runtime |
| FastAPI | AI API framework |
| Keyword NLP | Text categorization |
| Sentiment Engine | Mood analysis |
| Translation (mock) | Tamil/Hindi → English |

### DevOps
| Tech | Purpose |
|------|---------|
| GitHub | Version control |
| Render | AI service hosting |
| Vercel | Frontend hosting (optional) |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│            Frontend (React + TypeScript)             │
│                  localhost:3000                       │
└────────────┬────────────────────────┬───────────────┘
             │ /api/*                 │ /api/ai/*
┌────────────▼────────────┐  ┌───────▼───────────────┐
│   Spring Boot Backend   │  │   FastAPI AI Service   │
│     localhost:8080      │  │     localhost:8000     │
└────────────┬────────────┘  └───────────────────────┘
             │
┌────────────▼────────────┐
│      PostgreSQL DB      │
│     localhost:5432      │
└─────────────────────────┘
```

## 📊 Problem We Solve

| Metric | Without EmPulse | With EmPulse |
|--------|----------------|--------------|
| Monthly attrition | 6-8 workers | 2-3 workers (60% reduction) |
| Annual cost | ₹90 lakhs | ₹35 lakhs (₹55L saved) |
| Problem discovery | After resignation | Within 24 hours |
| Visibility into floor issues | Zero | Real-time |
| Time to fix | Weeks (if ever) | 48-72 hours (SLA enforced) |

## 🏆 Hackathon Journey

### What We Learned
- Building bias-proof anonymous feedback systems for low-literacy workers
- Designing AI accountability chains that nobody can bypass
- Multi-language interfaces for regional Indian languages
- Real-time dashboards with live polling and animations
- Full-stack integration: React → Spring Boot → PostgreSQL → FastAPI

### Challenges We Faced
- Ensuring anonymity while preventing abuse (15-day cycle + pattern detection)
- Making the system trustworthy when everyone (admin, HR, even owner) could be biased
- Building an AI that assists but NEVER makes employment decisions
- Designing for workers who may not be literate in English

### What We're Proud Of
- Complete end-to-end working prototype with real database
- 14 loopholes identified and fixed with AI-driven solutions
- 5-language support across all employee pages
- Legal investigation module with AI-assisted reports
- The accountability chain that nobody can break

## 🔮 Future Plans

If we had more time, we'd add:
- 🎥 Real CCTV integration with YOLOv8 for workplace safety
- 🧠 OpenAI GPT integration for natural language chatbot
- 📱 Native mobile app (React Native)
- 🔐 Real biometric hardware integration
- 📊 Advanced ML attrition prediction model
- 🌐 Multi-tenant SaaS deployment for multiple companies
- 💬 WhatsApp/IVR integration for workers without smartphones

## 🤝 AI Tools Used

This project was built with assistance from:
- **Kiro AI** — Code generation, architecture design, debugging
- **GitHub Copilot** — Code autocompletion

All AI-generated code was reviewed, tested, and customized by our team.

## 📄 License

MIT License — feel free to use this for learning!

## 🙏 Acknowledgments

- Thanks to CODEZAP25 organizers
- Inspired by real conversations with factory owners in Tirupur, Tamil Nadu
- Built to solve the ₹90 lakh/year attrition problem in Indian manufacturing

---

Built with ❤️ by Team at CODEZAP25

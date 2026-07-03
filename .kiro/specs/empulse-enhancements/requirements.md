# Requirements: EmPulse Platform Enhancements

## Requirement 1: Remove PIN Hints from Login
### User Stories
- As a user, I should NOT see PINs visible on the login page so credentials stay secure
- As a demo presenter, I want a separate "Demo Guide" page that shows test credentials
- As a user who forgot their PIN, I want a "Forgot PIN → contact Admin" link

### Acceptance Criteria
- [ ] PIN hint text removed from PINLoginPage
- [ ] "Forgot PIN? Contact your Admin" link added below the verify button
- [ ] New route `/demo-guide` showing all test credentials for presentation
- [ ] Demo guide page accessible only from splash page (small link at bottom)

---

## Requirement 2: Multi-language Support (Tamil/English Toggle)
### User Stories
- As a non-English speaking worker, I want to use the app in Tamil so I can understand everything
- As an Admin/HR, I want to see everything in English regardless of worker language
- As a worker, I want to switch language easily from any screen

### Acceptance Criteria
- [ ] Language selector on Splash page (Tamil / English)
- [ ] Language context provider storing selected language
- [ ] All employee-facing pages show translated labels (Tamil + English)
- [ ] Admin/HR/Owner dashboards remain in English always
- [ ] Voice input note shows "Speak in Tamil or English — AI will translate"
- [ ] Language preference persisted in localStorage

---

## Requirement 3: Bulk Seed Data (80 employees, 50+ complaints)
### User Stories
- As a demo presenter, I need realistic data showing patterns across sectors
- As a judge, I want to see meaningful charts and patterns, not empty dashboards

### Acceptance Criteria
- [ ] 80 employees across 8 sectors (10 per sector) with mix of technical/non-technical
- [ ] 50+ complaints spread across all categories, sectors, and statuses
- [ ] Complaints have varied timestamps (simulate 4 weeks of data)
- [ ] Rewards data for all 80 employees with varied scores
- [ ] Audit log with 20+ entries showing full escalation chains
- [ ] DataSeeder updated in Spring Boot backend

---

## Requirement 4: Employee Registration Page
### User Stories
- As an Admin, I want to register new workers into the system
- As a new worker, I want to see a welcome screen on first login
- As the system, new accounts should be flagged for 7 days (observation mode)

### Acceptance Criteria
- [ ] New route `/admin/register` — form with: name, sector, role, roleType, PIN
- [ ] System auto-generates employee ID (EMP-XXXX)
- [ ] POST /api/employees/register endpoint in backend
- [ ] Success confirmation with generated ID shown
- [ ] Navigation link from Admin dashboard to registration page
- [ ] New employee flag (first 7 days) visible in admin panel

---

## Requirement 5: Real-time Polling on Admin Dashboard
### User Stories
- As an Admin, I want to see new complaints appear without refreshing the page
- As HR, I want live counts updating as issues get escalated

### Acceptance Criteria
- [ ] Admin dashboard polls GET /api/complaints every 30 seconds
- [ ] Complaint count updates automatically
- [ ] "Last updated: X seconds ago" indicator shown
- [ ] New complaints since last poll highlighted briefly (flash animation)
- [ ] Toast notification when a new complaint arrives

---

## Requirement 6: EVM-style Voting UI
### User Stories
- As a worker, I want to vote for my best colleague securely
- As the system, votes should be one-per-person, encrypted, and anonymous
- As HR, I want to see results only after voting period ends

### Acceptance Criteria
- [ ] New tab "Vote" on employee bottom nav
- [ ] Worker sees list of colleagues in their sector
- [ ] Can select ONE person per voting cycle (15 days)
- [ ] Vote confirmation with "locked" status shown
- [ ] Cannot change vote after submission
- [ ] HR Rewards tab shows "Voting in progress — results in X days" during active cycle
- [ ] After cycle ends: results revealed with vote counts

---

## Requirement 7: Production Dashboard Mockup
### User Stories
- As an Owner, I want to see production metrics correlated with worker satisfaction
- As a judge, I want to see the platform handles more than just complaints

### Acceptance Criteria
- [ ] New route `/admin/production` or tab in Admin dashboard
- [ ] Mock data: output per shift, downtime per machine, efficiency %
- [ ] Correlation chart: sector mood score vs production output
- [ ] Machine status grid (green/amber/red) — mock IoT data
- [ ] "AI Insight" card: "Production dropped 12% in Welding — correlates with 5 safety complaints"

---

## Requirement 8: AI Chatbot (RAG-style)
### User Stories
- As HR/Owner, I want to ask natural language questions about complaints and get answers
- As a demo presenter, I want to show AI interaction inside the dashboard

### Acceptance Criteria
- [ ] Chat panel (slide-in or floating button) on HR and Owner dashboards
- [ ] Text input: type a question
- [ ] System responds with data-driven answers using keyword matching on complaints
- [ ] Example queries: "How many canteen complaints this month?", "Which sector is worst?", "Show me Murugan's actions"
- [ ] Responses formatted as cards with numbers and summaries
- [ ] "🤖 AI Assistant" branding on the panel

---

## Requirement 9: Mood Heatmap with Time Slider
### User Stories
- As Owner, I want to see how sector health changed over time visually
- As a judge, I want a wow-factor visualization

### Acceptance Criteria
- [ ] Time slider component (Week 1 to Week 6)
- [ ] 8 sector boxes that change color as slider moves
- [ ] Smooth color transitions (green → amber → red)
- [ ] Current week highlighted
- [ ] Placed in Owner dashboard Overview tab

---

## Requirement 10: Daily Emoji Pulse
### User Stories
- As a worker, I want to quickly share how I feel each day without writing a complaint
- As HR, I want to track daily mood trends per sector

### Acceptance Criteria
- [ ] When employee opens app: modal/card at top "How was today?" with 4 emojis
- [ ] One tap submits (😞 😐 🙂 😄)
- [ ] Can only submit once per day
- [ ] Stored in DB: employeeId (hashed), sector, mood, date
- [ ] HR dashboard shows daily mood trend line chart per sector

---

## Requirement 11: Worker Wellbeing Score
### User Stories
- As HR, I want to see each worker's overall wellbeing as a single number
- As Owner, I want to identify workers who need support

### Acceptance Criteria
- [ ] Score 0-100 calculated from: attendance (30%) + mood trend (25%) + complaint frequency (20%) + peer votes (15%) + tenure (10%)
- [ ] Shown on HR Risk tab as a score card per worker
- [ ] Color coded: green (>70), amber (40-70), red (<40)
- [ ] Workers with score dropping 15+ points in 2 weeks flagged

---

## Requirement 12: "What If" Scenario Simulator
### User Stories
- As Owner, I want to ask "What happens if I remove Supervisor X?" and see predicted impact
- As a judge, I want to see AI-driven predictive capabilities

### Acceptance Criteria
- [ ] Panel in Owner dashboard with pre-built scenarios
- [ ] Scenarios: "Remove supervisor", "Change canteen vendor", "Add night shift"
- [ ] Each shows: predicted mood change, risk factors, recommended action
- [ ] Mock AI responses based on current complaint patterns
- [ ] Visual before/after comparison

---

## Requirement 13: Complaint Resolution Timeline
### User Stories
- As Admin, I want to see the full journey of a complaint visually
- As Owner, I want to see exactly where delays happened

### Acceptance Criteria
- [ ] Visual stepper/timeline on ComplaintDetail page
- [ ] Steps: Raised → Admin Received → Under Review → Escalated → HR Acted → Resolved → Confirmed
- [ ] Each step shows timestamp and actor
- [ ] Delayed steps highlighted in red
- [ ] Current step pulsing/animated

---

## Requirement 14: Smart Notifications (Priority Toasts)
### User Stories
- As Admin/HR, I want urgent alerts to pop up when I open the dashboard
- As the system, critical issues should be visually distinct from low-priority ones

### Acceptance Criteria
- [ ] Toast notification component (top-right, auto-dismiss after 8s)
- [ ] On dashboard load: show top 3 urgent items
- [ ] Priority levels: 🔴 Critical (red), 🟡 Medium (amber), 🟢 Low (green)
- [ ] Click toast → navigates to relevant complaint
- [ ] Toast queue: shows one at a time, cycles through

---

## Requirement 15: Anonymous Quick Poll ("Ask the Floor")
### User Stories
- As HR, I want to send a quick yes/no poll to a specific sector
- As a worker, I want to answer polls anonymously

### Acceptance Criteria
- [ ] HR dashboard: "Create Poll" button
- [ ] Form: question text + target sector + duration (1hr/4hr/24hr)
- [ ] Employee dashboard shows active poll card
- [ ] Worker taps Yes/No — one response per poll
- [ ] HR sees live results bar chart
- [ ] Poll auto-closes after duration

---

## Requirement 16: Monthly AI Report Card
### User Stories
- As Owner, I want a monthly summary of everything in one view
- As a judge, I want to see professional reporting capability

### Acceptance Criteria
- [ ] Owner dashboard: "Generate Monthly Report" button
- [ ] On-screen report showing: top issues, avg response time, sector rankings, best/worst performers, attrition risk summary
- [ ] Formatted as printable cards (no real PDF needed)
- [ ] AI insights section: "This month's key finding: Canteen complaints dropped 40% after vendor change"

---

## Requirement 17: Smart Monitoring (Attendance + Overtime)
### User Stories
- As Admin, I want to see attendance patterns and overtime hours
- As the system, absenteeism patterns should feed into flight risk

### Acceptance Criteria
- [ ] Mock attendance data per employee (present/absent/late per day)
- [ ] Admin dashboard: attendance summary card (% present today, late arrivals)
- [ ] Overtime hours calculated: flagged if worker exceeds 10hr/week
- [ ] Absenteeism streak alert: "Worker X absent 3 days in a row"
- [ ] Feed attendance into flight risk score calculation

---

## Non-functional Requirements
- All new features use the same latte UI design system
- All features connected to real PostgreSQL backend where applicable
- Frontend fallback to mock data if backend is unavailable
- Mobile-first responsive design maintained
- Zero TypeScript build errors

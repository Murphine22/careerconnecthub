 AI-Powered Job Match Dashboard

 📌 Project Overview
The AI-Powered Job Match Dashboard is a web application built with Next.js, React, and Tailwind CSS. It displays job recommendations, match scores, and allows users to apply for jobs** based on their skills. This project demonstrates API handling, UI/UX design, and state management.

 🎯 Objective
- Display job listings with AI-generated match scores.
- Visualize job match scores using color-coded indicators.
- Show detailed job descriptions upon selection.
- Implement an Apply Now button with skill-based alerts.
- Ensure a fully responsive and mobile-friendly design.

 📜 Project Requirements
 1️⃣ UI Components
✅ Job List Component
- Display a list of job recommendations.
- Each job card should include:
  - Title, Company, Location, Salary Range
  - Match Score (0-100%) (AI-generated)

✅ Match Score Visualization
- Use a progress bar or score badge to represent match percentage.
- Color-coded system:
  - 🟢 Green (80%+) → Strong match
  - 🟡 Yellow (50-79%) → Moderate match
  - 🔴 Red (<50%) → Weak match

✅ Job Details Component
- Clicking on a job opens a modal or a new page.
- Display job details and required skills.

✅ Apply Now Button
- Allows users to apply for jobs (mock action).
- If the user lacks required skills, an alert suggests upskilling options.

✅ Responsive Design
- The UI must be **mobile-friendly and adaptive**.

 2️⃣ API Handling
✅ Mock Job Data API
- Fetch job listings from a mock API (local JSON or a free online API like MockAPI).
- Dynamically display job details.

✅ Dynamic User Data Simulation
- Assume a mock user profile with skills.
- Compare the **user's skills** with the **job's required skills** to calculate a **match score**.

 ⚙️ Technical Stack
| Technology            | Purpose  |
|-----------------------|-----------------|
| Next.js (React)       | Frontend framework |
| Tailwind CSS          | Styling & UI design |
| Context API / Zustand | State management |
| Fetch / Axios         | API handling |
| TypeScript (Bonus)    | Strongly typed development |

 🛠 Installation & Setup
1. Clone the Repository
   ```sh
   git clone https://github.com/yourusername/ai-job-match-dashboard.git
   cd ai-job-match-dashboard
   ```
2. Install Dependencies
   ```sh
   npm install
   ```
3. Run the Development Server
   ```sh
   npm run dev
   ```
4. Open the App in your browser at:
   ```sh
   http://localhost:3000
   ```

 📡 Mock API for Job Listings
Use this mock JSON API for job data:
```json
[
  {
    "id": 1,
    "title": "Frontend Developer",
    "company": "Tech Corp",
    "location": "Remote",
    "salary": "$70,000 - $90,000",
    "requiredSkills": ["React", "Next.js", "JavaScript", "Tailwind CSS"],
    "matchScore": 85
  },
  {
    "id": 2,
    "title": "UI Engineer",
    "company": "DesignPro",
    "location": "New York, USA",
    "salary": "$80,000 - $100,000",
    "requiredSkills": ["Figma", "React", "CSS"],
    "matchScore": 70
  }
]
```

 🚀 Ready to Build? Let’s Go! 💻🔥


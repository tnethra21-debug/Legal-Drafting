# Detailed Frontend Project Description — Legal Drafting Learning Platform

## 1. Project Overview

The frontend of your Legal Drafting Learning Platform is an interactive learning interface designed for law students to learn, practice, and improve legal drafting skills.

The platform is designed around the idea of:

**Learn → Practice → Draft → Get AI Feedback → Improve → Redraft → Test → Unlock**

Unlike a normal e-learning website, the frontend should make legal drafting feel like a progressive skill-building application with gamification, scenarios, assessments, and a portfolio.

The frontend communicates with the backend through APIs. The backend controls important decisions such as the learner's score, assigned level, progression, and certificate eligibility, while the frontend is responsible for presenting the experience.

## 2. Main Objective of the Frontend

The frontend should allow a learner to:

- Create an account and log in.
- Select a language.
- Complete a diagnostic assessment.
- Receive a starting level automatically.
- Follow a personalized learning path.
- Learn legal-drafting fundamentals.
- Complete quizzes.
- Choose a legal drafting domain.
- Practice realistic scenarios.
- Write legal drafts.
- Receive AI-generated drafting feedback.
- Improve and resubmit drafts.
- Take level tests.
- Unlock higher levels after demonstrating knowledge.
- Complete a final assessment.
- Receive a certificate.
- Build a legal drafting portfolio.
- Earn XP, badges, and achievements.

## 3. Core Principle of the Application

There are three different things in your system:

### Level
The system determines the level.

The learner cannot manually choose:
- Basic
- Medium
- Advanced

The diagnostic assessment determines the starting level.

### Domain
The learner chooses the domain available in their current level.

For the MVP, your three domains are:
- Civil & Litigation
- Criminal Law — BNS & BNSS
- Conveyancing & Property

### Scenario
The system provides different scenarios according to:
- Selected domain
- Current level
- Difficulty
- Learning objective

So:
- **Level** = determined by knowledge
- **Domain** = chosen by learner
- **Scenario** = selected/provided within that domain

## 4. Complete Frontend User Flow

```
Landing Page
     ↓
Login / Registration
     ↓
Language Selection
     ↓
Diagnostic Assessment
     ↓
Diagnostic Result
     ↓
Personalized Learning Path
     ↓
Drafting Basics
     ↓
8 Theory Lessons
     ↓
Quiz Gate
     ↓
Current Assigned Level
     ↓
Choose Domain
     ↓
Choose Scenario
     ↓
Read Scenario
     ↓
Draft Document
     ↓
Submit Draft
     ↓
AI Feedback
     ↓
Improve / Redraft
     ↓
Final Draft Submission
     ↓
Level Test
     ↓
If Passed → Next Level
If Failed → Review / Retry
     ↓
Next Level
     ↓
Choose Domain Again
     ↓
Different, More Difficult Scenarios
     ↓
AI Feedback
     ↓
Level Test
     ↓
Advanced Level
     ↓
Complex Drafting / Legislative Drafting
     ↓
Final Assessment
     ↓
Certificate
     ↓
Portfolio
```

## 5. Landing Page

The landing page introduces the platform.

**Main elements**
- Logo
- Platform name
- Legal-themed visual
- Short description
- Get Started button
- Login button

Example:

```
Master Legal Drafting

Learn • Practice • Draft • Improve

[ Get Started ]

Already have an account?
[ Login ]
```

**Frontend behavior**
- Get Started takes the user to registration/onboarding.
- Login opens the login page.

## 6. Registration Page

The learner creates an account.

**Fields**
- Name
- Email
- Password
- Confirm Password

**Actions**
- [ Create Account ]

The frontend validates the form before sending the information to the backend.

Examples of validation:
- Required fields
- Valid email
- Matching passwords
- Minimum password requirements

## 7. Login Page

The learner enters:
- Email
- Password

Actions:
- Login
- Forgot Password
- Create Account

After successful login, the frontend takes the learner into onboarding or the dashboard.

## 8. Language Selection

The learner chooses their preferred language.

Example:

```
Choose Your Language

[ English ]
[ தமிழ் ]
[ हिन्दी ]
```

Language selection should be visually represented using selectable cards.

The selected language is highlighted.

**Important**

Language selection does not determine:
- Level
- Domain

It only controls how the learning/scenario content is presented.

For example:
- Language: Tamil
- Domain: Civil
- Level: Basic
- Drafting language: English

## 9. Diagnostic Assessment

The diagnostic determines the learner's initial level.

The learner does not choose the level.

**Diagnostic introduction**

```
Let's Check Your Skills 🎯

Answer a few questions to find
the right learning level for you.

[ Start Assessment ]
```

**Question screen**

```
Question 1 of 5

What is the main purpose of legal drafting?

[ A. To clearly communicate legal facts and arguments ]
[ B. To make documents longer ]
[ C. To avoid legal terminology ]
[ D. To replace legal procedures ]

[ Next → ]
```

The same structure is repeated for all diagnostic questions.

## 10. Diagnostic Result

After submission, the backend calculates the percentage.

Example:

```
Score: 68%

Starting Level:
MEDIUM LEVEL ⚡
```

A possible configured threshold could be:

| Score Range | Level |
|---|---|
| 0–49% | Basic |
| 50–79% | Medium |
| 80–100% | Advanced |

These are configurable and should be controlled by the backend.

**Important frontend rule**

The frontend displays the result returned by the backend.

It should not independently calculate or assign the learner's level.

## 11. Personalized Learning Path

The learner sees what they need to complete.

Example:

```
Your Learning Path 🎯

✓ Drafting Basics
✓ Quiz Gate
→ Medium Level
🔒 Advanced Level
🔒 Final Assessment
🔒 Certificate & Portfolio
```

Each stage can have states:
- Locked
- Available
- In Progress
- Completed

The backend controls these states.

## 12. Drafting Basics

The Drafting Basics section teaches the foundational concepts required for all later levels.

It is common to all learners.

**Eight lessons**
1. What is Legal Drafting?
2. Purpose of Legal Drafting
3. Principles of Good Drafting
4. Structure of a Legal Document
5. Legal Terminology
6. Facts, Issues and Relief
7. Common Drafting Mistakes
8. Basic Drafting Exercise

## 13. Lesson Screen

Each lesson should be visually simple and readable.

Example:

```
Drafting Basics 📚

Lesson 1 of 8

What is Legal Drafting? ⚖️
```

Then a large content card.

**Content card**

The card can contain:
- Explanation
- Key ideas
- Example
- Optional illustration

Example:

```
Legal drafting is the process of preparing
clear, precise and legally appropriate
documents.

Key Ideas 💡

• Clear and easy to understand
• Precise and specific
• Well-structured
• Legally appropriate
```

Bottom:

```
[ Continue → ]
```

Each lesson is a separate screen/frame in your UX.

## 14. Lesson Progress

The interface should clearly show progress.

Examples:

```
Lesson 3 of 8
```

or

```
████████░░ 80%
```

This helps learners understand where they are in the course.

## 15. Quiz Gate

After completing the theory lessons, the learner reaches the Quiz Gate.

**Quiz introduction**

```
Ready for the Drafting Basics Quiz? 🧠

10 Questions • 5 Minutes
Passing Score: 70%

[ Start Quiz → ]
```

## 16. Quiz Screen

Example:

```
Drafting Basics Quiz 🧠

Question 1 of 10

What is the main purpose of legal drafting?

[ A. To clearly communicate legal facts and arguments ]
[ B. To make legal documents longer ]
[ C. To avoid legal terminology ]
[ D. To replace legal procedures ]

[ Next → ]
```

**Answer states**

Each answer card should support:
- Normal
- Selected
- Correct
- Incorrect
- Disabled

## 17. Quiz Result

**Pass**

```
🎉 Quiz Passed!

You are ready for practical drafting.

[ Continue → ]
```

**Fail**

```
Keep Practicing

Review the lessons and try the quiz again.

[ Review Lessons ]
[ Retry Quiz ]
```

## 18. Current Level

After the Quiz Gate, the learner enters the level assigned through the diagnostic.

For example:

Diagnostic result → Basic

means:

```
Basic Level
```

The learner cannot switch to Medium manually.

## 19. Domain Selection

Inside the unlocked level, the learner chooses a domain.

For the MVP:

```
Choose Your Domain

[ ⚖️ Civil & Litigation ]
[ 🏛️ Criminal Law — BNS & BNSS ]
[ 📄 Conveyancing & Property ]
```

This is one of your important product features.

The user may choose a different domain when moving to another level.

For example:
- Basic → Civil
- Medium → Conveyancing
- Advanced → Criminal

That is allowed.

## 20. Basic Level

Basic Level is intended for guided practice.

The learner chooses:

```
Basic Level 🌱

Choose Your Domain

Civil & Litigation
Criminal Law — BNS & BNSS
Conveyancing & Property
```

## 21. Basic Civil Scenarios

Examples:
- Legal Notice
- Basic Plaint
- Affidavit
- Written Statement

The scenario should be simple and guided.

**Example**

```
Scenario: Unpaid Rent

Facts:
The tenant has failed to pay rent for six months.

Task:
Prepare an appropriate legal notice.
```

## 22. Basic Criminal Scenarios

Examples:
- Basic criminal complaint
- Simple incident-based drafting
- Basic criminal application

The scenario should introduce foundational criminal drafting.

## 23. Basic Conveyancing Scenarios

Examples:
- Simple agreement
- Basic lease document
- Basic sale agreement
- Simple deed exercise

The purpose is to teach basic document structure and clause writing.

## 24. Scenario Screen

Before drafting, the learner sees:

```
Scenario
----------------------------

Case Title

Facts
----------------------------

Task
----------------------------

Required Document

[ Start Drafting → ]
```

This keeps the scenario separate from the drafting workspace.

## 25. Drafting Workspace

This is one of the most important screens.

It contains:

**Scenario panel**

Shows:
- Facts
- Task
- Required document
- Important instructions

**Draft editor**

The learner writes their document.

**Controls**
- [ Save Draft ]
- [ Submit Draft ]

Optional features:
- Word count
- Character count
- Draft autosave
- Template/reference panel

## 26. AI Feedback — Basic Level

After submitting a draft, the AI evaluates it.

The AI should not act like an unrestricted legal chatbot.

It should evaluate the draft against:
- Scenario facts
- Approved course material
- Defined rubric
- Approved legal sources

**Example feedback**

```
AI Drafting Feedback

Overall Score: 76%

Clarity        80
Structure      75
Completeness   70
Precision      79

Strengths
✓ Clear introduction
✓ Logical document structure

Improvements
• State the legal demand more precisely.
• Add the missing section of the document.
```

Then:

```
[ Improve Draft ]
```

The learner can redraft.

## 27. The Core AI Learning Loop

This should happen in every practical level.

```
Scenario
   ↓
Draft
   ↓
AI Feedback
   ↓
Improve
   ↓
Redraft
   ↓
Final Submission
```

So AI feedback is not only a Basic-level feature.

It exists at:
- Basic
- Medium
- Advanced
- Legislative Drafting

## 28. Medium Level

When the learner successfully completes the requirements for the next level:

```
Medium Level ⚡
```

The learner chooses a domain again.

```
[ Civil ]
[ BNS / BNSS ]
[ Conveyancing ]
```

The difficulty increases.

## 29. Medium Civil

Scenarios become more complex.

Examples:
- Multi-party property dispute
- Contract dispute
- Complex legal notice
- Multiple factual issues

The learner gets less guidance.

## 30. Medium Criminal

The learner receives scenarios involving:
- Multiple facts
- More than one legal issue
- More detailed circumstances
- More independent drafting

The learner must analyze the facts before drafting.

## 31. Medium Conveyancing

Examples:
- Agreements with multiple conditions
- Payment milestones
- Representations
- Warranties
- Termination clauses
- Multiple parties

The learner must produce a more complete document.

## 32. AI Feedback — Medium

The AI evaluation becomes more analytical.

It can examine:
- Issue identification
- Reasoning
- Precision
- Completeness
- Structure
- Consistency
- Clause suitability

Example:

```
You identified the main issue correctly, but your draft does not
address the second factual issue presented in the scenario.
```

Then:

```
AI Feedback
↓
Redraft
↓
Final Submission
```

## 33. Medium Test

The learner completes the Medium assessment.

**Pass** — Advanced becomes unlocked.

**Fail** — The learner gets:
- Review
- Practice
- AI feedback
- Retry

The learner does not manually unlock Advanced.

## 34. Advanced Level

Advanced is for learners who demonstrate stronger drafting skills.

```
Advanced Level 🏆

Choose Your Domain

[ Civil ]
[ BNS / BNSS ]
[ Conveyancing ]
```

Scenarios are complex and largely independent.

## 35. Advanced Civil

Possible scenarios:
- Multi-issue civil disputes
- Multi-party matters
- Complex procedural documents
- Conflicting claims
- Detailed drafting assignments

## 36. Advanced Criminal

Possible scenarios:
- Complex criminal facts
- Multiple legal issues
- Detailed applications
- More independent legal drafting

The learner must identify relevant issues before drafting.

## 37. Advanced Conveyancing

Possible scenarios:
- Complex property transactions
- Multiple parties
- Detailed agreements
- Representations
- Warranties
- Indemnities
- Liability provisions
- Termination conditions

## 38. Advanced AI Feedback

The AI becomes more demanding.

**Evaluation areas**
- Legal structure
- Completeness
- Precision
- Clause construction
- Logical consistency
- Issue coverage
- Ambiguity
- Professional drafting quality

Example:

```
Professional Drafting Review

Structure: Strong
Precision: Moderate
Completeness: Needs Improvement

Missing:
• Termination condition
• Liability allocation
```

The learner then improves the draft.

## 39. Legislative Drafting

This can be an advanced specialist path.

```
Advanced Level

Choose Practice Area

[ Civil ]
[ Criminal ]
[ Conveyancing ]
[ Legislative Drafting ]
```

The learner can practice:
- Bills
- Rules
- Regulations
- Clauses
- Amendments
- Policy/legal provisions

The AI can evaluate:
- Definitions
- Scope
- Exceptions
- Clarity
- Consistency
- Ambiguity
- Legislative structure

## 40. Final Assessment

The final assessment should test overall drafting capability.

Possible sections:
- Section A — Theory
- Section B — Scenario Analysis
- Section C — Drafting
- Section D — Complex Drafting
- Section E — Legislative Drafting

The final assessment should contain actual drafting tasks rather than only MCQs.

## 41. Final Assessment Result

**Pass**

```
🎉 Congratulations!

You have completed the
Legal Drafting Learning Program.

[ View Certificate ]
[ Open Portfolio ]
```

**Fail**

```
Keep Practicing

You have not yet reached the
required final assessment score.

[ Review Feedback ]
[ Practice Again ]
```

## 42. Certificate

After passing the final assessment:

```
Certificate Unlocked 🏆
```

Certificate can display:
- Student name
- Program name
- Completion date
- Final score
- Certificate ID
- Verification code

## 43. Portfolio

The portfolio allows the learner to showcase their strongest drafting work.

Example:

```
My Portfolio

⚖️ Civil Legal Notice
🏛️ Criminal Draft
📄 Conveyancing Agreement
📝 Complex Draft
🏛️ Legislative Draft
🏆 Final Assessment
```

Each item can include:
- Draft
- Domain
- Level
- Score
- AI feedback
- Date
- Improvement history

## 44. Dashboard

The dashboard should give the learner an overview of their learning.

**Main dashboard sections**

```
Welcome back 👋

Current Level
Medium Level ⚡

Progress
████████░░ 80%

Continue Learning
[ Current Lesson ]

XP
1,250 XP

🔥 7 Day Streak

Recent Achievement
🏆 Civil Drafter
```

Other sections:
- Current lesson
- Current domain
- Recent drafts
- AI feedback
- Upcoming test
- Achievements

## 45. Gamification

Gamification should be present throughout the platform.

**XP**

| Action | XP |
|---|---|
| Lesson Completed | +10 XP |
| Quiz Passed | +25 XP |
| Draft Submitted | +20 XP |
| Draft Improved | +30 XP |
| Level Completed | +100 XP |

**Badges**
- 📚 First Lesson
- 🧠 Quiz Master
- ⚖️ Civil Drafter
- 🏛️ Criminal Drafter
- 📄 Conveyancing Pro
- ✍️ Drafting Specialist
- 🏆 Advanced Drafter
- 👑 Legal Drafting Master

**Streak**
- 🔥 7 Day Streak

## 46. AI Hallucination Prevention

This should be part of the frontend/backend architecture.

The AI should not receive an unrestricted question such as:

> "Is this draft legally correct?"

Instead, the backend should supply:

```
Scenario
+
Approved legal sources
+
Course material
+
Level
+
Domain
+
Evaluation rubric
+
Student draft
```

Then:

```
AI
 ↓
Structured feedback
 ↓
Validation
 ↓
Frontend
```

## 47. AI Must Be Grounded

The AI should use trusted content through a retrieval system.

```
Approved Legal Content
        ↓
     Retrieval
        ↓
   Relevant Sources
        ↓
       AI
```

The AI should not invent:
- Statutes
- Sections
- Case names
- Facts
- Deadlines
- Legal requirements

If sufficient information is not available:

```
⚠️ Insufficient information to verify this point.
```

## 48. Backend vs AI vs Frontend Responsibility

**Frontend**

Responsible for:
- Screen display
- Navigation
- Forms
- Answer selection
- Draft editor
- Progress visualization
- Feedback visualization
- Animations
- User interaction

**Backend**

Responsible for:
- Authentication
- Diagnostic scoring
- Level assignment
- Level unlocking
- Quiz scoring
- Test scoring
- Progress
- Certificate eligibility
- Portfolio data

**AI**

Responsible for:
- Draft feedback
- Strength identification
- Weakness identification
- Improvement suggestions
- Rubric-based evaluation
- Educational explanations

This separation is extremely important.

## 49. Important Level Rule

Your final system rule should be:

> The learner cannot manually select their learning level. The diagnostic assessment determines the starting level according to the learner's demonstrated knowledge. Higher levels become available only after the learner successfully completes the required learning activities and assessments. Within the currently unlocked level, the learner is free to choose any available domain.

## 50. Important Domain Rule

The learner can choose any of your MVP domains at each unlocked level:
- Civil & Litigation
- Criminal Law — BNS & BNSS
- Conveyancing & Property

For example:
- Basic → Civil
- Medium → Conveyancing
- Advanced → Criminal

This is allowed.

The learner is not locked to one domain.

## 51. Difficulty Progression

The same domain should not simply repeat the same kind of scenario at every level.

**Basic** — Guided
- Simple facts
- Clear instructions
- Basic document structure
- Hints

**Medium** — Semi-guided
- Multiple facts
- Multiple issues
- Less guidance
- More independent reasoning

**Advanced** — Independent
- Complex facts
- Multiple issues
- Minimal guidance
- Professional-level drafting

Thus:

**Same domain → different scenario → increasing difficulty**

## 52. Recommended Frontend Folder Structure

```
src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── animations/
│
├── components/
│   ├── common/
│   ├── buttons/
│   ├── cards/
│   ├── quiz/
│   ├── lessons/
│   ├── scenarios/
│   ├── drafting/
│   └── feedback/
│
├── pages/
│   ├── landing/
│   ├── auth/
│   ├── onboarding/
│   ├── diagnostic/
│   ├── dashboard/
│   ├── learning/
│   ├── quiz/
│   ├── basic/
│   ├── medium/
│   ├── advanced/
│   ├── assessment/
│   ├── certificate/
│   └── portfolio/
│
├── services/
│   ├── api.ts
│   ├── authApi.ts
│   ├── diagnosticApi.ts
│   ├── lessonApi.ts
│   ├── quizApi.ts
│   ├── scenarioApi.ts
│   ├── draftingApi.ts
│   ├── assessmentApi.ts
│   └── portfolioApi.ts
│
├── hooks/
├── context/
├── store/
├── types/
├── utils/
└── App.tsx
```

## 53. Reusable Frontend Components

Create reusable components rather than designing every screen independently.

**Buttons**
- Primary Button
- Secondary Button
- Continue Button
- Submit Button
- Retry Button

**Cards**
- Learning Path Card
- Domain Card
- Scenario Card
- Quiz Answer Card
- Lesson Card
- Feedback Card
- Certificate Card
- Portfolio Card

**Progress**
- Progress Bar
- Level Indicator
- Lesson Progress
- Quiz Progress

**AI**
- AI Feedback Card
- Score Card
- Strength Card
- Improvement Card
- Missing Element Card

## 54. UI Design Direction

Your final UI should combine:

**Professional legal design + friendly learning design**

That means:
- Clean layout
- Consistent typography
- Rounded cards
- Clear buttons
- Soft but professional colors
- Small animations
- Progress indicators
- Friendly icons
- Good spacing
- Easy-to-read content

The goal is to feel more engaging than a traditional legal-learning website while still looking credible.

## 55. Final Architecture in One View

```
                    USER
                     │
                     ▼
              FRONTEND / UI
                     │
          ┌──────────┼───────────┐
          │          │           │
          ▼          ▼           ▼
       Lessons     Quiz       Drafting
          │          │           │
          └──────────┼───────────┘
                     ▼
                 REST API
                     │
                     ▼
                  BACKEND
             ┌───────┼────────┐
             │       │        │
             ▼       ▼        ▼
          Database  AI/RAG  Storage
                     │
                     ▼
              AI Feedback
                     │
                     ▼
                 Frontend
```

## 56. Final Core Concept

Your frontend is ultimately built around this loop:

```
LEARN
  ↓
UNDERSTAND
  ↓
CHOOSE DOMAIN
  ↓
PRACTICE SCENARIO
  ↓
DRAFT
  ↓
AI FEEDBACK
  ↓
IMPROVE
  ↓
REDRAFT
  ↓
TEST
  ↓
PROVE KNOWLEDGE
  ↓
UNLOCK NEXT LEVEL
```

And the key product rules are:

1. Diagnostic determines the starting level.
2. Learners cannot manually select a higher level.
3. Learners can choose any available domain inside their unlocked level.
4. Civil, Criminal/BNS-BNSS, and Conveyancing have different scenarios at Basic, Medium, and Advanced.
5. AI provides drafting feedback at every practical level.
6. The backend controls progression and eligibility.
7. The AI is grounded in approved sources and rubrics rather than being treated as a legal source of truth.
8. Successful completion ends with a certificate and a practical drafting portfolio.

This is the frontend structure you can now use as the basis for your Figma screens, React/React Native implementation, API integration, and final project presentation.

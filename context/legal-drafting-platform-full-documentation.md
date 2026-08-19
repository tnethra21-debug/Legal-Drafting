# Legal Drafting Learning Platform — Complete Project Documentation

This document consolidates the full project specification for the **LegalDraft** platform: an AI-powered legal drafting learning platform for law students. It combines three source documents into one reference:

- **Part I — Frontend** — screens, user flow, UI states, and component structure.
- **Part II — Backend Design** — API architecture, business logic, diagnostic/level/domain/scenario system, and AI-grounding rules.
- **Part III — Database Model** — relational schema, tables, and entity relationships.

> **Note on Part II vs Part III:** These two backend documents were authored separately and use two different (overlapping but not identical) data models — Part II is organized around `levels` / `domains` / `scenarios` / `draft_submissions`, while Part III is organized around a more general `courses` / `modules` / `lessons` / `draft_types` / `assignments` structure with faculty review. Both are preserved here as originally written; reconcile them into a single schema during implementation planning.

---

## Table of Contents

- [Part I — Frontend Project Description](#part-i--frontend-project-description)
- [Part II — Backend Design Document](#part-ii--backend-design-document)
- [Part III — Backend Database Model](#part-iii--backend-database-model)

---

# Part I — Frontend Project Description

## Detailed Frontend Project Description — Legal Drafting Learning Platform

### 1. Project Overview

The frontend of your Legal Drafting Learning Platform is an interactive learning interface designed for law students to learn, practice, and improve legal drafting skills.

The platform is designed around the idea of:

**Learn → Practice → Draft → Get AI Feedback → Improve → Redraft → Test → Unlock**

Unlike a normal e-learning website, the frontend should make legal drafting feel like a progressive skill-building application with gamification, scenarios, assessments, and a portfolio.

The frontend communicates with the backend through APIs. The backend controls important decisions such as the learner's score, assigned level, progression, and certificate eligibility, while the frontend is responsible for presenting the experience.

### 2. Main Objective of the Frontend

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

### 3. Core Principle of the Application

There are three different things in your system:

#### Level
The system determines the level.

The learner cannot manually choose:
- Basic
- Medium
- Advanced

The diagnostic assessment determines the starting level.

#### Domain
The learner chooses the domain available in their current level.

For the MVP, your three domains are:
- Civil & Litigation
- Criminal Law — BNS & BNSS
- Conveyancing & Property

#### Scenario
The system provides different scenarios according to:
- Selected domain
- Current level
- Difficulty
- Learning objective

So:
- **Level** = determined by knowledge
- **Domain** = chosen by learner
- **Scenario** = selected/provided within that domain

### 4. Complete Frontend User Flow

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

### 5. Landing Page

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

### 6. Registration Page

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

### 7. Login Page

The learner enters:
- Email
- Password

Actions:
- Login
- Forgot Password
- Create Account

After successful login, the frontend takes the learner into onboarding or the dashboard.

### 8. Language Selection

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

### 9. Diagnostic Assessment

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

### 10. Diagnostic Result

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

### 11. Personalized Learning Path

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

### 12. Drafting Basics

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

### 13. Lesson Screen

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

### 14. Lesson Progress

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

### 15. Quiz Gate

After completing the theory lessons, the learner reaches the Quiz Gate.

**Quiz introduction**

```
Ready for the Drafting Basics Quiz? 🧠

10 Questions • 5 Minutes
Passing Score: 70%

[ Start Quiz → ]
```

### 16. Quiz Screen

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

### 17. Quiz Result

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

### 18. Current Level

After the Quiz Gate, the learner enters the level assigned through the diagnostic.

For example:

Diagnostic result → Basic

means:

```
Basic Level
```

The learner cannot switch to Medium manually.

### 19. Domain Selection

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

### 20. Basic Level

Basic Level is intended for guided practice.

The learner chooses:

```
Basic Level 🌱

Choose Your Domain

Civil & Litigation
Criminal Law — BNS & BNSS
Conveyancing & Property
```

### 21. Basic Civil Scenarios

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

### 22. Basic Criminal Scenarios

Examples:
- Basic criminal complaint
- Simple incident-based drafting
- Basic criminal application

The scenario should introduce foundational criminal drafting.

### 23. Basic Conveyancing Scenarios

Examples:
- Simple agreement
- Basic lease document
- Basic sale agreement
- Simple deed exercise

The purpose is to teach basic document structure and clause writing.

### 24. Scenario Screen

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

### 25. Drafting Workspace

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

### 26. AI Feedback — Basic Level

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

### 27. The Core AI Learning Loop

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

### 28. Medium Level

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

### 29. Medium Civil

Scenarios become more complex.

Examples:
- Multi-party property dispute
- Contract dispute
- Complex legal notice
- Multiple factual issues

The learner gets less guidance.

### 30. Medium Criminal

The learner receives scenarios involving:
- Multiple facts
- More than one legal issue
- More detailed circumstances
- More independent drafting

The learner must analyze the facts before drafting.

### 31. Medium Conveyancing

Examples:
- Agreements with multiple conditions
- Payment milestones
- Representations
- Warranties
- Termination clauses
- Multiple parties

The learner must produce a more complete document.

### 32. AI Feedback — Medium

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

### 33. Medium Test

The learner completes the Medium assessment.

**Pass** — Advanced becomes unlocked.

**Fail** — The learner gets:
- Review
- Practice
- AI feedback
- Retry

The learner does not manually unlock Advanced.

### 34. Advanced Level

Advanced is for learners who demonstrate stronger drafting skills.

```
Advanced Level 🏆

Choose Your Domain

[ Civil ]
[ BNS / BNSS ]
[ Conveyancing ]
```

Scenarios are complex and largely independent.

### 35. Advanced Civil

Possible scenarios:
- Multi-issue civil disputes
- Multi-party matters
- Complex procedural documents
- Conflicting claims
- Detailed drafting assignments

### 36. Advanced Criminal

Possible scenarios:
- Complex criminal facts
- Multiple legal issues
- Detailed applications
- More independent legal drafting

The learner must identify relevant issues before drafting.

### 37. Advanced Conveyancing

Possible scenarios:
- Complex property transactions
- Multiple parties
- Detailed agreements
- Representations
- Warranties
- Indemnities
- Liability provisions
- Termination conditions

### 38. Advanced AI Feedback

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

### 39. Legislative Drafting

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

### 40. Final Assessment

The final assessment should test overall drafting capability.

Possible sections:
- Section A — Theory
- Section B — Scenario Analysis
- Section C — Drafting
- Section D — Complex Drafting
- Section E — Legislative Drafting

The final assessment should contain actual drafting tasks rather than only MCQs.

### 41. Final Assessment Result

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

### 42. Certificate

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

### 43. Portfolio

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

### 44. Dashboard

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

### 45. Gamification

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

### 46. AI Hallucination Prevention

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

### 47. AI Must Be Grounded

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

### 48. Backend vs AI vs Frontend Responsibility

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

### 49. Important Level Rule

Your final system rule should be:

> The learner cannot manually select their learning level. The diagnostic assessment determines the starting level according to the learner's demonstrated knowledge. Higher levels become available only after the learner successfully completes the required learning activities and assessments. Within the currently unlocked level, the learner is free to choose any available domain.

### 50. Important Domain Rule

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

### 51. Difficulty Progression

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

### 52. Recommended Frontend Folder Structure

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

### 53. Reusable Frontend Components

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

### 54. UI Design Direction

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

### 55. Final Architecture in One View

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

### 56. Final Core Concept

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
-e 
---

# Part II — Backend Design Document

## Backend Design Document

### LegalDraft -- AI-Powered Legal Drafting Learning Platform

#### 1. Introduction

The backend of the LegalDraft platform is responsible for managing
users, authentication, language preferences, diagnostic assessment,
learning levels, lessons, quizzes, legal drafting domains, scenarios,
draft submissions, AI evaluation, progress tracking, assessments,
certificates, portfolios, gamification, notifications, and
administrative functions.

The backend acts as the **source of truth for learning progression**. It
determines the learner's starting level from the diagnostic assessment,
controls access to higher levels, stores learning progress, and
coordinates AI-based drafting feedback.

The frontend communicates with the backend through REST APIs.

------------------------------------------------------------------------

## 2. Backend Objectives

The backend is designed to:

-   Manage user registration and authentication.
-   Store learner profiles and preferences.
-   Manage language selection.
-   Conduct diagnostic assessments.
-   Calculate diagnostic percentages.
-   Automatically assign the learner's starting level.
-   Prevent learners from manually selecting higher levels.
-   Control level unlocking and progression.
-   Deliver theory lessons and quizzes.
-   Allow domain selection within the learner's unlocked level.
-   Deliver different scenarios for Basic, Medium, and Advanced levels.
-   Store draft submissions and multiple attempts.
-   Provide AI feedback after every practical drafting task.
-   Reduce AI hallucination through approved sources, retrieval,
    rubrics, and validation.
-   Conduct level assessments and final assessments.
-   Generate certificates.
-   Maintain learner portfolios.
-   Track XP, badges, achievements, and streaks.
-   Provide notifications.
-   Support authorized administrative management.

------------------------------------------------------------------------

## 3. Backend Architecture

The proposed architecture is:

    Frontend

React / React Native

        ↓

REST API

FastAPI

        ↓

Authentication / Business Logic

        ↓

PostgreSQL

        ↓

AI Evaluation Service

        ↓

Approved Legal Knowledge Base / RAG

        ↓

File Storage

The backend controls the business rules while the frontend displays the
results.

#### Important separation

    Frontend

→ Displays and collects information

Backend

→ Calculates, validates, stores, and controls progression

AI

→ Provides grounded educational drafting feedback

------------------------------------------------------------------------

## 4. User Management

The User Management module handles:

-   Registration
-   Login
-   Logout
-   Password security
-   User profile
-   Role management
-   Preferred language
-   Current learning level
-   Learning progress

#### Suggested roles

    STUDENT

ADMIN

FACULTY

Faculty/admin functionality can be introduced based on project scope.

------------------------------------------------------------------------

## 5. Authentication and Authorization

The backend should use secure authentication, such as JWT-based
authentication.

#### Main operations

    POST /auth/register

POST /auth/login

POST /auth/logout

GET /users/me

PUT /users/me

Protected endpoints should require authentication.

Role-based authorization should prevent students from accessing
administrative functionality.

------------------------------------------------------------------------

## 6. Language Management

The platform supports multilingual learning/scenario presentation.

Initial languages:

-   English
-   Tamil
-   Hindi

The backend stores the learner's preferred language.

    language

-----------

id

name

code

is_active

The selected language can be used to determine how scenario and learning
content is presented.

The language does **not** determine the learner's level or domain.

Legal drafting output may still be required in English even when the
scenario is presented in another language.

------------------------------------------------------------------------

## 7. Diagnostic Assessment

The diagnostic assessment is the foundation of the adaptive learning
system.

Before entering practical drafting, the learner completes a diagnostic
assessment.

The backend:

-   Provides diagnostic questions.
-   Stores the learner's answers.
-   Calculates the score.
-   Calculates the percentage.
-   Assigns the starting level.
-   Stores the assessment attempt.
-   Returns the result to the frontend.

------------------------------------------------------------------------

## 8. Automatic Level Assignment

The learner **cannot manually choose Basic, Medium, or Advanced**.

The backend determines the starting level from the diagnostic
percentage.

Example configurable thresholds:

    0–49%   → BASIC

50--79% → MEDIUM

80--100% → ADVANCED

These values should be stored as configurable assessment rules rather
than hard-coded into the frontend.

#### Example

    Diagnostic Score = 68%

        ↓

Starting Level = MEDIUM

The frontend only displays the level returned by the backend.

------------------------------------------------------------------------

## 9. Level Progression Control

Diagnostic assignment determines the **starting level**.

Progression to higher levels is controlled separately.

For example:

    Diagnostic

    ↓

Basic

    ↓

Basic Practice

    ↓

Basic Test

    ↓

Pass

    ↓

Medium Unlocked

The learner cannot directly request:

    Unlock Advanced

The backend must verify eligibility.

#### Progression rules

    Starting level

        ↓

Required learning completed

        ↓

Required drafting practice completed

        ↓

Level assessment passed

        ↓

Next level unlocked

If the assessment is failed:

    Review

↓

Practice

↓

Retry

------------------------------------------------------------------------

## 10. Learning Level Model

The system contains:

    BASIC

MEDIUM

ADVANCED

The difficulty increases at each level.

#### Basic

-   Simple facts
-   Clear instructions
-   Guided drafting
-   Basic document structures

#### Medium

-   More facts
-   Multiple issues
-   Less guidance
-   Greater reasoning

#### Advanced

-   Complex facts
-   Multiple issues
-   Minimal guidance
-   Independent drafting
-   Higher drafting quality expectations

------------------------------------------------------------------------

## 11. Domain Management

The learner cannot manually select the level, but can choose a domain
within the level they currently have access to.

#### MVP domains

    CIVIL_LITIGATION

CRIMINAL_BNS_BNSS

CONVEYANCING_PROPERTY

The same domains are available across Basic, Medium, and Advanced,
subject to content availability.

#### Important rule

The learner can change domains between levels.

Example:

    Basic → Civil

Medium → Conveyancing

Advanced → Criminal

The domain choice does not alter the learner's level.

------------------------------------------------------------------------

## 12. Scenario Management

Scenario management is one of the core backend modules.

Each scenario should be associated with:

-   Domain
-   Level
-   Document type
-   Difficulty
-   Language
-   Scenario facts
-   Task
-   Required elements
-   Approved legal references
-   Evaluation rubric

Suggested structure:

    scenarios

--------------------------------

id

domain_id

level_id

title

description

facts

task

document_type

difficulty

language_id

rubric_id

is_active

created_at

updated_at

------------------------------------------------------------------------

## 13. Different Scenarios at Every Level

The same domain must provide **different scenarios at different
difficulty levels**.

#### Civil

Basic:

    Simple Legal Notice

Basic Plaint

Affidavit

Written Statement

Medium:

    Multi-party dispute

Contract dispute

Property dispute

Complex legal notice

Advanced:

    Multi-issue dispute

Complex procedural document

Multi-party litigation scenario

#### Criminal --- BNS & BNSS

Basic:

    Basic criminal complaint

Simple criminal application

Incident-based draft

Medium:

    Detailed factual scenario

Multiple legal issues

More complex application

Advanced:

    Complex criminal facts

Multiple issues

Detailed criminal drafting

#### Conveyancing & Property

Basic:

    Simple agreement

Basic lease

Basic sale agreement

Simple deed exercise

Medium:

    Conditional agreement

Multiple parties

Representations and warranties

Payment / termination clauses

Advanced:

    Complex transaction

Multiple parties

Detailed agreement

Indemnities

Liabilities

Complex termination conditions

------------------------------------------------------------------------

## 14. Scenario Selection

After entering an unlocked level, the frontend requests the available
domains.

After the learner selects a domain, the backend returns the scenarios
available for that:

    Level + Domain

Example:

    GET /levels/basic/domains

GET /domains/civil/scenarios?level=basic

The backend must ensure that learners only receive scenarios appropriate
to their unlocked level.

------------------------------------------------------------------------

## 15. Course and Lesson Management

The backend manages:

-   Courses
-   Modules
-   Lessons
-   Lesson content
-   Level association
-   Lesson order
-   Active/inactive status

This allows administrators to update learning content without modifying
the frontend.

------------------------------------------------------------------------

## 16. Drafting Basics Module

Drafting Basics is the foundational theory module.

Suggested lessons:

1.  What is Legal Drafting?
2.  Purpose of Legal Drafting
3.  Principles of Good Drafting
4.  Structure of a Legal Document
5.  Legal Terminology
6.  Facts, Issues and Relief
7.  Common Drafting Mistakes
8.  Basic Drafting Exercise

The backend delivers lesson content to the frontend.

------------------------------------------------------------------------

## 17. Lesson Progress

The backend tracks:

-   Current lesson
-   Completed lessons
-   Locked lessons
-   Progress percentage
-   Completion timestamp

Example:

    lesson_progress

-------------------------

user_id

lesson_id

status

progress_percentage

completed_at

Possible statuses:

    LOCKED

AVAILABLE

IN_PROGRESS

COMPLETED

------------------------------------------------------------------------

## 18. Quiz Gate

After Drafting Basics, the learner must complete the Quiz Gate.

The backend:

-   Provides quiz questions.
-   Stores answers.
-   Calculates the score.
-   Determines pass/fail.
-   Prevents bypassing the quiz.
-   Unlocks the next eligible stage.

Example:

    10 questions

Passing score = 70%

------------------------------------------------------------------------

## 19. Quiz Management

The Quiz module manages:

-   Quiz metadata
-   Questions
-   Options
-   Correct answers
-   Explanations
-   Attempts
-   Scores
-   Pass/fail status

Suggested data:

    quizzes

quiz_questions

quiz_attempts

quiz_answers

------------------------------------------------------------------------

## 20. Draft Submission Management

Students can submit drafts for scenarios.

The backend stores:

-   Student
-   Scenario
-   Draft content
-   Attempt number
-   Submission time
-   Status
-   Version

Example:

    draft_submissions

-------------------------

id

user_id

scenario_id

attempt_number

draft_text

status

submitted_at

Multiple attempts should be supported.

    Attempt 1

Attempt 2

Attempt 3

This is required for the **draft → feedback → improve →
redraft** learning loop.

------------------------------------------------------------------------

## 21. AI Evaluation

AI feedback is provided after drafting activities at:

    Basic

Medium

Advanced

Legislative Drafting

The AI evaluates the learner's draft against the appropriate level and
domain rubric.

#### Basic

-   Clarity
-   Structure
-   Completeness
-   Basic terminology
-   Required elements

#### Medium

-   Issue identification
-   Reasoning
-   Precision
-   Completeness
-   Consistency
-   Clause suitability

#### Advanced

-   Complex issue coverage
-   Structure
-   Clause construction
-   Logical consistency
-   Ambiguity
-   Professional drafting quality

------------------------------------------------------------------------

## 22. AI Feedback Output

The backend should return structured feedback rather than unstructured
text only.

Example:

    {

"overall_score": 76,

"criteria": {

    "clarity": 80,

    "structure": 75,

    "completeness": 70,

    "precision": 79

},

"strengths": \[

    "Clear introduction",

    "Good structure"

\],

"improvements": \[

    "Clarify the legal demand",

    "Add the missing document element"

\],

"missing_elements": \[\],

"references": \[\],

"uncertainties": \[\]

}

The frontend then displays this information.

------------------------------------------------------------------------

## 23. AI Hallucination Protection

Because the platform deals with legal drafting, the AI should not be
treated as an unrestricted legal source.

The backend should implement grounded AI evaluation.

#### AI input

    Scenario facts

\+

Approved course content

\+

Approved legal sources

\+

Domain

\+

Level

\+

Drafting rubric

\+

Student draft

Then:

    Retrieved Context

        ↓

AI Evaluation

        ↓

Structured Output

        ↓

Validation

        ↓

Frontend

------------------------------------------------------------------------

## 24. Approved Legal Knowledge Base

Create a controlled knowledge base containing approved legal/course
material.

Possible metadata:

    legal_sources

-------------------------

id

title

domain

section

jurisdiction

effective_date

version

source_text

source_url

is_active

The AI should retrieve relevant content from this knowledge base rather
than relying only on model memory.

------------------------------------------------------------------------

## 25. RAG / Retrieval

For each draft evaluation:

    Student Draft

     ↓

Identify Domain + Level + Scenario

     ↓

Retrieve relevant approved sources

     ↓

Provide context to AI

     ↓

Generate feedback

This reduces unsupported legal claims.

------------------------------------------------------------------------

## 26. AI Restrictions

The AI evaluation service must be instructed not to:

-   Invent statutes.
-   Invent legal sections.
-   Invent case names.
-   Invent facts.
-   Invent deadlines.
-   Treat missing information as established fact.
-   Make unsupported legal claims.
-   Determine the learner's progression level.

If the available material is insufficient:

    Insufficient information to verify this point.

------------------------------------------------------------------------

## 27. AI Validation Layer

AI output should be validated before it reaches the student.

Validation can check:

-   Required output fields.
-   Valid score ranges.
-   Valid source IDs.
-   Scenario consistency.
-   Unsupported references.
-   Missing required fields.
-   Confidence/uncertainty information.

If the response fails validation:

    AI Output

↓

Validation Failed

↓

Regenerate / Flag Review

------------------------------------------------------------------------

## 28. AI Evaluation Audit Trail

Store the AI evaluation context for traceability.

Suggested fields:

    ai_evaluations

-------------------------

id

submission_id

model

prompt_version

knowledge_version

retrieved_sources

response

validated

confidence

created_at

This lets administrators review how a feedback result was generated.

------------------------------------------------------------------------

## 29. AI Feedback History

Every draft attempt should retain its feedback.

Example:

    Attempt 1

↓

AI Feedback

↓

Attempt 2

↓

AI Feedback

↓

Final Submission

This creates an improvement history that can also be displayed in the
learner's portfolio.

------------------------------------------------------------------------

## 30. Level Assessment

Each learning level has an assessment.

The backend:

-   Provides questions/tasks.
-   Stores responses.
-   Calculates scores.
-   Determines pass/fail.
-   Unlocks the next level if eligible.

Example:

    Basic Test

↓

PASS

↓

Medium Unlocked

------------------------------------------------------------------------

## 31. Final Assessment

The final assessment evaluates complete drafting capability.

Suggested sections:

-   Theory
-   Scenario analysis
-   Legal drafting
-   Complex drafting
-   Legislative drafting

Successful completion allows certificate generation.

------------------------------------------------------------------------

## 32. Certificate Management

After the learner successfully completes the final assessment, the
backend:

-   Generates certificate details.
-   Stores certificate information.
-   Generates a verification code.
-   Supports certificate retrieval/download.
-   Supports certificate verification.

Example:

    certificates

-------------------------

id

user_id

certificate_number

completion_date

score

verification_code

certificate_url

------------------------------------------------------------------------

## 33. Portfolio Management

The backend automatically maintains the learner's portfolio.

Portfolio items can contain:

-   Draft
-   Domain
-   Level
-   Score
-   AI feedback
-   Date
-   Improvement history
-   Certificate

Suggested structure:

    portfolio_items

-------------------------

id

user_id

submission_id

title

domain

level

score

is_featured

created_at

------------------------------------------------------------------------

## 34. Gamification

The backend tracks:

-   XP
-   Badges
-   Achievements
-   Streaks
-   Completed challenges

Example:

    Lesson completed       +10 XP

Quiz passed +25 XP

Draft submitted +20 XP

Draft improved +30 XP

Level completed +100 XP

Possible achievements:

    First Lesson

Quiz Master

Civil Drafter

Criminal Drafter

Conveyancing Pro

Drafting Specialist

Advanced Drafter

Legal Drafting Master

------------------------------------------------------------------------

## 35. Notifications

The backend can generate notifications for:

-   New lessons
-   Level unlocks
-   Assessment results
-   AI feedback availability
-   Certificate availability
-   Portfolio milestones
-   Achievements

------------------------------------------------------------------------

## 36. Admin / Faculty Module

Authorized administrators/faculty can:

-   Create lessons.
-   Edit lessons.
-   Create quizzes.
-   Create scenarios.
-   Assign scenario difficulty.
-   Maintain domain content.
-   Update approved legal sources.
-   Manage users.
-   View analytics.
-   Review flagged AI feedback.
-   Manage certificates.

This module should be role-protected.

------------------------------------------------------------------------

## 37. Database Structure

The backend database should include at least:

    users

roles

languages

levels

domains

courses

lessons

lesson_progress

diagnostic_assessments

diagnostic_questions

diagnostic_attempts

diagnostic_answers

quizzes

quiz_questions

quiz_attempts

quiz_answers

scenarios

scenario_sources

drafting_rubrics

draft_submissions

draft_versions

ai_evaluations

level_assessments

assessment_questions

assessment_attempts

assessment_answers

certificates

portfolio_items

gamification

badges

user_badges

streaks

notifications

legal_sources

prompt_versions

knowledge_versions

------------------------------------------------------------------------

## 38. Important Relationships

    USER

│

├── Diagnostic Attempt

│ └── Diagnostic Answers

│

├── Lesson Progress

│

├── Quiz Attempts

│ └── Quiz Answers

│

├── Draft Submissions

│ └── Draft Versions

│ └── AI Evaluations

│

├── Level Assessments

│

├── Certificate

│

├── Portfolio

│

└── Gamification

And:

    LEVEL

↓

DOMAIN

↓

SCENARIO

↓

DRAFT SUBMISSION

↓

AI EVALUATION

------------------------------------------------------------------------

## 39. API Modules

The MVP API should include:

#### Authentication

    POST /auth/register

POST /auth/login

POST /auth/logout

GET /users/me

PUT /users/me

#### Language

    GET /languages

PUT /users/me/language

#### Diagnostic

    GET  /diagnostic/questions

POST /diagnostic/submit

GET /diagnostic/result

#### Learning Path

    GET /learning-path

GET /progress

#### Lessons

    GET  /lessons

GET /lessons/{id}

POST /lessons/{id}/complete

#### Quiz

    GET  /quiz/{id}/questions

POST /quiz/{id}/submit

GET /quiz/{id}/result

#### Domains

    GET /levels/{level}/domains

#### Scenarios

    GET /domains/{domain}/scenarios?level={level}

GET /scenarios/{id}

#### Drafting

    POST /scenarios/{id}/drafts

PUT /drafts/{id}

POST /drafts/{id}/submit

GET /drafts/{id}

#### AI Feedback

    POST /drafts/{id}/evaluate

GET /drafts/{id}/feedback

#### Level Assessment

    GET  /levels/{level}/assessment

POST /levels/{level}/assessment/submit

GET /levels/{level}/assessment/result

#### Final Assessment

    GET  /final-assessment

POST /final-assessment/submit

GET /final-assessment/result

#### Certificate

    GET /certificates

GET /certificates/{id}

GET /certificates/{id}/download

GET /certificates/verify/{code}

#### Portfolio

    GET /portfolio

POST /portfolio/items

PUT /portfolio/items/{id}

DELETE /portfolio/items/{id}

------------------------------------------------------------------------

## 40. Backend Technology Stack

The original backend specification proposes:

-   **Framework:** FastAPI
-   **Language:** Python
-   **Database:** PostgreSQL
-   **ORM:** SQLAlchemy
-   **Authentication:** JWT
-   **Validation:** Pydantic
-   **AI:** LLM API / Ollama
-   **API:** REST
-   **Documentation:** Swagger/OpenAPI

For your updated design, the AI layer should additionally include a
retrieval/knowledge-base mechanism and validation layer.

------------------------------------------------------------------------

## 41. Final Backend Learning Logic

The core backend logic is:

    Diagnostic

    ↓

Calculate Percentage

    ↓

Assign Starting Level

    ↓

Drafting Basics

    ↓

Quiz Gate

    ↓

Current Level

    ↓

Domain Selection

    ↓

Scenario Selection

    ↓

Draft Submission

    ↓

AI Evaluation

    ↓

Validation

    ↓

Feedback

    ↓

Redraft

    ↓

Level Assessment

    ↓

Pass?

┌──┴──┐

YES NO

↓ ↓

Unlock Review/

Next Retry

Level

------------------------------------------------------------------------

## 42. Final Backend Rules

The final backend must enforce these rules:

1.  **The diagnostic determines the learner's starting level.**
2.  **Learners cannot manually select a higher level.**
3.  **Higher levels are unlocked only through successful progression.**
4.  **Learners can choose any available domain within their unlocked
    level.**
5.  **The MVP domains are Civil & Litigation, Criminal Law --- BNS &
    BNSS, and Conveyancing & Property.**
6.  **Each domain contains different scenarios for Basic, Medium, and
    Advanced levels.**
7.  **Scenario difficulty increases with the level.**
8.  **AI feedback is generated after every practical drafting task.**
9.  **AI feedback must be grounded in approved sources, scenario facts,
    and rubrics.**
10. **AI output must pass validation before being presented as
    feedback.**
11. **The AI does not determine level progression or certificate
    eligibility.**
12. **The backend remains the source of truth for scores, progression,
    unlocking, and certificates.**
13. **Successful completion of the final assessment unlocks the
    certificate.**
14. **Completed drafting work can be stored in the learner's
    portfolio.**
15. **Gamification data is maintained by the backend.**

### 43. Final Backend Concept

                    LEARNER

                   ↓

             DIAGNOSTIC

                   ↓

          AUTOMATIC LEVEL

                   ↓

             LEARNING PATH

                   ↓

              DOMAIN

                   ↓

              SCENARIO

                   ↓

                DRAFT

                   ↓

            AI EVALUATION

                   ↓

             VALIDATION

                   ↓

             AI FEEDBACK

                   ↓

               REDRAFT

                   ↓

              ASSESSMENT

                   ↓

            LEVEL UNLOCK

                   ↓

          FINAL ASSESSMENT

                   ↓

              CERTIFICATE

                   ↓

               PORTFOLIO

...
-e 
---

# Part III — Backend Database Model

## Backend Database Model — Legal Drafting Learning Platform

### 1. Overview

The backend database model is designed for a **Legal Drafting Learning Platform** that enables students to learn legal drafting, practice drafting tasks, submit drafts, receive AI-based feedback, track their progress, and receive faculty evaluations.

The database supports:

- User registration and authentication
- Student, faculty, and administrator management
- Institutions
- Courses, modules, and lessons
- Legal drafting templates
- Drafting assignments
- Draft submissions and version control
- AI-based draft evaluation
- Faculty/manual review
- Quizzes and assessments
- Student progress tracking
- Multilingual content
- Notifications
- Certificates

---

## 2. Database Architecture

The database is divided into the following major modules:

1. Authentication & Users
2. Institution Management
3. Course & Learning Management
4. Legal Topics
5. Drafting Templates
6. Assignments
7. Draft Submissions
8. AI Feedback
9. Assessments
10. Student Progress
11. Multilingual Support
12. Notifications
13. Faculty & Administration
14. Certificates

---

## 3. Authentication & User Management

### 3.1 `users`

Stores information about all users of the platform.

| Column | Data Type | Key | Description |
|---|---|---|---|
| user_id | UUID | PK | Unique user ID |
| name | VARCHAR(100) | | Full name |
| email | VARCHAR(150) | UNIQUE | Email address |
| phone | VARCHAR(15) | UNIQUE | Phone number |
| password_hash | VARCHAR(255) | | Encrypted password |
| profile_image | VARCHAR(255) | | Profile image URL |
| language_id | UUID | FK | Preferred language |
| institution_id | UUID | FK | Associated institution |
| is_verified | BOOLEAN | | Verification status |
| status | ENUM | | Active/Inactive/Blocked |
| created_at | TIMESTAMP | | Account creation time |
| updated_at | TIMESTAMP | | Last update time |

### 3.2 `roles`

Defines available user roles.

| Column | Data Type | Key |
|---|---|---|
| role_id | UUID | PK |
| role_name | VARCHAR(50) | UNIQUE |
| description | TEXT | |

Example roles:

- Student
- Faculty
- Admin
- Institution Admin

### 3.3 `user_roles`

Connects users with their roles.

| Column | Data Type | Key |
|---|---|---|
| user_id | UUID | PK, FK |
| role_id | UUID | PK, FK |

### 3.4 `otp_verifications`

Stores OTP verification information.

| Column | Data Type | Key |
|---|---|---|
| otp_id | UUID | PK |
| user_id | UUID | FK |
| otp_code | VARCHAR(10) | |
| purpose | VARCHAR(30) | |
| expires_at | TIMESTAMP | |
| verified_at | TIMESTAMP | |
| created_at | TIMESTAMP | |

### 3.5 `user_sessions`

Stores active login sessions.

| Column | Data Type | Key |
|---|---|---|
| session_id | UUID | PK |
| user_id | UUID | FK |
| token_hash | VARCHAR(255) | |
| device_info | TEXT | |
| expires_at | TIMESTAMP | |
| created_at | TIMESTAMP | |

---

## 4. Institution Management

### 4.1 `institutions`

Stores colleges, universities, and other institutions.

| Column | Data Type | Key |
|---|---|---|
| institution_id | UUID | PK |
| institution_name | VARCHAR(200) | |
| institution_code | VARCHAR(50) | UNIQUE |
| email | VARCHAR(150) | |
| phone | VARCHAR(20) | |
| address | TEXT | |
| city | VARCHAR(100) | |
| state | VARCHAR(100) | |
| country | VARCHAR(100) | |
| status | ENUM | |
| created_at | TIMESTAMP | |

#### Relationship

```text
INSTITUTION 1 ─────────── M USERS
```

One institution can have multiple users.

---

## 5. Course & Learning Management

### 5.1 `courses`

| Column | Data Type | Key |
|---|---|---|
| course_id | UUID | PK |
| title | VARCHAR(200) | |
| description | TEXT | |
| difficulty_level | ENUM | |
| created_by | UUID | FK → users |
| status | ENUM | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### 5.2 `modules`

| Column | Data Type | Key |
|---|---|---|
| module_id | UUID | PK |
| course_id | UUID | FK |
| title | VARCHAR(200) | |
| description | TEXT | |
| module_order | INT | |
| created_at | TIMESTAMP | |

### 5.3 `lessons`

| Column | Data Type | Key |
|---|---|---|
| lesson_id | UUID | PK |
| module_id | UUID | FK |
| title | VARCHAR(200) | |
| content | TEXT | |
| video_url | VARCHAR(500) | |
| document_url | VARCHAR(500) | |
| lesson_order | INT | |
| created_at | TIMESTAMP | |

#### Relationships

```text
COURSE 1 ───────── M MODULES

MODULE 1 ───────── M LESSONS
```

---

## 6. Legal Topics

### 6.1 `legal_topics`

| Column | Data Type | Key |
|---|---|---|
| topic_id | UUID | PK |
| topic_name | VARCHAR(150) | |
| description | TEXT | |

Examples:

- Contract Law
- Criminal Law
- Civil Law
- Constitutional Law
- Family Law
- Property Law
- Corporate Law

### 6.2 `lesson_topics`

Many-to-many relationship between lessons and legal topics.

| Column | Data Type | Key |
|---|---|---|
| lesson_id | UUID | PK, FK |
| topic_id | UUID | PK, FK |

---

## 7. Legal Drafting Templates

### 7.1 `draft_types`

| Column | Data Type | Key |
|---|---|---|
| draft_type_id | UUID | PK |
| name | VARCHAR(150) | |
| description | TEXT | |
| category | VARCHAR(100) | |
| difficulty_level | ENUM | |

Examples:

- Legal Notice
- Affidavit
- Plaint
- Written Statement
- Petition
- Agreement
- Contract
- Bail Application
- Legal Complaint
- Memorandum

### 7.2 `draft_templates`

| Column | Data Type | Key |
|---|---|---|
| template_id | UUID | PK |
| draft_type_id | UUID | FK |
| title | VARCHAR(200) | |
| template_content | TEXT | |
| instructions | TEXT | |
| version | INT | |
| created_by | UUID | FK |
| created_at | TIMESTAMP | |

#### Relationship

```text
DRAFT_TYPE 1 ───────── M DRAFT_TEMPLATES
```

---

## 8. Assignments

### 8.1 `assignments`

| Column | Data Type | Key |
|---|---|---|
| assignment_id | UUID | PK |
| lesson_id | UUID | FK |
| draft_type_id | UUID | FK |
| title | VARCHAR(200) | |
| instructions | TEXT | |
| scenario | TEXT | |
| deadline | TIMESTAMP | |
| max_score | DECIMAL(5,2) | |
| created_at | TIMESTAMP | |

---

## 9. Draft Submissions

### 9.1 `draft_submissions`

Stores student draft submissions.

| Column | Data Type | Key |
|---|---|---|
| submission_id | UUID | PK |
| assignment_id | UUID | FK |
| student_id | UUID | FK → users |
| draft_content | TEXT | |
| file_url | VARCHAR(500) | |
| version_number | INT | |
| submitted_at | TIMESTAMP | |
| status | ENUM | |

Possible statuses:

- Draft
- Submitted
- Under Review
- Reviewed
- Final

### 9.2 `draft_versions`

Stores previous versions of a draft.

| Column | Data Type | Key |
|---|---|---|
| version_id | UUID | PK |
| submission_id | UUID | FK |
| version_number | INT | |
| content | TEXT | |
| created_at | TIMESTAMP | |

#### Draft workflow

```text
STUDENT
   ↓
ASSIGNMENT
   ↓
DRAFT v1
   ↓
AI FEEDBACK
   ↓
CORRECTION
   ↓
DRAFT v2
   ↓
FACULTY REVIEW
   ↓
FINAL DRAFT
```

---

## 10. AI Feedback System

### 10.1 `ai_feedback`

| Column | Data Type | Key |
|---|---|---|
| feedback_id | UUID | PK |
| submission_id | UUID | FK |
| overall_score | DECIMAL(5,2) | |
| legal_accuracy_score | DECIMAL(5,2) | |
| grammar_score | DECIMAL(5,2) | |
| structure_score | DECIMAL(5,2) | |
| formatting_score | DECIMAL(5,2) | |
| clarity_score | DECIMAL(5,2) | |
| feedback_summary | TEXT | |
| generated_at | TIMESTAMP | |

### 10.2 `feedback_items`

| Column | Data Type | Key |
|---|---|---|
| feedback_item_id | UUID | PK |
| feedback_id | UUID | FK |
| category | VARCHAR(100) | |
| original_text | TEXT | |
| suggested_text | TEXT | |
| explanation | TEXT | |
| severity | ENUM | |
| position_start | INT | |
| position_end | INT | |

#### AI feedback workflow

```text
DRAFT SUBMISSION
       ↓
   AI ANALYSIS
       ↓
┌─────────────────────┐
│ Legal Accuracy      │
│ Grammar             │
│ Structure           │
│ Formatting          │
│ Clarity             │
└──────────┬──────────┘
           ↓
    DETAILED FEEDBACK
           ↓
     STUDENT REVISION
```

---

## 11. Course Enrollment & Progress

### 11.1 `enrollments`

| Column | Data Type | Key |
|---|---|---|
| enrollment_id | UUID | PK |
| student_id | UUID | FK |
| course_id | UUID | FK |
| enrolled_at | TIMESTAMP | |
| completion_date | TIMESTAMP | |
| status | ENUM | |

### 11.2 `lesson_progress`

| Column | Data Type | Key |
|---|---|---|
| progress_id | UUID | PK |
| student_id | UUID | FK |
| lesson_id | UUID | FK |
| completion_percentage | DECIMAL(5,2) | |
| completed | BOOLEAN | |
| completed_at | TIMESTAMP | |

### 11.3 `student_progress`

| Column | Data Type | Key |
|---|---|---|
| progress_id | UUID | PK |
| student_id | UUID | FK |
| course_id | UUID | FK |
| overall_percentage | DECIMAL(5,2) | |
| average_score | DECIMAL(5,2) | |
| drafts_completed | INT | |
| last_activity | TIMESTAMP | |
| updated_at | TIMESTAMP | |

---

## 12. Quiz & Assessment System

### 12.1 `quizzes`

| Column | Data Type | Key |
|---|---|---|
| quiz_id | UUID | PK |
| lesson_id | UUID | FK |
| title | VARCHAR(200) | |
| total_marks | INT | |

### 12.2 `questions`

| Column | Data Type | Key |
|---|---|---|
| question_id | UUID | PK |
| quiz_id | UUID | FK |
| question_text | TEXT | |
| question_type | ENUM | |
| marks | INT | |

### 12.3 `options`

| Column | Data Type | Key |
|---|---|---|
| option_id | UUID | PK |
| question_id | UUID | FK |
| option_text | TEXT | |
| is_correct | BOOLEAN | |

### 12.4 `quiz_attempts`

| Column | Data Type | Key |
|---|---|---|
| attempt_id | UUID | PK |
| quiz_id | UUID | FK |
| student_id | UUID | FK |
| score | DECIMAL(5,2) | |
| started_at | TIMESTAMP | |
| completed_at | TIMESTAMP | |

### 12.5 `answers`

| Column | Data Type | Key |
|---|---|---|
| answer_id | UUID | PK |
| attempt_id | UUID | FK |
| question_id | UUID | FK |
| selected_option_id | UUID | FK |
| is_correct | BOOLEAN | |

---

## 13. Multilingual Support

### 13.1 `languages`

| Column | Data Type | Key |
|---|---|---|
| language_id | UUID | PK |
| language_code | VARCHAR(10) | UNIQUE |
| language_name | VARCHAR(50) | |

Supported languages can include:

- English
- Tamil
- Hindi
- Malayalam
- Telugu
- Kannada

### 13.2 `translations`

| Column | Data Type | Key |
|---|---|---|
| translation_id | UUID | PK |
| language_id | UUID | FK |
| content_type | VARCHAR(50) | |
| content_id | UUID | |
| translated_content | TEXT | |

---

## 14. Notifications

### 14.1 `notifications`

| Column | Data Type | Key |
|---|---|---|
| notification_id | UUID | PK |
| user_id | UUID | FK |
| title | VARCHAR(200) | |
| message | TEXT | |
| notification_type | VARCHAR(50) | |
| is_read | BOOLEAN | |
| created_at | TIMESTAMP | |

Examples:

- New assignment
- Assignment deadline
- AI feedback available
- Faculty review completed
- Course completed
- Certificate issued

---

## 15. Faculty Review

### 15.1 `faculty_assignments`

| Column | Data Type | Key |
|---|---|---|
| faculty_id | UUID | PK, FK |
| assignment_id | UUID | PK, FK |

### 15.2 `manual_reviews`

| Column | Data Type | Key |
|---|---|---|
| review_id | UUID | PK |
| submission_id | UUID | FK |
| reviewer_id | UUID | FK → users |
| score | DECIMAL(5,2) | |
| comments | TEXT | |
| reviewed_at | TIMESTAMP | |

This allows the platform to provide both:

```text
AI REVIEW
    +
FACULTY REVIEW
```

---

## 16. Certificates

### 16.1 `certificates`

| Column | Data Type | Key |
|---|---|---|
| certificate_id | UUID | PK |
| student_id | UUID | FK |
| course_id | UUID | FK |
| certificate_number | VARCHAR(100) | UNIQUE |
| issued_date | DATE | |
| certificate_url | VARCHAR(500) | |

---

## 17. Main Entity Relationships

```text
INSTITUTIONS
     │
     └──────────────< USERS
                         │
              ┌──────────┼──────────┐
              │          │          │
              ↓          ↓          ↓
         ENROLLMENTS  ROLES   NOTIFICATIONS
              │
              ↓
           COURSES
              │
              ↓
           MODULES
              │
              ↓
           LESSONS
          /       \
         ↓         ↓
  LEGAL_TOPICS   QUIZZES
                   │
                   ↓
               QUESTIONS
                   │
                   ↓
                OPTIONS


DRAFT_TYPES
     │
     ├──────────────< DRAFT_TEMPLATES
     │
     └──────────────< ASSIGNMENTS
                         │
                         ↓
                  DRAFT_SUBMISSIONS
                         │
                         ↓
                    DRAFT_VERSIONS
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
         AI_FEEDBACK          MANUAL_REVIEWS
              │
              ↓
       FEEDBACK_ITEMS


USERS
  │
  ├────────< ENROLLMENTS
  ├────────< DRAFT_SUBMISSIONS
  ├────────< QUIZ_ATTEMPTS
  ├────────< LESSON_PROGRESS
  ├────────< STUDENT_PROGRESS
  ├────────< CERTIFICATES
  └────────< MANUAL_REVIEWS
```

---

## 18. Complete Database Table List

| No. | Table |
|---:|---|
| 1 | `users` |
| 2 | `roles` |
| 3 | `user_roles` |
| 4 | `otp_verifications` |
| 5 | `user_sessions` |
| 6 | `institutions` |
| 7 | `courses` |
| 8 | `modules` |
| 9 | `lessons` |
| 10 | `legal_topics` |
| 11 | `lesson_topics` |
| 12 | `draft_types` |
| 13 | `draft_templates` |
| 14 | `assignments` |
| 15 | `draft_submissions` |
| 16 | `draft_versions` |
| 17 | `ai_feedback` |
| 18 | `feedback_items` |
| 19 | `enrollments` |
| 20 | `lesson_progress` |
| 21 | `student_progress` |
| 22 | `quizzes` |
| 23 | `questions` |
| 24 | `options` |
| 25 | `quiz_attempts` |
| 26 | `answers` |
| 27 | `languages` |
| 28 | `translations` |
| 29 | `notifications` |
| 30 | `faculty_assignments` |
| 31 | `manual_reviews` |
| 32 | `certificates` |

---

## 19. Overall System Flow

```text
USER REGISTRATION
       ↓
PHONE / EMAIL VERIFICATION
       ↓
USER LOGIN
       ↓
COURSE ENROLLMENT
       ↓
LEARN MODULES
       ↓
COMPLETE LESSONS
       ↓
TAKE QUIZZES
       ↓
GET DRAFTING ASSIGNMENT
       ↓
SELECT / VIEW DRAFT TEMPLATE
       ↓
WRITE LEGAL DRAFT
       ↓
SUBMIT DRAFT
       ↓
AI ANALYSIS
       ↓
AI FEEDBACK
       ↓
MAKE CORRECTIONS
       ↓
SUBMIT NEW VERSION
       ↓
FACULTY REVIEW
       ↓
FINAL SCORE
       ↓
UPDATE STUDENT PROGRESS
       ↓
COURSE COMPLETION
       ↓
CERTIFICATE
```

## 20. Recommended Backend Stack

For this database model, a suitable backend architecture would be:

```text
Frontend
   │
   ↓
Flutter / Web Application
   │
   ↓
REST API / Backend
   │
   ├── Authentication
   ├── Course Management
   ├── Draft Management
   ├── AI Feedback Service
   ├── Progress Tracking
   └── Notification Service
   │
   ↓
PostgreSQL Database
   │
   ├── Users
   ├── Courses
   ├── Drafts
   ├── AI Feedback
   ├── Assessments
   └── Progress
```

**PostgreSQL** is recommended because the platform has many relational entities, foreign-key relationships, structured assessment data, draft versions, and progress records.
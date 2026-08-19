# Backend Design Document

## LegalDraft -- AI-Powered Legal Drafting Learning Platform

### 1. Introduction

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

# 2. Backend Objectives

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

# 3. Backend Architecture

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

### Important separation

    Frontend

→ Displays and collects information

Backend

→ Calculates, validates, stores, and controls progression

AI

→ Provides grounded educational drafting feedback

------------------------------------------------------------------------

# 4. User Management

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

### Suggested roles

    STUDENT

ADMIN

FACULTY

Faculty/admin functionality can be introduced based on project scope.

------------------------------------------------------------------------

# 5. Authentication and Authorization

The backend should use secure authentication, such as JWT-based
authentication.

### Main operations

    POST /auth/register

POST /auth/login

POST /auth/logout

GET /users/me

PUT /users/me

Protected endpoints should require authentication.

Role-based authorization should prevent students from accessing
administrative functionality.

------------------------------------------------------------------------

# 6. Language Management

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

# 7. Diagnostic Assessment

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

# 8. Automatic Level Assignment

The learner **cannot manually choose Basic, Medium, or Advanced**.

The backend determines the starting level from the diagnostic
percentage.

Example configurable thresholds:

    0–49%   → BASIC

50--79% → MEDIUM

80--100% → ADVANCED

These values should be stored as configurable assessment rules rather
than hard-coded into the frontend.

### Example

    Diagnostic Score = 68%

        ↓

Starting Level = MEDIUM

The frontend only displays the level returned by the backend.

------------------------------------------------------------------------

# 9. Level Progression Control

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

### Progression rules

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

# 10. Learning Level Model

The system contains:

    BASIC

MEDIUM

ADVANCED

The difficulty increases at each level.

### Basic

-   Simple facts
-   Clear instructions
-   Guided drafting
-   Basic document structures

### Medium

-   More facts
-   Multiple issues
-   Less guidance
-   Greater reasoning

### Advanced

-   Complex facts
-   Multiple issues
-   Minimal guidance
-   Independent drafting
-   Higher drafting quality expectations

------------------------------------------------------------------------

# 11. Domain Management

The learner cannot manually select the level, but can choose a domain
within the level they currently have access to.

### MVP domains

    CIVIL_LITIGATION

CRIMINAL_BNS_BNSS

CONVEYANCING_PROPERTY

The same domains are available across Basic, Medium, and Advanced,
subject to content availability.

### Important rule

The learner can change domains between levels.

Example:

    Basic → Civil

Medium → Conveyancing

Advanced → Criminal

The domain choice does not alter the learner's level.

------------------------------------------------------------------------

# 12. Scenario Management

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

# 13. Different Scenarios at Every Level

The same domain must provide **different scenarios at different
difficulty levels**.

### Civil

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

### Criminal --- BNS & BNSS

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

### Conveyancing & Property

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

# 14. Scenario Selection

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

# 15. Course and Lesson Management

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

# 16. Drafting Basics Module

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

# 17. Lesson Progress

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

# 18. Quiz Gate

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

# 19. Quiz Management

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

# 20. Draft Submission Management

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

# 21. AI Evaluation

AI feedback is provided after drafting activities at:

    Basic

Medium

Advanced

Legislative Drafting

The AI evaluates the learner's draft against the appropriate level and
domain rubric.

### Basic

-   Clarity
-   Structure
-   Completeness
-   Basic terminology
-   Required elements

### Medium

-   Issue identification
-   Reasoning
-   Precision
-   Completeness
-   Consistency
-   Clause suitability

### Advanced

-   Complex issue coverage
-   Structure
-   Clause construction
-   Logical consistency
-   Ambiguity
-   Professional drafting quality

------------------------------------------------------------------------

# 22. AI Feedback Output

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

# 23. AI Hallucination Protection

Because the platform deals with legal drafting, the AI should not be
treated as an unrestricted legal source.

The backend should implement grounded AI evaluation.

### AI input

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

# 24. Approved Legal Knowledge Base

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

# 25. RAG / Retrieval

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

# 26. AI Restrictions

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

# 27. AI Validation Layer

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

# 28. AI Evaluation Audit Trail

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

# 29. AI Feedback History

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

# 30. Level Assessment

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

# 31. Final Assessment

The final assessment evaluates complete drafting capability.

Suggested sections:

-   Theory
-   Scenario analysis
-   Legal drafting
-   Complex drafting
-   Legislative drafting

Successful completion allows certificate generation.

------------------------------------------------------------------------

# 32. Certificate Management

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

# 33. Portfolio Management

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

# 34. Gamification

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

# 35. Notifications

The backend can generate notifications for:

-   New lessons
-   Level unlocks
-   Assessment results
-   AI feedback availability
-   Certificate availability
-   Portfolio milestones
-   Achievements

------------------------------------------------------------------------

# 36. Admin / Faculty Module

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

# 37. Database Structure

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

# 38. Important Relationships

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

# 39. API Modules

The MVP API should include:

### Authentication

    POST /auth/register

POST /auth/login

POST /auth/logout

GET /users/me

PUT /users/me

### Language

    GET /languages

PUT /users/me/language

### Diagnostic

    GET  /diagnostic/questions

POST /diagnostic/submit

GET /diagnostic/result

### Learning Path

    GET /learning-path

GET /progress

### Lessons

    GET  /lessons

GET /lessons/{id}

POST /lessons/{id}/complete

### Quiz

    GET  /quiz/{id}/questions

POST /quiz/{id}/submit

GET /quiz/{id}/result

### Domains

    GET /levels/{level}/domains

### Scenarios

    GET /domains/{domain}/scenarios?level={level}

GET /scenarios/{id}

### Drafting

    POST /scenarios/{id}/drafts

PUT /drafts/{id}

POST /drafts/{id}/submit

GET /drafts/{id}

### AI Feedback

    POST /drafts/{id}/evaluate

GET /drafts/{id}/feedback

### Level Assessment

    GET  /levels/{level}/assessment

POST /levels/{level}/assessment/submit

GET /levels/{level}/assessment/result

### Final Assessment

    GET  /final-assessment

POST /final-assessment/submit

GET /final-assessment/result

### Certificate

    GET /certificates

GET /certificates/{id}

GET /certificates/{id}/download

GET /certificates/verify/{code}

### Portfolio

    GET /portfolio

POST /portfolio/items

PUT /portfolio/items/{id}

DELETE /portfolio/items/{id}

------------------------------------------------------------------------

# 40. Backend Technology Stack

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

# 41. Final Backend Learning Logic

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

# 42. Final Backend Rules

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

## 43. Final Backend Concept

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

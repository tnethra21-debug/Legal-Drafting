# Backend Database Model — Legal Drafting Learning Platform

## 1. Overview

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

# 2. Database Architecture

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

# 3. Authentication & User Management

## 3.1 `users`

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

## 3.2 `roles`

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

## 3.3 `user_roles`

Connects users with their roles.

| Column | Data Type | Key |
|---|---|---|
| user_id | UUID | PK, FK |
| role_id | UUID | PK, FK |

## 3.4 `otp_verifications`

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

## 3.5 `user_sessions`

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

# 4. Institution Management

## 4.1 `institutions`

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

### Relationship

```text
INSTITUTION 1 ─────────── M USERS
```

One institution can have multiple users.

---

# 5. Course & Learning Management

## 5.1 `courses`

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

## 5.2 `modules`

| Column | Data Type | Key |
|---|---|---|
| module_id | UUID | PK |
| course_id | UUID | FK |
| title | VARCHAR(200) | |
| description | TEXT | |
| module_order | INT | |
| created_at | TIMESTAMP | |

## 5.3 `lessons`

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

### Relationships

```text
COURSE 1 ───────── M MODULES

MODULE 1 ───────── M LESSONS
```

---

# 6. Legal Topics

## 6.1 `legal_topics`

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

## 6.2 `lesson_topics`

Many-to-many relationship between lessons and legal topics.

| Column | Data Type | Key |
|---|---|---|
| lesson_id | UUID | PK, FK |
| topic_id | UUID | PK, FK |

---

# 7. Legal Drafting Templates

## 7.1 `draft_types`

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

## 7.2 `draft_templates`

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

### Relationship

```text
DRAFT_TYPE 1 ───────── M DRAFT_TEMPLATES
```

---

# 8. Assignments

## 8.1 `assignments`

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

# 9. Draft Submissions

## 9.1 `draft_submissions`

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

## 9.2 `draft_versions`

Stores previous versions of a draft.

| Column | Data Type | Key |
|---|---|---|
| version_id | UUID | PK |
| submission_id | UUID | FK |
| version_number | INT | |
| content | TEXT | |
| created_at | TIMESTAMP | |

### Draft workflow

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

# 10. AI Feedback System

## 10.1 `ai_feedback`

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

## 10.2 `feedback_items`

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

### AI feedback workflow

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

# 11. Course Enrollment & Progress

## 11.1 `enrollments`

| Column | Data Type | Key |
|---|---|---|
| enrollment_id | UUID | PK |
| student_id | UUID | FK |
| course_id | UUID | FK |
| enrolled_at | TIMESTAMP | |
| completion_date | TIMESTAMP | |
| status | ENUM | |

## 11.2 `lesson_progress`

| Column | Data Type | Key |
|---|---|---|
| progress_id | UUID | PK |
| student_id | UUID | FK |
| lesson_id | UUID | FK |
| completion_percentage | DECIMAL(5,2) | |
| completed | BOOLEAN | |
| completed_at | TIMESTAMP | |

## 11.3 `student_progress`

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

# 12. Quiz & Assessment System

## 12.1 `quizzes`

| Column | Data Type | Key |
|---|---|---|
| quiz_id | UUID | PK |
| lesson_id | UUID | FK |
| title | VARCHAR(200) | |
| total_marks | INT | |

## 12.2 `questions`

| Column | Data Type | Key |
|---|---|---|
| question_id | UUID | PK |
| quiz_id | UUID | FK |
| question_text | TEXT | |
| question_type | ENUM | |
| marks | INT | |

## 12.3 `options`

| Column | Data Type | Key |
|---|---|---|
| option_id | UUID | PK |
| question_id | UUID | FK |
| option_text | TEXT | |
| is_correct | BOOLEAN | |

## 12.4 `quiz_attempts`

| Column | Data Type | Key |
|---|---|---|
| attempt_id | UUID | PK |
| quiz_id | UUID | FK |
| student_id | UUID | FK |
| score | DECIMAL(5,2) | |
| started_at | TIMESTAMP | |
| completed_at | TIMESTAMP | |

## 12.5 `answers`

| Column | Data Type | Key |
|---|---|---|
| answer_id | UUID | PK |
| attempt_id | UUID | FK |
| question_id | UUID | FK |
| selected_option_id | UUID | FK |
| is_correct | BOOLEAN | |

---

# 13. Multilingual Support

## 13.1 `languages`

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

## 13.2 `translations`

| Column | Data Type | Key |
|---|---|---|
| translation_id | UUID | PK |
| language_id | UUID | FK |
| content_type | VARCHAR(50) | |
| content_id | UUID | |
| translated_content | TEXT | |

---

# 14. Notifications

## 14.1 `notifications`

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

# 15. Faculty Review

## 15.1 `faculty_assignments`

| Column | Data Type | Key |
|---|---|---|
| faculty_id | UUID | PK, FK |
| assignment_id | UUID | PK, FK |

## 15.2 `manual_reviews`

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

# 16. Certificates

## 16.1 `certificates`

| Column | Data Type | Key |
|---|---|---|
| certificate_id | UUID | PK |
| student_id | UUID | FK |
| course_id | UUID | FK |
| certificate_number | VARCHAR(100) | UNIQUE |
| issued_date | DATE | |
| certificate_url | VARCHAR(500) | |

---

# 17. Main Entity Relationships

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

# 18. Complete Database Table List

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

# 19. Overall System Flow

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

# 20. Recommended Backend Stack

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
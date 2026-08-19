// backend/src/data/seedData.js
// Complete pre-seeded dataset for the Legal Drafting Learning Platform

export const seedLanguages = [
  { id: 'en', code: 'en', name: 'English', nativeName: 'English', is_active: true, flag: '🇬🇧' },
  { id: 'ta', code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', is_active: true, flag: '🇮🇳' },
  { id: 'hi', code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', is_active: true, flag: '🇮🇳' }
];

export const seedLevels = [
  {
    id: 'BASIC',
    name: 'Basic Level',
    badge: '🌱',
    description: 'Guided practice with simple facts, structured templates, and foundational legal drafting principles.',
    minScore: 0,
    maxScore: 49,
    order: 1
  },
  {
    id: 'MEDIUM',
    name: 'Medium Level',
    badge: '⚡',
    description: 'Semi-guided drafting with multi-issue disputes, statutory provisions, and analytical fact distillation.',
    minScore: 50,
    maxScore: 79,
    order: 2
  },
  {
    id: 'ADVANCED',
    name: 'Advanced Level',
    badge: '🏆',
    description: 'Complex multi-party dispute drafting, procedural court petitions, commercial covenants, and legislative drafting.',
    minScore: 80,
    maxScore: 100,
    order: 3
  }
];

export const seedDomains = [
  {
    id: 'civil',
    name: 'Civil & Litigation',
    icon: 'Scale',
    badge: '⚖️',
    description: 'Draft legal notices, plaints, written statements, affidavits, and injunction applications under CPC 1908.',
    category: 'Litigation',
    levels: ['BASIC', 'MEDIUM', 'ADVANCED']
  },
  {
    id: 'criminal',
    name: 'Criminal Law — BNS & BNSS',
    icon: 'ShieldAlert',
    badge: '🏛️',
    description: 'Draft complaints, bail applications, and petitions under Bharatiya Nyaya Sanhita (BNS 2023) & BNSS 2023.',
    category: 'Criminal Practice',
    levels: ['BASIC', 'MEDIUM', 'ADVANCED']
  },
  {
    id: 'conveyancing',
    name: 'Conveyancing & Property',
    icon: 'FileText',
    badge: '📄',
    description: 'Draft deeds, lease agreements, sale contracts, powers of attorney, and commercial covenants.',
    category: 'Transaction & Property',
    levels: ['BASIC', 'MEDIUM', 'ADVANCED']
  },
  {
    id: 'legislative',
    name: 'Legislative Drafting',
    icon: 'BookOpen',
    badge: '🏛️',
    description: 'Draft statutory bills, rules, regulations, amendments, and legal definitions for policy implementation.',
    category: 'Specialist Law',
    levels: ['ADVANCED']
  }
];

export const seedDiagnosticQuestions = [
  {
    id: 'diag-1',
    question: 'What is the primary objective of legal drafting in professional practice?',
    question_ta: 'தொழில்முறை சட்ட நடைமுறையில் சட்ட வரைவின் முதன்மை நோக்கம் என்ன?',
    question_hi: 'पेशेवर कानूनी अभ्यास में कानूनी प्रारूपण का मुख्य उद्देश्य क्या है?',
    options: [
      { id: 'A', text: 'To clearly communicate legal facts, rights, duties, and prayers with precision and unambiguity' },
      { id: 'B', text: 'To use archaic Latin maxims to make the document sound authoritative' },
      { id: 'C', text: 'To create lengthy documents to charge higher professional fees' },
      { id: 'D', text: 'To completely replace procedural steps in a court of law' }
    ],
    correctOption: 'A',
    weight: 20,
    rationale: 'Legal drafting is the science of crystallizing rights, obligations, facts, and legal demands into clear, binding language.'
  },
  {
    id: 'diag-2',
    question: 'In a Civil Plaint under Order VII Rule 1 CPC, which element is strictly mandatory to establish court authority?',
    question_ta: 'சிவில் வழக்குரையில் (Order VII CPC), நீதிமன்ற அதிகாரத்தை நிலைநிறுத்த எது கட்டாயமானது?',
    question_hi: 'सीपीसी के आदेश VII के तहत एक वादपत्र में अदालत के अधिकार क्षेत्र को स्थापित करने के लिए कौन सा तत्व अनिवार्य है?',
    options: [
      { id: 'A', text: 'Cause of Action statement and Valuation with Jurisdiction clause' },
      { id: 'B', text: 'The biography and financial standing of the advocate' },
      { id: 'C', text: 'A copy of all textbooks referenced during research' },
      { id: 'D', text: 'A handwritten letter to the presiding judge' }
    ],
    correctOption: 'A',
    weight: 20,
    rationale: 'Order VII Rule 1 requires facts constituting the cause of action, when it arose, and facts showing the court has pecuniary and territorial jurisdiction.'
  },
  {
    id: 'diag-3',
    question: 'Under the new criminal laws (Bharatiya Nagarik Suraksha Sanhita 2023), where is the provision for Regular Bail primarily codified?',
    question_ta: 'பாரதிய நாகரிக் சுரக்ஷா சன்ஹிதா 2023 (BNSS) கீழ் சாதாரண ஜாமீன் பிரிவு எது?',
    question_hi: 'भारतीय नागरिक सुरक्षा संहिता 2023 (BNSS) के तहत नियमित जमानत का प्राथमिक प्रावधान कहाँ संहिताबद्ध है?',
    options: [
      { id: 'A', text: 'Section 480 / Section 483 BNSS 2023 (corresponding to Sec 437/439 CrPC)' },
      { id: 'B', text: 'Section 100 Indian Evidence Act' },
      { id: 'C', text: 'Order 39 Rule 1 of the Civil Procedure Code' },
      { id: 'D', text: 'Section 12 of the Consumer Protection Act' }
    ],
    correctOption: 'A',
    weight: 20,
    rationale: 'Sections 480 and 483 of BNSS 2023 govern bail provisions in non-bailable offences by Magistrates and High Court/Sessions Courts.'
  },
  {
    id: 'diag-4',
    question: 'What is the legal consequence of omitting an essential "Habendum" or "Consideration" clause in a Deed of Conveyance?',
    question_ta: 'ஒரு சொத்து பரிமாற்றப் பத்திரத்தில் கிரையத் தொகை அல்லது உடைமை மாற்ற விதியை விடுவிப்பதன் விளைவு என்ன?',
    question_hi: 'हस्तांतरण विलेख में आवश्यक प्रतिफल या स्वामित्व हस्तांतरण खंड को छोड़ने का कानूनी परिणाम क्या है?',
    options: [
      { id: 'A', text: 'It may invalidate the conveyance or make transfer of title legally ambiguous and unenforceable' },
      { id: 'B', text: 'It automatically makes the document a criminal offense' },
      { id: 'C', text: 'Nothing, consideration is optional in property sales' },
      { id: 'D', text: 'The registrar will write the missing clause on behalf of parties' }
    ],
    correctOption: 'A',
    weight: 20,
    rationale: 'The consideration and operative transfer clauses define the nature of the estate granted under the Transfer of Property Act.'
  },
  {
    id: 'diag-5',
    question: 'Which principle distinguishes "Material Facts" from "Evidence" in pleading (Order VI Rule 2 CPC)?',
    question_ta: 'வாதுரையில் "முக்கிய உண்மைகள்" மற்றும் "சாட்சியங்கள்" ஆகியவற்றை வேறுபடுத்தும் விதி எது?',
    question_hi: 'सीपीसी के आदेश VI नियम 2 में अभिवचन में "तथ्य" को "साक्ष्य" से अलग करने वाला सिद्धांत क्या है?',
    options: [
      { id: 'A', text: 'Pleaded facts must state facts only and not the evidence by which they are to be proved' },
      { id: 'B', text: 'Pleadings must include full transcripts of witness cross-examinations' },
      { id: 'C', text: 'Evidence must always be recited word for word before filing suit' },
      { id: 'D', text: 'Facts should never be stated in chronological numbered paragraphs' }
    ],
    correctOption: 'A',
    weight: 20,
    rationale: 'Fundamental rule of pleadings: Plead facts (Facta Probanda), not law, and not evidence (Facta Probantia).'
  }
];

export const seedLessons = [
  {
    id: 'lesson-1',
    order: 1,
    title: 'What is Legal Drafting?',
    title_ta: 'சட்ட வரைவு என்றால் என்ன?',
    title_hi: 'कानूनी प्रारूपण क्या है?',
    summary: 'Introduction to legal drafting as the disciplined art and science of preparing binding legal instruments.',
    badge: '⚖️',
    readTime: '4 min',
    content: {
      intro: 'Legal drafting is the process of synthesizing legal principles, factual instructions, statutory requirements, and client objectives into clear, precise, and enforceable documents.',
      keyIdeas: [
        'Transforms client instructions into legally operative instruments.',
        'Prevents future litigation by eliminating ambiguities.',
        'Governed by procedural codes (CPC, BNSS) and substantive statutes.',
        'Must withstand adversarial scrutiny in court or arbitration.'
      ],
      example: {
        title: 'Drafting vs Casual Writing',
        badText: '"John gave money to Raj and wants it back soon or he will complain to police."',
        goodText: '"Under the Loan Agreement dated 12.01.2025, the Borrower is in default of repayment of the principal sum of ₹5,00,000/- along with accrued interest @ 12% p.a., due and payable on or before 15.02.2025."'
      },
      takeaway: 'Precision in legal drafting creates certainty of rights and liabilities.'
    }
  },
  {
    id: 'lesson-2',
    order: 2,
    title: 'Purpose of Legal Drafting',
    title_ta: 'சட்ட வரைவின் நோக்கங்கள்',
    title_hi: 'कानूनी प्रारूपण का उद्देश्य',
    summary: 'Understand the three main goals: Clarity, Enforceability, and Dispute Prevention.',
    badge: '🎯',
    readTime: '5 min',
    content: {
      intro: 'Every legal document serves a definite purpose: either initiating legal remedies, creating contractual bonds, asserting rights, or defending against claims.',
      keyIdeas: [
        'Operational certainty: Instructs parties on exact rights and obligations.',
        'Evidentiary value: Serves as primary documentary evidence under Evidence / BSA laws.',
        'Adjudicative clarity: Enables judges and arbitrators to understand the dispute swiftly.',
        'Risk allocation: Clearly allocates risks, liabilities, indemnities, and remedies.'
      ],
      example: {
        title: 'Purposeful Clause Construction',
        badText: '"Party A will repair machine when broken."',
        goodText: '"Party A shall, within 24 hours of written notice from Party B, repair or replace any defective component at its sole cost."'
      },
      takeaway: 'A well-drafted clause specifies Who, What, When, and the Consequence of breach.'
    }
  },
  {
    id: 'lesson-3',
    order: 3,
    title: 'Principles of Good Drafting',
    title_ta: 'சிறந்த சட்ட வரைவின் கோட்பாடுகள்',
    title_hi: 'अच्छे प्रारूपण के सिद्धांत',
    summary: 'The 4 Cs of legal drafting: Clarity, Conciseness, Completeness, and Consistency.',
    badge: '📐',
    readTime: '6 min',
    content: {
      intro: 'Great legal drafters follow four cardinal pillars to ensure legal instruments are robust, legible, and unassailable.',
      keyIdeas: [
        'Clarity: Avoid convoluted sentences and confusing syntax.',
        'Conciseness: Cut redundant legal jargon without sacrificing legal effect.',
        'Completeness: Cover all foreseeable contingencies and procedural requisites.',
        'Consistency: Use defined terms consistently throughout (e.g., do not alternate between "Vendor" and "Seller").'
      ],
      example: {
        title: 'The Elimination of Deadwood',
        badText: '"Null and void and of no legal force or effect whatsoever."',
        goodText: '"Void."'
      },
      takeaway: 'Do not use two words where one precise word suffices.'
    }
  },
  {
    id: 'lesson-4',
    order: 4,
    title: 'Structure of a Legal Document',
    title_ta: 'சட்ட ஆவணத்தின் கட்டமைப்பு',
    title_hi: 'कानूनी दस्तावेज की संरचना',
    summary: 'Standard structural anatomy: Title, Preamble, Recitals, Operative Clauses, Boilerplate, and Attestation.',
    badge: '🏛️',
    readTime: '7 min',
    content: {
      intro: 'Regardless of whether drafting a Deed, Plaint, or Legal Notice, standardized legal anatomy provides navigational clarity.',
      keyIdeas: [
        'Title & Caption: Identifies the court, forum, parties, and document name.',
        'Preamble & Parties: Names, ages, occupations, and addresses of all parties.',
        'Recitals (Whereas clauses): Factual background and history leading to the document.',
        'Operative Part: Substantive covenants, obligations, prayers, or legal demands.',
        'Boilerplate Clauses: Governing law, jurisdiction, severance, notice, arbitration.',
        'Verification / Attestation: Formal confirmation of truth by deponent/parties.'
      ],
      example: {
        title: 'Anatomy in a Glance',
        badText: 'Jumping straight into demands without stating who the sender and receiver are.',
        goodText: 'Sender Details → Notice Subject → Chronological Facts → Demand / Period → Consequences of Failure.'
      },
      takeaway: 'Structure gives the reader an intuitive roadmap to find key rights and remedies.'
    }
  },
  {
    id: 'lesson-5',
    order: 5,
    title: 'Legal Terminology & Plain Language',
    title_ta: 'சட்ட கலைச்சொற்கள் மற்றும் எளிய மொழி',
    title_hi: 'कानूनी शब्दावली और सरल भाषा',
    summary: 'Navigating mandatory terms vs archaic legalese: shall, may, without prejudice, indemnity, whereas.',
    badge: '📖',
    readTime: '5 min',
    content: {
      intro: 'Modern legal practice embraces Plain English while respecting precision in statutory terms of art.',
      keyIdeas: [
        '"Shall" vs "May": Shall denotes mandatory duty; May denotes discretion.',
        '"Without Prejudice": Used during settlement negotiations to prevent concessions from being admitted in court.',
        '"Mutatis Mutandis": With necessary modifications in detail.',
        '"Inter Alia": Among other things (useful when citing select facts without being exhaustive).'
      ],
      example: {
        title: 'Duty vs Discretion',
        badText: '"The Tenant may pay the rent by 5th of each month."',
        goodText: '"The Tenant shall pay the Monthly Rent on or before the 5th day of each calendar month."'
      },
      takeaway: 'Choose words based on their binding judicial interpretation, not ornamentation.'
    }
  },
  {
    id: 'lesson-6',
    order: 6,
    title: 'Facts, Issues, and Relief',
    title_ta: 'உண்மைகள், சிக்கல்கள் மற்றும் நிவாரணம்',
    title_hi: 'तथ्य, मुद्दे और अनुतोष',
    summary: 'How to structure factual chronology, isolate cause of action, and draft specific, enforceable prayers.',
    badge: '🎯',
    readTime: '6 min',
    content: {
      intro: 'The heart of litigation drafting is weaving facts into a compelling legal narrative that directly yields the requested relief.',
      keyIdeas: [
        'Chronological Storytelling: Present facts in dated sequence so events flow logically.',
        'Cause of Action: The bundle of essential facts that entitle the party to seek judicial remedy.',
        'Specific Reliefs: Courts only grant what is explicitly prayed for; avoid vague requests.',
        'Alternative & Residuary Prayers: Include prayers for interest, costs, and general equitable relief.'
      ],
      example: {
        title: 'Drafting the Prayer Clause',
        badText: '"Give me justice and punish the defendant."',
        goodText: '"Pass a decree for recovery of ₹7,50,000/- along with pendent lite and future interest @ 18% p.a. from the date of filing until realization."'
      },
      takeaway: 'Every claim in your relief must be substantiated by a pleaded fact in the body.'
    }
  },
  {
    id: 'lesson-7',
    order: 7,
    title: 'Common Drafting Mistakes',
    title_ta: 'பொதுவான சட்ட வரைவு பிழைகள்',
    title_hi: 'सामान्य प्रारूपण त्रुटियाँ',
    summary: 'Learn the traps: missing jurisdictional facts, ambiguous pronouns, conflicting clauses, and omission of statutory limitation.',
    badge: '⚠️',
    readTime: '5 min',
    content: {
      intro: 'A single ambiguity or procedural omission in a draft can lead to rejection of a plaint, dismissal of an application, or loss of contractual remedies.',
      keyIdeas: [
        'Vague Dates: Stating "recently" or "a few months ago" instead of exact dates for limitation calculation.',
        'Ambiguous Pronouns: Using "he/it" where it is unclear whether referring to Plaintiff, Defendant, or Agent.',
        'Missing Verification: Failure to verify facts based on personal knowledge vs legal advice.',
        'Conflicting Clauses: Writing contradictory dispute resolution or notice periods in different sections.'
      ],
      example: {
        title: 'Limitation Pitfall',
        badText: '"The Defendant borrowed money sometime last year and never returned it."',
        goodText: '"On 14th March 2024, the Defendant executed a Promissory Note agreeing to repay the loan on demand within 30 days."'
      },
      takeaway: 'Audit your draft for dates, figures in words/numbers, and parties before finalizing.'
    }
  },
  {
    id: 'lesson-8',
    order: 8,
    title: 'Basic Drafting Exercise & Walkthrough',
    title_ta: 'அடிப்படை வரைவு பயிற்சி & மாதிரி',
    title_hi: 'बुनियादी प्रारूपण अभ्यास और नमूना',
    summary: 'Deconstruct a complete Statutory Legal Notice clause-by-clause before heading to practical drafting.',
    badge: '✍️',
    readTime: '8 min',
    content: {
      intro: 'Let us synthesize everything learned into an end-to-end statutory Legal Notice model under Indian law.',
      keyIdeas: [
        '1. Advocate Letterhead & Registered Post dispatch clause.',
        '2. Identification of Client and Address of Addressee.',
        '3. Factual narrative: agreement, performance by client, default by addressee.',
        '4. Clear demand with a strict 15 or 30-day cure window.',
        '5. Warning of civil suit and criminal proceedings with costs upon non-compliance.'
      ],
      example: {
        title: 'Notice Model Summary',
        badText: 'Sending an informal email with emotional grievances without statutory timeline.',
        goodText: '"Under instructions from my Client... I hereby call upon you to pay the outstanding sum of ₹1,20,000/- within 15 days of receipt of this notice, failing which..."'
      },
      takeaway: 'Mastering the legal notice prepares you for all civil and commercial pleadings.'
    }
  }
];

export const seedQuizQuestions = [
  {
    id: 'quiz-1',
    question: 'What are the 4 fundamental Cs of effective legal drafting?',
    options: [
      { id: 'A', text: 'Clarity, Conciseness, Completeness, Consistency' },
      { id: 'B', text: 'Complexity, Length, Latin phrases, Citations' },
      { id: 'C', text: 'Cost, Confidentiality, Caution, Courts' },
      { id: 'D', text: 'Clauses, Covenants, Counter-claims, Certification' }
    ],
    correctOption: 'A',
    explanation: 'Clarity, Conciseness, Completeness, and Consistency represent the gold standard in modern legal writing.'
  },
  {
    id: 'quiz-2',
    question: 'In a legal document, what does the word "SHALL" legally denote when used in an operative clause?',
    options: [
      { id: 'A', text: 'A mandatory duty or obligation with binding legal effect' },
      { id: 'B', text: 'A discretionary option that may be ignored' },
      { id: 'C', text: 'A futuristic hope or aspiration' },
      { id: 'D', text: 'A suggestion for mediation' }
    ],
    correctOption: 'A',
    explanation: 'In statutory interpretation and drafting, "shall" imposes an imperative, mandatory legal obligation.'
  },
  {
    id: 'quiz-3',
    question: 'Which section of a deed or agreement contains the factual background and history ("Whereas...") leading to the contract?',
    options: [
      { id: 'A', text: 'Recitals' },
      { id: 'B', text: 'Habendum' },
      { id: 'C', text: 'Testimonium' },
      { id: 'D', text: 'Boilerplate' }
    ],
    correctOption: 'A',
    explanation: 'Recitals set out the history, context, and intention of the parties prior to the operative covenants.'
  },
  {
    id: 'quiz-4',
    question: 'Under Order VI Rule 2 of the CPC, what is the golden rule of pleadings regarding facts and evidence?',
    options: [
      { id: 'A', text: 'Plead material facts only, and never the evidence by which they are to be proved' },
      { id: 'B', text: 'Plead only arguments and statutory sections without stating dates or facts' },
      { id: 'C', text: 'Attach all witness statements directly in the body of the plaint' },
      { id: 'D', text: 'Write the plaint in poetry or conversational letters' }
    ],
    correctOption: 'A',
    explanation: 'Pleadings must state Facta Probanda (material facts), not Facta Probantia (evidence).'
  },
  {
    id: 'quiz-5',
    question: 'What is the purpose of adding the phrase "Without Prejudice" in a settlement offer letter?',
    options: [
      { id: 'A', text: 'To prevent statements and admissions in the letter from being used as evidence against the sender in court' },
      { id: 'B', text: 'To show that the lawyer is acting without charging any fees' },
      { id: 'C', text: 'To indicate that the sender hates the opposing party' },
      { id: 'D', text: 'To waive all court fees automatically' }
    ],
    correctOption: 'A',
    explanation: '"Without Prejudice" protects bona fide settlement negotiations from being tendered as admissions of liability.'
  },
  {
    id: 'quiz-6',
    question: 'Why is it critical to specify exact dates and places in the Cause of Action paragraph of a plaint?',
    options: [
      { id: 'A', text: 'To prove that the suit is within limitation and within the court\'s territorial jurisdiction' },
      { id: 'B', text: 'To show how good the advocate\'s memory is' },
      { id: 'C', text: 'Because judges only read the dates and skip the rest of the plaint' },
      { id: 'D', text: 'To satisfy newspaper reporters' }
    ],
    correctOption: 'A',
    explanation: 'Under Order VII Rule 1 CPC, the court must ascertain both statutory limitation and territorial/pecuniary jurisdiction.'
  },
  {
    id: 'quiz-7',
    question: 'What is a "Boilerplate Clause" in a commercial agreement?',
    options: [
      { id: 'A', text: 'Standardized administrative clauses such as Governing Law, Severability, Notice, and Force Majeure' },
      { id: 'B', text: 'A clause that deals with heating equipment in industrial factories' },
      { id: 'C', text: 'The first sentence containing the client\'s name' },
      { id: 'D', text: 'A clause written by a metal manufacturing company' }
    ],
    correctOption: 'A',
    explanation: 'Boilerplate clauses are standard operational terms that govern the interpretation and enforcement of the entire contract.'
  },
  {
    id: 'quiz-8',
    question: 'In drafting a Statutory Legal Notice for recovery of money, what is an indispensable element before filing suit?',
    options: [
      { id: 'A', text: 'A specific demand for payment within a defined timeline (e.g., 15 days) and notice of legal consequences' },
      { id: 'B', text: 'A copy of the advocate\'s degree certificate' },
      { id: 'C', text: 'A demand for apology in national newspapers only' },
      { id: 'D', text: 'A promise never to go to court' }
    ],
    correctOption: 'A',
    explanation: 'A statutory legal notice must place the recipient on formal notice of the default, demand cure within a fixed window, and specify legal consequences.'
  },
  {
    id: 'quiz-9',
    question: 'What is the consequence of failing to verify a Plaint or Written Statement as required under Order VI Rule 15 CPC?',
    options: [
      { id: 'A', text: 'It constitutes a severe procedural defect that can lead to rejection or return of the pleading' },
      { id: 'B', text: 'Nothing happens, verification is merely decorative' },
      { id: 'C', text: 'The defendant automatically loses the case without trial' },
      { id: 'D', text: 'The police will immediately take custody of the case file' }
    ],
    correctOption: 'A',
    explanation: 'Order VI Rule 15 mandates that pleadings must be verified by the party or authorized person on affidavit.'
  },
  {
    id: 'quiz-10',
    question: 'What does "Consistency" in drafting mean regarding the use of defined terms?',
    options: [
      { id: 'A', text: 'Using the exact same defined term (e.g. "Purchaser") throughout the document without switching synonyms' },
      { id: 'B', text: 'Making sure every paragraph has the exact same number of letters' },
      { id: 'C', text: 'Using font size 12 for every word including headings' },
      { id: 'D', text: 'Always writing in passive voice' }
    ],
    correctOption: 'A',
    explanation: 'Consistency mandates that defined terms maintain a single unchanging label and meaning across the entire instrument.'
  }
];

export const seedScenarios = [
  // --- BASIC CIVIL ---
  {
    id: 'scen-basic-civil-1',
    levelId: 'BASIC',
    domainId: 'civil',
    title: 'Legal Notice for Unpaid Residential Rent',
    documentType: 'Statutory Legal Notice',
    difficulty: 'Basic 🌱',
    readTime: '3 min',
    facts: `Client: Mr. Rajesh Sharma, Landlord and Owner of Flat 402, Green Meadows Apartments, Anna Nagar, Chennai.
Tenant (Opposite Party): Mr. Vikram Malhotra.
Lease Terms: Registered Tenancy Agreement executed on 01.03.2024 for 11 months. Monthly rent fixed at ₹25,000/-, payable on or before 5th of each English calendar month.
Default: The tenant has failed and neglected to pay monthly rent for 6 consecutive months (September 2024 to February 2025), accumulating an outstanding arrears of ₹1,50,000/-.
Prior Reminders: Multiple phone calls and WhatsApp notices were ignored by the tenant.
Client's Instructions: Issue a formal 15-day Legal Notice through counsel demanding payment of ₹1,50,000/- with interest @ 12% p.a. and vacant possession of the premises, failing which civil suit for eviction and recovery of arrears will be filed.`,
    task: 'Draft a formal Legal Notice on behalf of Landlord Rajesh Sharma to Tenant Vikram Malhotra demanding payment of ₹1,50,000/- arrears within 15 days and vacation of premises.',
    requiredElements: [
      'Advocate letterhead & Registered Post A.D. clause',
      'Clear identification of Landlord (Client) and Tenant (Addressee)',
      'Reference to Tenancy Agreement dated 01.03.2024 and monthly rent of ₹25,000/-',
      'Specific default period: 6 months (Sept 2024 – Feb 2025) totaling ₹1,50,000/-',
      'Mandatory 15-day demand period from date of receipt',
      'Warning of eviction suit, arrears recovery, interest, and costs upon failure'
    ],
    legalReferences: [
      { act: 'Transfer of Property Act, 1882', section: 'Section 106 & 111(g)', note: 'Notice to quit & determination of lease for forfeiture' },
      { act: 'Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017', section: 'Section 21(2)(a)', note: 'Eviction grounds for default in payment of rent' }
    ],
    template: `LEGAL NOTICE
BY REGISTERED POST WITH ACKNOWLEDGEMENT DUE / SPEED POST

Date: [Insert Date]

TO:
Mr. Vikram Malhotra,
Residing at Flat 402, Green Meadows Apartments,
Anna Nagar, Chennai - 600040.

SUBJECT: LEGAL NOTICE UNDER SECTION 106 OF THE TRANSFER OF PROPERTY ACT, 1882 FOR RECOVERY OF ARREARS OF RENT AMOUNTING TO RS. 1,50,000/- AND VACATION OF PREMISES

Sir,

Under instructions from and on behalf of my client, Mr. Rajesh Sharma, residing at [Landlord Address], I hereby serve upon you the following Legal Notice:

1. That you entered into a Tenancy Agreement with my client on 01.03.2024 in respect of Flat 402, Green Meadows Apartments, Anna Nagar, Chennai on a monthly rent of Rs. 25,000/- payable on or before the 5th of each month.

2. That you have chronically defaulted in paying rent for the period from September 2024 to February 2025 (6 months), aggregating to total arrears of Rs. 1,50,000/- (Rupees One Lakh Fifty Thousand only).

3. That despite repeated verbal reminders and messages, you have failed to clear the said outstanding liability.

4. I therefore, through this Notice, call upon you to pay the entire arrears of Rs. 1,50,000/- along with interest @ 12% p.a. and hand over vacant, peaceful possession of the schedule premises within 15 (fifteen) days from the date of receipt of this notice.

5. Take notice that if you fail to comply, my client has given strict instructions to initiate civil proceedings for eviction, recovery of rent, damages, and legal costs entirely at your risk and consequence.

Yours faithfully,
[Advocate Name & Signature]
Counsel for Client`
  },

  // --- BASIC CRIMINAL ---
  {
    id: 'scen-basic-crim-1',
    levelId: 'BASIC',
    domainId: 'criminal',
    title: 'Criminal Complaint under Section 175(3) BNSS for Theft',
    documentType: 'Private Criminal Complaint',
    difficulty: 'Basic 🌱',
    readTime: '3 min',
    facts: `Complainant: Mrs. Sunita Devi, resident of Sector 14, Rohini, New Delhi.
Accused: Rakesh Kumar (Former Domestic Assistant).
Incident: On 10.01.2025 at approximately 02:30 PM, the accused unauthorizedly entered the master bedroom locker, stole gold ornaments valued at ₹3,20,000/- and cash ₹45,000/-, and fled the premises.
Police inaction: Complainant submitted written complaint to SHO Rohini PS on 11.01.2025 and Representation to DCP on 18.01.2025. No FIR registered despite cognizable offence.
Remedy Sought: Filing private complaint before the Judicial Magistrate under Section 175(3) Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) seeking direction to police to register FIR and investigate under Section 303(2) Bharatiya Nyaya Sanhita, 2023 (Theft).`,
    task: 'Draft a Criminal Complaint under Section 175(3) BNSS 2023 praying for direction to register FIR under Section 303(2) BNS 2023.',
    requiredElements: [
      'Court title: In the Court of Metropolitan Magistrate / Judicial Magistrate',
      'Name, age, address of Complainant and Accused',
      'Clear recital of date (10.01.2025), time, stolen items (Gold ₹3.2L + Cash ₹45K)',
      'Compliance with Section 175(3) BNSS: Prior complaint to SHO and DCP attached',
      'Invocation of Section 303(2) BNS 2023 (Theft)',
      'Specific prayer directing SHO to register FIR and recover stolen property'
    ],
    legalReferences: [
      { act: 'Bharatiya Nagarik Suraksha Sanhita, 2023', section: 'Section 175(3)', note: 'Application to Magistrate for police investigation (equivalent to 156(3) CrPC)' },
      { act: 'Bharatiya Nyaya Sanhita, 2023', section: 'Section 303(2)', note: 'Punishment for Theft in building/dwelling' }
    ],
    template: `IN THE COURT OF CHIEF JUDICIAL MAGISTRATE / METROPOLITAN MAGISTRATE AT ROHINI, NEW DELHI

Complaint No. ______ of 2025

IN THE MATTER OF:
Mrs. Sunita Devi, W/o Sh. Rameshwar Dayal,
R/o H.No. 112, Sector 14, Rohini, New Delhi.
... COMPLAINANT

VERSUS

Rakesh Kumar, S/o Sh. Mangal Ram,
R/o Vill. Khampur, PO Alipur, Delhi.
... ACCUSED

APPLICATION / COMPLAINT UNDER SECTION 175(3) OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 (BNSS) FOR DIRECTING REGISTRATION OF FIR UNDER SECTION 303(2) OF BHARATIYA NYAYA SANHITA, 2023 (BNS)

MOST RESPECTFULLY SHOWETH:
1. That the Complainant is a law-abiding citizen residing at the aforementioned address...
2. That on 10.01.2025 at about 02:30 PM, the Accused stole gold ornaments worth Rs. 3,20,000/- and cash Rs. 45,000/- from the Complainant's residence...
3. That the Complainant approached the SHO on 11.01.2025 and DCP on 18.01.2025, but no action was taken...
PRAYER: Direct the SHO PS Rohini to register FIR under Section 303(2) BNS and initiate investigation.`
  },

  // --- BASIC CONVEYANCING ---
  {
    id: 'scen-basic-conv-1',
    levelId: 'BASIC',
    domainId: 'conveyancing',
    title: 'Residential 11-Month Tenancy Agreement',
    documentType: 'Tenancy Agreement',
    difficulty: 'Basic 🌱',
    readTime: '4 min',
    facts: `Landlord (Lessor): Mr. Anand Prakash, residing at 15, Richmond Road, Bengaluru.
Tenant (Lessee): Ms. Priya Menon, Software Engineer.
Premises: 2 BHK Residential Apartment No. 3B, Silver Oak Heights, Indiranagar, Bengaluru.
Period: 11 months commencing from 01.04.2025 to 28.02.2026.
Rent: ₹30,000/- per month, payable by 5th of each month via NEFT/UPI.
Security Deposit: Interest-free refundable security deposit of ₹1,50,000/- paid via Bank Transfer.
Utility Charges: Electricity and Water charges payable directly by Lessee.
Maintenance: Societal maintenance of ₹3,000/month included in rent.
Lock-in & Notice: 1 month notice period for termination by either party.`,
    task: 'Draft an 11-Month Residential Tenancy Agreement with standard covenants, deposit, rent escalation, maintenance, and termination clauses.',
    requiredElements: [
      'Title: RESIDENTIAL TENANCY AGREEMENT',
      'Date and place of execution',
      'Details of Lessor and Lessee with PAN/Aadhaar references',
      'Demised premises description (Schedule Property)',
      'Rent amount (₹30,000), due date (5th), payment mode',
      'Security deposit clause (₹1,50,000 interest-free, refund conditions)',
      'Lessee covenants: maintenance, no subletting, residential use only',
      'Termination clause: 1 month notice period'
    ],
    legalReferences: [
      { act: 'Transfer of Property Act, 1882', section: 'Section 105 & 107', note: 'Lease defined and duration requirement' },
      { act: 'Indian Registration Act, 1908', section: 'Section 17(1)(d)', note: 'Exemption for leases under 1 year from mandatory registration' }
    ],
    template: `RESIDENTIAL TENANCY AGREEMENT

THIS TENANCY AGREEMENT is made and entered into on this 1st day of April 2025 at Bengaluru,

BETWEEN:
Mr. Anand Prakash, residing at 15, Richmond Road, Bengaluru (hereinafter called the "LESSOR", which expression shall include his heirs, successors, and assigns) of the ONE PART;

AND:
Ms. Priya Menon, residing at [Permanent Address] (hereinafter called the "LESSEE", which expression shall include her legal representatives) of the OTHER PART.

WHEREAS the Lessor is the absolute owner of Apartment No. 3B, Silver Oak Heights, Indiranagar, Bengaluru (Schedule Property);
AND WHEREAS the Lessee has approached the Lessor to take on lease the Schedule Property for residential purpose...

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
1. DURATION: 11 months from 01.04.2025 to 28.02.2026.
2. MONTHLY RENT: Rs. 30,000/- payable on or before 5th of each month.
3. SECURITY DEPOSIT: Rs. 1,50,000/- refundable at the time of vacating.
4. USE: Strictly for residential purpose only with no subletting.
5. TERMINATION: One month prior written notice by either party.

IN WITNESS WHEREOF, the parties hereto have set their hands on the day, month and year first above written.
[LESSOR]  |  [LESSEE]
WITNESS 1: [ ]  |  WITNESS 2: [ ]`
  },

  // --- MEDIUM CIVIL ---
  {
    id: 'scen-med-civil-1',
    levelId: 'MEDIUM',
    domainId: 'civil',
    title: 'Statutory Notice under Section 138 Negotiable Instruments Act',
    documentType: 'Statutory Demand Notice',
    difficulty: 'Medium ⚡',
    readTime: '4 min',
    facts: `Payee / Creditor: M/s Apex Tech Solutions Pvt Ltd, represented by Director Mr. K. Narayanan, MG Road, Pune.
Drawer / Debtor: Mr. Sanjay Deshmukh, Proprietor of Deshmukh Enterprises, Shivaji Nagar, Pune.
Debt Background: Supply of 50 units of commercial servers under Invoice No. ATS/2024/88 dated 15.10.2024 for total consideration of ₹12,50,000/-.
Cheque Issued: In partial discharge of legally enforceable debt, the Drawer issued Cheque No. 004821 dated 10.12.2024 drawn on HDFC Bank for ₹8,00,000/-.
Dishonour: Payee deposited cheque in SBI Pune on 15.12.2024. Return Memo received on 18.12.2024 with endorsement "FUNDS INSUFFICIENT".
Legal Timeline: Statutory 30-day window to issue demand notice under Section 138(b) NI Act. Notice must provide strict 15-day cure period under Section 138(c).`,
    task: 'Draft a Statutory Demand Notice under Section 138 of the Negotiable Instruments Act, 1881 to the drawer demanding ₹8,00,000/- within 15 days.',
    requiredElements: [
      'Clear reference to Invoice No. ATS/2024/88 establishing legally enforceable debt',
      'Cheque particulars: Number 004821, Date 10.12.2024, Amount ₹8,00,000/-, Bank',
      'Bank Return Memo particulars: Date 18.12.2024, Reason "Funds Insufficient"',
      'Strict 15-day statutory demand under Section 138(c) NI Act',
      'Specific warning of criminal prosecution under Section 138 & 141 NI Act and Section 318 BNS (Cheating)'
    ],
    legalReferences: [
      { act: 'Negotiable Instruments Act, 1881', section: 'Section 138, 139, 141, 142', note: 'Dishonour of cheque for insufficiency of funds & statutory presumption' },
      { act: 'Bharatiya Nyaya Sanhita, 2023', section: 'Section 318(4)', note: 'Cheating and dishonestly inducing delivery of property' }
    ],
    template: `STATUTORY DEMAND NOTICE UNDER SECTION 138(b) OF THE NEGOTIABLE INSTRUMENTS ACT, 1881
BY REGISTERED POST WITH A.D. & SPEED POST

Date: [Date within 30 days of Memo]

TO:
Mr. Sanjay Deshmukh, Proprietor,
M/s Deshmukh Enterprises, Shivaji Nagar, Pune.

SUBJECT: STATUTORY NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881 FOR DISHONOUR OF CHEQUE NO. 004821 DATED 10.12.2024 FOR RS. 8,00,000/-

Sir,
Under instructions from and on behalf of my client M/s Apex Tech Solutions Pvt Ltd, I hereby issue this statutory notice:
1. That towards supply of commercial servers under Invoice No. ATS/2024/88 dated 15.10.2024, you were liable to pay Rs. 12,50,000/-.
2. In discharge of your legally enforceable liability, you issued Cheque No. 004821 dated 10.12.2024 for Rs. 8,00,000/- drawn on HDFC Bank.
3. The said cheque was presented by my client to its banker, SBI, but was returned unpaid vide Bank Memo dated 18.12.2024 with the remark "FUNDS INSUFFICIENT".
4. You are hereby called upon to pay the entire cheque amount of Rs. 8,00,000/- within 15 (fifteen) days from the date of receipt of this notice, failing which criminal complaint under Section 138 of the NI Act shall be instituted against you...`
  },

  // --- MEDIUM CRIMINAL ---
  {
    id: 'scen-med-crim-1',
    levelId: 'MEDIUM',
    domainId: 'criminal',
    title: 'Regular Bail Application under Section 483 BNSS 2023',
    documentType: 'Regular Bail Application',
    difficulty: 'Medium ⚡',
    readTime: '5 min',
    facts: `Applicant / Accused: Sh. Amit Verma, 32 years, Senior Accountant at a logistics firm.
FIR Details: FIR No. 89/2025, PS Cyber Crime, Cyberabad, registered under Sections 316(2) (Criminal Breach of Trust) and 318(4) (Cheating) of Bharatiya Nyaya Sanhita, 2023.
Custody: Arrested on 05.02.2025; currently in judicial custody for 20 days. Police remand completed; all digital devices and ledgers seized.
Grounds for Bail:
1. Purely documentary case based on accounting records already in police custody.
2. Applicant is a permanent resident, sole breadwinner with no prior criminal antecedents.
3. No flight risk; willing to furnish solvent sureties and submit passport.
4. Investigation is substantially complete; custodial interrogation no longer warranted.`,
    task: 'Draft a Regular Bail Application under Section 483 BNSS 2023 before the Court of Sessions highlighting lack of custodial necessity, parity, and willingness to abide by conditions.',
    requiredElements: [
      'Court header: In the Court of Principal Sessions Judge at Cyberabad / Hyderabad',
      'FIR details: FIR No., Police Station, Sections 316(2) & 318(4) BNS 2023',
      'Chronology of arrest and custody period (20 days judicial custody)',
      'Substantive bail grounds: no further custodial interrogation required, documentary nature of evidence, no tampering risk',
      'Specific undertaking to join investigation and comply with bail conditions under Section 483 BNSS',
      'Prayer for release on bail and verification affidavit'
    ],
    legalReferences: [
      { act: 'Bharatiya Nagarik Suraksha Sanhita, 2023', section: 'Section 483 (Special powers of High Court/Sessions Court regarding bail)', note: 'Equivalent to Sec 439 CrPC' },
      { act: 'Supreme Court Precedents', section: 'Satender Kumar Antil v. CBI (2022)', note: 'Bail is the rule, jail is the exception' }
    ],
    template: `IN THE COURT OF PRINCIPAL DISTRICT & SESSIONS JUDGE AT CYBERABAD

Crl. M.P. No. _______ of 2025
IN
FIR No. 89/2025
Under Sections: 316(2), 318(4) BNS, 2023
Police Station: Cyber Crime, Cyberabad

IN THE MATTER OF:
Amit Verma, S/o Sh. Kedarnath Verma,
R/o H.No. 44, Gachibowli, Hyderabad.
(Presently in Judicial Custody at Central Prison, Cherlapally)
... APPLICANT / ACCUSED

VERSUS

State of Telangana (Rep. by Inspector of Police, PS Cyber Crime)
... RESPONDENT

APPLICATION UNDER SECTION 483 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 FOR GRANT OF REGULAR BAIL

MOST RESPECTFULLY SHOWETH:
1. That the Applicant was arrested on 05.02.2025 in connection with the above FIR...
2. That all relevant accounting ledgers and digital devices have already been seized by the IO...
3. That the Applicant has deep roots in society and has clean antecedents...
PRAYER: Grant regular bail to the Applicant subject to reasonable conditions.`
  },

  // --- MEDIUM CONVEYANCING ---
  {
    id: 'scen-med-conv-1',
    levelId: 'MEDIUM',
    domainId: 'conveyancing',
    title: 'Commercial Office Space Lease with Escalation & Lock-in',
    documentType: 'Commercial Lease Agreement',
    difficulty: 'Medium ⚡',
    readTime: '5 min',
    facts: `Lessor: M/s Skyline Realty Developers LLP, Bandra Kurla Complex (BKC), Mumbai.
Lessee: M/s Innovate AI Labs Private Limited.
Demised Premises: 5th Floor, Unit 501, Horizon Business Tower, BKC, Mumbai (Super Built-up 4,500 sq.ft.).
Term: 5 Years commencing 01.05.2025 with an initial Lock-in Period of 36 Months.
Rent: ₹4,50,000/- per month (₹100/sq.ft.) + GST, subject to 15% escalation after every 3 years.
Security Deposit: 6 months gross rent (₹27,00,000/-) interest-free refundable deposit.
Fit-out Rent-Free Period: 30 days prior to lease commencement.
Termination: Post lock-in, 3 months notice; during lock-in, default triggers liquidated damages equal to unexpired lock-in rent.`,
    task: 'Draft a comprehensive Commercial Lease Agreement with Lock-in, 15% Escalation, Fit-out period, Stamp Duty/Registration, and Indemnity covenants.',
    requiredElements: [
      'Commercial Lease title and corporate preamble with board resolutions',
      'Super built-up area specification and schedule of property',
      '36-month strict lock-in clause with liquidated damages formula',
      '15% rent escalation clause after 36 months',
      'Security deposit clause (₹27,00,000) and deduction terms',
      'Indemnity and compliance with municipal bylaws/fire safety',
      'Dispute resolution via Arbitration under Arbitration & Conciliation Act 1996'
    ],
    legalReferences: [
      { act: 'Transfer of Property Act, 1882', section: 'Section 105 to 111', note: 'Commercial leases & forfeiture provisions' },
      { act: 'Arbitration and Conciliation Act, 1996', section: 'Section 7', note: 'Arbitration agreement clause' }
    ],
    template: `COMMERCIAL LEASE AGREEMENT

THIS LEASE DEED is made at Mumbai on this 1st day of May 2025,

BETWEEN:
M/s Skyline Realty Developers LLP (hereinafter called the "LESSOR")...
AND:
M/s Innovate AI Labs Private Limited (hereinafter called the "LESSEE")...

OPERATIVE CLAUSES:
1. DEMISED PREMISES: Unit 501, Horizon Tower, BKC (4,500 sq. ft.).
2. TERM & LOCK-IN: 5 Years with 36 Months strict Lock-in Period.
3. RENT & ESCALATION: Rs. 4,50,000/- per month + GST with 15% escalation after 3 years.
4. SECURITY DEPOSIT: Rs. 27,00,000/- interest-free deposit.
5. ARBITRATION: Sole Arbitrator seated in Mumbai.`
  },

  // --- ADVANCED CIVIL ---
  {
    id: 'scen-adv-civil-1',
    levelId: 'ADVANCED',
    domainId: 'civil',
    title: 'Plaint for Specific Performance of Agreement to Sell & Injunction',
    documentType: 'Civil Plaint under Order VII CPC',
    difficulty: 'Advanced 🏆',
    readTime: '6 min',
    facts: `Plaintiff: Mr. Harish Chandra Gupta, Businessman, Civil Lines, Jaipur.
Defendant: Mr. Devendra Singh Rathore, Owner of Commercial Plot No. 88, Mansarovar, Jaipur (Area 500 sq. yards).
Agreement: Registered Agreement to Sell executed on 10.05.2024 for total consideration of ₹2,00,00,000/- (Two Crores).
Advance Paid: Plaintiff paid ₹50,00,000/- earnest money via RTGS on execution. Balance ₹1.5 Crores payable on registration on or before 10.11.2024.
Plaintiff\'s Readiness: Plaintiff issued statutory notice on 15.10.2024 with bank statement proving ready funds; attended Sub-Registrar office on 10.11.2024 (affidavit of attendance marked).
Defendant\'s Breach: Defendant failed to appear, refused to execute Sale Deed, and attempted to alienate property to third party.
Relief Sought: Decree of Specific Performance under Section 16(c) & 20 Specific Relief Act 1963; alternative refund of ₹50 Lakhs with 18% interest and ₹25 Lakhs damages; Permanent Injunction restraining third-party transfer.`,
    task: 'Draft a comprehensive Civil Plaint under Order VII CPC containing mandatory Readiness & Willingness averments (Sec 16(c) Specific Relief Act), Cause of Action, Jurisdiction, Court Fee valuation, and Prayers.',
    requiredElements: [
      'Full Court Heading: In the Court of District Judge at Jaipur',
      'Order VII Rule 1 CPC compliance: description of parties, property schedule',
      'Specific recital of Agreement to Sell dated 10.05.2024 and ₹50L earnest money paid',
      'Mandatory averment under Section 16(c) Specific Relief Act: Continuous readiness and willingness',
      'Attendance at Sub-Registrar on 10.11.2024 with bank solvency evidence',
      'Cause of Action dates (10.05.2024, 15.10.2024, 10.11.2024)',
      'Valuation for Court Fees and Jurisdiction under Court Fees Act',
      'Primary Prayer for Specific Performance and Alternative Prayer for refund + damages + permanent injunction',
      'Verification under Order VI Rule 15 CPC'
    ],
    legalReferences: [
      { act: 'Specific Relief Act, 1963', section: 'Section 10, 16(c), 20', note: 'Specific performance of contracts and readiness/willingness' },
      { act: 'Code of Civil Procedure, 1908', section: 'Order VII Rules 1-11 & Order XXXIX', note: 'Plaint requirements and temporary injunction' }
    ],
    template: `IN THE COURT OF DISTRICT JUDGE AT JAIPUR, RAJASTHAN

Civil Suit No. ______ of 2025

IN THE MATTER OF:
Harish Chandra Gupta, S/o Sh. R.K. Gupta,
R/o 14, Civil Lines, Jaipur.
... PLAINTIFF

VERSUS

Devendra Singh Rathore, S/o Sh. G.S. Rathore,
R/o Plot 88, Mansarovar, Jaipur.
... DEFENDANT

SUIT FOR SPECIFIC PERFORMANCE OF AGREEMENT TO SELL DATED 10.05.2024 AND PERMANENT INJUNCTION

PLAINT UNDER ORDER VII RULE 1 & 2 OF THE CODE OF CIVIL PROCEDURE, 1908:
1. That the Plaintiff is a businessman residing in Jaipur...
2. That the Defendant executed a Registered Agreement to Sell on 10.05.2024 for Plot No. 88, Mansarovar for Rs. 2,00,00,000/-, receiving Rs. 50,00,000/- advance...
3. [Section 16(c) Mandatory Averment] That the Plaintiff has always been and continues to be ready and willing to perform his part of the contract...
4. That on 10.11.2024, Plaintiff attended the Sub-Registrar office with balance funds, but Defendant defaulted...
PRAYER:
a) Pass a decree of Specific Performance directing Defendant to execute Sale Deed;
b) Alternatively decree refund of Rs. 50,00,000/- with 18% interest and damages;
c) Permanent injunction restraining third party alienation.
[VERIFICATION]`
  },

  // --- ADVANCED CRIMINAL ---
  {
    id: 'scen-adv-crim-1',
    levelId: 'ADVANCED',
    domainId: 'criminal',
    title: 'Anticipatory Bail Petition under Section 482 BNSS 2023',
    documentType: 'Anticipatory Bail Petition',
    difficulty: 'Advanced 🏆',
    readTime: '6 min',
    facts: `Petitioner: Dr. Anita Sengupta, Renowned Chief Medical Officer at Horizon Hospital, Kolkata.
FIR: FIR No. 142/2025, PS Bidhannagar, Kolkata, registered under Sections 105 (Culpable Homicide not amounting to murder) and 61(2) (Criminal Conspiracy) of BNS 2023.
Context: False medical negligence allegation filed by politically influential relative of a patient who suffered sudden cardiac arrest despite standard emergency protocols.
Grounds:
1. Medical negligence governed by Jacob Mathew v. State of Punjab principles: no prima facie reckless or gross negligence.
2. Independent Inquiry Committee of 3 senior doctors exonerated the petitioner.
3. IPC/BNS jurisprudence requires preliminary medical opinion before arresting medical professionals.
4. Petitioner is an eminent surgeon with 22 years unblemished career, ready to cooperate with investigation.`,
    task: 'Draft an Anticipatory Bail Petition under Section 482 BNSS 2023 before the High Court of Calcutta invoking medical negligence jurisprudence and safeguards.',
    requiredElements: [
      'Court header: In the High Court at Calcutta (Constitutional/Criminal Appellate Jurisdiction)',
      'Reference to Section 482 BNSS 2023 (Anticipatory Bail)',
      'FIR particulars: FIR No. 142/2025, Sections 105 & 61(2) BNS 2023',
      'Distinction between civil error of judgment and gross criminal negligence (Jacob Mathew precedent)',
      'Exoneration report by 3-member medical inquiry board',
      'Pre-arrest bail undertaking under Section 482(2) BNSS: join interrogation, no witness intimidation, no departure from India without leave',
      'Specific prayer for direction to release on bail in the event of arrest'
    ],
    legalReferences: [
      { act: 'Bharatiya Nagarik Suraksha Sanhita, 2023', section: 'Section 482', note: 'Direction for grant of bail to person apprehending arrest (equivalent to 438 CrPC)' },
      { act: 'Supreme Court of India', section: 'Jacob Mathew v. State of Punjab (2005) 6 SCC 1', note: 'Standard of criminal medical negligence' }
    ],
    template: `IN THE HIGH COURT AT CALCUTTA
CRIMINAL MISCELLANEOUS JURISDICTION

CRM (A) No. _______ of 2025

IN THE MATTER OF:
Dr. Anita Sengupta, W/o Sh. Subhash Sengupta,
Residing at Salt Lake Sector V, Kolkata.
... PETITIONER

VERSUS

The State of West Bengal
... RESPONDENT

APPLICATION UNDER SECTION 482 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 FOR GRANT OF ANTICIPATORY BAIL

TO THE HON'BLE CHIEF JUSTICE AND HIS COMPANION JUSTICES OF THE HIGH COURT AT CALCUTTA:
1. That the Petitioner apprehends arrest in connection with FIR No. 142/2025...
2. That the allegations pertain to medical treatment where an expert committee has already exonerated the Petitioner...
3. That the ratio of the Hon'ble Supreme Court in Jacob Mathew applies with full force...
PRAYER: Direct that in the event of arrest, Petitioner be released on bail on such terms as this Hon'ble Court deems fit.`
  },

  // --- ADVANCED LEGISLATIVE DRAFTING ---
  {
    id: 'scen-adv-leg-1',
    levelId: 'ADVANCED',
    domainId: 'legislative',
    title: 'Statutory Amendment Clause for Digital Data Protection',
    documentType: 'Legislative Amendment Bill Clause',
    difficulty: 'Advanced 🏆',
    readTime: '6 min',
    facts: `Context: Ministry of Law & Justice drafting model statutory provisions for Student Data Privacy in Higher Educational Institutions.
Objective: Draft a formal statutory section containing:
1. Short title, extent, and commencement.
2. Definitions of "Educational Data Fiduciary", "Student Sensitive Personal Data", and "Biometric Attendance Logs".
3. Substantive obligation: Prohibiting processing of student biometric and behavioural data without verifiable guardian consent for minors, or explicit student consent for adults.
4. Statutory exemptions: Emergency medical health response and examination malpractice investigations.
5. Penalty clause: Tiered monetary penalties up to ₹50,00,000/- for unauthorized data transfer to commercial third parties.`,
    task: 'Draft a formal Statutory Bill Section with Long Title, Enacting Formula, Definitions, Substantive Prohibitions, Provisos (Exceptions), and Penalty Provisions.',
    requiredElements: [
      'Bill Caption and Enacting Formula: "Be it enacted by Parliament in the Seventy-Seventh Year of the Republic of India..."',
      'Section 1: Short title, extent, and commencement clause',
      'Section 2: Clear, unambiguous statutory definitions',
      'Section 3: Mandatory data protection duties and restrictions on processing',
      'Proviso clause: Narrow statutory exceptions for medical emergency and examination integrity',
      'Section 4: Penalties and Adjudication mechanism'
    ],
    legalReferences: [
      { act: 'Digital Personal Data Protection Act, 2023', section: 'Section 6, 9 & 33', note: 'Consent principles and processing of children data' },
      { act: 'Constitution of India', section: 'Article 21 & Schedule VII', note: 'Right to privacy and legislative competence' }
    ],
    template: `THE HIGHER EDUCATION STUDENT DATA PRIVACY AND PROTECTION BILL, 2025

A BILL
To safeguard the digital privacy, biometric records, and personal autonomy of students enrolled in higher educational institutions.

BE it enacted by Parliament in the Seventy-Seventh Year of the Republic of India as follows:

1. SHORT TITLE, EXTENT AND COMMENCEMENT.—
(1) This Act may be called the Higher Education Student Data Protection Act, 2025.
(2) It extends to the whole of India.
(3) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint.

2. DEFINITIONS.—
In this Act, unless the context otherwise requires,—
(a) "Educational Data Fiduciary" means any University, College, or Technical Institute determining the purpose and means of data processing;
(b) "Student Personal Data" means any identifiable biometric, academic, or behavioural metric...

3. RESTRICTIONS ON BIOMETRIC AND SURVEILLANCE PROCESSING.—
(1) No Educational Data Fiduciary shall deploy automated facial recognition or process biometric data without prior affirmative consent.
Provided that nothing in this sub-section shall apply to emergency medical responses during campus crises.

4. PENALTIES.—
Contravention of Section 3 shall attract a penalty not exceeding Rupees Fifty Lakhs.`
  }
];

export const seedBadges = [
  { id: 'first_lesson', name: 'First Step in Law', icon: '📚', description: 'Completed your first legal drafting theory lesson.', xp: 50 },
  { id: 'quiz_master', name: 'Quiz Master', icon: '🧠', description: 'Passed the Drafting Basics Quiz Gate with 70%+ score.', xp: 100 },
  { id: 'civil_drafter', name: 'Civil Litigator', icon: '⚖️', description: 'Submitted your first Civil Plaint or Statutory Legal Notice.', xp: 100 },
  { id: 'criminal_drafter', name: 'BNS & BNSS Specialist', icon: '🏛️', description: 'Drafted a formal criminal complaint or bail petition under new criminal laws.', xp: 100 },
  { id: 'conveyancing_pro', name: 'Conveyancing Pro', icon: '📄', description: 'Successfully drafted a commercial or residential tenancy agreement.', xp: 100 },
  { id: 'redraft_champion', name: 'Iterative Drafter', icon: '✍️', description: 'Improved and resubmitted a draft based on Grounded AI Feedback.', xp: 75 },
  { id: 'level_master', name: 'Level Conqueror', icon: '⚡', description: 'Passed a Level Progression Test and unlocked a higher learning tier.', xp: 200 },
  { id: 'legal_scholar', name: 'Legal Drafting Master', icon: '👑', description: 'Completed the Final Assessment and earned the verified Certificate of Completion.', xp: 500 }
];

export const seedLevelTests = {
  BASIC: {
    levelId: 'BASIC',
    title: 'Basic Level Certification Test',
    passingPercentage: 75,
    questions: [
      {
        id: 'bt-1',
        question: 'In a statutory legal notice under Section 106 of the Transfer of Property Act, what is the default statutory notice period for terminating a residential month-to-month tenancy?',
        options: [
          { id: 'A', text: '15 days expiring with the end of a month of the tenancy' },
          { id: 'B', text: '6 months mandatory' },
          { id: 'C', text: '24 hours verbal notice' },
          { id: 'D', text: 'No notice is needed' }
        ],
        correctOption: 'A'
      },
      {
        id: 'bt-2',
        question: 'Under Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), which section corresponds to the Magistrate’s power to direct police investigation upon complaint?',
        options: [
          { id: 'A', text: 'Section 175(3) BNSS' },
          { id: 'B', text: 'Section 482 IPC' },
          { id: 'C', text: 'Order 39 CPC' },
          { id: 'D', text: 'Section 138 NI Act' }
        ],
        correctOption: 'A'
      },
      {
        id: 'bt-3',
        question: 'What is the consequence of executing an 11-month lease agreement without mandatory registration under Section 17 of the Registration Act 1908?',
        options: [
          { id: 'A', text: 'It remains legally valid and admissible because leases under 1 year are exempt from compulsory registration' },
          { id: 'B', text: 'The agreement is void ab initio' },
          { id: 'C', text: 'The landlord is arrested' },
          { id: 'D', text: 'The rent is doubled automatically' }
        ],
        correctOption: 'A'
      },
      {
        id: 'bt-4',
        question: 'What must accompany an affidavit to satisfy procedural rules under CPC and Oaths Act?',
        options: [
          { id: 'A', text: 'A formal verification specifying which paragraphs are true to personal knowledge and which to legal advice' },
          { id: 'B', text: 'A medical fitness certificate' },
          { id: 'C', text: 'A photograph of the court building' },
          { id: 'D', text: 'A letter of recommendation from an MP' }
        ],
        correctOption: 'A'
      }
    ]
  },
  MEDIUM: {
    levelId: 'MEDIUM',
    title: 'Medium Level Advancement Test',
    passingPercentage: 75,
    questions: [
      {
        id: 'mt-1',
        question: 'What is the statutory limitation period for dispatching a demand notice under Section 138(b) of the Negotiable Instruments Act after receiving the Bank Return Memo?',
        options: [
          { id: 'A', text: 'Within 30 days of the receipt of information from the bank' },
          { id: 'B', text: 'Within 15 days of cheque bounce' },
          { id: 'C', text: 'Within 3 years' },
          { id: 'D', text: 'Within 60 days' }
        ],
        correctOption: 'A'
      },
      {
        id: 'mt-2',
        question: 'In drafting a Regular Bail Application under Section 483 BNSS, which landmark principle established that "Bail is the rule, jail is the exception"?',
        options: [
          { id: 'A', text: 'State of Rajasthan v. Balchand & Satender Kumar Antil v. CBI' },
          { id: 'B', text: 'Donoghue v. Stevenson' },
          { id: 'C', text: 'Carlill v. Carbolic Smoke Ball Co.' },
          { id: 'D', text: 'Balfour v. Balfour' }
        ],
        correctOption: 'A'
      },
      {
        id: 'mt-3',
        question: 'What does a "Liquidated Damages" clause in a commercial lock-in lease require to be enforceable under Section 74 of the Indian Contract Act?',
        options: [
          { id: 'A', text: 'It must be a genuine pre-estimate of loss, not an unconscionable penalty clause' },
          { id: 'B', text: 'It must be equal to 100 times the property value' },
          { id: 'C', text: 'It must be signed by the police' },
          { id: 'D', text: 'It must be written in Latin' }
        ],
        correctOption: 'A'
      }
    ]
  }
};

export const seedFinalAssessment = {
  id: 'final-assessment-main',
  title: 'Comprehensive Legal Drafting Final Assessment',
  passingPercentage: 80,
  sections: [
    {
      id: 'sec-a',
      title: 'Section A: Theory & Statutory Interpretation',
      questions: [
        {
          id: 'fa-1',
          question: 'Under Order VII Rule 11 CPC, on which ground can a plaint be rejected at the threshold without trial?',
          options: [
            { id: 'A', text: 'Where it does not disclose a cause of action or is barred by any law (e.g. Limitation Act)' },
            { id: 'B', text: 'Where the defendant requests an adjournment' },
            { id: 'C', text: 'Where the plaintiff has not filed 50 pages of evidence' },
            { id: 'D', text: 'Where the advocate is under 30 years of age' }
          ],
          correctOption: 'A'
        },
        {
          id: 'fa-2',
          question: 'In the Bharatiya Nyaya Sanhita (BNS 2023), which section replaces IPC Section 420 (Cheating & Dishonestly Inducing Delivery of Property)?',
          options: [
            { id: 'A', text: 'Section 318(4) BNS 2023' },
            { id: 'B', text: 'Section 103 BNS 2023' },
            { id: 'C', text: 'Section 420 BNS 2023' },
            { id: 'D', text: 'Section 500 BNS 2023' }
          ],
          correctOption: 'A'
        }
      ]
    },
    {
      id: 'sec-b',
      title: 'Section B: Practical Drafting Challenge',
      taskPrompt: 'Draft an operative prayer clause for a suit seeking permanent injunction and recovery of commercial arrears under CPC.',
      sampleSolution: 'Pass a decree for recovery of ₹15,00,000/- along with interest @ 18% p.a. and grant permanent injunction restraining defendant from alienating the suit property.'
    }
  ]
};

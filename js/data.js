/* Spark — Seeded mock data (single source of truth).
   Static, hand-authored, never changes at runtime. This is the "Pre-demo state".
   Pages must NEVER read SPARK_DATA directly — always go through getMergedData()
   in storage.js so runtime (localStorage) overrides are applied. */

const SPARK_DATA = {
  users: {
    'sarah.chen@cibc.com': {
      name: 'Sarah Chen',
      role: 'employee',
      title: 'Reconciliation Analyst',
      department: 'Operational',
      avatarInitials: 'SC',
      progressionStage: 'daily-user', // 'beginner' | 'daily-user' | 'ai-expert' | 'ai-champion'
      wins: {
        timeSavedMinutes: 260,
        tasksCompleted: 12,
        promptsContributed: 3,
        ideasPosted: 0,
        dayStreak: 5
      }
    },
    'david.kim@cibc.com': {
      name: 'David Kim',
      role: 'manager',
      title: 'Operational Team Manager',
      department: 'Operational',
      avatarInitials: 'DK',
      progressionStage: 'ai-champion',
      wins: {
        timeSavedMinutes: 180,
        tasksCompleted: 9,
        promptsContributed: 2,
        ideasPosted: 1,
        dayStreak: 3
      }
    }
  },

  pledges: {
    enterprise: {
      text: 'At CIBC, we use AI to amplify our people, never to replace their judgment. Every AI-assisted decision remains owned by a person who understands it.',
      lastUpdated: '2026-05-01'
    },
    departments: {
      Operational: {
        manager: 'David Kim',
        managerTitle: 'Operational Team Manager',
        text: 'Our team uses AI to move faster on routine reconciliation and communication work, while keeping a human firmly in control of anything that touches client money or risk.',
        // Task values are drawn from the shared Boundaries vocabulary (DESIGN_LOGIC 4.2.3).
        encouragedTasks: ['Drafting internal reconciliation notes', 'Email summarization'],
        checkFirstTasks: ['Approval drafting on >$100k items'],
        lastUpdated: '2026-06-15'
      },
      Risk: {
        manager: 'Maya Patel',
        managerTitle: 'Risk Team Manager',
        text: 'In Risk, we treat AI as a drafting assistant and nothing more. Use it to organize and summarize, but every output passes human review before it informs a decision. When something feels uncertain, slow down and escalate rather than ship it.',
        // Conservative posture: few encouraged tasks, more flagged for oversight.
        encouragedTasks: ['Summarizing audit findings'],
        checkFirstTasks: ['Client-facing communications', 'Approval drafting on >$100k items'],
        lastUpdated: '2026-06-20'
      },
      Finance: {
        manager: 'James Liu',
        managerTitle: 'Finance Team Manager',
        text: 'Finance runs on accuracy and traceability, and AI must serve both. Lean on it to speed up routine summaries, but verify every figure against the source and keep a clear record of what you checked. Anything that touches reported numbers stays under human sign-off.',
        encouragedTasks: ['Summarizing audit findings', 'Email summarization'],
        checkFirstTasks: ['Approval drafting on >$100k items'],
        lastUpdated: '2026-06-10'
      },
      Technology: null   // intentionally null — demonstrates the "not yet published" empty state
    }
  },

  // Confidence mapping is fixed per workflow ID (SPEC.md Section 7):
  //   discrepancy-explanation -> medium, audit-summary -> high, approval-email -> low
  workflows: [
    {
      id: 'discrepancy-explanation',
      family: 'reconciliation',
      name: 'Discrepancy Explanation',
      mockConfidence: 'medium',
      summary: 'Draft a plain-English explanation for a flagged reconciliation discrepancy.',
      boundaryTask: 'Drafting internal reconciliation notes',
      boundaryRecap: ['Allowed', 'Human review required', 'Low risk'],
      confidenceNote: 'The date range in your input was ambiguous; verify the period covered.',
      prompt: 'Explain the likely cause of the following reconciliation discrepancy in plain English for an internal note.',
      promptSource: { caseId: 'case-001', title: 'Cut reconciliation note time in half', upvotes: 8 },
      sampleInput: 'Account 4471 shows a $1,240 variance between the ledger and the bank statement for 2026-06-12.',
      mockOutput: 'The $1,240 variance on account 4471 most likely reflects a timing difference: a vendor payment cleared the bank on 2026-06-12 but was posted to the ledger on 2026-06-13. Confirm the posting date before closing.',
      checklist: [
        'Confirm the variance amount against the source statement.',
        'Verify the suggested cause matches the actual posting dates.',
        'Check no client-facing figures are affected.',
        'Add your initials before filing the note.'
      ],
      usedByCount: 24,
      estTimeSavedMinutes: 20
    },
    {
      id: 'audit-summary',
      family: 'reconciliation',
      name: 'Audit Pattern Summary',
      mockConfidence: 'high',
      summary: 'Summarize recurring patterns across a batch of audit findings.',
      boundaryTask: 'Summarizing audit findings',
      boundaryRecap: ['Allowed', 'Human review recommended', 'Low risk'],
      prompt: 'Summarize the recurring patterns in the following set of audit findings.',
      promptSource: { caseId: 'case-002', title: 'Faster audit roll-ups for Q2', upvotes: 12 },
      sampleInput: '14 audit findings from Q2 2026 across reconciliation, access control, and reporting.',
      mockOutput: 'Across the 14 Q2 findings, two patterns recur: (1) timing differences in vendor payments account for 6 findings, and (2) delayed access-revocation on role changes accounts for 4. The remaining 4 are isolated reporting formatting issues.',
      checklist: [
        'Confirm the finding count matches the source batch.',
        'Spot-check two of the grouped findings for accuracy.'
      ],
      usedByCount: 18,
      estTimeSavedMinutes: 35
    },
    {
      id: 'approval-email',
      family: 'email-approval',
      name: 'Approval Email Draft',
      mockConfidence: 'low',
      summary: 'Draft an approval request email for a high-value item.',
      boundaryTask: 'Approval drafting on >$100k items',
      boundaryRecap: ['Check first', 'Human review required', 'Elevated risk'],
      confidenceNote: 'High-value items require full human review; confirm every figure against source documents.',
      prompt: 'Draft a concise approval request email for the following high-value item.',
      promptSource: { caseId: 'case-003', title: 'Cleaner approval emails', upvotes: 4 },
      sampleInput: 'Approval needed for a $140,000 vendor renewal, due 2026-07-01.',
      mockOutput: 'Subject: Approval requested — $140,000 vendor renewal (due Jul 1)\n\nHi [Approver],\n\nRequesting your approval for the $140,000 renewal of our vendor contract, due 2026-07-01. Key terms are unchanged from last year. Happy to walk through details.\n\nThanks,\n[Your name]',
      checklist: [
        'Verify the dollar amount and due date are correct.',
        'Confirm the approver name and routing.',
        'Check that no confidential terms are exposed.',
        'Review tone for an external/internal audience.',
        'Edit at least one line before sending (required for low-confidence output).'
      ],
      usedByCount: 11,
      estTimeSavedMinutes: 15
    }
  ],

  peerCases: [
    {
      id: 'case-001',
      title: 'Cut reconciliation note time in half',
      author: 'Sarah Chen',
      department: 'Operational',
      workflowId: 'discrepancy-explanation',
      workflowName: 'Discrepancy Explanation',
      confidence: 'medium',
      prompt: 'Explain the likely cause of this reconciliation discrepancy in plain English.',
      summary: 'Used the discrepancy workflow to draft first-pass notes, then verified posting dates manually.',
      originalOutput: 'The variance most likely reflects a timing difference between bank clearance and ledger posting. Confirm the posting date before closing.',
      finalOutput: 'The variance most likely reflects a timing difference between bank clearance and ledger posting on 2026-06-13. Confirm the posting date before closing.',
      checklistCompleted: [
        'Confirm the variance amount against the source statement.',
        'Verify the suggested cause matches the actual posting dates.',
        'Check no client-facing figures are affected.'
      ],
      timeSavedMinutes: 25,
      upvotes: 8,
      createdAt: '2026-06-10'
    },
    {
      id: 'case-002',
      title: 'Faster audit roll-ups for Q2',
      author: 'David Kim',
      department: 'Operational',
      workflowId: 'audit-summary',
      workflowName: 'Audit Pattern Summary',
      confidence: 'high',
      prompt: 'Summarize the recurring patterns in this set of audit findings.',
      summary: 'Grouped 14 findings into clear themes for the quarterly review deck.',
      originalOutput: 'Across the 14 Q2 findings, two patterns recur: timing differences in vendor payments (6) and delayed access-revocation (4).',
      finalOutput: 'Across the 14 Q2 findings, two patterns recur: timing differences in vendor payments (6) and delayed access-revocation (4).',
      checklistCompleted: [
        'Confirm the finding count matches the source batch.',
        'Spot-check two of the grouped findings for accuracy.'
      ],
      timeSavedMinutes: 40,
      upvotes: 12,
      createdAt: '2026-06-12'
    },
    {
      id: 'case-003',
      title: 'Cleaner approval emails',
      author: 'Sarah Chen',
      department: 'Operational',
      workflowId: 'approval-email',
      workflowName: 'Approval Email Draft',
      confidence: 'low',
      prompt: 'Draft a concise approval request email for this high-value item.',
      summary: 'Drafted a starting point, then heavily edited before sending given the low confidence.',
      originalOutput: 'Subject: Approval requested — $140,000 vendor renewal (due Jul 1)\n\nHi [Approver], requesting approval for the renewal due 2026-07-01.',
      finalOutput: 'Subject: Approval requested — $140,000 vendor renewal (due Jul 1)\n\nHi Jordan, please approve the $140,000 vendor renewal due 2026-07-01. Terms unchanged from last year.',
      checklistCompleted: [
        'Verify the dollar amount and due date are correct.',
        'Confirm the approver name and routing.',
        'Edit at least one line before sending (required for low-confidence output).'
      ],
      timeSavedMinutes: 10,
      upvotes: 4,
      createdAt: '2026-06-14'
    },
    {
      id: 'case-004',
      title: 'Onboarding summary for new analysts',
      author: 'David Kim',
      department: 'Operational',
      workflowId: 'audit-summary',
      workflowName: 'Audit Pattern Summary',
      confidence: 'high',
      prompt: 'Summarize the key patterns a new analyst should watch for.',
      summary: 'Turned a year of findings into a one-page primer.',
      originalOutput: 'New analysts should watch for timing differences in vendor payments and delayed access-revocation after role changes.',
      finalOutput: 'New analysts should watch for timing differences in vendor payments and delayed access-revocation after role changes.',
      checklistCompleted: [
        'Confirm the finding count matches the source batch.',
        'Spot-check two of the grouped findings for accuracy.'
      ],
      timeSavedMinutes: 60,
      upvotes: 15,
      createdAt: '2026-06-16'
    },
    {
      id: 'case-005',
      title: 'Explaining variances to non-finance partners',
      author: 'Sarah Chen',
      department: 'Operational',
      workflowId: 'discrepancy-explanation',
      workflowName: 'Discrepancy Explanation',
      confidence: 'medium',
      prompt: 'Explain this variance in plain English for a non-finance reader.',
      summary: 'Reframed technical notes for a business stakeholder audience.',
      originalOutput: 'The variance is likely a timing difference between when the bank cleared the payment and when it posted to our ledger.',
      finalOutput: 'The variance is likely a timing difference — the bank cleared the payment on Tuesday, but we posted it Wednesday. No client impact.',
      checklistCompleted: [
        'Confirm the variance amount against the source statement.',
        'Verify the suggested cause matches the actual posting dates.',
        'Check no client-facing figures are affected.'
      ],
      timeSavedMinutes: 20,
      upvotes: 6,
      createdAt: '2026-06-18'
    }
  ],

  // 1 pre-seeded comment (SPEC.md Section 5.2)
  comments: {
    'case-001': [
      {
        author: 'David Kim',
        role: 'manager',
        text: 'Great example — remember to always confirm posting dates before filing, as you noted.',
        createdAt: '2026-06-11'
      }
    ]
  },

  ideas: [
    {
      id: 'idea-001',
      title: 'AI helper for month-end checklist',
      author: 'Sarah Chen',
      summary: 'A guided prompt that walks through the month-end reconciliation checklist step by step.',
      upvotes: 9,
      createdAt: '2026-06-05'
    },
    {
      id: 'idea-002',
      title: 'Plain-English variance glossary',
      author: 'David Kim',
      summary: 'A shared glossary that explains common variance causes for newer analysts.',
      upvotes: 7,
      createdAt: '2026-06-08'
    },
    {
      id: 'idea-003',
      title: 'Approval email template library',
      author: 'Sarah Chen',
      summary: 'A small library of vetted approval-email starting points by item type.',
      upvotes: 5,
      createdAt: '2026-06-13'
    }
  ],

  pods: [
    {
      id: 'pod-001',
      name: 'Reconciliation AI Practice',
      cadence: 'Weekly, Thursdays 2pm',
      members: 6,
      summary: 'A small group sharing prompts and reviewing AI-assisted reconciliation work.'
    }
  ],

  rulings: [
    {
      id: 'ruling-001',
      question: 'Can AI draft client-facing variance explanations?',
      ruling: 'Yes for internal notes; client-facing copy must be written or fully rewritten by a person.',
      decidedBy: 'AI Governance Director',
      decidedAt: '2026-05-20'
    },
    {
      id: 'ruling-002',
      question: 'Can AI generate approval emails for items over $100k?',
      ruling: 'AI may draft a starting point, but a human must edit and own the final email. Treated as low-confidence.',
      decidedBy: 'AI Governance Director',
      decidedAt: '2026-06-01'
    }
  ],

  faq: [
    { id: 'faq-001', question: 'Is my AI activity monitored by my manager?', answer: 'No. Spark never exposes one person\u2019s activity or progression to anyone else.' },
    { id: 'faq-002', question: 'What does the Confidence Indicator mean?', answer: 'It is a mocked signal of how much human review an output likely needs: High, Medium, or Low.' },
    { id: 'faq-003', question: 'Who owns an AI-assisted decision?', answer: 'Always the person who uses it. AI assists; people remain accountable.' },
    { id: 'faq-004', question: 'Can I use AI for anything?', answer: 'Check your department pledge and the Boundaries list. When unsure, ask the Director.' },
    { id: 'faq-005', question: 'Where do my submitted cases go?', answer: 'They appear in Explore \u2192 Peer Cases for your team to learn from.' }
  ],

  boundaries: [
    {
      task: 'Drafting internal reconciliation notes',
      status: 'encouraged',
      family: 'reconciliation',
      humanReview: 'Quick scan before filing',
      notes: 'Use Workflows to keep an audit trail.',
      workflowId: 'discrepancy-explanation'
    },
    {
      task: 'Summarizing audit findings',
      status: 'encouraged',
      family: 'reconciliation',
      humanReview: 'Spot-check grouped findings',
      notes: 'Allowed for internal summaries only.',
      workflowId: 'audit-summary'
    },
    {
      task: 'Email summarization',
      status: 'encouraged',
      family: 'email-approval',
      humanReview: 'Verify names and figures',
      notes: 'Do not paste client account numbers into prompts.',
      workflowId: null
    },
    {
      task: 'Approval drafting on >$100k items',
      status: 'check-first',
      family: 'email-approval',
      humanReview: 'Required — treat as low confidence',
      notes: 'Check with your manager before sending.',
      workflowId: 'approval-email'
    },
    {
      task: 'Client-facing communications',
      status: 'check-first',
      family: 'email-approval',
      humanReview: 'Required — person must own final copy',
      notes: 'AI may draft; a human must rewrite before external use.',
      workflowId: null
    },
    {
      task: 'Final sign-off on financial decisions',
      status: 'not-allowed',
      family: 'reconciliation',
      humanReview: 'Not permitted',
      notes: 'Human sign-off must be fully manual.',
      workflowId: null
    }
  ],

  directorEndorsement: {
    text: 'Operational AI use is encouraged within the boundaries published here. When a task is ambiguous, ask before you act — a quick ruling is always better than a slow correction.',
    name: 'AI Governance Director',
    title: 'Director, Enterprise Risk Management',
    lastUpdated: '2026-05-01'
  },

  documentResources: [
    {
      id: 'doc-001',
      title: 'CIBC AI Acceptable Use Policy [sample]',
      description: 'Enterprise-wide principles for sanctioned AI use.'
    },
    {
      id: 'doc-002',
      title: 'Data Classification Guide [sample]',
      description: 'What counts as client or confidential data in prompts.'
    },
    {
      id: 'doc-003',
      title: 'Client Information Handling Rules [sample]',
      description: 'Handling requirements when email threads mention clients.'
    }
  ],

  chatbotDemo: [
    {
      id: 'bot-001',
      question: 'Can I use AI on KYC emails?',
      answer: 'KYC documents are not approved for AI input. For general internal email summarization without client identifiers, see Email summarization in Boundaries.'
    },
    {
      id: 'bot-002',
      question: 'What counts as client data for AI purposes?',
      answer: 'Client names, account numbers, KYC documents, and any material that could identify a client externally. When in doubt, treat it as client data and ask the Director.'
    },
    {
      id: 'bot-003',
      question: 'Is it OK to paste a reconciliation ledger into an AI tool?',
      answer: 'Yes for internal reconciliation notes when no client identifiers are included. Use Workflows so your verification is recorded.'
    },
    {
      id: 'bot-004',
      question: 'What do I do if AI gives me an answer I\'m not sure about?',
      answer: 'Do not use the output as-is. Edit and verify in Workflows, or ask the Director if the task sits in a gray area.'
    }
  ],

  championReward: {
    title: 'AI Champion Achievement',
    digital: 'A private AI Champion trophy on your profile \u2014 visible only to you.',
    material: [
      'Recognition gift from the AI adoption program',
      'Invitation to the quarterly Champion circle',
      'Nomination for internal recognition'
    ],
    disclaimer: 'Reward details are shared by your program lead. This prototype shows illustrative copy only.'
  },

  events: [
    {
      id: 'event-001',
      date: '2026-07-02',
      title: 'Reconciliation AI Practice POD',
      type: 'pod',
      format: 'virtual',
      description: 'Weekly prompt-sharing session with the Reconciliation AI Practice POD.'
    },
    {
      id: 'event-002',
      date: '2026-07-10',
      title: 'AI in Operations Workshop',
      type: 'workshop',
      format: 'in-person',
      description: 'Organization-run session on safe AI use in operational workflows.'
    },
    {
      id: 'event-003',
      date: '2026-07-15',
      title: 'Quarterly Ideas Review',
      type: 'ideas',
      format: 'virtual',
      description: 'Review of top-voted Ideas Lab submissions across the organization.'
    }
  ]
};

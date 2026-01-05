// NeoNoble Ramp & NeoExchange Pitch Deck Data

export const companyInfo = {
  name: "NeoNoble Ramp & NeoExchange",
  website: "https://crypto-onramp-2.emergent.host",
  tagline: "Fiat-to-Crypto & Crypto-to-Fiat Routing Platform",
  description: "A regulated-partner-powered bidirectional fiat-crypto routing platform"
};

export const slides = [
  {
    id: 1,
    title: "Company Overview",
    subtitle: "NeoNoble Ramp & NeoExchange",
    content: {
      headline: "The UX & Routing Layer for Regulated Crypto Access",
      description: "NeoNoble operates as a bidirectional fiat-to-crypto (On-Ramp) and crypto-to-fiat (Off-Ramp) routing platform where all liquidity, banking rails, and fiat settlement are handled entirely by regulated Provider-of-Record partners.",
      keyPoints: [
        "UX, routing, and integration layer — not a financial intermediary",
        "Bidirectional flow: On-Ramp (fiat → crypto) & Off-Ramp (crypto → fiat)",
        "Partner-centric architecture with regulated Provider-of-Record model",
        "European-focused compliance alignment (EU + EEA)",
        "Developer-first routing and automation capabilities"
      ],
      website: "https://crypto-onramp-2.emergent.host"
    }
  },
  {
    id: 2,
    title: "Product Vision & Value Proposition",
    subtitle: "Why NeoNoble Exists",
    content: {
      vision: "To provide seamless, compliant crypto access through intelligent bidirectional routing and best-in-class UX — while ensuring all regulated operations (KYC, KYB, AML, custody, settlement) remain with licensed partners.",
      valueProps: [
        {
          title: "Bidirectional Flow",
          description: "Complete on-ramp and off-ramp coverage for full crypto lifecycle support"
        },
        {
          title: "Separation of Concerns",
          description: "Clear distinction between UX layer and regulated financial/payout rails"
        },
        {
          title: "Routing Intelligence",
          description: "Smart order routing to optimize for speed, cost, and availability across providers"
        },
        {
          title: "Compliance-First Design",
          description: "Built from the ground up with KYC, KYB, and AML regulatory alignment"
        }
      ],
      dualFlow: {
        onRamp: {
          title: "On-Ramp",
          flow: "Fiat (EUR) → Provider-of-Record → Digital Assets",
          benefits: ["Bank transfer (SEPA)", "Card payments", "Instant settlement"]
        },
        offRamp: {
          title: "Off-Ramp",
          flow: "Digital Assets → Provider-of-Record → Fiat (EUR IBAN)",
          benefits: ["SEPA payouts", "Business settlements", "Automated withdrawals"]
        }
      }
    }
  },
  {
    id: 3,
    title: "Target Users & Use-Cases",
    subtitle: "Who We Serve",
    content: {
      userSegments: [
        {
          segment: "Individual Users",
          description: "Retail crypto buyers and sellers seeking compliant EUR on/off-ramp access"
        },
        {
          segment: "Crypto Businesses",
          description: "Platforms requiring embedded fiat-crypto conversion and payout capabilities"
        },
        {
          segment: "Developers & Integrators",
          description: "Teams building fintech applications with bidirectional crypto components"
        }
      ],
      useCases: [
        "On-Ramp: Fiat → major digital assets (BTC, ETH, USDC, etc.)",
        "Off-Ramp: Crypto → EUR IBAN (SEPA payouts)",
        "Business settlements: Automated crypto-to-fiat treasury management",
        "Embedded partner integrations for B2B platforms",
        "Developer-focused routing and automation workflows",
        "Revenue-share partnership model implementation"
      ]
    }
  },
  {
    id: 4,
    title: "Market & Geography",
    subtitle: "European Focus",
    content: {
      primaryMarket: "European Union + European Economic Area (EEA)",
      marketStats: [
        { label: "EU Crypto Users", value: "31M+", note: "Growing 15% annually" },
        { label: "SEPA Coverage", value: "36 Countries", note: "Instant transfers" },
        { label: "MiCA Regulation", value: "2024-2025", note: "Harmonized framework" }
      ],
      geographicAdvantages: [
        "SEPA instant payments infrastructure for both on-ramp and off-ramp",
        "MiCA regulatory clarity and harmonization",
        "Strong consumer protection frameworks",
        "Mature banking and fintech ecosystem",
        "Cross-border EUR settlement capabilities"
      ]
    }
  },
  {
    id: 5,
    title: "Compliance & Provider-of-Record Model",
    subtitle: "Regulatory Architecture",
    content: {
      model: "Provider-of-Record Partnership",
      description: "All regulated financial operations are handled by our licensed Provider-of-Record partners. NeoNoble does not hold funds, process payments, custody assets, or conduct settlement.",
      partnerResponsibilities: [
        "KYC/KYB verification and identity management",
        "AML monitoring and transaction screening",
        "Banking relationships and fiat settlement",
        "Liquidity provision and order execution",
        "Asset custody and wallet management",
        "Regulatory reporting and compliance obligations",
        "Risk management and fraud prevention",
        "Fiat payout processing (Off-Ramp)"
      ],
      neonobleRole: [
        "User experience and interface design",
        "Routing logic and optimization",
        "API development and integration support",
        "Partner coordination and onboarding",
        "Technical infrastructure and uptime"
      ],
      complianceSplit: {
        onRamp: {
          kyc: "Provider handles user identity verification",
          aml: "Provider monitors incoming fiat transactions",
          settlement: "Provider executes crypto delivery"
        },
        offRamp: {
          kyb: "Provider handles business verification for payouts",
          aml: "Provider screens outgoing fiat transactions",
          payout: "Provider executes SEPA transfers to user IBAN"
        }
      }
    }
  },
  {
    id: 6,
    title: "Technical Architecture",
    subtitle: "High-Level Overview",
    content: {
      layers: [
        {
          name: "Presentation Layer",
          components: ["Web Application", "Mobile-Responsive UI", "Partner Widgets"]
        },
        {
          name: "Routing Layer",
          components: ["Smart Order Router", "Rate Aggregation", "Provider Selection", "Flow Direction Handler"]
        },
        {
          name: "Integration Layer",
          components: ["Partner APIs", "Webhook Events", "Status Tracking", "Payout Orchestration"]
        },
        {
          name: "Provider Layer",
          components: ["Transak", "MoonPay", "Ramp Network", "Banxa"]
        }
      ],
      features: [
        "RESTful API with comprehensive documentation",
        "Real-time rate comparison and optimization",
        "Multi-provider failover and redundancy",
        "Comprehensive logging and audit trails",
        "Bidirectional flow management (On-Ramp & Off-Ramp)"
      ],
      flowDiagram: {
        onRamp: {
          title: "On-Ramp Flow",
          steps: [
            { step: 1, label: "User initiates buy", actor: "NeoNoble UX" },
            { step: 2, label: "Route to optimal provider", actor: "Routing Layer" },
            { step: 3, label: "KYC verification", actor: "Provider-of-Record" },
            { step: 4, label: "Fiat collection (SEPA/Card)", actor: "Provider-of-Record" },
            { step: 5, label: "Crypto delivery to wallet", actor: "Provider-of-Record" }
          ]
        },
        offRamp: {
          title: "Off-Ramp Flow",
          steps: [
            { step: 1, label: "User initiates sell/payout", actor: "NeoNoble UX" },
            { step: 2, label: "Route to payout provider", actor: "Routing Layer" },
            { step: 3, label: "KYC/KYB verification", actor: "Provider-of-Record" },
            { step: 4, label: "Crypto collection & custody", actor: "Provider-of-Record" },
            { step: 5, label: "Fiat payout to IBAN (SEPA)", actor: "Provider-of-Record" }
          ]
        }
      }
    }
  },
  {
    id: 7,
    title: "Workflow & Value Chain",
    subtitle: "Bidirectional Flow Architecture",
    content: {
      workflows: {
        onRamp: {
          title: "On-Ramp: Fiat → Crypto",
          description: "User purchases digital assets using fiat currency",
          steps: [
            { phase: "Initiation", description: "User selects asset and amount via NeoNoble UX", owner: "NeoNoble" },
            { phase: "Routing", description: "Smart router selects optimal provider based on rate, speed, availability", owner: "NeoNoble" },
            { phase: "Verification", description: "KYC identity verification performed", owner: "Provider-of-Record" },
            { phase: "Collection", description: "Fiat collected via SEPA transfer or card payment", owner: "Provider-of-Record" },
            { phase: "Execution", description: "Crypto purchased and delivered to user wallet", owner: "Provider-of-Record" }
          ]
        },
        offRamp: {
          title: "Off-Ramp: Crypto → Fiat",
          description: "User converts digital assets to fiat payout",
          steps: [
            { phase: "Initiation", description: "User initiates sell/withdrawal via NeoNoble UX", owner: "NeoNoble" },
            { phase: "Routing", description: "Smart router selects optimal payout provider", owner: "NeoNoble" },
            { phase: "Verification", description: "KYC/KYB verification for payout eligibility", owner: "Provider-of-Record" },
            { phase: "Custody", description: "Crypto received and held in provider custody", owner: "Provider-of-Record" },
            { phase: "Settlement", description: "Fiat payout executed to user IBAN via SEPA", owner: "Provider-of-Record" }
          ]
        }
      },
      boundaries: {
        title: "Risk & Custody Boundary Model",
        neonoble: [
          "UX presentation and user journey",
          "Routing logic and provider selection",
          "API orchestration and webhooks",
          "Status tracking and notifications"
        ],
        provider: [
          "Fiat custody and banking relationships",
          "Crypto custody and wallet management",
          "KYC/KYB identity verification",
          "AML transaction monitoring",
          "Settlement and payout execution",
          "Regulatory compliance and reporting"
        ]
      }
    }
  },
  {
    id: 8,
    title: "Partnership & Integration Model",
    subtitle: "How We Work Together",
    content: {
      partnershipTypes: [
        {
          type: "Provider-of-Record Partner",
          description: "Licensed entities handling KYC, KYB, AML, custody, banking, and settlement for both on-ramp and off-ramp flows",
          benefits: ["Access to compliant user base", "Revenue share model", "Technical integration support", "Bidirectional volume"]
        },
        {
          type: "Distribution Partner",
          description: "Platforms embedding NeoNoble for their users' on-ramp and off-ramp needs",
          benefits: ["White-label options", "API-first integration", "Dedicated support", "Full lifecycle coverage"]
        }
      ],
      integrationOptions: [
        "Direct API integration",
        "Embedded widget (iframe)",
        "White-label deployment",
        "Custom implementation support"
      ],
      providerTouchpoints: {
        onRamp: ["Quote request", "KYC handoff", "Payment initiation", "Crypto delivery confirmation"],
        offRamp: ["Payout request", "KYC/KYB verification", "Crypto deposit address", "SEPA payout confirmation"]
      }
    }
  },
  {
    id: 9,
    title: "Revenue & Growth Strategy",
    subtitle: "Dual-Side Monetization",
    content: {
      revenueModel: "Bidirectional Revenue Share Partnership",
      description: "NeoNoble operates on a revenue-share basis with Provider-of-Record partners, capturing value from both on-ramp (fiat → crypto) and off-ramp (crypto → fiat) transaction flows.",
      projections: {
        earlyStage: "€10,000 – €50,000 / month",
        scalingPhase: "€50,000 – €200,000 / month",
        growthPhase: "€200,000+ / month"
      },
      revenueStreams: [
        { stream: "On-Ramp Fees", description: "Revenue share on fiat-to-crypto transactions" },
        { stream: "Off-Ramp Fees", description: "Revenue share on crypto-to-fiat payouts" },
        { stream: "B2B Integrations", description: "Enterprise API access and volume commitments" },
        { stream: "White-Label", description: "Platform licensing and customization fees" }
      ],
      growthDrivers: [
        "Partner network expansion (on-ramp & off-ramp providers)",
        "Geographic coverage increase across EU/EEA",
        "B2B integration pipeline for embedded finance",
        "Off-ramp volume growth from business payouts",
        "Marketing and user acquisition"
      ]
    }
  },
  {
    id: 10,
    title: "Roadmap",
    subtitle: "Phased Development",
    content: {
      phases: [
        {
          phase: "Phase 1",
          title: "Foundation",
          timeline: "Current",
          items: [
            "Core platform development",
            "Initial Provider-of-Record partnership",
            "EUR SEPA on-ramp launch",
            "Basic off-ramp (crypto → EUR) capability",
            "Basic API availability"
          ]
        },
        {
          phase: "Phase 2",
          title: "Expansion",
          timeline: "6-12 Months",
          items: [
            "Multi-provider routing (on-ramp & off-ramp)",
            "Advanced rate optimization",
            "B2B off-ramp for business payouts",
            "Enhanced developer tools",
            "KYB flow for business accounts"
          ]
        },
        {
          phase: "Phase 3",
          title: "Scale",
          timeline: "12-24 Months",
          items: [
            "Additional currency corridors",
            "White-label platform launch",
            "Enterprise-grade SLAs",
            "Extended geographic coverage",
            "Advanced treasury management tools"
          ]
        }
      ]
    }
  },
  {
    id: 11,
    title: "Contact & Partnership Discussion",
    subtitle: "Let's Build Together",
    content: {
      callToAction: "We're seeking strategic partnerships with regulated on-ramp and off-ramp providers who share our vision for compliant, user-friendly bidirectional crypto access.",
      discussionTopics: [
        "Provider-of-Record partnership structure",
        "On-Ramp & Off-Ramp integration requirements",
        "Revenue share and commercial terms",
        "Compliance and regulatory alignment",
        "Geographic expansion opportunities"
      ],
      contact: {
        platforms: [
          { name: "NeoNoble Ramp", description: "Crypto on-ramp platform", website: "https://crypto-onramp-2.emergent.host" },
          { name: "NeoExchange", description: "Fintech infrastructure & partner stack", website: "https://neoexchange.io" }
        ],
        email: "massimoadmin@neonoble.it"
      },
      closing: "Thank you for your consideration. We look forward to exploring how NeoNoble can complement your regulated services and expand access to compliant bidirectional crypto solutions across Europe."
    }
  }
];

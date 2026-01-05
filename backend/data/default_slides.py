"""Default pitch deck slides data for NeoNoble Ramp & NeoExchange"""

DEFAULT_SLIDES = [
    {
        "id": 1,
        "title": "Company Overview",
        "subtitle": "NeoNoble Ramp & NeoExchange",
        "content": {
            "headline": "The UX & Routing Layer for Regulated Crypto Access",
            "description": "NeoNoble operates as a fiat-to-crypto and crypto-to-fiat routing platform where all liquidity, banking rails, and fiat settlement are handled entirely by regulated Provider-of-Record partners.",
            "keyPoints": [
                "UX, routing, and integration layer \u2014 not a financial intermediary",
                "Partner-centric architecture with regulated Provider-of-Record model",
                "European-focused compliance alignment (EU + EEA)",
                "Developer-first routing and automation capabilities"
            ],
            "website": "https://crypto-onramp-2.emergent.host"
        }
    },
    {
        "id": 2,
        "title": "Product Vision & Value Proposition",
        "subtitle": "Why NeoNoble Exists",
        "content": {
            "vision": "To provide seamless, compliant crypto access through intelligent routing and best-in-class UX \u2014 while ensuring all regulated operations remain with licensed partners.",
            "valueProps": [
                {"title": "Separation of Concerns", "description": "Clear distinction between UX layer and regulated financial rails"},
                {"title": "Routing Intelligence", "description": "Smart order routing to optimize for speed, cost, and availability"},
                {"title": "Compliance-First Design", "description": "Built from the ground up with regulatory alignment in mind"},
                {"title": "Developer Experience", "description": "APIs and integrations designed for enterprise-grade deployment"}
            ]
        }
    },
    {
        "id": 3,
        "title": "Target Users & Use-Cases",
        "subtitle": "Who We Serve",
        "content": {
            "userSegments": [
                {"segment": "Individual Users", "description": "Retail crypto buyers and sellers seeking compliant EUR on/off-ramp"},
                {"segment": "Crypto Businesses", "description": "Platforms requiring embedded fiat-crypto conversion"},
                {"segment": "Developers & Integrators", "description": "Teams building fintech applications with crypto components"}
            ],
            "useCases": [
                "Crypto off-ramp \u2192 EUR IBAN (SEPA)",
                "Fiat on-ramp \u2192 major digital assets (BTC, ETH, USDC, etc.)",
                "Embedded partner integrations for B2B platforms",
                "Developer-focused routing and automation workflows",
                "Revenue-share partnership model implementation"
            ]
        }
    },
    {
        "id": 4,
        "title": "Market & Geography",
        "subtitle": "European Focus",
        "content": {
            "primaryMarket": "European Union + European Economic Area (EEA)",
            "marketStats": [
                {"label": "EU Crypto Users", "value": "31M+", "note": "Growing 15% annually"},
                {"label": "SEPA Coverage", "value": "36 Countries", "note": "Instant transfers"},
                {"label": "MiCA Regulation", "value": "2024-2025", "note": "Harmonized framework"}
            ],
            "geographicAdvantages": [
                "SEPA instant payments infrastructure",
                "MiCA regulatory clarity and harmonization",
                "Strong consumer protection frameworks",
                "Mature banking and fintech ecosystem"
            ]
        }
    },
    {
        "id": 5,
        "title": "Compliance & Provider-of-Record Model",
        "subtitle": "Regulatory Architecture",
        "content": {
            "model": "Provider-of-Record Partnership",
            "description": "All regulated financial operations are handled by our licensed Provider-of-Record partners. NeoNoble does not hold funds, process payments, or conduct settlement.",
            "partnerResponsibilities": [
                "KYC/KYB verification and identity management",
                "AML monitoring and transaction screening",
                "Banking relationships and fiat settlement",
                "Liquidity provision and order execution",
                "Regulatory reporting and compliance obligations",
                "Risk management and fraud prevention"
            ],
            "neonobleRole": [
                "User experience and interface design",
                "Routing logic and optimization",
                "API development and integration support",
                "Partner coordination and onboarding",
                "Technical infrastructure and uptime"
            ]
        }
    },
    {
        "id": 6,
        "title": "Technical Architecture",
        "subtitle": "High-Level Overview",
        "content": {
            "layers": [
                {"name": "Presentation Layer", "components": ["Web Application", "Mobile-Responsive UI", "Partner Widgets"]},
                {"name": "Routing Layer", "components": ["Smart Order Router", "Rate Aggregation", "Provider Selection"]},
                {"name": "Integration Layer", "components": ["Partner APIs", "Webhook Events", "Status Tracking"]},
                {"name": "Provider Layer", "components": ["Transak", "MoonPay", "Ramp Network", "Banxa"]}
            ],
            "features": [
                "RESTful API with comprehensive documentation",
                "Real-time rate comparison and optimization",
                "Multi-provider failover and redundancy",
                "Comprehensive logging and audit trails"
            ]
        }
    },
    {
        "id": 7,
        "title": "Partnership & Integration Model",
        "subtitle": "How We Work Together",
        "content": {
            "partnershipTypes": [
                {
                    "type": "Provider-of-Record Partner",
                    "description": "Licensed entities handling KYC, AML, banking, and settlement",
                    "benefits": ["Access to compliant user base", "Revenue share model", "Technical integration support"]
                },
                {
                    "type": "Distribution Partner",
                    "description": "Platforms embedding NeoNoble for their users",
                    "benefits": ["White-label options", "API-first integration", "Dedicated support"]
                }
            ],
            "integrationOptions": [
                "Direct API integration",
                "Embedded widget (iframe)",
                "White-label deployment",
                "Custom implementation support"
            ]
        }
    },
    {
        "id": 8,
        "title": "Revenue & Growth Strategy",
        "subtitle": "Sustainable Partnership Economics",
        "content": {
            "revenueModel": "Revenue Share Partnership",
            "description": "NeoNoble operates on a revenue-share basis with Provider-of-Record partners, aligning incentives for volume growth and user satisfaction.",
            "projections": {
                "earlyStage": "\u20ac10,000 \u2013 \u20ac50,000 / month",
                "scalingPhase": "\u20ac50,000 \u2013 \u20ac200,000 / month",
                "growthPhase": "\u20ac200,000+ / month"
            },
            "growthDrivers": [
                "Partner network expansion",
                "Geographic coverage increase",
                "B2B integration pipeline",
                "Product feature enhancement",
                "Marketing and user acquisition"
            ]
        }
    },
    {
        "id": 9,
        "title": "Roadmap",
        "subtitle": "Phased Development",
        "content": {
            "phases": [
                {
                    "phase": "Phase 1",
                    "title": "Foundation",
                    "timeline": "Current",
                    "items": [
                        "Core platform development",
                        "Initial Provider-of-Record partnership",
                        "EUR SEPA on/off-ramp launch",
                        "Basic API availability"
                    ]
                },
                {
                    "phase": "Phase 2",
                    "title": "Expansion",
                    "timeline": "6-12 Months",
                    "items": [
                        "Multi-provider routing implementation",
                        "Advanced rate optimization",
                        "B2B partner integrations",
                        "Enhanced developer tools"
                    ]
                },
                {
                    "phase": "Phase 3",
                    "title": "Scale",
                    "timeline": "12-24 Months",
                    "items": [
                        "Additional currency corridors",
                        "White-label platform launch",
                        "Enterprise-grade SLAs",
                        "Extended geographic coverage"
                    ]
                }
            ]
        }
    },
    {
        "id": 10,
        "title": "Contact & Partnership Discussion",
        "subtitle": "Let's Build Together",
        "content": {
            "callToAction": "We're seeking strategic partnerships with regulated on-ramp and off-ramp providers who share our vision for compliant, user-friendly crypto access.",
            "discussionTopics": [
                "Provider-of-Record partnership structure",
                "Revenue share and commercial terms",
                "Technical integration requirements",
                "Compliance and regulatory alignment",
                "Geographic expansion opportunities"
            ],
            "contact": {
                "platforms": [
                    {"name": "NeoNoble Ramp", "description": "Crypto-onramp platform", "website": "https://crypto-onramp-2.emergent.host"},
                    {"name": "NeoExchange", "description": "Exchange & fintech infrastructure", "website": "https://neoexchange.io"}
                ],
                "email": "massimoadmin@neonoble.it"
            },
            "closing": "Thank you for your consideration. We look forward to exploring how NeoNoble can complement your regulated services and expand access to compliant crypto solutions across Europe."
        }
    }
]

COMPANY_INFO = {
    "name": "NeoNoble Ramp & NeoExchange",
    "tagline": "Fiat-to-Crypto Routing Platform",
    "description": "A regulated-partner-powered fiat-to-crypto and crypto-to-fiat routing platform",
    "platforms": [
        {"name": "NeoNoble Ramp", "description": "Crypto-onramp platform", "website": "https://crypto-onramp-2.emergent.host"},
        {"name": "NeoExchange", "description": "Exchange & fintech infrastructure", "website": "https://neoexchange.io"}
    ],
    "email": "massimoadmin@neonoble.it"
}

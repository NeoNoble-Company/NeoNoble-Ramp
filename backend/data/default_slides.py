"""Default pitch deck slides data for NeoNoble Ramp & NeoExchange - With NENO Token Fixed-Value Model"""

DEFAULT_SLIDES = [
    {
        "id": 1,
        "title": "Company Overview",
        "subtitle": "NeoNoble Ramp & NeoExchange",
        "content": {
            "headline": "The UX & Routing Layer for Regulated Crypto Access",
            "description": "NeoNoble operates as a bidirectional fiat-to-crypto (On-Ramp) and crypto-to-fiat (Off-Ramp) routing platform where all liquidity, banking rails, and fiat settlement are handled entirely by regulated Provider-of-Record partners.",
            "keyPoints": [
                "UX, routing, and integration layer — not a financial intermediary",
                "Bidirectional flow: On-Ramp (fiat → crypto) & Off-Ramp (crypto → fiat)",
                "NENO Token: Fixed-value model at €10,000/unit on BSC",
                "Partner-centric architecture with regulated Provider-of-Record model",
                "European-focused compliance alignment (EU + EEA)"
            ],
            "website": "https://crypto-onramp-2.emergent.host"
        }
    },
    {
        "id": 2,
        "title": "Product Vision & Value Proposition",
        "subtitle": "Why NeoNoble Exists",
        "content": {
            "vision": "To provide seamless, compliant crypto access through intelligent bidirectional routing and best-in-class UX — while ensuring all regulated operations (KYC, KYB, AML, custody, settlement) remain with licensed partners.",
            "valueProps": [
                {"title": "NENO Fixed-Value Model", "description": "Platform-defined €10,000/unit token enabling predictable on/off-ramp conversions"},
                {"title": "Separation of Concerns", "description": "Clear distinction between UX/token abstraction and regulated financial rails"},
                {"title": "Routing Intelligence", "description": "Smart order routing with integrated pricing orchestration layer"},
                {"title": "Compliance-First Design", "description": "Built from the ground up with KYC, KYB, and AML regulatory alignment"}
            ],
            "dualFlow": {
                "onRamp": {
                    "title": "On-Ramp",
                    "flow": "Fiat (EUR) → Provider-of-Record → Digital Assets / NENO",
                    "benefits": ["Bank transfer (SEPA)", "Card payments", "NENO at €10,000/unit"]
                },
                "offRamp": {
                    "title": "Off-Ramp",
                    "flow": "Digital Assets / NENO → Provider-of-Record → Fiat (EUR IBAN)",
                    "benefits": ["SEPA payouts", "NENO redemption at €10,000/unit", "Business settlements"]
                }
            },
            "nenoModel": {
                "token": "NeoNoble Token (NENO)",
                "chain": "BSC (Binance Smart Chain)",
                "fixedValue": "€10,000 per unit",
                "onRamp": "Fiat → NENO purchase at fixed €10,000/unit",
                "offRamp": "NENO → Fiat redemption at fixed €10,000/unit",
                "valueNote": "Platform-defined fixed value — not market-driven"
            }
        }
    },
    {
        "id": 3,
        "title": "Target Users & Use-Cases",
        "subtitle": "Who We Serve",
        "content": {
            "userSegments": [
                {"segment": "Individual Users", "description": "Retail crypto buyers and sellers seeking compliant EUR on/off-ramp access"},
                {"segment": "Crypto Businesses", "description": "Platforms requiring embedded fiat-crypto conversion and payout capabilities"},
                {"segment": "Developers & Integrators", "description": "Teams building fintech applications with bidirectional crypto components"}
            ],
            "useCases": [
                "On-Ramp: Fiat → NENO (€10,000/unit) or major digital assets",
                "Off-Ramp: NENO/Crypto → EUR IBAN (SEPA payouts)",
                "NENO Token: Fixed-value conversion at €10,000 per unit",
                "Business settlements: Automated crypto-to-fiat treasury management",
                "Embedded partner integrations for B2B platforms",
                "Developer-focused routing and automation workflows"
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
                "SEPA instant payments infrastructure for both on-ramp and off-ramp",
                "MiCA regulatory clarity and harmonization",
                "Strong consumer protection frameworks",
                "Mature banking and fintech ecosystem",
                "Cross-border EUR settlement capabilities"
            ]
        }
    },
    {
        "id": 5,
        "title": "Compliance & Provider-of-Record Model",
        "subtitle": "Regulatory Architecture",
        "content": {
            "model": "Provider-of-Record Partnership",
            "description": "All regulated financial operations are handled by our licensed Provider-of-Record partners. NeoNoble does not hold funds, process payments, custody assets, or conduct settlement. NENO token pricing is platform-defined at the application layer.",
            "partnerResponsibilities": [
                "KYC/KYB verification and identity management",
                "AML monitoring and transaction screening",
                "Banking relationships and fiat settlement",
                "Liquidity provision and order execution",
                "Asset custody and wallet management (including NENO on BSC)",
                "Regulatory reporting and compliance obligations",
                "Risk management and fraud prevention",
                "Fiat payout processing (Off-Ramp / NENO redemption)"
            ],
            "neonobleRole": [
                "User experience and interface design",
                "NENO token pricing orchestration (€10,000 fixed value)",
                "Routing logic and optimization",
                "API development and integration support",
                "Technical infrastructure and uptime"
            ],
            "complianceSplit": {
                "onRamp": {
                    "kyc": "Provider handles user identity verification",
                    "aml": "Provider monitors incoming fiat transactions",
                    "settlement": "Provider executes NENO/crypto delivery",
                    "pricing": "NeoNoble defines NENO fixed value (€10,000/unit)"
                },
                "offRamp": {
                    "kyb": "Provider handles business verification for payouts",
                    "aml": "Provider screens outgoing fiat transactions",
                    "payout": "Provider executes SEPA transfers for NENO redemption",
                    "pricing": "NeoNoble defines NENO redemption value (€10,000/unit)"
                }
            },
            "nenoCompliance": {
                "title": "NENO Token Compliance Boundaries",
                "platformLayer": "Price anchoring & value abstraction (NeoNoble)",
                "regulatedLayer": "Fiat rails, custody & AML (Provider-of-Record)"
            }
        }
    },
    {
        "id": 6,
        "title": "Technical Architecture",
        "subtitle": "High-Level Overview",
        "content": {
            "layers": [
                {"name": "Presentation Layer", "components": ["Web Application", "Mobile-Responsive UI", "Partner Widgets"]},
                {"name": "Pricing & Value Layer", "components": ["NENO Price Anchoring (€10,000)", "Value Mapping Engine", "Token Abstraction"]},
                {"name": "Routing Layer", "components": ["Smart Order Router", "Rate Aggregation", "Provider Selection", "Flow Direction Handler"]},
                {"name": "Integration Layer", "components": ["Partner APIs", "BSC Integration", "Webhook Events", "Payout Orchestration"]},
                {"name": "Provider Layer", "components": ["Transak", "MoonPay", "Ramp Network", "Banxa"]}
            ],
            "features": [
                "NENO fixed-value pricing at €10,000/unit (platform-defined)",
                "BSC chain integration for NENO token operations",
                "Real-time rate comparison and optimization",
                "Multi-provider failover and redundancy",
                "Bidirectional flow management (On-Ramp & Off-Ramp)"
            ],
            "nenoArchitecture": {
                "title": "NENO Token Technical Model",
                "chain": "BSC (Binance Smart Chain)",
                "pricing": "Fixed €10,000 per unit — platform-defined, not market-driven",
                "layers": {
                    "uxLayer": "User interface & token value abstraction",
                    "pricingLayer": "Price anchoring at application/orchestration layer",
                    "providerLayer": "Fiat rails & settlement via Provider-of-Record"
                }
            }
        }
    },
    {
        "id": 7,
        "title": "Workflow & Value Chain",
        "subtitle": "Bidirectional Flow Architecture",
        "content": {
            "workflows": {
                "onRamp": {
                    "title": "On-Ramp: Fiat → NENO/Crypto",
                    "description": "User purchases NENO (€10,000/unit) or other digital assets",
                    "steps": [
                        {"phase": "Initiation", "description": "User selects NENO or asset amount via NeoNoble UX", "owner": "NeoNoble"},
                        {"phase": "Pricing", "description": "NENO priced at fixed €10,000/unit by platform", "owner": "NeoNoble"},
                        {"phase": "Verification", "description": "KYC identity verification performed", "owner": "Provider-of-Record"},
                        {"phase": "Collection", "description": "Fiat collected via SEPA transfer or card payment", "owner": "Provider-of-Record"},
                        {"phase": "Execution", "description": "NENO (BSC) or crypto delivered to user wallet", "owner": "Provider-of-Record"}
                    ]
                },
                "offRamp": {
                    "title": "Off-Ramp: NENO/Crypto → Fiat",
                    "description": "User redeems NENO (€10,000/unit) or converts crypto to fiat",
                    "steps": [
                        {"phase": "Initiation", "description": "User initiates NENO redemption or sell via NeoNoble UX", "owner": "NeoNoble"},
                        {"phase": "Pricing", "description": "NENO redemption at fixed €10,000/unit by platform", "owner": "NeoNoble"},
                        {"phase": "Verification", "description": "KYC/KYB verification for payout eligibility", "owner": "Provider-of-Record"},
                        {"phase": "Custody", "description": "NENO/Crypto received in provider custody", "owner": "Provider-of-Record"},
                        {"phase": "Settlement", "description": "Fiat payout executed to user IBAN via SEPA", "owner": "Provider-of-Record"}
                    ]
                }
            },
            "boundaries": {
                "title": "Risk & Custody Boundary Model",
                "neonoble": [
                    "UX presentation and user journey",
                    "NENO price anchoring (€10,000 fixed value)",
                    "Token value abstraction layer",
                    "Routing logic and provider selection",
                    "API orchestration and webhooks"
                ],
                "provider": [
                    "Fiat custody and banking relationships",
                    "NENO/Crypto custody and wallet management (BSC)",
                    "KYC/KYB identity verification",
                    "AML transaction monitoring",
                    "Settlement and payout execution",
                    "Regulatory compliance and reporting"
                ]
            },
            "nenoFlow": {
                "title": "NENO Token Operating Model",
                "token": "NeoNoble Token (NENO)",
                "chain": "BSC (Binance Smart Chain)",
                "fixedValue": "€10,000 per unit",
                "onRampFlow": "EUR → Provider-of-Record → NENO (BSC wallet)",
                "offRampFlow": "NENO (BSC) → Provider-of-Record → EUR (IBAN)",
                "valueNote": "Fixed value is platform-defined at application layer"
            }
        }
    },
    {
        "id": 8,
        "title": "Partnership & Integration Model",
        "subtitle": "How We Work Together",
        "content": {
            "partnershipTypes": [
                {
                    "type": "Provider-of-Record Partner",
                    "description": "Licensed entities handling KYC, KYB, AML, custody, banking, and settlement for both on-ramp and off-ramp flows including NENO",
                    "benefits": ["Access to compliant user base", "Revenue share model", "Technical integration support", "NENO token volume"]
                },
                {
                    "type": "Distribution Partner",
                    "description": "Platforms embedding NeoNoble for their users' on-ramp and off-ramp needs",
                    "benefits": ["White-label options", "API-first integration", "Dedicated support", "Full lifecycle coverage"]
                }
            ],
            "integrationOptions": [
                "Direct API integration",
                "Embedded widget (iframe)",
                "White-label deployment",
                "Custom implementation support"
            ],
            "providerTouchpoints": {
                "onRamp": ["Quote request", "KYC handoff", "Payment initiation", "NENO/Crypto delivery confirmation"],
                "offRamp": ["Payout request", "KYC/KYB verification", "NENO/Crypto deposit address", "SEPA payout confirmation"]
            }
        }
    },
    {
        "id": 9,
        "title": "Revenue & Growth Strategy",
        "subtitle": "Dual-Side Monetization",
        "content": {
            "revenueModel": "Bidirectional Revenue Share Partnership",
            "description": "NeoNoble operates on a revenue-share basis with Provider-of-Record partners, capturing value from both on-ramp (fiat → NENO/crypto) and off-ramp (NENO/crypto → fiat) transaction flows.",
            "projections": {
                "earlyStage": "€10,000 – €50,000 / month",
                "scalingPhase": "€50,000 – €200,000 / month",
                "growthPhase": "€200,000+ / month"
            },
            "revenueStreams": [
                {"stream": "On-Ramp Fees", "description": "Revenue share on fiat-to-NENO/crypto transactions"},
                {"stream": "Off-Ramp Fees", "description": "Revenue share on NENO/crypto-to-fiat payouts"},
                {"stream": "B2B Integrations", "description": "Enterprise API access and volume commitments"},
                {"stream": "White-Label", "description": "Platform licensing and customization fees"}
            ],
            "growthDrivers": [
                "NENO token adoption and fixed-value conversions",
                "Partner network expansion (on-ramp & off-ramp providers)",
                "Geographic coverage increase across EU/EEA",
                "B2B integration pipeline for embedded finance",
                "Off-ramp volume growth from business payouts"
            ]
        }
    },
    {
        "id": 10,
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
                        "NENO token (BSC) integration at €10,000/unit",
                        "Initial Provider-of-Record partnership",
                        "EUR SEPA on-ramp launch",
                        "Basic off-ramp (NENO/crypto → EUR) capability"
                    ]
                },
                {
                    "phase": "Phase 2",
                    "title": "Expansion",
                    "timeline": "6-12 Months",
                    "items": [
                        "Multi-provider routing (on-ramp & off-ramp)",
                        "Advanced NENO pricing orchestration",
                        "B2B off-ramp for business payouts",
                        "Enhanced developer tools",
                        "KYB flow for business accounts"
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
                        "Extended geographic coverage",
                        "Advanced treasury management tools"
                    ]
                }
            ]
        }
    },
    {
        "id": 11,
        "title": "Contact & Partnership Discussion",
        "subtitle": "Let's Build Together",
        "content": {
            "callToAction": "We're seeking strategic partnerships with regulated on-ramp and off-ramp providers who share our vision for compliant, user-friendly bidirectional crypto access including NENO token operations.",
            "discussionTopics": [
                "Provider-of-Record partnership structure",
                "NENO token on-ramp & off-ramp integration",
                "Revenue share and commercial terms",
                "Compliance and regulatory alignment",
                "Geographic expansion opportunities"
            ],
            "contact": {
                "platforms": [
                    {"name": "NeoNoble Ramp", "description": "Crypto on-ramp platform", "website": "https://crypto-onramp-2.emergent.host"},
                    {"name": "NeoExchange", "description": "Fintech infrastructure & partner stack", "website": "https://neoexchange.io"}
                ],
                "email": "massimoadmin@neonoble.it"
            },
            "closing": "Thank you for your consideration. We look forward to exploring how NeoNoble can complement your regulated services and expand access to compliant bidirectional crypto solutions — including NENO token — across Europe."
        }
    }
]

COMPANY_INFO = {
    "name": "NeoNoble Ramp & NeoExchange",
    "tagline": "Fiat-to-Crypto & Crypto-to-Fiat Routing Platform with NENO Token",
    "description": "A regulated-partner-powered bidirectional fiat-crypto routing platform with NENO Token fixed-value model",
    "nenoToken": {
        "name": "NeoNoble Token",
        "symbol": "NENO",
        "chain": "BSC (Binance Smart Chain)",
        "fixedValue": "€10,000 per unit",
        "valueModel": "Platform-defined fixed value"
    },
    "platforms": [
        {"name": "NeoNoble Ramp", "description": "Crypto on-ramp platform", "website": "https://crypto-onramp-2.emergent.host"},
        {"name": "NeoExchange", "description": "Fintech infrastructure & partner stack", "website": "https://neoexchange.io"}
    ],
    "email": "massimoadmin@neonoble.it"
}

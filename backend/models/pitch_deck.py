from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid


class SlideContent(BaseModel):
    """Generic slide content model"""
    headline: Optional[str] = None
    description: Optional[str] = None
    keyPoints: Optional[List[str]] = None
    website: Optional[str] = None
    vision: Optional[str] = None
    valueProps: Optional[List[Dict[str, str]]] = None
    userSegments: Optional[List[Dict[str, str]]] = None
    useCases: Optional[List[str]] = None
    primaryMarket: Optional[str] = None
    marketStats: Optional[List[Dict[str, str]]] = None
    geographicAdvantages: Optional[List[str]] = None
    model: Optional[str] = None
    partnerResponsibilities: Optional[List[str]] = None
    neonobleRole: Optional[List[str]] = None
    layers: Optional[List[Dict[str, Any]]] = None
    features: Optional[List[str]] = None
    partnershipTypes: Optional[List[Dict[str, Any]]] = None
    integrationOptions: Optional[List[str]] = None
    revenueModel: Optional[str] = None
    projections: Optional[Dict[str, str]] = None
    growthDrivers: Optional[List[str]] = None
    phases: Optional[List[Dict[str, Any]]] = None
    callToAction: Optional[str] = None
    discussionTopics: Optional[List[str]] = None
    contact: Optional[Dict[str, Any]] = None
    closing: Optional[str] = None


class Slide(BaseModel):
    """Individual slide model"""
    id: int
    title: str
    subtitle: str
    content: Dict[str, Any]


class PitchDeck(BaseModel):
    """Complete pitch deck model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = "NeoNoble Ramp & NeoExchange"
    version: str = "1.0"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    slides: List[Slide]


class PitchDeckCreate(BaseModel):
    """Model for creating a new pitch deck"""
    name: str
    slides: List[Slide]


class CompanyInfo(BaseModel):
    """Company information model"""
    name: str = "NeoNoble Ramp & NeoExchange"
    tagline: str = "Fiat-to-Crypto Routing Platform"
    description: str = "A regulated-partner-powered fiat-to-crypto and crypto-to-fiat routing platform"
    platforms: List[Dict[str, str]] = [
        {"name": "NeoNoble Ramp", "description": "Crypto-onramp platform", "website": "https://crypto-onramp-2.emergent.host"},
        {"name": "NeoExchange", "description": "Exchange & fintech infrastructure", "website": "https://neoexchange.io"}
    ]
    email: str = "massimoadmin@neonoble.it"

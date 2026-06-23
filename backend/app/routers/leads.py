from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.limiter import limiter
from app.models import Lead
from app.schemas import LeadCreate, LeadResponse
from app.services.spam import is_spam
from app.services.telegram import send_telegram_notification

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post("", response_model=LeadResponse, status_code=201)
@limiter.limit("5/minute")
async def create_lead(
    request: Request,
    payload: LeadCreate,
    db: Session = Depends(get_db),
):
    contact_method = payload.contact_method or "telegram"

    spam_reason = is_spam(
        payload.name,
        payload.contact,
        payload.description,
        payload.honeypot,
        contact_method,
    )
    if spam_reason:
        raise HTTPException(status_code=400, detail=spam_reason)

    ip = request.client.host if request.client else None

    lead = Lead(
        name=payload.name.strip(),
        contact=payload.contact.strip(),
        contact_method=contact_method,
        description=payload.description.strip(),
        ip_address=ip,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)

    await send_telegram_notification(lead.name, lead.contact, lead.description)

    return LeadResponse(id=lead.id, message="Thank you! We'll be in touch soon.")

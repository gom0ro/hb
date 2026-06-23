from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from sqlalchemy.orm import Session

from app.config import settings
from app.database import Base, engine, get_db
from app.limiter import limiter
from app.models import Lead
from app.routers import leads
from app.schemas import LeadAdmin

app = FastAPI(title="ItHub API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

Base.metadata.create_all(bind=engine)

# migration: add contact_method column for SQLite
import sqlalchemy as sa
inspector = sa.inspect(engine)
if "contact_method" not in [c["name"] for c in inspector.get_columns("leads")]:
    with engine.connect() as conn:
        conn.execute(sa.text("ALTER TABLE leads ADD COLUMN contact_method VARCHAR(20) NOT NULL DEFAULT 'telegram'"))
        conn.commit()

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/admin/leads", response_model=list[LeadAdmin])
def admin_list_leads(
    x_admin_token: str = Header(...),
    db: Session = Depends(get_db),
):
    if x_admin_token != settings.admin_token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    rows = db.query(Lead).order_by(Lead.created_at.desc()).all()
    return [
        LeadAdmin(
            id=r.id,
            name=r.name,
            contact=r.contact,
            description=r.description,
            ip_address=r.ip_address,
            created_at=r.created_at.isoformat() if r.created_at else "",
        )
        for r in rows
    ]

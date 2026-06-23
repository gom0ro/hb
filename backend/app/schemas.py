from pydantic import BaseModel, Field


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    contact: str = Field(..., min_length=3, max_length=120)
    contact_method: str = Field(default="telegram")
    description: str = Field(..., min_length=10, max_length=5000)
    honeypot: str = Field(default="")


class LeadResponse(BaseModel):
    id: int
    message: str

    model_config = {"from_attributes": True}


class LeadAdmin(BaseModel):
    id: int
    name: str
    contact: str
    contact_method: str
    description: str
    ip_address: str | None
    created_at: str

    model_config = {"from_attributes": True}

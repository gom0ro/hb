from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite:///./dev.db"
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""
    whatsapp_phone_number_id: str = ""
    whatsapp_access_token: str = ""
    whatsapp_to: str = ""
    cors_origins: str = "http://localhost:5173,http://localhost:3000"
    rate_limit: str = "5/minute"
    admin_token: str = "change-me-in-production"

    class Config:
        env_file = ".env"


settings = Settings()

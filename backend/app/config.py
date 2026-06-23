from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite:///./dev.db"
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""
    cors_origins: str = "http://localhost:5173,http://localhost:5174,http://localhost:3000"
    rate_limit: str = "10/minute"
    admin_token: str = "ithub-admin-2024"

    class Config:
        env_file = ".env"


settings = Settings()

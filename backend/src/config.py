import os
from pydantic import BaseModel


class Settings(BaseModel):
    # Database
    DATABASE_URL: str

    # JWT
    SECRET_KEY: str
    REFRESH_SECRET_KEY: str
    ALGORITHM: str = "HS256"

    # Token Expiration
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # App
    ENVIRONMENT: str = "development"


settings = Settings(
    DATABASE_URL=os.getenv("DATABASE_URL", "postgresql://app_user:app_password@db:5432/app_db"),
    SECRET_KEY=os.getenv("SECRET_KEY", "your-default-secret-key"),
    REFRESH_SECRET_KEY=os.getenv("REFRESH_SECRET_KEY", "your-default-refresh-secret-key"),
    ALGORITHM=os.getenv("ALGORITHM", "HS256"),
    ACCESS_TOKEN_EXPIRE_MINUTES=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")),
    REFRESH_TOKEN_EXPIRE_DAYS=int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7")),
    ENVIRONMENT=os.getenv("ENVIRONMENT", "development")
)
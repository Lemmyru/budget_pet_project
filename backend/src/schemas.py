from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from enum import Enum

class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"

class User(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None

class UserCreate(BaseModel):
    name: str
    email: str
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: str
    password: str

class Transaction(BaseModel):
    id: int
    amount: float
    category: str
    date: datetime
    type: TransactionType
    description: Optional[str] = None

    class Config:
        from_attributes = True

class CreateTransaction(BaseModel):
    amount: float = Field(..., gt=0)
    category: str
    type: TransactionType
    description: Optional[str] = None
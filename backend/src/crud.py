from datetime import datetime

from sqlalchemy.orm import Session
from . import models
from . import schemas
import bcrypt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    password_bytes = user.password.encode('utf-8')
    hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password.decode('utf-8')
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None

    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False

    try:
        password_bytes = password.encode('utf-8')
        hashed_bytes = user.password.encode('utf-8')
        if bcrypt.checkpw(password_bytes, hashed_bytes):
            return user
        return False
    except Exception as e:
        print(f"Authentication error: {e}")
        return False

def get_user_transactions(db: Session, user_id: int):
    return db.query(models.Transaction) \
        .filter(models.Transaction.user_id == user_id) \
        .order_by(models.Transaction.date.desc()) \
        .all()

def get_transaction_by_id(db: Session, transaction_id: int, user_id: int):
    return db.query(models.Transaction) \
        .filter(models.Transaction.id == transaction_id, models.Transaction.user_id == user_id) \
        .first()


def create_transaction(db: Session, transaction: schemas.CreateTransaction, user_id: int):
    db_transaction = models.Transaction(
        amount=transaction.amount,
        category=transaction.category,
        description=transaction.description,
        type=transaction.type,
        date=datetime.now(),
        user_id=user_id
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def delete_transaction(db: Session, transaction_id: int, user_id: int):
    db_transaction = get_transaction_by_id(db, transaction_id, user_id)
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
        return True
    return False
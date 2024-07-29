from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import logging

logger = logging.getLogger(__name__)

db = SQLAlchemy()

class Pet(db.Model):
    __tablename__ = "pets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    breed = db.Column(db.String(120), nullable=False)
    profile_photo = db.Column(db.String(100))
    
    def __repr__(self):
        return f'<Pet {self.name}>'

class Poke(db.Model):
    __tablename__ = "poke"
    id = db.Column(db.Integer, primary_key=True)
    from_pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    to_pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    
    def __repr__(self):
        return f'<Poke {self.id}>'

def register_pet(pet):
    db.session.add(pet)
    db.session.commit()
    return pet

def get_pets():
    return Pet.query.all()

def get_pet_by_name(name):
    logger.info("Pet being searched: %s", name)
    
    try:
        pet = Pet.query.filter(func.lower(Pet.name) == name.lower()).first()
        logger.info("Query result: %s", pet)
        return pet
    except Exception as e:
        logger.error("Error occurred during pet search: %s", e)
        return None

def get_pet_by_id(id):
    logger.info("Pet id being searched: %s", id)
    
    try:
        pet = Pet.query.filter_by(id=id).first()
        logger.info("Query result: %s", pet)
        return pet
    except Exception as e:
        logger.error("Error occurred during pet search: %s", e)
        return None

def register_poke(from_pet_id, to_pet_id):
    poke = Poke(from_pet_id=from_pet_id, to_pet_id=to_pet_id)
    db.session.add(poke)
    db.session.commit()
    return check_match(from_pet_id, to_pet_id)

def check_match(from_pet_id, to_pet_id):
    return Poke.query.filter_by(from_pet_id=to_pet_id, to_pet_id=from_pet_id).first() is not None

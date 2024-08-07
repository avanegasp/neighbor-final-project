import sys
from sqlalchemy import Column, ForeignKey, Integer, String as SQLEnum
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class RoleEnum(enum.Enum):
    ADMINISTRATOR ="ADMINISTRATOR"
    NEIGHBOR = "NEIGHBOR"
    SELLER = "SELLER"


class Neighbor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(580), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    lastName = db.Column(db.String(80), unique=False, nullable=False)
    floor = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(50), nullable=False, default=RoleEnum.NEIGHBOR.value)
      
    sellers = db.relationship('Seller')
    administrators = db.relationship('Administrator') 


    def __repr__(self):
        return f'<Neighbor {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "name": self.name,
            "lastName": self.lastName,
            "floor": self.floor,
            "role": self.role,
            'seller': [seller.serialize() for seller in self.sellers],
            'admins': [admins.serialize() for admins in self.admins],

            # do not serialize the password, its a security breach
        }

class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(580), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    lastName = db.Column(db.String(80), unique=False, nullable=False)
    floor = db.Column(db.String(80), unique=False, nullable=False)
    shopName= db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(50), nullable=False, default=RoleEnum.SELLER.value)
    neighbor_id = db.Column(Integer,ForeignKey('neighbor.id'))



    def __repr__(self):
        return f'<Seller {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "name": self.name,
            "lastName": self.lastName,
            "floor": self.floor,
            "shopName": self.shopName,
            "role": self.role

            # do not serialize the password, its a security breach
        } 

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(580), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    floor = db.Column(db.String(80), unique=False, nullable=False)
    buildingName = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(50), nullable=False, default=RoleEnum.ADMINISTRATOR.value)
    neighbor_id = db.Column(Integer,ForeignKey('neighbor.id'))

    building = db.relationship('Building')



    def __repr__(self):
        return f'<ADMINISTRATOR {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "floor": self.floor,
            "buildingName": self.buildingName,
            "role": self.role,
            'building': [building.serialize() for building in self.buildings],

            # do not serialize the password, its a security breach
        }               

class Building(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bouldingName = db.Column(db.String(80), unique=False, nullable=False)
    administrator_id = db.Column(Integer,ForeignKey('administrator.id'))



    def __repr__(self):
        return f'<BUILDING {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "buildingName": self.buildingName,
            
            # do not serialize the password, its a security breach
        }    



    
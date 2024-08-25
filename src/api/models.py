import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Date,Float as SQLEnum
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class RoleEnum(enum.Enum):
    ADMINISTRATOR ="ADMINISTRATOR"
    NEIGHBOR = "NEIGHBOR"
    SELLER = "SELLER"

class StatusEnum(enum.Enum):
    APPROVED ="APPROVED"
    REJECTED = "REJECTED"
    PENDING = "PENDING"

class Neighbor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(580), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    floor = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(50), nullable=False, default=RoleEnum.NEIGHBOR.value)
    status = db.Column(db.String(50), nullable=False, default=StatusEnum.PENDING.value)
    

    review = db.relationship('Review', backref='Neighbor', uselist=False) 
    


    review = db.relationship('Review', backref='Neighbor', uselist=False)
    recommendations = db.relationship('Recommendation', backref='neighbor')


    def __repr__(self):
        return f'<Neighbor {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "name": self.name,
            "lastname": self.lastname,
            "floor": self.floor,
            "role": self.role,

        

            "recommendations": [recommendation.serialize() for recommendation in self.recommendations],
            "status": self.status

            # do not serialize the password, its a security breach
        }

class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(580), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    floor = db.Column(db.String(80), unique=False, nullable=False)
    shopName= db.Column(db.String(80), unique=False, nullable=False)
    phone= db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(50), nullable=False, default=RoleEnum.SELLER.value)
    status = db.Column(db.String(50), nullable=False, default=StatusEnum.PENDING.value)

    products = db.relationship('Product', back_populates='seller')
    orders = db.relationship('Order', backref='seller')

   

    recommendations = db.relationship('Recommendation', backref="seller")


    def __repr__(self):
        return f'<Seller {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "floor": self.floor,
            "shopName": self.shopName,
            "phone": self.phone,
            "role": self.role,
            "orders": [order.serialize() for order in self.orders],
       
            "recommendations": [recommendation.serialize() for recommendation in self.recommendations],
            "status": self.status

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
    
    
    buildings = db.relationship('Building', backref='administrator')  # Cambiado a 'buildings'
    recommendations = db.relationship('Recommendation', backref='administrator')

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
            "neighbor": self.neighbor_id,
            "seller": self.seller_id,
            'buildings': [building.serialize() for building in self.buildings],
            "recommendations": [recommendation.serialize() for recommendation in self.recommendations]
            # do not serialize the password, its a security breach
        }



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
            'buildings': [building.serialize() for building in self.buildings],

            # do not serialize the password, its a security breach
        }               

class Building(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buildingName = db.Column(db.String(80), unique=False, nullable=False)
    administrator_id = db.Column(db.Integer, db.ForeignKey('administrator.id'))

    def __repr__(self):
        return f'<BUILDING {self.buildingName}>'

    def serialize(self):
        return {
            "id": self.id,
            "buildingName": self.buildingName,

        }


    def __repr__(self):
        return f'<BUILDING {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "buildingName": self.buildingName,
            
            # do not serialize the password, its a security breach
        }                          
                                  

#uno a muchos entre seller y productos
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    price =  db.Column(db.Float(30), unique=False, nullable=False)
    schedule = db.Column(db.String(50), unique=False, nullable=False)
    description = db.Column(db.String(255), unique=False, nullable=False)

    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id', ondelete='CASCADE'))
    seller = db.relationship(Seller)
    orders = db.relationship('order_product', backref='product')
    review = db.relationship('Review', backref='Product', uselist=False) 

    def __repr__(self):
        return f'<Product {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "schedule": self.schedule,
            "description": self.description,
            "seller_name": self.seller.serialize()['name']
        }     
        
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(255), nullable=True, unique=False)
    stars = db.Column(db.Integer, nullable=False, unique=False)
    
    neighbor_id = db.Column(db.Integer, db.ForeignKey("neighbor.id", ondelete='CASCADE'), unique=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id" ), unique=True) 



    def __repr__(self):
        return f'<Review {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "comment_text": self.comment_text,
            "stars": self.stars 
            
        }

#uno a muchos entre seller y order
#muchos a muchos entre order y product
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, unique=False, nullable=False)
    buyer_name = db.Column(db.String(80), unique=False, nullable=False)
    amount = db.Column(db.Integer, unique=False, nullable=False)
    
    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id', ondelete='CASCADE'))
    products = db.relationship('order_product', backref='order')

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "buyer_name": self.buyer_name,
            "amount": self.amount
        }  

class order_product(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))

    def __repr__(self):
        return f'<Order Product {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "order_id": self.order_id
        }  
    
class Recommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)    

    name = db.Column(db.String(80), unique=False, nullable=False)
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    phone = db.Column(db.String(80), unique=False, nullable=False)
    shopName = db.Column(db.String, unique=False, nullable=False)

    neighbor_id = db.Column(db.Integer, db.ForeignKey("neighbor.id"))
    seller_id = db.Column(db.Integer, db.ForeignKey("seller.id"))
    administrator_id = db.Column(db.Integer, db.ForeignKey("administrator.id"))

    def __repr__(self):
        return f'<Recommendation {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "shopName": self.shopName,
            "neighbor_id": self.neighbor_id,
            "seller_id": self.seller_id,
            "administrator_id": self.administrator_id
        }
    
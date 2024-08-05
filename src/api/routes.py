"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Neighbor,Seller,Administrator
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#Vecinos

@api.route('/neighbors', methods=['GET'])
def my_neighbor():
    neighbors = Neighbor.query.all()
    serialize_neighbors = [neighbor.serialize() for neighbor in neighbors ]
    return jsonify({
        "neighbor":serialize_neighbors
    }),200

@api.route('/neighbors/<int:id>', methods=['GET'])
def get_neighbor(id):
    neighbor = Neighbor.query.get(id)
    if neighbor is None:
        return jsonify({"error": "neighbor not found"}), 404

#Vendedores

@api.route('/sellers', methods=['GET'])
def my_seller():
    sellers = Seller.query.all()
    serialize_sellers = [seller.serialize() for seller in sellers]
    return jsonify({
        "seller":serialize_sellers
    }),200

@api.route('/sellers/<int:id>', methods=['GET'])
def get_sellers(id):
    seller =seller.query.get(id)
    if sellers is None:
        return jsonify({"error": "seller not found"}), 404


    #administrador

@api.route('/administrators', methods=['GET'])
def my_administrator():
    administrators = Administrators.query.all()
    serialize_administrators = [administrator.serialize() for administrator in administrators]
    return jsonify({
        "administrator":administrator_administrators
    }),200

@api.route('/administrators/<int:id>', methods=['GET'])
def get_administrators(id):
    administrators =administrator.query.get(id)
    if administrators is None:
        return jsonify({"error": "administrator not found"}), 404    

    #registro de vecino

@api.route('/registers', methods=['POST'])
def add_neighbor():
    body = request.jsonify
    email = body.get("email",None)
    password = body.get("password",None)

    if email is None:
        return jsonify({"error": "El email es requerido"}),400
    if password is None:
        return jsonify({"error": "El password es requerido"}),400    

    new_neighbor = Neighbor(email=email, password=password, is_active=True)
    db.session.add(new_neighbor)
    db.session.commit()
    return jsonify({"Neighbor": new_neighbor.serialize()}),201

 #Registro seller

@api.route('/registers', methods=['POST'])
def add_seller():
    body = request.jsonify
    email = body.get("email",None)
    password = body.get("password",None)

    if email is None:
        return jsonify({"error": "El email es requerido"}),400
    if password is None:
        return jsonify({"error": "El password es requerido"}),400    

    new_seller = Seller(email=email, password=password, is_active=True)
    db.session.add(new_seller)
    db.session.commit()
    return jsonify({"Seller": new_neighbor.serialize()}),201


    #Registro administrador

@api.route('/registers', methods=['POST'])
def add_administrator():
    body = request.jsonify
    email = body.get("email",None)
    password = body.get("password",None)

    if email is None:
        return jsonify({"error": "El email es requerido"}),400
    if password is None:
        return jsonify({"error": "El password es requerido"}),400    

    new_administrator = Administrator(email=email, password=password, is_active=True)
    db.session.add(new_administrator)
    db.session.commit()
    return jsonify({"Administrator": new_administrator.serialize()}),201    

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
    

@api.route('/neighbor/registers', methods=['POST'])
def add_neighbor():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    name = body.get("name",None)
    lastName = body.get("lastName", None)
    floor = body.get("floor",None)
    if not re.match(email_regex, email):
        return jsonify({"error": "El formato del email no es válido"}), 400
    if email is None or password is None or name is None or lastName is None or floor is None :
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    password_hash = generate_password_hash(password)
    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "Email ya esta siendo utilizado"}), 400
    try: 
        new_user = User(email = email, password = password_hash, name = name, lastName = lastName, floor = floor)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Neighbor creado exitosamente"}), 201
    except Exception as error:
        db.session.rollback() 
        return jsonify({"error": f"{error}"}), 500  

#registro seller

@api.route('/seller/registers', methods=['POST'])
def add_seller():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    name = body.get("name",None)
    lastName = body.get("lastName", None)
    floor = body.get("floor",None)
    shopName = body.get("shopName",None)
    if not re.match(email_regex, email):
        return jsonify({"error": "El formato del email no es válido"}), 400
    if email is None or password is None or name is None or lastName is None or floor is None or shopName is None:
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    password_hash = generate_password_hash(password)
    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "Email ya esta siendo utilizado"}), 400
    try: 
        new_user = User(email = email, password = password_hash, name = name, lastName = lastName, floor = floor, shopName = shopName)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Seller creado exitosamente"}), 201
    except Exception as error:
        db.session.rollback() 
        return jsonify({"error": f"{error}"}), 500 

    # registro administrador    

@api.route('/administrator/registers', methods=['POST'])
def add_administrator():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    name = body.get("name",None)
    lastName = body.get("lastName", None)
    buildingName = body.get("buildingName",None)
    if not re.match(email_regex, email):
        return jsonify({"error": "El formato del email no es válido"}), 400
    if email is None or password is None  or name is None or lastName is None or floor is None or buildingName is N:
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    password_hash = generate_password_hash(password)
    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "Email ya esta siendo utilizado"}), 400
    try: 
        new_user = User(email = email, password = password_hash, name = name, lastName = lastName, floor = floor, buildingName = buildingName)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Administrador creado exitosamente"}), 201
    except Exception as error:
        db.session.rollback() 
        return jsonify({"error": f"{error}"}), 500                   

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, Neighbor, Seller, Administrator, Product, Review
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import logging

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

logging.basicConfig(level=logging.ERROR)

#Vecinos

@api.route('/neighbors', methods=['GET'])
def get_all_neighbors():
    try:
        neighbors = Neighbor.query.all()
        serialize_neighbors = [neighbor.serialize() for neighbor in neighbors]
        return jsonify({"neighbor": serialize_neighbors}), 200
    except Exception as e:
        logging.error(f"Error retrieving neighbors: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@api.route('/neighbor/<int:id>', methods=['GET'])
def get_neighbor(id):
    try:
        neighbor = Neighbor.query.get(id)
        if neighbor is None:
            return jsonify({"error": "neighbor not found"}), 404
        return jsonify(neighbor.serialize()), 200
    except Exception as e:
        logging.error(f"Error retrieving neighbor {id}: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Vendedores
@api.route('/sellers', methods=['GET'])
def get_all_sellers():
    try:
        sellers = Seller.query.all()
        serialize_sellers = [seller.serialize() for seller in sellers]
        return jsonify({"seller": serialize_sellers}), 200
    except Exception as e:
        logging.error(f"Error retrieving sellers: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@api.route('/seller/<int:id>', methods=['GET'])
def get_seller(id):
    try:
        seller = Seller.query.get(id)
        if seller is None:
            return jsonify({"error": "seller not found"}), 404
        return jsonify(seller.serialize()), 200
    except Exception as e:
        logging.error(f"Error retrieving seller {id}: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Administradores
@api.route('/administrators', methods=['GET'])
def get_all_administrators():
    try:
        administrators = Administrator.query.all()
        serialize_administrators = [administrator.serialize() for administrator in administrators]
        return jsonify({"administrator": serialize_administrators}), 200
    except Exception as e:
        logging.error(f"Error retrieving administrators: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    #administrador
@api.route('/administrator/<int:id>', methods=['GET'])
def get_administrator(id):
    try:
        administrator = Administrator.query.get(id)
        if administrator is None:
            return jsonify({"error": "administrator not found"}), 404
        return jsonify(administrator.serialize()), 200
    
    except Exception as e:
        logging.error(f"Error retrieving administrator {id}: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# Directorio
@api.route('/directory', methods=['GET'])
def get_all_users_directory():
    try:
        administrators = Administrator.query.all()
        serialize_administrators = [administrator.serialize() for administrator in administrators]
        sellers = Seller.query.all()
        serialize_sellers = [seller.serialize() for seller in sellers]
        neighbors = Neighbor.query.all()
        serialize_neighbors = [neighbor.serialize() for neighbor in neighbors]
        return jsonify({
            "administrator": serialize_administrators, 
            "seller": serialize_sellers, 
            "neighbor": serialize_neighbors
        }), 200
    except Exception as e:
        logging.error(f"Error retrieving directory: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
@api.route('/editNeighbor/<int:id>', methods=['PUT'])
def edit_neighbor(id):
    body = request.json

    neighbor = Neighbor.query.get(id)
    if neighbor is None:
        return jsonify({"error": "neighbor not found"}),404
    
    required_fields = ["name", "lastname", "floor", "email"]

    missing_fields = [field for field in required_fields if field not in body]
    if missing_fields:
        return jsonify({"error": f"Missing fields:{', '.join(missing_fields)}"}),400

    name = body.get("name", None)
    lastname = body.get("lastname", None)
    floor = body.get("floor", None)
    email = body.get("email", None)

    neighbor.name = name
    neighbor.lastname = lastname
    neighbor.floor = floor
    neighbor.email = email
    try:
        db.session.commit()
        return jsonify({"neighbor": neighbor.serialize()})
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}),500
    
@api.route('/editSeller/<int:id>', methods=['PUT'])
def edit_seller(id):
    body = request.json

    seller = Seller.query.get(id)
    if seller is None:
        return jsonify({"error":"seller not found"}),404
    
    required_fields = ["name", "lastname", "floor", "email", "shopName"]

    missing_fields = [field for field in required_fields if field not in body]
    if missing_fields:
        return jsonify({"error": f"Missing fields:{','.join(missing_fields)}"}),400
    
    name = body.get("name", None)
    lastname = body.get("lastname", None)
    floor = body.get("floor", None)
    email = body.get("email", None)
    shopName = body.get("shopName", None)

    seller.name = name
    seller.lastname = lastname
    seller.floor = floor
    seller.email = email
    seller.shopName = shopName

    try:
        db.session.commit()
        return jsonify({"seller": seller.serialize()})

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}),500
    
@api.route('/editAdministrator/<int:id>', methods=['PUT'])
def edit_admin(id):
    body = request.json

    administrator = Administrator.query.get(id)
    if administrator is None:
        return jsonify({"error":"administrator not found"}),404
    
    required_fields = ["name", "lastname", "floor", "email", "buildingName"]

    missing_fields = [field for field in required_fields if field not in body]
    if missing_fields:
        return jsonify({"error": f"Missing fields:{','.join(missing_fields)}"}),400
    
    name = body.get("name", None)
    lastname = body.get("lastname", None)
    floor = body.get("floor", None)
    email = body.get("email", None)
    buildingName = body.get("buildingName", None)

    administrator.name = name
    administrator.lastname = lastname
    administrator.floor = floor
    administrator.email = email
    administrator.buildingName = buildingName

    try:
        db.session.commit()
        return jsonify({"administrator": administrator.serialize()})

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}),500


@api.route('/seller/<int:seller_id>/create-business', methods=['POST'])
#@jwt.required
def create_business(seller_id):
    try:
        body = request.json
        name = body.get("name", None)
        price = body.get("price", None)
        schedule = body.get("schedule", None)
        
        if name is None or price is None or schedule is None:
            return jsonify("Missing data!"), 400
        
        business_exists = Product.query.filter_by(name=name).first()
        if business_exists is not None:
            return jsonify({"error": f"{name} already exists!"}), 400
        
        business = Product(name=name, price=price, schedule=schedule, seller_id=seller_id)
        
        db.session.add(business)
        db.session.commit()
        db.session.refresh(business)
        return jsonify({"message": f"{business.name} created!"}), 201
        
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500

@api.route('/businesses', methods=['GET'])
def get_all_businesses():
    try:
        businesses = Product.query.all()
        serialized_businesses = [business.serialize() for business in businesses]
        return jsonify({"businesses": serialized_businesses}), 200
    
    except Exception as error:
        return jsonify ({"error": f"{error}"}), 500
    
@api.route('seller/<int:seller_id>/business/<int:business_id>', methods=['GET'])
def get_single_business(seller_id, business_id):
    try:
        business = Product.query.get(seller_id=seller_id, id=business_id)
        if not business:
            return jsonify({"Business not found"}), 404
        return jsonify({"Business": business.serialize()}), 200
        
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500 
    
@api.route('seller/<int:seller_id>/business/<int:business_id>', methods=['PUT'])
# @jwt_required
def update_business(seller_id, business_id):
    
    business = Product.query.filter_by(seller_id=seller_id, id=business_id).first()
    try:
        if not business:
            return jsonify({"error": "Business doesn't exist"}), 404
        body = request.json
        name = body.get("name", None)
        price = body.get("price", None)
        schedule = body.get("schedule", None)
        
        if name is None or price is None or schedule is None:
            return jsonify("Missing data!"), 400
        
        business = Product.query.get(business_id)
        business.name = name
        business.price =  price
        business.schedule = schedule
        
        db.session.commit()
        db.session.refresh(business)
        return jsonify({"message": f"{business.name} updated!"}), 200
        
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
    
@api.route('seller/<int:seller_id>/business/<int:business_id>', methods=['DELETE'])
# @jwt_required
def delete_business(seller_id, business_id):
    
    business = Product.query.filter_by(seller_id=seller_id, id=business_id).first()
    try:
        if not business:
            return jsonify({"error": "Business does not exist"}), 404
        db.session.delete(business)
        db.session.commit()
        return jsonify({"message": "Business deleted"}), 200
        
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

@api.route('/neighbor/<int:neighbor_id>/business/<business_id>/create-review', methods=['POST'])
#@jwt.required
def create_review(neighbor_id, business_id):
    try:
        body = request.json
        comment_text = body.get("comment_text", None)
        stars = body.get("stars", None)
        
        if comment_text is None or stars is None:
            return jsonify({"Missing data!"}), 400
        
        review_exists = Review.query.filter_by(neighbor_id=neighbor_id, business_id=business_id).first()
        if review_exists is not None:
            return jsonify({"error": "Neighbors can't review twice the same product!"}), 400
        
        review = Review(comment_text=comment_text, stars=stars, neighbor_id=neighbor_id, business_id=business_id)
        
        db.session.add(review)
        db.session.commit()
        db.session.refresh(review)
        return jsonify({"message": "Review created!"}), 201        
        
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"})
    
@api.route('business/reviews', methods=['GET'])
def get_reviews():
    try:
        reviews = Review.query.all()
        serialized_reviews = [review.serialize() for review in reviews]
        return jsonify({"reviews": serialized_reviews}), 200
        
    except Exception as error:
        return jsonify ({"error": f"{error}"}), 500
    
@api.route('business/<int:business_id>/reviews/<int:id>', methods=['GET'])
def get_single_review(business_id, id):
     
    try: 
        review = Review.query.filter_by(business_id=business_id, id=id).first() 
        if not review:
            return jsonify({"Review not found"}), 404
        return jsonify({"Review": review.serialize()}), 200
        
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500 
    
@api.route('/neighbor/<int:neighbor_id>/business/<int:business_id>/review/<int:review_id>', methods=['PUT'])
#@jwt.required
def update_review(neighbor_id, business_id, review_id):
    
    review = Review.query.filter_by(neighbor_id=neighbor_id, business_id=business_id, id=review_id).first()
    try: 
        if not review:
            return jsonify({"error": "Review doesn't exist"}), 404
        body = request.json
        comment_text = body.get("comment_text", None)
        stars = body.get("stars", None)
        
        if comment_text is None or stars is None:
            return jsonify({"Missing data!"}), 400
        
        review = Review.query.get(review_id)
        review.comment_text = comment_text
        review.stars = stars
        
        db.session.commit()
        db.session.refresh(review)
        return jsonify({"message": "Review updated!"}), 200
        
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
    
@api.route('/neighbor/<int:neighbor_id>/business/<int:business_id>/review/<int:review_id>', methods=['DELETE'])
#@jwt_required
def delete_review(neighbor_id, business_id, review_id):
    
    review = Review.query.filter_by(neighbor_id, business_id, id=review_id).first()
    try:
        if not review:
            return jsonify({"error": "Review does not exist"}), 404
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted"}), 200
    
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
            
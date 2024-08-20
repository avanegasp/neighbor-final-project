"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, Neighbor, Seller, Administrator, Product, Review, Recommendation
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import logging

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

logging.basicConfig(level=logging.ERROR)

#login

@api.route('/login', methods=['POST'])
def login():
    try:
        body = request.json
        email = body.get("email", None)
        password = body.get("password", None)
        userType = body.get("userType", None)
        if email is None or password is None or userType is None:
            return jsonify({"error": "Email, password, or user type are missing!"}), 400

        if userType == "NEIGHBOR":
            neighbor = Neighbor.query.filter_by(email=email).first()
            if not neighbor or not check_password_hash(neighbor.password, password):
                return jsonify({"error": "Wrong data!"}), 400

            auth_token = create_access_token({"id": neighbor.id, "email": neighbor.email, "userType": neighbor.role})
            return jsonify({"token": auth_token, "user": neighbor.serialize()}), 200

        if userType == "SELLER":
            seller = Seller.query.filter_by(email=email).first()
            if not seller or not check_password_hash(seller.password, password):
                return jsonify({"error": "Wrong data!"}), 400

            auth_token = create_access_token({"id": seller.id, "email": seller.email, "userType": seller.role})
            return jsonify({"token": auth_token, "user": seller.serialize()}), 200

        if userType == "ADMINISTRATOR":
            admin = Administrator.query.filter_by(email=email).first()
            if not admin or not check_password_hash(admin.password, password):
                return jsonify({"error": "Wrong data!"}), 400

            auth_token = create_access_token({"id": admin.id, "email": admin.email, "userType": admin.role})
            return jsonify({"token": auth_token, "user": admin.serialize()}), 200

    except Exception as error:
         return jsonify({"error": f"{error}"}), 500


#registro de vecino
@api.route('/neighbor/registers', methods=['POST'])
def add_neighbor():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    name = body.get("name",None)
    lastname = body.get("lastname", None)
    floor = body.get("floor",None)
    #if not re.match(email_regex, email):
       # return jsonify({"error": "El formato del email no es válido"}), 400
    if email is None or password is None or name is None or lastname is None or floor is None :
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    password_hash = generate_password_hash(password)
    if Neighbor.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "Email ya esta siendo utilizado"}), 400
    try: 
        new_user = Neighbor(email = email, password = password_hash, name = name, lastname = lastname, floor = floor)
        auth_token = create_access_token({"id": new_user.id, "email": new_user.email, "userType": new_user.role})
        db.session.add(new_user)
        db.session.commit()
        db.session.refresh()
        return jsonify({"mensaje": "Neighbor creado exitosamente", "user":{"id":new_user.id}, "token": auth_token}), 201
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
    lastname = body.get("lastname", None)
    floor = body.get("floor",None)
    shopName = body.get("shopName",None)
    phone = body.get("phone", None)
    if email is None or password is None or name is None or lastname is None or floor is None or shopName is None or phone is None:
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    password_hash = generate_password_hash(password)
    if Seller.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "Email ya esta siendo utilizado"}), 400
    try: 
        new_user = Seller(email = email, password = password_hash, name = name, lastname = lastname, floor = floor, phone = phone, shopName = shopName)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Seller creado exitosamente", "user":{"id":new_user.id}}), 201
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
    lastname = body.get("lastname", None)
    floor = body.get("floor",None)
    buildingName = body.get("buildingName",None)
    if email is None or password is None  or name is None or lastname is None or floor is None or buildingName is None:
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    password_hash = generate_password_hash(password)
    if Administrator.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "Email ya esta siendo utilizado"}), 400
    try: 
        new_user = Administrator(email = email, password = password_hash, name = name, lastname = lastname, floor = floor, buildingName = buildingName)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Administrador creado exitosamente","user":{"id":new_user.id}}), 201
    except Exception as error:
        db.session.rollback() 
        return jsonify({"error": f"{error}"}), 500                   

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
@jwt_required()
def get_neighbor(id):
    try:
        current_user = get_jwt_identity()
        neighbor = Neighbor.query.get(id)
        print(current_user, id)

        if neighbor is None:
            return jsonify({"error": "neighbor not found"}), 404
        
        if current_user['id'] != neighbor.id:
            return jsonify({"error": "Unauthorized access"}), 403
        
        if current_user['userType'] != "NEIGHBOR":
            return jsonify({"error": "It's a different role"}), 403

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
@jwt_required()
def get_seller(id):
    try:
        current_user = get_jwt_identity()
        seller = Seller.query.get(id)

        if seller is None:
            return jsonify({"error": "seller not found"}), 404
        
        if current_user['id'] != seller.id:
            return jsonify({"error": "Unauthorized access"}), 403
        
        if current_user['userType'] != "SELLER":
            return jsonify({"error": "It's a different role"}), 403

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
@jwt_required()
def get_administrator(id):
    try:
        current_user = get_jwt_identity()
        administrator = Administrator.query.get(id)

        if administrator is None:
            return jsonify({"error": "administrator not found"}), 404
        
        if current_user['id'] != administrator.id:
            return jsonify({"error": "Unauthorized access"}),403

        return jsonify(administrator.serialize()), 200
    
    except Exception as e:
        logging.error(f"Error retrieving administrator {id}: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# Directorio
@api.route('/directory', methods=['GET'])
@jwt_required()
def get_all_users_directory():
    try:
        current_user = get_jwt_identity()
        print(current_user, id)

        administrators = Administrator.query.all()
        serialize_administrators = [administrator.serialize() for administrator in administrators]
        sellers = Seller.query.all()
        serialize_sellers = [seller.serialize() for seller in sellers]
        neighbors = Neighbor.query.all()
        serialize_neighbors = [neighbor.serialize() for neighbor in neighbors]
        
        if not current_user:
            return jsonify({"error": "Unauthorized access"}), 403
        
        return jsonify({
            "administrator": serialize_administrators, 
            "seller": serialize_sellers, 
            "neighbor": serialize_neighbors
        }), 200
    except Exception as e:
        logging.error(f"Error retrieving directory: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

#edit    
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
    phone = body.get("phone", None)
    shopName = body.get("shopName", None)

    seller.name = name
    seller.lastname = lastname
    seller.floor = floor
    seller.email = email
    seller.phone = phone
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
@jwt_required()
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
    
@api.route('seller/<int:seller_id>/business/<string:business_name>', methods=['GET'])
def get_single_business(seller_id, business_name):
    try:
        business = Product.query.filter_by(seller_id=seller_id, name=business_name).first()
        if not business:
            return jsonify({"Business not found"}), 404
        return jsonify({"Business": business.serialize()}), 200
        
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500 
    
@api.route('seller/<int:seller_id>/business/<int:business_id>', methods=['PUT'])
@jwt_required()
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
@jwt_required()
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
#@jwt.required()
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
@jwt_required()
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

@api.route("/me", methods=['GET'])
@jwt_required()
def get_user_data():
    
    user_data = get_jwt_identity()
    if user_data["userType"] == "NEIGHBOR":
        user = Neighbor.query.get(user_data["id"])
        return jsonify(user.serialize()), 200
    
    elif user_data["userType"] == "SELLER":
        user = Seller.query.get(user_data["id"])
        user_business = Product.query.filter_by(seller_id=user.id).all()
        return jsonify(user.serialize(), user_business.serialize()), 200
    
    elif user_data["userType"] == "ADMINISTRATOR":
        user = Administrator.query.get(user_data["id"])
        return jsonify(user.serialize()), 200
    
    else:
        return jsonify({"error": "User not found!"}), 404
    
    



    
#recommendations    
    
@api.route('/recommendations', methods=['GET'])
@jwt_required()
def get_all_recommendations():
    try:
        current_user = get_jwt_identity()
        print("Recommendations current", current_user)
        
        if not current_user:
            return jsonify({"error": "Unauthorized access"}), 403

        recommendations = Recommendation.query.all()
        serialized_recommendations = [recommendation.serialize() for recommendation in recommendations]

        return jsonify({"recommendations": serialized_recommendations}), 200

    except Exception as error:
        logging.error(f"Error retrieving recommendations: {error}")
        return jsonify({"error": str(error)}), 500


@api.route('/neighbor/<int:neighbor_id>/createReco', methods=['POST'])
def neighbor_create_recommendation(neighbor_id):
    try:
        neighbor = Neighbor.query.get(neighbor_id)
        if not neighbor:
            return jsonify({"error": "Neighbor not found!"}), 404

        body = request.json
        name = body.get("name")
        lastname = body.get("lastname")
        phone = body.get("phone")
        shopName = body.get("shopName")

        required_fields = ["name", "lastname", "phone", "shopName"]
        missing_fields = [field for field in required_fields if not body.get(field)]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        recommendation_exists = Recommendation.query.filter_by(name=name, lastname=lastname, neighbor_id=neighbor_id).first()
        if recommendation_exists:
            return jsonify({"error": f"Recommendation for {name} {lastname} already exists!"}), 400
        

        recommendation = Recommendation(
            name=name, 
            lastname=lastname, 
            phone=phone, 
            shopName=shopName, 
            neighbor_id=neighbor_id
        )

        db.session.add(recommendation)
        db.session.commit()

        return jsonify({"message": f"Recommendation for {recommendation.shopName} created!"}), 201
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500  

@api.route('/seller/<int:seller_id>/createReco', methods=['POST'])
def seller_create_recommendation(seller_id):
    try:
        seller = Seller.query.get(seller_id)
        if not seller:
            return jsonify({"error": "Seller not found!"}), 404

        body = request.json
        name = body.get("name")
        lastname = body.get("lastname")
        phone = body.get("phone")
        shopName = body.get("shopName")

        required_fields = ["name", "lastname", "phone", "shopName"]
        missing_fields = [field for field in required_fields if not body.get(field)]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        recommendation_exists = Recommendation.query.filter_by(name=name, lastname=lastname, seller_id=seller_id).first()
        if recommendation_exists:
            return jsonify({"error": f"Recommendation for {name} {lastname} already exists!"}), 400
        

        recommendation = Recommendation(
            name=name, 
            lastname=lastname, 
            phone=phone, 
            shopName=shopName, 
            seller_id=seller_id
        )

        db.session.add(recommendation)
        db.session.commit()

        return jsonify({"message": f"Recommendation for {recommendation.shopName} created!"}), 201
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500

@api.route('/administrator/<int:administrator_id>/createReco', methods=['POST'])
def admin_create_recommendation(administrator_id):
    try:
        administrator = Administrator.query.get(administrator_id)
        if not administrator:
            return jsonify({"error": "Admin not found!"}), 404

        body = request.json
        name = body.get("name")
        lastname = body.get("lastname")
        phone = body.get("phone")
        shopName = body.get("shopName")

        required_fields = ["name", "lastname", "phone", "shopName"]
        missing_fields = [field for field in required_fields if not body.get(field)]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        recommendation_exists = Recommendation.query.filter_by(name=name, lastname=lastname, administrator_id=administrator_id).first()
        if recommendation_exists:
            return jsonify({"error": f"Recommendation for {name} {lastname} already exists!"}), 400
        

        recommendation = Recommendation(
            name=name, 
            lastname=lastname, 
            phone=phone, 
            shopName=shopName, 
            administrator_id=administrator_id
        )

        db.session.add(recommendation)
        db.session.commit()

        return jsonify({"message": f"Recommendation for {recommendation.shopName} created!"}), 201

    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
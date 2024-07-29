import os
from flask import Blueprint, request, jsonify, render_template, current_app, send_from_directory
from .models import register_pet, get_pets, register_poke, get_pet_by_name, get_pet_by_id, Pet
import logging


logger = logging.getLogger(__name__)
routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@routes.route('/register', methods=['POST'])
def register():
    logger.info("Register a pet")
    name = request.form.get('name')
    breed = request.form.get('breed')
    age = request.form.get('age')
    profile_photo = request.files.get('profilePhoto')

    if not name or not breed or not age or not profile_photo:
        return jsonify({'error': 'All fields are required'}), 400

    # Save the profile photo
    photo_filename = profile_photo.filename
    profile_photo.save(os.path.join(current_app.config['UPLOAD_FOLDER'], photo_filename))
    pet_data = Pet(name=name.lower(), breed=breed, age=age, profile_photo=photo_filename)
    pet = register_pet(pet_data)
    
    return jsonify({'id': pet.id, 'name': pet.name, 'age': pet.age, 'breed': pet.breed})

@routes.route('/pets', methods=['GET'])
def pets():
    logger.info("Get All pets")
    pets = get_pets()
    pets_data = [{'id': pet.id, 'name': pet.name, 'age': pet.age, 'breed': pet.breed, 'profile_photo': pet.profile_photo} for pet in pets]
    response = {
        "status": "success",
        "results": len(pets_data),
        "data": {
            "pets": pets_data
        }
    }
    return jsonify(response)

@routes.route('/pet/by_name', methods=['GET'])
def searchpets():
    logger.info("Getting individual pet info")
    pet_name = request.args.get('search') 
    if pet_name:
        pet_name = pet_name.lower()
        pet = get_pet_by_name(pet_name)
        logger.info(f"Searching for pet with name: {pet_name}")
        if pet:
            logger.info(f"Pet found: {pet}")
            pets_data = [{'id': pet.id, 'name': pet.name, 'age': pet.age, 'breed': pet.breed, 'profile_photo': pet.profile_photo}]
            response = {
                "status": "success",
                "results": len(pets_data),
                "data": {
                    "pets": pets_data
                }
            }
            return jsonify(response)
        else:
            logger.warning(f"Pet not found: {pet_name}")
            return jsonify({'error': 'Pet not found'}), 404
    else:
        logger.error("Pet name query parameter is required")
        return jsonify({'error': 'Pet name query parameter is required'}), 400
    
@routes.route('/pet/by_id', methods=['GET'])
def searchpetbyid():
    pet_id = request.args.get('id')
    logger.info(f"Pet id: {pet_id}")
    logger.info(request.args)
    
    if pet_id:
        pet = get_pet_by_id(pet_id)
        logger.info(f"Searching for pet with id: {pet_id}")
        if pet:
            logger.info(f"Pet found: {pet}")
            pets_data = [{'id': pet.id, 'name': pet.name, 'age': pet.age, 'breed': pet.breed, 'profile_photo': pet.profile_photo}]
            response = {
                "status": "success",
                "results": len(pets_data),
                "data": {
                    "pets": pets_data
                }
            }
            return jsonify(response)
        else:
            logger.warning(f"Pet not found: {pet_id}")
            return jsonify({'error': 'Pet not found'}), 404
    else:
        logger.error("Pet id query parameter is required")
        return jsonify({'error': 'Pet id query parameter is required'}), 400


@routes.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

@routes.route('/poke', methods=['POST'])
def poke():
    data = request.json
    from_pet_id = data['from_pet_id']
    to_pet_id = data['to_pet_id']
    match = register_poke(from_pet_id, to_pet_id)
    if match:
        return jsonify({"status": "match"})
    return jsonify({"status": "poked"})

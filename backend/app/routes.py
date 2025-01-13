from flask import jsonify, request
from .services import UserService, AdminService
from .auth import generate_token
from .schemas import UserSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)  

def init_routes(app):
    @app.route("/listuser", methods=['GET'])
    @app.route("/userdetails/<int:npm>", methods=['GET'])
    def get_users(npm=None):
        if npm:
            user = UserService.get_user_by_npm(npm)
            if not user:
                return jsonify({"message": "User not found"}), 404
            return user_schema.jsonify(user) 
        else:
            all_users = UserService.get_all_users()
            return users_schema.jsonify(all_users)  

    @app.route("/userupdate/<int:npm>", methods=['PUT'])
    def userupdate(npm):
        data = request.json
        user = UserService.update_user(npm, data)
        if not user:
            return jsonify({"message": "User not found"}), 404
        return user_schema.jsonify(user)  

    @app.route("/userdelete/<int:npm>", methods=['DELETE'])
    def userdelete(npm):
        user = UserService.delete_user(npm)
        if not user:
            return jsonify({"message": "User not found"}), 404
        return jsonify({"message": "User deleted"}), 200

    @app.route("/useradd", methods=['POST'])
    def useradd():
        data = request.json
        user = UserService.create_user(data)
        return user_schema.jsonify(user), 201  

    @app.route("/login", methods=['POST'])
    def login():
        data = request.json
        admin = AdminService.get_admin_by_username(data['username'])
        if admin and admin.password == data['password']:
            token = generate_token(admin.id)
            return jsonify({"token": token}), 200
        return jsonify({"message": "Invalid credentials"}), 401

    @app.route("/register", methods=['POST'])
    def register():
        data = request.json
        username = data['username']

        existing_admin = AdminService.get_admin_by_username(username)
        if existing_admin:
            return jsonify({"message": "Username already exists"}), 400

        admin = AdminService.create_admin(username, data['password'])
        return jsonify({"id": admin.id, "username": admin.username}), 201
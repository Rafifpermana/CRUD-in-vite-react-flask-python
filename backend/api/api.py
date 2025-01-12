from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

SERVER_URL = "http://localhost:5000" 

@app.route('/users', methods=['GET'])
def api_get_users():
    response = requests.get(f"{SERVER_URL}/users")
    return jsonify(response.json()), response.status_code


@app.route('/user/<int:NPM>', methods=['GET'])
def api_get_user(NPM):
    response = requests.get(f"{SERVER_URL}/user/{NPM}")
    return jsonify(response.json()), response.status_code


@app.route('/user', methods=['POST'])
def api_add_user():
    data = request.json
    response = requests.post(f"{SERVER_URL}/user", json=data)
    return jsonify(response.json()), response.status_code


@app.route('/user/<int:NPM>', methods=['PUT'])
def api_update_user(NPM):
    data = request.json
    response = requests.put(f"{SERVER_URL}/user/{NPM}", json=data)
    return jsonify(response.json()), response.status_code


@app.route('/user/<int:NPM>', methods=['DELETE'])
def api_delete_user(NPM):
    response = requests.delete(f"{SERVER_URL}/user/{NPM}")
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(port=5001, debug=True)

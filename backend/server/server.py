from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models import db, User, Admin

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:@localhost/data_flaskreact"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
ma = Marshmallow(app)

class UserSchema(ma.Schema):
    class Meta:
        fields = ('NPM', 'Nama', 'Kelas', 'Alamat', 'No_Telp', 'date')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


@app.route('/user/<int:NPM>', methods=['GET'])
def get_user(NPM):
    user = User.query.get(NPM)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return user_schema.jsonify(user)


@app.route('/user', methods=['POST'])
def add_user():
    data = request.json
    NPM = data['NPM']
    Nama = data['Nama']
    Kelas = data['Kelas']
    Alamat = data['Alamat']
    No_Telp = data['No_Telp']

    
    if User.query.get(NPM):
        return jsonify({'error': 'NPM already exists'}), 400

    new_user = User(NPM, Nama, Kelas, Alamat, No_Telp)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user), 201


@app.route('/user/<int:NPM>', methods=['PUT'])
def update_user(NPM):
    user = User.query.get(NPM)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.json

    
    user.Nama = data.get('Nama', user.Nama)
    user.Kelas = data.get('Kelas', user.Kelas)
    user.Alamat = data.get('Alamat', user.Alamat)
    user.No_Telp = data.get('No_Telp', user.No_Telp)

    db.session.commit()
    return user_schema.jsonify(user)


@app.route('/user/<int:NPM>', methods=['DELETE'])
def delete_user(NPM):
    user = User.query.get(NPM)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)

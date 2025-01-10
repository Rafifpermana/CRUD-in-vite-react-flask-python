from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:@localhost/data_flaskreact"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    __tablename__ = "mahasiswa"
    NPM = db.Column(db.Integer, primary_key=True)
    Nama = db.Column(db.String(100))
    Kelas = db.Column(db.String(100))
    Alamat = db.Column(db.String(100))
    No_Telp = db.Column(db.String(100))
    date = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def __init__(self, NPM, Nama, Kelas, Alamat, No_Telp):
        self.NPM = NPM
        self.Nama = Nama
        self.Kelas = Kelas
        self.Alamat = Alamat
        self.No_Telp = No_Telp

class UserSchema(ma.Schema):
    class Meta:
        fields = ('NPM', 'Nama', 'Kelas', 'Alamat', 'No_Telp', 'date')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route("/listuser", methods=['GET'])
@app.route("/userdetails/<NPM>", methods=['GET'])
def get_users(NPM=None):
    if NPM:
        user = User.query.get(int(NPM))
        if not user:
            return jsonify({"message": "User not found"}), 404
        return user_schema.jsonify(user)
    else:
        all_users = User.query.all()
        result = users_schema.dump(all_users)
        return jsonify(result)


@app.route("/userupdate/<NPM>", methods=['PUT'])
def userupdate(NPM):
    user = User.query.get(int(NPM))
    
    if not user:
        return jsonify({"message": "User not found"}), 404 

    user.NPM = request.json['NPM']
    user.Nama = request.json['Nama']
    user.Kelas = request.json['Kelas']
    user.Alamat = request.json['Alamat']
    user.No_Telp = request.json['No_Telp']

    db.session.commit()
    return user_schema.jsonify(user)


@app.route("/userdelete/<NPM>", methods=['DELETE'])
def userdelete(NPM):
    user = User.query.get(int(NPM))
    if not user:
        return jsonify({"message": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()

    # Data semua pengguna setelah penghapusan
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    
    return jsonify({"message": "User deleted", "remaining_users": result}), 200
    



@app.route("/useradd", methods=['POST'])
def useradd():
    NPM = request.json['NPM']
    Nama = request.json['Nama'] 
    Kelas = request.json['Kelas']
    Alamat = request.json['Alamat']
    No_Telp = request.json['No_Telp']
    
    #unutk menghindari duplikate
    existing_user = User.query.filter_by(NPM=NPM).first() 
    if existing_user: 
        return jsonify({"error": "NPM already exists"}), 400
    
    mahasiswa = User(NPM, Nama, Kelas, Alamat, No_Telp)
    db.session.add(mahasiswa)
    db.session.commit()

    return user_schema.jsonify(mahasiswa)


if __name__ == "__main__":
    app.run(debug=True)

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

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

class Admin(db.Model):
    __tablename__ = "admin"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password)

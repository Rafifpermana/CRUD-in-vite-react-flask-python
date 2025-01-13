from . import db

class User(db.Model):
    __tablename__ = "mahasiswa"
    NPM = db.Column(db.Integer, primary_key=True)
    Nama = db.Column(db.String(100))
    Kelas = db.Column(db.String(100))
    Alamat = db.Column(db.String(100))
    No_Telp = db.Column(db.String(100))
    date = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            "NPM": self.NPM,
            "Nama": self.Nama,
            "Kelas": self.Kelas,
            "Alamat": self.Alamat,
            "No_Telp": self.No_Telp,
            "date": self.date.isoformat() if self.date else None
        }

class Admin(db.Model):
    __tablename__ = "admin"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, username, password):
        self.username = username
        self.password = password
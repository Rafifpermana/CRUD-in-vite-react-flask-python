from .models import User, Admin
from . import db
class UserService:
    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def get_user_by_npm(npm):
        return User.query.get(npm)

    @staticmethod
    def create_user(data):
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def update_user(npm, data):
        user = User.query.get(npm)
        if user:
            for key, value in data.items():
                setattr(user, key, value)
            db.session.commit()
        return user

    @staticmethod
    def delete_user(npm):
        user = User.query.get(npm)
        if user:
            db.session.delete(user)
            db.session.commit()
        return user

class AdminService:
    @staticmethod
    def get_admin_by_username(username):
        return Admin.query.filter_by(username=username).first()

    @staticmethod
    def create_admin(username, password):
        admin = Admin(username=username, password=password)
        db.session.add(admin)
        db.session.commit()
        return admin
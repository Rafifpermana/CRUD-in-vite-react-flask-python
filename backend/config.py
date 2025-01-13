import os

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:@localhost/data_flaskreact"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
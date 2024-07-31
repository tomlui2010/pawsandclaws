import os,sys
from flask import Flask
# Add the backend/src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
from src.routes import routes
from flask_cors import CORS
from src.models import db
import logging
from logging_config import setup_logging


# Initialize logging
setup_logging()
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = 'uploads'
db.init_app(app)
app.register_blueprint(routes)

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)

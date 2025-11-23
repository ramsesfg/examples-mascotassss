from app import app, db
from api.models import User, Mascota, Cita

with app.app_context():
    db.drop_all()
    db.create_all()
    print("✅ Base de datos recreada exitosamente")
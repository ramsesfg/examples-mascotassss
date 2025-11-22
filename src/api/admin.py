import os
from flask_admin import Admin
from api.models import db, User, Mascota, Cita
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Peluquería Canina Admin')

    # Add your models here
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Mascota, db.session))
    admin.add_view(ModelView(Cita, db.session))
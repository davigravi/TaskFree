from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Task

class TaskForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    task = StringField('task', validtors=[DataRequired()])
    completed = BooleanField('completed', validators = [DataRequired()])

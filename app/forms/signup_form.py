from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')

def email_length(form, field):
    length_email = field.data
    if len(length_email) > 155:
        raise ValidationError("Email must be less than 155 characters")

def username_length(form, field):
    length_username = field.data
    if len(length_username) > 30 or len(length_username) < 5:
        raise ValidationError("Username must be between 5 and 30 characters")

def repeat_password(form, field):
    repeat_password = field.data
    password = form.data['password']

    if not repeat_password == password:
        raise ValidationError("Your passwords do not match")

def password_length(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must be more than 6 characters')
    if len(password) > 30:
        raise ValidationError('Password must be less than 30 characters')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, email_length, Email(message='Please provide a valid email')])
    password = StringField('password', validators=[DataRequired(), password_length])
    repeat_password = StringField('repeat_password', validators=[DataRequired(), repeat_password])

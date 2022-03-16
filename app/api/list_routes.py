from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Task, List
from app.forms.list_form import ListForm

list_routes = Blueprint('list', __name__)

from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Task, List
from app.forms.list_form import ListForm

list_routes = Blueprint('list', __name__)


@list_routes.route('/')
def get_lists():
    current_user_id = current_user.get_id()
    lists = List.query.filter(List.user_id == current_user_id).all()
    return {'lists': [lst.to_dict() for lst in lists]}

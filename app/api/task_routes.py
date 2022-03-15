from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Task, List
from app.forms.task_form import TaskForm

task_routes = Blueprint('task', __name__)



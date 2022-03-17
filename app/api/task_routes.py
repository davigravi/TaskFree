from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Task, List
from app.forms.task_form import TaskForm

task_routes = Blueprint('task', __name__)


@task_routes.route('/')
def get_tasks():
    current_user_id = current_user.get_id()
    tasks = Task.query.filter(Task.user_id == current_user_id).order_by(Task.id.asc()).all()
    return {'tasks': [task.to_dict() for task in tasks]}


@task_routes.route('/', methods = ['DELETE'])
def delete_task():

    data = request.json

    task_id = data['task_id']['taskId']
    task = Task.query.filter(Task.id == task_id).first()

    db.session.delete(task)
    db.session.commit()

    return {'deleted_task': task_id}

@task_routes.route('/', methods = ['POST'])
def add_task():
    print('in api route', '----------------------------')
    data = request.json

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task = Task(
            user_id = data['user_id'],
            list_id = data['list_id'],
            description = data['description'],
            task = data['task'],
        )

    db.session.add(task)
    db.session.commit()

    return {'task': task.to_dict()}


@task_routes.route('/', methods = ['PATCH'])
def update_task():
    data = request.json

    user_id = data['user_id']
    task_id = data['task_id']
    description = data['description']
    task = data['task']

    oldTask = Task.query.get(task_id)
    oldTask.description = description
    oldTask.task = task
    db.session.commit()

    return {'task': oldTask.to_dict()}

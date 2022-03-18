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


@list_routes.route('/', methods = ['DELETE'])
def delete_list():
    data = request.json

    print(data, '---------------this is data------------')
    list_id = data['list_id']
    lst = List.query.filter(List.id == list_id).first()

    db.session.delete(lst)
    db.session.commit()

    return {'deleted_list': list_id}

@list_routes.route('/', methods = ['POST'])
def add_list():
    data = request.json

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        lst = List(
            title = data['title'],
            user_id = data['user_id']
        )

    db.session.add(lst)
    db.session.commit()

    return {'lst': lst.to_dict()}

@list_routes.route('/', methods = ['PATCH'])
def update_list():
    data = request.json

    user_id = data['user_id']
    list_id = data['list_id']
    title = data['title']

    oldList = List.query.get(list_id)
    oldList.title = title
    db.session.commit()

    return {'lst': oldList.to_dict()}

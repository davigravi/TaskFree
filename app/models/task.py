from .db import db
from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable = False)
    description = db.Column(db.String(255), nullable = False)
    task = db.Column(db.String(2200), nullable = False)
    completed = db.Column(db.Boolean, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='tasks')
    lst = db.relationship('List', back_populates='tasks')

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'list_id': self.list_id,
            'description': self.description,
            'task': self.task,
            'completed' : self.completed,
            'created_at': self.created_at,

        }

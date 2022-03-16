from .db import db
from datetime import datetime

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    user = db.relationship('User', back_populates='lists')
    tasks = db.relationship('Task', back_populates='lst')



    def to_dict(self):

        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
        }

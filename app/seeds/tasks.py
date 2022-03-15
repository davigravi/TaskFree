from app.models import db, Task
import datetime
from datetime import timedelta

current_date = datetime.datetime.now()


def seed_tasks():



    tasks = [
        Task(
            user_id=1,
            list_id=1,
            description='Fix car',
            task='Change engine oil',
            completed=False,
            created_at=current_date,
        ),
        Task(
            user_id=1,
            list_id=2,
            description='Chapter 1 and 2 Review',
            task='Finish test review',
            completed=False,
            created_at=current_date,
        ),
        Task(
            user_id=1,
            list_id=4,
            description='Pay credit card',
            task='Pay off credit card',
            completed=False,
            created_at=current_date,
        ),
          Task(
            user_id=1,
            list_id=3,
            description='Buy Protein',
            task='Buy chicken, eggs, and beef',
            completed=False,
            created_at=current_date,
        ),
    ]

    for task in tasks:
        db.session.add(task)

    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()

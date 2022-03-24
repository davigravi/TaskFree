from app.models import db, List

def seed_lists():

    lists = [
        List(
            title='Default List',
            user_id=1,
        ),
        List(
            title='Chemistry Test Prep',
            user_id=1,
        ),
        List(
            title='Grocery List',
            user_id=1,
        ),
        List(
            title='Finances',
            user_id=1,
        )
    ]

    for lst in lists:
        db.session.add(lst)

    db.session.commit()



def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()

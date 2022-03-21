import './AddListForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createList } from '../../store/lists';
import { useHistory } from 'react-router-dom';

function AddListForm({ hideAddListForm }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false)
    const sessionUser = useSelector(state => state?.session?.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: name,
            user_id: sessionUser.id
        }

        if (errors.length === 0) {
            const newList = await dispatch(createList(payload))
            if (newList) {
                hideAddListForm();
                history.push(`/lists/${newList.lst.id}`)
                setShowErrors(false)
            }
        } else {
            setShowErrors(true)
        }

    }

    useEffect(() => {
        const errors = [];
        if (!name) errors.push("Please provde a list name")
        if (name.length > 50) errors.push("List name must be less than 50 characters.")
        if (errors) setErrors(errors)
    }, [name])


    return (
        <div className='add-list-form-parent'>
            <div>
                <ul>
                    {showErrors && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>

            </div>
            <form onSubmit={handleSubmit}>
                <div className='add-list-form-heading'>Add List</div>
                <div className='add-list-form-container'>
                    <label className='add-list-label-input'>
                        Name
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                </div>
                <div className='list-add-cancel-buttons'>
                    <button type='submit'>Add</button>
                    <button onClick={hideAddListForm}>Cancel</button>
                </div>
            </form>
        </div>
    )
}


export default AddListForm;

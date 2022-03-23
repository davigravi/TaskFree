import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { updateList } from "../../store/lists";
import { useHistory } from "react-router-dom";
import './EditListForm.css'



function EditListForm({ hideEditListForm, listId, listTitle, hideEllipsisModal2 }) {
    const dispatch = useDispatch();
    const history = useHistory();


    const [name, setName] = useState(listTitle)
    const sessionUser = useSelector(state => state?.session?.user)

    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: name,
            user_id: sessionUser.id,
            list_id: listId,
        }

        if (errors.length === 0) {
            const updatedList = await dispatch(updateList(payload))
            if (updatedList) {
                history.push(`/lists/${updatedList.lst.id}`)
                setShowErrors(false)
                hideEditListForm();
                hideEllipsisModal2();
            }
        } else {
            setShowErrors(true)
        }

    }

    useEffect(() => {
        const errors = [];
        if (!name) errors.push("Please provide a list name")
        if (name.length > 50) errors.push("List name must be less than 50 characters")
        if (errors) setErrors(errors)
    }, [name])


    return (
        <div className='edit-list-form-parent'>
            <div>
                <ul>
                    {showErrors && errors.map((error, idx) => (
                        <li className='edit-list-errors' key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='edit-list-form-heading'>Update List</div>
                <div className='edit-list-form-container'>
                    <label className="edit-list-label-input">
                        Name
                        <input
                            className='edit-list-input-box'
                            type='text'
                            value={name}
                            placeholder={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                </div>


                <div className='list-edit-cancel-buttons'>
                    <button type='submit'>Update</button>
                    <button onClick={hideEditListForm}>Cancel</button>

                </div>
            </form>
        </div>

    )
}


export default EditListForm;

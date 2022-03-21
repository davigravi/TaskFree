import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { updateList } from "../../store/lists";
import { useHistory } from "react-router-dom";




function EditListForm({ hideEditListForm, listId, listTitle }) {
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
                hideEditListForm();
                history.push(`/lists/${updatedList.lst.id}`)
                setShowErrors(false)
            }
        } else {
            setShowErrors(true)
        }
        // const updatedList = await dispatch(updateList(payload))
        // if(updatedList){
        //     hideEditListForm();
        //     history.push(`/lists/${updatedList.lst.id}`)
        // }
    }

    useEffect(() => {
        const errors = [];
        if (!name) errors.push("Please provide a list name")
        if (name.length > 50) errors.push("List name must be less than 50 characters")
        if (errors) setErrors(errors)
    }, [name])


    return (
        <div>
            <div>
                <ul>
                    {showErrors && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <div>Update List</div>
                <div className='edit-list-form-container'>
                    <label>
                        Name
                        <input
                            type='text'
                            value={name}
                            placeholder={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                </div>



                <button type='submit'>Update</button>
                <button onClick={hideEditListForm}>Cancel</button>
            </form>
        </div>

    )
}


export default EditListForm;

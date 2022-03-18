import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { updateList } from "../../store/lists";
import { useHistory } from "react-router-dom";




function EditListForm({hideEditListForm, listId, listTitle}) {
    const dispatch = useDispatch();
    const history = useHistory();


    const [name, setName] = useState(listTitle)
    const sessionUser = useSelector(state => state?.session?.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: name,
            user_id: sessionUser.id,
            list_id: listId,
        }

        const updatedList = await dispatch(updateList(payload))
        if(updatedList){
            hideEditListForm();
            history.push(`/lists/${updatedList.lst.id}`)
        }
    }


    return (

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

    )
}


export default EditListForm;

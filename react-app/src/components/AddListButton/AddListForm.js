import './AddListForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createList } from '../../store/lists';
import { useHistory } from 'react-router-dom';

function AddListForm ({hideAddListForm}) {

    const history = useHistory();
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const sessionUser = useSelector(state => state?.session?.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: name,
            user_id: sessionUser.id
        }

        let newList = await dispatch(createList(payload))
        if (newList){
            // console.log(newList, 'this is newList')
            hideAddListForm();
            history.push(`/lists/${newList.lst.id}`)
        }

    }




    return (
        <form onSubmit={handleSubmit}>
            <div>Add List</div>
            <div className='add-list-form-container'>
                <label>
                    Name
                    <input
                    type='text'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
                </label>

            </div>



            <button type='submit'>Add</button>
            <button onClick={hideAddListForm}>Cancel</button>
        </form>
    )
}


export default AddListForm;
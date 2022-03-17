
import { useDispatch } from 'react-redux';

import { removeList } from '../../store/lists'

function DeleteListButton({ listId }) {


    console.log(listId, 'this is listId')
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        let lstId;
        if (listId) {
            lstId = listId
        }

        const payload = {
            list_id: lstId,
        }


        console.log('here2')
        const deletedList = await dispatch(removeList(payload))

    }



    return (
        <div>
            <div className='delete-list-div' onClick={handleClick}>Delete</div>
        </div>
    )


}



export default DeleteListButton;

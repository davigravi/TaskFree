
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeList } from '../../store/lists'


import { deleteTask } from '../../store/tasks';

function DeleteListButton({ listId, page}) {
    let history = useHistory();

    // console.log(listId, 'this is listId')

    const tasks = useSelector(state => state.tasks.collection);
    const filteredTasks = tasks.filter(task => task.list_id == listId)



    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        let lstId;
        if (listId) {
            lstId = listId
            // console.log(lstId, 'this is list id right before delete')
            // console.log(filteredTasks, 'this is the filtered tasks in delete list button')
        }

        const payload = {
            list_id: lstId,
        }


        // console.log('here2')
        const deletedList = await dispatch(removeList(payload))
        // console.log('before for loop')
        if (deletedList){
            console.log('in if statement')
            for( let i = 0; i < filteredTasks.length; i++){
                // console.log('in for loop')
                // console.log(filteredTasks[i].id, 'this is keying into the filtered task at i')

                const deletedTaskInList = await dispatch(deleteTask(filteredTasks[i].id))
                if(page){
                    history.push('/')
                }
            }
            history.push('/')
        }
        

    }



    return (
        <div>
            <div className='delete-list-div' onClick={handleClick}>Delete</div>
        </div>
    )


}



export default DeleteListButton;

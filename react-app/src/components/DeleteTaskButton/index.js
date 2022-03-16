import React from 'react'
import { useDispatch } from 'react-redux';
import './DeleteTaskButton.css'

import { removeTask } from "../../store/tasks";



function DeleteTaskButton(taskId){

    const dispatch = useDispatch();

    const handleClick = async (e) => {
        const payload = {
            task_id: taskId
        }

        const deletedTask = await dispatch(removeTask(payload))

    }

    return (
        <div>
             <div className='delete-task-div' onClick={handleClick}>Delete</div>
        </div>
    )

}


export default DeleteTaskButton;

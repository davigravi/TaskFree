import React, { useEffect, useState } from 'react'
import AddTaskForm from './AddTaskForm';
import './AddTaskButton.css';

function AddTaskButton(){

    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const openAddTaskForm = () => {
        if (showAddTaskForm) return;
        setShowAddTaskForm(true)
    }


    useEffect(() => {
        if (!showAddTaskForm) return;

        const closeAddTaskForm = (e) => {
            setShowAddTaskForm(false);
        }

        // document.addEventListener('click', closeAddTaskForm);

        // return () => document.removeEventListener('click', closeAddTaskForm);
        }, [showAddTaskForm]);


    return (
        <div>
             <div  className='add-task-header' onClick = {openAddTaskForm}>Add Task</div>
             {showAddTaskForm && <AddTaskForm/>}
        </div>
    )

}


export default AddTaskButton;

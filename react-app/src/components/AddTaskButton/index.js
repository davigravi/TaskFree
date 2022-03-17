import React, { useEffect, useState } from 'react'
import AddTaskForm from './AddTaskForm';
import './AddTaskButton.css';

function AddTaskButton({listId}){

    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const openAddTaskForm = () => {
        if (showAddTaskForm) return;
        setShowAddTaskForm(true)
    }


    useEffect(() => {
        if (!showAddTaskForm) return;


    }, [showAddTaskForm]);

    const closeAddTaskForm = (e) => {
        setShowAddTaskForm(false);
    }

    return (
        <div>
             <div  className='add-task-header' onClick = {openAddTaskForm}>Add Task</div>
             {showAddTaskForm && <AddTaskForm listId={listId} closeForm={closeAddTaskForm}/>}
        </div>
    )

}


export default AddTaskButton;

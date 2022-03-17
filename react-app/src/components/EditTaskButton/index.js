import React from 'react';
import { useDispatch } from 'react-redux';
import './EditTaskButton.css';
import EditTaskForm from './EditTaskForm';
import { useState, useEffect } from 'react';


function EditTaskButton(task) {


    const dispatch = useDispatch();

    const [showEditTaskForm, setShowEditTaskForm] = useState(false);

    const openEditTaskForm = () => {
        if (showEditTaskForm) return;
        setShowEditTaskForm(true)
    }


    useEffect(() => {
        if (!showEditTaskForm) return;

        const closeEditTaskForm = (e) => {
            setShowEditTaskForm(false);
        }

    }, [showEditTaskForm]);

    const closeEditTaskForm = (e) => {
        setShowEditTaskForm(false);
    }



    return (
        <div>
            <div className='edit-task-div' onClick={openEditTaskForm} >Edit Task</div>
            {showEditTaskForm && <EditTaskForm closeForm={closeEditTaskForm} task={task} />}
        </div>
    )
}


export default EditTaskButton;

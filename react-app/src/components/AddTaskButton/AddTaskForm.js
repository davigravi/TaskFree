import './AddTaskForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { createTask } from '../../store/tasks';
import { useEffect } from 'react';

function AddTaskForm({ closeForm, listId }) {


    console.log(listId, 'this will show if addform has listId')
    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const [task, setTask] = useState('')
    const [showErrors, setShowErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const sessionUser = useSelector(state => state?.session?.user)


    const handleSubmit = async (e) => {
        e.preventDefault();

        let taskListId;
        if (listId) {
            taskListId = listId;
        } else {
            taskListId = 1;
        }

        const payload = {
            user_id: sessionUser.id,
            list_id: taskListId,
            description,
            task,
        }

        if(errors.length === 0){
            const newTask = await dispatch(createTask(payload))
            if(newTask){
                closeForm();
                setShowErrors(false)
            }
        }else {
            setShowErrors(true);
        }
    }

    useEffect(()=>{
        const errors = [];
        if(!description) errors.push("Please provide a description")
        if(!task) errors.push("Please provide a task")
        if(description.length > 255) errors.push("Task description must be less than 255 characters")
        if (errors) setErrors(errors)
    }, [task, description])



    return (
        <div className='add-task-form-container'>
            <div>
                <ul>
                    {showErrors && errors.map((error,idx)=> (
                        <li className='add-task-errors'key={idx}>{error}</li>
                    ))}
                    {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
                </ul>

            </div>
            <form className='add-task-form'>
                <label>
                    <input
                        className='task-description-input'
                        type='text'
                        placeholder='e.g., Read every day p3 @ goals #Learning'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <textarea
                    className='task-textarea'
                    rows='5'
                    cols='90'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder='Description'
                    required
                />
            </form>
            <button className='add-task-button' onClick={handleSubmit}>Add Task</button>
            <button className='cancel-button' onClick={closeForm}>Cancel</button>
        </div>

    )
}


export default AddTaskForm;

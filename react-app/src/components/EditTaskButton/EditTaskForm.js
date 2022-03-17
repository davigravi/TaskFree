import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './EditTaskForm.css'

function EditTaskForm ({task, closeForm}){


    const dispatch = useDispatch();
    const [description, setDescription] = useState(task.task.description)
    const [eTask, setETask] = useState(task.task.task)


    const sessionUser = useSelector(state => state?.session?.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: sessionUser.id,
            description,
            eTask
        }


    }

    return (
        <div className='edit-task-form-container'>
        <form className='edit-task-form'>
            <label>
                <input
                    className='edit-task-description-input'
                    type='text'
                    placeholder={description}
                    value={description}
                    onChange = {(e)=> setDescription(e.target.value)}
                    required
                />
            </label>
            <textarea
                className='edit-task-textarea'
                rows = '5'
                cols = '90'
                value={eTask}
                onChange = {(e)=> setETask(e.target.value)}
                placeholder = {eTask}
                required
            />
        </form>
        <button className='edit-task-button' onClick={handleSubmit}>Edit Task</button>
        <button className='cancel-button' onClick={closeForm}>Cancel</button>
    </div>

    )

}


export default EditTaskForm;

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './EditTaskForm.css'

function EditTaskForm (task){



    const dispatch = useDispatch();
    const [description, setDescription] = useState(task.task.task.description)
    const [eTask, setETask] = useState(task.task.task.task)


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
        <form className='edit-task-form' onSubmit={handleSubmit}>
            <label>
                <input
                    className='edit-task-description-input'
                    type='text'
                    // placeholder={description}
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
                // placeholder = {eTask}
                required
            />
            <button className='edit-task-button' type='submit'>Edit Task</button>
        </form>

    </div>

    )

}


export default EditTaskForm;

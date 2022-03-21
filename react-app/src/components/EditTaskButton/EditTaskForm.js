import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './EditTaskForm.css'
import { updateTask } from "../../store/tasks";

function EditTaskForm({ task, closeForm }) {


    const dispatch = useDispatch();
    const [description, setDescription] = useState(task.task.description)
    const [eTask, setETask] = useState(task.task.task)
    const [showErrors, setShowErrors] = useState(false)
    const [errors, setErrors] = useState([])


    const sessionUser = useSelector(state => state?.session?.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: sessionUser.id,
            task_id: task.task.id,
            description,
            eTask
        }

        if (errors.length === 0) {
            const updatedTask = await dispatch(updateTask(payload))
            if (updatedTask) {
                closeForm();
                setShowErrors(false);
            }
        } else {
            setShowErrors(true);
        }

    }

    useEffect(() => {
        const errors = [];
        if (!description) errors.push("Please provide a description")
        if (!eTask) errors.push("Please provide a task")
        if (description.length > 255) errors.push("Task description must be less than 255 characters")
        if (errors) setErrors(errors)
    }, [eTask, description])

    return (
        <div className='edit-task-form-container'>
            <div>
                <ul>
                    {showErrors && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form className='edit-task-form'>
                <label>
                    <input
                        className='edit-task-description-input'
                        type='text'
                        placeholder={description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <textarea
                    className='edit-task-textarea'
                    rows='5'
                    cols='90'
                    value={eTask}
                    onChange={(e) => setETask(e.target.value)}
                    placeholder={eTask}
                    required
                />
            </form>
            <button className='edit-task-button' onClick={handleSubmit}>Edit Task</button>
            <button className='cancel-button' onClick={closeForm}>Cancel</button>
        </div>

    )

}


export default EditTaskForm;

import './AddTaskForm.css'
import {useDispatch, useSelector} from 'react-redux';
import {  useState } from "react";



function AddTaskForm(){


    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const [task, setTask] = useState('')

    const sessionUser = useSelector(state => state?.session?.user)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id : sessionUser.id,
            description,
            task,
            completed: false,
            

        }
    }

    return (
        <div className="add-task-form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        placeholder='e.g., Read every day p3 @ goals #Learning'
                        value={description}
                        onChange = {(e)=> setDescription(e.target.value)}
                        required
                    />
                </label>
                <textarea
                    rows = '5'
                    cols = '45'
                    value={task}
                    onChange = {(e)=> setTask(e.target.value)}
                    placeholder = 'Description'
                    required
                />
                <button className='add-task-button' type='submit'>Add Task</button>
            </form>
        </div>
    )
}


export default AddTaskForm;

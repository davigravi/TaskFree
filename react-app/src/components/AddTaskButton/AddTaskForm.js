import './AddTaskForm.css'
import {useDispatch, useSelector} from 'react-redux';
import {  useState } from "react";
import { createTask } from '../../store/tasks';


function AddTaskForm({closeForm, listId}){


    console.log(listId, 'this will show if addform has listId')
    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const [task, setTask] = useState('')

    const sessionUser = useSelector(state => state?.session?.user)


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let taskListId;
        if(listId){
            taskListId = listId;
        }else{
            taskListId = 1;
        }

        const payload = {
            user_id : sessionUser.id,
            list_id : taskListId,
            description,
            task,
        }

        const newTask = await dispatch(createTask(payload))
        if(newTask){
            closeForm();
        }
    }





    return (
        <div className='add-task-form-container'>
            <form className='add-task-form'>
                <label>
                    <input
                        className='task-description-input'
                        type='text'
                        placeholder='e.g., Read every day p3 @ goals #Learning'
                        value={description}
                        onChange = {(e)=> setDescription(e.target.value)}
                        required
                    />
                </label>
                <textarea
                    className='task-textarea'
                    rows = '5'
                    cols = '90'
                    value={task}
                    onChange = {(e)=> setTask(e.target.value)}
                    placeholder = 'Description'
                    required
                />
            </form>
            <button className='add-task-button' onClick={handleSubmit}>Add Task</button>
            <button className='cancel-button' onClick={closeForm}>Cancel</button>
        </div>

    )
}


export default AddTaskForm;

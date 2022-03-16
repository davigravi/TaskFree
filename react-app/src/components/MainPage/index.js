import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from '../../store/tasks';
import AddTaskButton from '../AddTaskButton';
import './MainPage.css'

import DeleteTaskButton from '../DeleteTaskButton'
import AddTaskForm from '../AddTaskButton/AddTaskForm';

function MainPage () {

    const dispatch = useDispatch();
    const tasks = useSelector(state=>state.tasks.collection);
    console.log(tasks, 'tasks')

    useEffect(()=>{
        dispatch(getTasks());
    }, [dispatch])

    return (
        <div className='main-page-parent'>
            <div className='task-container'>
                <h2>All Tasks</h2>
                {tasks.map((task)=>
                <div className='single-task'>
                    <div className='task-description'>{task.description}</div>
                    <div>{task.task}</div>
                    <div className='delete-task-div'>
                        <DeleteTaskButton taskId={task.id} />
                    </div>
                </div>
                )}
                <AddTaskButton/>
            </div>

        </div>
    )

}


export default MainPage;

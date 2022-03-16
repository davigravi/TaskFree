import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from '../../store/tasks';
import AddTaskButton from '../AddTaskButton';

import DeleteTaskButton from '../DeleteTaskButton'


function MainPage () {

    const dispatch = useDispatch();
    const tasks = useSelector(state=>state.tasks.collection);
    console.log(tasks, 'tasks')

    useEffect(()=>{
        dispatch(getTasks());
    }, [dispatch])

    return (
        <div>
            <div>All Tasks</div>
            <div className='task-container'>
                {tasks.map((task)=>
                <div className='single-task'>
                    <div>{task.description}</div>
                    <div>{task.task}</div>
                    <DeleteTaskButton taskId={task.id} />
                    <AddTaskButton/>
                </div>
                )}
            </div>

        </div>
    )

}


export default MainPage;

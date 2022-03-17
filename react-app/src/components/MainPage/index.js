import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from '../../store/tasks';
import AddTaskButton from '../AddTaskButton';
import './MainPage.css'
import { NavLink } from 'react-router-dom';
import DeleteTaskButton from '../DeleteTaskButton'
import AddTaskForm from '../AddTaskButton/AddTaskForm';
import EditTaskButton from '../EditTaskButton';
import { getAllLists } from '../../store/lists';

function MainPage () {

    const dispatch = useDispatch();
    const tasks = useSelector(state=>state.tasks.collection);
    const allLists = useSelector(state=>state.lists?.lists);
    console.log(tasks, 'tasks')

    useEffect(()=>{
        dispatch(getTasks());
        dispatch(getAllLists());
    }, [dispatch])

    return (
        <div>
            <div className='side-bar-nav'>
                <NavLink to='/completed'>Completed</NavLink>
                <div>Lists</div>
                {allLists?.map((list)=>
                <div>{list.title}</div>
                )}
            </div>
            <div className='main-page-parent'>
                <div className='task-container'>
                    <h2>All Tasks</h2>
                    {tasks.map((task)=>
                    <div className='single-task'>
                        <div className='task-description'>{task.description}</div>
                        <div>{task.task}</div>
                        <DeleteTaskButton taskId={task.id} />
                        <EditTaskButton task={task}/>
                    </div>
                    )}
                    <AddTaskButton/>
                </div>

            </div>
        </div>
    )

}


export default MainPage;

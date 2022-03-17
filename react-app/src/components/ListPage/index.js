import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from '../../store/tasks';
import { getAllLists } from '../../store/lists';
import { NavLink, useParams } from 'react-router-dom';
import './ListPage.css'


function ListPage () {

    const dispatch = useDispatch();
    const tasks = useSelector(state=>state.tasks.collection);
    const allLists = useSelector(state=>state.lists?.lists);

    const listIdObj = useParams();
    const listId = listIdObj.listId;


    const filteredTasks = tasks.filter(task=> task.list_id == listId)
    const filteredList = allLists.filter(list=>list.id == listId)
    

    useEffect(()=>{
        dispatch(getTasks());
        dispatch(getAllLists());
    }, [dispatch])




    return (
        <div className='biggest-container'>
            <div className='side-bar-nav'>
                <NavLink to='/completed'>Completed</NavLink>
                <div className='lists-container'>
                    <div>Lists</div>
                    {allLists?.map((list)=>
                    <NavLink to={`/lists/${list.id}`}>{list.title}</NavLink>
                    )}
                </div>
            </div>
            <div className='main-page-parent'>
                <div className='task-container'>
                    {filteredList.map((list)=>
                    <h2>{list.title}</h2>
                    )}
                    {filteredTasks.map((task)=>
                    <div className='single-task'>
                        <div className='task-description'>{task.description}</div>
                        <div>{task.task}</div>
                    </div>
                    )}
                </div>

            </div>
        </div>
    )







}

export default ListPage;

import { useEffect } from 'react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from '../../store/tasks';
import AddTaskButton from '../AddTaskButton';
import './MainPage.css'
import { NavLink } from 'react-router-dom';
import DeleteTaskButton from '../DeleteTaskButton'
import AddTaskForm from '../AddTaskButton/AddTaskForm';
import EditTaskButton from '../EditTaskButton';
import { getAllLists } from '../../store/lists';
import DeleteListButton from '../DeleteListButton';
import AddListButton from '../AddListButton';
import EditListButton from '../EditListButton';

//add list modal imports
import AddListForm from '../AddListButton/AddListForm';
import { Modal } from '../../context/Modal';

//font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'

//ellipsis modal import
import EllipsisModal from '../EllipsisModal';

library.add(fas)

function MainPage() {

    //useSelectors to get task and list values
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.collection);
    const allLists = useSelector(state => state.lists?.lists);


    //adding list modal logic
    const [showAddListModal, setShowAddListModal] = useState(false)
    const hideAddListForm = () => {
        setShowAddListModal(false)
    }

    //delete/edit elipsis modal logic
    const [showEllipsisModal, setShowEllipsisModal] = useState(false)
    const hideEllipsisModal = () => {
        setShowEllipsisModal(false)
    }


    //useEffect to load tasks and lists
    useEffect(() => {
        dispatch(getTasks());
        dispatch(getAllLists());
    }, [dispatch])

    //logic for delete list






    return (
        <div className='biggest-container'>
            <div className='side-bar-nav'>
                <NavLink to='/completed'>Completed</NavLink>
                <div className='lists-container'>
                    <div className='list-header-div'>
                        <div className='lists-header'>Lists</div>
                        <FontAwesomeIcon onClick={() => setShowAddListModal(true)} icon="fa-solid fa-plus" />
                        {showAddListModal && (
                            <Modal onClose={() => setShowAddListModal(false)}>
                                <AddListForm hideAddListForm={hideAddListForm} />
                            </Modal>
                        )}
                    </div>
                    {allLists?.map((list) =>
                        <div className='single-list-container'>
                            <NavLink to={`/lists/${list.id}`}>{list.title}</NavLink>
                            <div className='delete-edit-div'>
                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" onClick={() => setShowEllipsisModal(true)}/>
                                {showEllipsisModal && (
                                    <Modal onClose={() => setShowEllipsisModal(false)}>
                                        <EllipsisModal listTitle={list.title} listId={list.id} hideEllipsisModal={hideEllipsisModal}/>
                                    </Modal>
                                )}
                                {/* <EditListButton listTitle={list.title} listId={list.id} />
                                <DeleteListButton listId={list.id} /> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='main-page-parent'>
                <div className='task-container'>
                    <h2>All Tasks</h2>
                    {tasks.map((task) =>
                        <div className='single-task'>
                            <div className='task-description'>{task.description}</div>
                            <div>{task.task}</div>
                            <DeleteTaskButton taskId={task.id} />
                            <EditTaskButton task={task} />
                        </div>
                    )}
                    <AddTaskButton />
                </div>

            </div>
        </div>
    )

}


export default MainPage;

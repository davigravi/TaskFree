import { useEffect } from 'react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from '../../store/tasks';
import { getAllLists } from '../../store/lists';
import { NavLink, useParams } from 'react-router-dom';
import './ListPage.css'
import DeleteTaskButton from '../DeleteTaskButton';
import EditTaskButton from '../EditTaskButton';
import AddTaskButton from '../AddTaskButton';
import DeleteListButton from '../DeleteListButton';
import AddListButton from '../AddListButton';
import EditListButton from '../EditListButton';
import AddTaskForm from '../AddTaskButton/AddTaskForm';

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


function ListPage() {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.collection);
    const allLists = useSelector(state => state.lists?.lists);

    const listIdObj = useParams();
    const listId = listIdObj.listId;


    const filteredTasks = tasks.filter(task => task.list_id == listId)
    const filteredList = allLists.filter(list => list.id == listId)


    useEffect(() => {
        dispatch(getTasks());
        dispatch(getAllLists());
    }, [dispatch])

    //logic for adding list modal
    const [showAddListModal, setShowAddListModal] = useState(false)
    const hideAddListForm = () => {
        setShowAddListModal(false)
    }

    //delete/edit elipsis modal logic
    const [showEllipsisModal, setShowEllipsisModal] = useState(null)

    const openEllipsisModal = (index)=> {
        if (showEllipsisModal) return;
        setShowEllipsisModal(index)
    }

    const hideEllipsisModal = (e) => {
        e.stopPropagation()
        setShowEllipsisModal(false)
    }

    const hideEllipsisModal2 = () => {
        setShowEllipsisModal(false)
    }


    useEffect(() => {
        if (!showEllipsisModal) return

        const hideEllipsisModal = (e) => {
            setShowEllipsisModal(null)
        }
    }, [showEllipsisModal])

    //adding task form logic
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const openAddTaskForm = () => {
        if (showAddTaskForm) return;
        setShowAddTaskForm(true)
    }


    useEffect(() => {
        if (!showAddTaskForm) return;


    }, [showAddTaskForm]);

    const closeAddTaskForm = (e) => {
        setShowAddTaskForm(false);
    }



    return (
        <div className='biggest-container'>
            <div className='side-bar-nav'>
                {/* <NavLink to='/completed'>Completed</NavLink> */}
                <div className='lists-container'>
                    <div className='list-header-div'>
                        <div className='lists-header'>Lists</div>
                        <FontAwesomeIcon onClick={() => setShowAddListModal(true)} icon="fa-solid fa-circle-plus" id='add-favicon' />
                        {showAddListModal && (
                            <Modal onClose={() => setShowAddListModal(false)}>
                                <AddListForm hideAddListForm={hideAddListForm} />
                            </Modal>
                        )}
                    </div>
                    {allLists?.map((list, index) =>
                        <div className='single-list-container'>
                            <NavLink id='list-title-nav' to={`/lists/${list.id}`}>{list.title}</NavLink>
                            <div className='delete-edit-div'>
                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" id='ellipsis' onClick={() => openEllipsisModal(index)} />
                                {showEllipsisModal === index && (
                                    <Modal onClose={() => setShowEllipsisModal(false)}>
                                        <EllipsisModal index={index} page='listpage' listTitle={list.title} listId={list.id} hideEllipsisModal={hideEllipsisModal} hideEllipsisModal2={hideEllipsisModal2}/>
                                    </Modal>
                                )}
                                {/* <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                                <DeleteListButton page='page' listId={list.id} />
                                <EditListButton listTitle={list.title} listId={list.id} /> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='main-page-parent'>
                <div className='task-container'>
                    {filteredList.map((list) =>
                        <h2>{list.title}</h2>
                    )}
                    <div className='task-scroll'>
                        {filteredTasks.map((task) =>
                            <div className='single-task'>
                                <div className='task-description'>{task.description}</div>
                                <div>{task.task}</div>
                                <DeleteTaskButton taskId={task.id} />
                                <EditTaskButton task={task} />
                            </div>
                        )}
                        <div className='add-task-bottom-of-page'>
                            <FontAwesomeIcon onClick={openAddTaskForm} id='add-favicon' icon="fa-solid fa-circle-plus" />
                            {showAddTaskForm && <AddTaskForm listId={listId} closeForm={closeAddTaskForm} />}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )







}

export default ListPage;

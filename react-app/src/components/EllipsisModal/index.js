//css import
import './EllipsisModal.css'

//delete list imports
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeList } from '../../store/lists'
import { deleteTask } from '../../store/tasks';

//edit list imports
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListForm from '../EditListButton/EditListForm';


function EllipsisModal({ listTitle, listId, hideEllipsisModal, page, index, hideEllipsisModal2}) {

    console.log(index, 'this is index')
    console.log(listTitle, 'this is listTitle')
    //delete list logic
    let history = useHistory();
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.tasks.collection);
    const filteredTasks = tasks.filter(task => task.list_id == listId)

    const handleClick = async (e) => {
        e.preventDefault();
        let lstId;
        if (listId) {
            lstId = listId
        }

        const payload = {
            list_id: lstId,
        }

        const deletedList = await dispatch(removeList(payload))
        if (deletedList) {
            console.log('in if statement')
            for (let i = 0; i < filteredTasks.length; i++) {
                const deletedTaskInList = await dispatch(deleteTask(filteredTasks[i].id))
                if (page) {
                    history.push('/')
                }
            }
            history.push('/')
        }
        // hideEllipsisModal();
    }


    //edit list logic
    const [showEditListModal, setShowEditListModal] = useState(false)

    const openEditListModal = (index) => {
        if (showEditListModal) return;
        setShowEditListModal(index)
    }

    const hideEditListForm = () => {
        setShowEditListModal(false)
    }

    return (
        <div className='ellipsis-modal-container'>
            <div className='div-with-delete' onClick={handleClick}>Delete</div>
            <span className='empty-span'></span>
            <div  onClick={() => openEditListModal(index)}>Edit</div>
            {showEditListModal === index && (
                <Modal onClose={() => setShowEditListModal(false)}>
                    <EditListForm hideEllipsisModal2={hideEllipsisModal2} listTitle={listTitle} listId={listId} hideEditListForm={hideEditListForm}/>
                </Modal>
            )}
        </div>
    )
}


export default EllipsisModal;

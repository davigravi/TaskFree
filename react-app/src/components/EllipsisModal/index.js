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


function EllipsisModal({ listTitle, listId, hideEllipsisModal, page }) {
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
        hideEllipsisModal();
    }


    //edit list logic
    const [showEditListModal, setShowEditListModal] = useState(false)

    const hideEditListForm = () => {
        setShowEditListModal(false)
    }

    return (
        <div className='ellipsis-modal-container'>
            <div className='ellipsis-border-bottom' onClick={handleClick}>Delete</div>
            <div  onClick={() => setShowEditListModal(true)}>Edit</div>
            {showEditListModal && (
                <Modal onClose={() => setShowEditListModal(false)}>
                    <EditListForm listTitle={listTitle} listId={listId} hideEditListForm={hideEditListForm} />
                </Modal>
            )}
        </div>
    )
}


export default EllipsisModal;
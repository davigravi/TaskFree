import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListForm from './EditListForm';

function EditListButton({ listId , listTitle}) {
    const [showEditListModal, setShowEditListModal] = useState(false)



    const hideEditListForm = () => {
        setShowEditListModal(false)
    }


    return (
        <div>
            <div className='edit-list-div' onClick={() => setShowEditListModal(true)}>Edit</div>
            {showEditListModal && (
                <Modal onClose={() => setShowEditListModal(false)}>
                    <EditListForm listTitle={listTitle} listId={listId} hideEditListForm={hideEditListForm} />
                </Modal>
            )}
        </div>
    )
}

export default EditListButton;

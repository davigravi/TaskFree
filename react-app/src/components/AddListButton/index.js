import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddListForm from './AddListForm';

function AddListButton() {


    //logic for adding list modal
    const [showAddListModal, setShowAddListModal] = useState(false)
    const hideAddListForm = () => {
        setShowAddListModal(false)
    }

    return (

        <div>
            <div className='add-list-div' onClick={() => setShowAddListModal(true)}>Add List</div>
            {showAddListModal && (
                <Modal onClose={() => setShowAddListModal(false)}>
                    <AddListForm hideAddListForm={hideAddListForm} />
                </Modal>
            )}
        </div>

    )
}



export default AddListButton;

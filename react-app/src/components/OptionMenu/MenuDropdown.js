import React from 'react'

import DeleteTaskButton from '../DeleteTaskButton';
import EditTaskButton from '../EditTaskButton';

function MenuDropdown () {

    return (
        <ul className='menu-dropdown'>
            <li>
                <EditTaskButton/>
            </li>
            <li>
                <DeleteTaskButton/>
            </li>
        </ul>
    )
}


export default MenuDropdown;

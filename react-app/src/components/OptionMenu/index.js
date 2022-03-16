import React, { useEffect, useState } from 'react'


import MenuDropdown from './MenuDropdown';

function OptionMenu(){
    const [showOptionMenu, setShowOptionMenu] = useState(false);

    const openOptionMenu = () => {
        if (showOptionMenu) return;
        setShowOptionMenu(true);
      }

    useEffect(() => {
    if (!showOptionMenu) return;

    const closeOptionMenu = (e) => {
        setShowOptionMenu(false);
    }

    document.addEventListener('click', closeOptionMenu);

    return () => document.removeEventListener('click', closeOptionMenu);
    }, [showOptionMenu]);



    return (
        <div>
            <div className='option-menu-container'>
                <i
                className='far fa-ellipsis-h post-view'
                // alt = 'option-menu'
                onClick = {openOptionMenu}
                />
                {showOptionMenu && <MenuDropdown/>}
            </div>
        </div>
    )
}



export default OptionMenu;

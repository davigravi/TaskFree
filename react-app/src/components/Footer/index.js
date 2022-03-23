import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css'

function Footer() {

    const [showAboutMe, setShowAboutMe] = useState(false)

    useEffect(() => {
        if (!showAboutMe) return
        const closeDropdown = (e) => {
            setShowAboutMe(false);
        }

        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);
    }, [showAboutMe]);


    return (
        <div className='footer-parent'>
            <ul className='technologies-list'>
                <li className='list-item'>JavaScript</li>
                <li className='list-item'>Python</li>
                <li className='list-item'>React</li>
                <li className='list-item'>Flask</li>
                <li className='list-item'>SQLAlchemy</li>
                <li className='list-item'>Redux</li>
                <li className='list-item'>Git</li>
                <li className='list-item'>Docker</li>
                <li className='list-item'>Postgres</li>
                <li className='list-item'>AWS</li>
            </ul>
            <div id='about-me'>
                <div id='about-me-dropdown' onClick={setShowAboutMe}>About Me<FontAwesomeIcon icon="fa-solid fa-angle-down" /></div>
                {showAboutMe && (
                    <ul id='about-me-list'>
                        <li className='names'><a href='https://github.com/davigravi' target='_blank' rel="noopener noreferrer">Github</a></li>
                        <li className='names'><a href='https://www.linkedin.com/in/david-lee-5b85031b9/' target='_blank' rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>

                )}
                <div>

                    <p>© 2022 TaskFree a Remember the Milk Clone</p>
                </div>
            </div>
        </div>
    )
}


export default Footer;

import './404Page.css'
import { NavLink } from 'react-router-dom';

function ErrorPage() {




    return (
        <div className='error-page-parent'>
            <div>404</div>
            <div>Page Not Found</div>
            <div className='image-div'></div>
            <NavLink id='go-back' to='/'>Go Back</NavLink>
        </div>
    )
}



export default ErrorPage;

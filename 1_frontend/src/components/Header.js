import React, {useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

// assets
import logo from '../assets/images/logo.png';

// styles
import './Header.css';

const Header = () => {

    // state
    const { state, dispatch } = useContext(UserContext);

    // side effects
    useEffect(() => {
        if (localStorage.getItem('user')) {
            // Window.postMessage('User registered already');
            console.log('user exists')

            dispatch({
                type: 'Login',
                payload: localStorage.getItem('user')
            });
           
        } else {
            console.log('user does not exist')
        }
    }, [dispatch]);

    return (
        <header>
            <div>
                <Link to ='/'><img src={logo} alt="logo" /></Link>
            </div>
            <nav>
                <ul>
                    
                    <li><Link to='/'>Home</Link></li>
                    {state.user ? (
                        <>
                            <li>
                                <Link to ='/my-account'>My Account</Link>
                            </li>
                            <li>
                                <Link onClick={() => { localStorage.clear(); window.location.reload(false) }} to ='/'>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to ='./login'>Login / Sign Up</Link>        
                        </li>
                    )}                    
                </ul>
            </nav>
        </header>
    )
}

export default Header

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// pages
import AccountPage from './pages/AccountPage';

const ProtectedAccount = () => {

    // redirection
    const history = useHistory();

    // side Effects
    useEffect(() => {
        if (!localStorage.getItem(`user`)) history.push(`/`);
    });
    
    return <AccountPage />
}

export default ProtectedAccount

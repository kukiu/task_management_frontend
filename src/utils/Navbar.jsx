import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
    const { logout, user } = useContext(AuthContext);
    return (
        <div style={{ display: "flex", justifyContent: 'space-between', background: "grey", padding: "5px 25px" }}>
            <h3>TMS</h3>
            <ul style={{ listStyle: "none", display: "flex", justifyContent: 'space-between' }}>
                <li>
                    <button className='btn btn-danger' onClick={() => logout()}>Logout {user.user.username && user.user.username}</button>                    
                </li>
            </ul>
        </div>
    )
}

export default Navbar
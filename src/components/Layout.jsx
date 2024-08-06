import React from 'react'
import Navbar from '../utils/Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Layout
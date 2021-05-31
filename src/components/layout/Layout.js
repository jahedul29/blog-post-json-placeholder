import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children}) => {
    return (
        <div className="m-0 main-container">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

export default Layout

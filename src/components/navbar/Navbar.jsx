import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand " to='/' style={{ marginLeft:100}}>
                    <i class="fa fa-mobile" style={{ margin:2, color:"yellow"}}> </i>
                        Contact Manager</Link>
                    
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar
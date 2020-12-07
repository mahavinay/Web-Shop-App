import React from 'react'
import {Link} from 'react-router-dom'

export default function Notfound() {
    return (
        <div>
            <h1>Page Does not Exists!</h1>
            <Link to="/">Go to Home Page</Link>
        </div>
    )
}


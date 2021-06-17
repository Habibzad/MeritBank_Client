import React, { useState, useEffect } from 'react'

function UpdateAccount() {
    const [name, setName] = useState('gg')

    useEffect(() => {
        setName('jj')
    }, [])

    return (
        <div>
            <h1>Name: {name}</h1>
        </div>
    )
}

export default UpdateAccount

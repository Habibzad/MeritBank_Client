import React, { useState } from 'react'

function CheckingAccount() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FirstName: ", firstName, "lastname: ", lastName)
    }
    return (
        <div className="container">
            <h1>CheckingAccount</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div>
                    <lable>First Name</lable>
                    <br />
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <lable>Last Name</lable>
                    <br />
                    <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default CheckingAccount

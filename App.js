import React, { useEffect } from 'react'
import { useState } from 'react'


const App = () => {

    const [form, setForm] = useState({})
    const [users, setUsers] = useState([])


    const handleForm = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

   const response = await fetch('http://localhost:8080/demo', {
            method: 'POST',
            body:JSON.stringify(form),
            headers:{
                'Content-Type':'application/json'
            }
        })

   const data = await response.json();
        console.log(data);
    }
    
    const getUsers = async () => {
        const response = await fetch('http://localhost:8080/demo', {
            method: 'GET',
           
        })

        const data = await response.json();
       setUsers(data);
    }

    useEffect(()=>{
        getUsers();

    },[])
    return ( 
        <>
            <form onSubmit={handleSubmit}>
                <p>{JSON.stringify(form)}</p>
                <span>username</span>
                <input type='text' name='username' onChange={handleForm} /><br></br><br></br>
                <span>password</span>
                <input type='text' name='password' onChange={handleForm} /><br></br><br></br>
                <input type='submit' />
            </form>
            <div>
                <ul>
                   {users.map(user=><li key={user._id}>{user.username},{user.password}</li>)}
                </ul>
            </div>
        </>
    )
}

export default App
import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:8000/auth/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.t
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          // save the authtoken and redirect
          localStorage.setItem('token', json.authtoken)
          navigate("/")
        }
        else{
          console.log("restricted!!!")
        }
  }
    let onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div className='container bg-dark rounded'>
    <h2 className="my-4 text-light">Login to continue to Egather</h2>
    <form onSubmit={handleSubmit}>
<div className="mb-3">
  <label htmlFor="email" className="form-label text-light">Email address</label>
  <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="password" className="form-label  text-light">Password</label>
  <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
</div>
<button type="submit" className="btn btn-secondary backg-black mb-2">Submit</button>
</form>
  </div>
  )
}

export default Login

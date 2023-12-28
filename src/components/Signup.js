import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
  
  const [credentials, setCredentials] = useState({email:""})
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:8000/auth/set-password-otp-send`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.t
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: credentials.email})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          //  redirect
          navigate("/otp-verification")
        }
        else{
         console.log("Enter Valid Email Id")
        }
  }
  let onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  return (
    <div className='container bg-dark rounded'>
    <h2 className="my-4 text-light">SignUp to continue to Egather</h2>
    <form onSubmit={handleSubmit}>
<div className="mb-3">
  <label htmlFor="email" className="form-label text-light">Email address</label>
  <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}/>
</div>
{/* <div className="mb-3">
  <label htmlFor="password" className="form-label  text-light">Password</label>
  <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="confirmPassword" className="form-label  text-light">Confirm Password</label>
  <input type="confirmPassword" className="form-control" id="confirmPassword" name="confirmPassword" value={credentials.password} onChange={onChange}/>
</div> */}
<button type="submit" className="btn btn-secondary backg-black mb-2">Submit</button>
</form>
  </div>
  )
}

export default Signup

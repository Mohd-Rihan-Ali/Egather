import React, { useState } from 'react'

const Signup = () => {
  
  const [credentials, setCredentials] = useState({email:"", password:""})
  let onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  return (
    <div className='container bg-dark rounded'>
    <h2 className="my-4 text-light">Login to continue to Egather</h2>
    <form>
<div className="mb-3">
  <label htmlFor="email" className="form-label text-light">Email address</label>
  <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="password" className="form-label  text-light">Password</label>
  <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="confirmPassword" className="form-label  text-light">Confirm Password</label>
  <input type="confirmPassword" className="form-control" id="confirmPassword" name="confirmPassword" value={credentials.password} onChange={onChange}/>
</div>
<button type="submit" className="btn btn-secondary backg-black mb-2">Submit</button>
</form>
  </div>
  )
}

export default Signup

import React from 'react'

function Join() {
  return (
    <div className='container my-3 bg-dark text-light'>
      <form>
  <div className="mb-3">
    <label for="meeting-id" className="form-label">Meeting ID</label>
    <input type="text" className="form-control" id="meeting-id"/>
  </div>
  <div className="mb-3">
    <label for="passcode" className="form-label">Passcode</label>
    <input type="password" className="form-control" id="passcode"/>
  </div>
  <button type="submit" className="btn btn-secondary mb-2 mx-2 backg-black">Join</button>
</form>
    </div>
  )
}

export default Join

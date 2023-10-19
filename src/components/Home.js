import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="container card text-center my-3 bg-dark text-light">
  <div className="card-body">
    <h2 className="card-title">Get Connected: Start or Join a Meeting</h2>
    <p className="card-text">Enhance the online learning experience with our secure virtual classroom solution. By requiring students and faculty to log in using their enrollment numbers and faculty IDs, we ensure the integrity of each session, allowing only authorized individuals to participate and maintain the quality of education.</p>
    <Link href="#" className="btn btn-secondary mx-2 backg-black" to="/createRoom">Start New Meeting</Link>
    <Link href="#" className="btn btn-secondary mx-2 backg-black" to="/join">Join Meeting</Link>
  </div>
</div>
  )
}

export default Home

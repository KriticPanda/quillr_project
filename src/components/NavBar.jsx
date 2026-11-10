import React from 'react'
import Logo from "../assets/Logo.png"
import SearchLogo from "../assets/search-icon.png"
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='Nav'>
        <Link to ="/">
        <img src={Logo} alt="" />
        </Link>
        
        <div className='SearchBar'>
               <input 
        type="text" 
        placeholder="Search" 
        
      />
      <button>Search</button>
        </div>
<Link to="/stories/create">
        <button>+ New Story</button>
        </Link>
      
    </div>
  )
}

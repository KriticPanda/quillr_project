import React from 'react'
import Logo from "../assets/Logo.png"
import SearchLogo from "../assets/search-icon.png"

export default function NavBar() {
  return (
    <div className='Nav'>
        <img src={Logo} alt="" />
        <div className='SearchBar'>
               <input 
        type="text" 
        placeholder="Search" 
        
      />
      <img src={SearchLogo}/>
        </div>

        <button>+ New Story</button>
      
    </div>
  )
}

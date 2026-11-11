
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'


// Find the root DOM element and mount the React application into it.
createRoot(document.getElementById('root')).render(
  // BrowserRouter enables client-side routes and URL navigation throughout the app.
  <BrowserRouter>
   {/* App contains the shared layout and route definitions. */}
   <App/>
   </BrowserRouter>

)

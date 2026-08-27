import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from "react-router-dom"
import UseStoreContext from './useStore/UseStoreContext.jsx'
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
<UseStoreContext>  
    <App />    
    </UseStoreContext>
    </BrowserRouter>
  </StrictMode>,
)

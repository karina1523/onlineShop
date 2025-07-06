import { createRoot } from 'react-dom/client'
import './scss/main.scss'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './routes/index.jsx'


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

)

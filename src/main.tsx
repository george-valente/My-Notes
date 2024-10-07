import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { NotesProvider } from '../src/context/NotesContext.tsx'
import { Note } from './components/Note.tsx'
import { ShowNotes } from './layouts/ShowNotes.tsx'

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App/>
  },
  {
    path: "/notes", 
    element: <ShowNotes/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotesProvider>
      <RouterProvider router = {router}/>
    </NotesProvider>
  </StrictMode>,
)

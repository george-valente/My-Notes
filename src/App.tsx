import { PenLine } from "lucide-react"
import { Modal } from "./components/Modal";
import { useState } from "react";
import { useNotes } from '../src/context/NotesContext'

function App() {
  const { addNote, title, content} = useNotes(); 
  const [noteModal, setNoteModalOpen] = useState(false);
 

  const setModalOpen = () => {
    setNoteModalOpen(true); 
  }
  
  const closeNoteModal = () => {
    setNoteModalOpen(false);
  }

  const handleSaveNote = () => {
    if(title && content){
      const newNote = {title, content} 
      addNote(newNote); 

      setNoteModalOpen(false)
    }
    
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center font-inter bg-zinc-100">
      <div className = "mx-auto space-y-8 flex flex-col items-center justify-center">
        <h1 className = "font-bold text-2xl text-center">My Notes</h1>
        <p className = "text-zinc-500 font-semibold text-center">Write - Or type - your thougths or anything you have in your mind. Keep it clean. Keep it simple.</p>
        <button 
        onClick = {setModalOpen}
        className = "flex gap-2 px-4 py-2 rounded-full bg-orange-400 text-white font-semibold hover: border border-orange-400 hover:bg-white hover:text-orange-400 transition-all duration-300 ease-in-out">
          <PenLine/>
          Create</button>
      </div>


      {noteModal &&
       <Modal closeNoteModal={closeNoteModal} onSaveNote = {handleSaveNote}/>}
      
    </div>  
  )
}

export default App

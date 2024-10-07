import { PenLine } from "lucide-react";
import { Note } from "../components/Note";
import { useNotes } from "../context/NotesContext";

import { Modal } from "../components/Modal";
import { useState } from "react";


export function ShowNotes(){
  
    const [noteModal, setNoteModalOpen] = useState(false);

    const {addNote, title, content, notes} = useNotes();  

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

      
    /* eu acho que esse layout é um map, das Notes existentes, exibe o componente Note com informações diferentes. */
    return(
        <div className = "bg-zinc-100 h-screen p-4 font-inter">
          <h1 className = "font-bold text-2xl text-start">My Notes</h1>
          <div className="mt-4">
            <button
              onClick = {setModalOpen}
              className = "flex gap-2 px-4 py-2 rounded-full bg-orange-400 text-white font-semibold hover: border border-orange-400 hover:bg-white hover:text-orange-400 transition-all duration-300 ease-in-out">
              <PenLine/>
              Create</button>
          </div>

          <h2 className = "text-center">Library</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {notes.map((note, index) => (
                  <Note key = {index} title = {note.title} content = {note.content}/>
              ))}
            </div>
            

            {noteModal &&
       <Modal closeNoteModal={closeNoteModal} onSaveNote = {handleSaveNote}/>}

            
        </div>
    )
}
import { PenLine } from "lucide-react";
import { Note } from "../components/Note";
import { useNotes } from "../context/NotesContext";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";


export function ShowNotes(){
    const [noteModal, setNoteModalOpen] = useState(false);
    const {notes, loadNotes} = useNotes();  

    const setModalOpen = () => {
        setNoteModalOpen(true); 
      }
      
    const closeNoteModal = () => {
        setNoteModalOpen(false);
      }

       
    useEffect(() => {
      loadNotes(); 
    },[]) 

    return(
        <div className = "bg-white h-screen font-inter">
          <header className = "border border-gray-300 py-2 px-8">
            <h1 className = "font-bold text-2xl text-start text-blue-600">My Notes</h1>
          </header>
          
          <div className="flex justify-end mt-4 mr-6">
            <button
              onClick = {setModalOpen}
              className = "flex gap-2 px-4 py-2 rounded-full bg-blue-400 text-white font-semibold hover: border border-blue-400 hover:bg-white hover:text-blue-400 transition-all duration-300 ease-in-out">
              <PenLine/>
              Create</button>
          </div>

          <h2 className = "text-center text-sm font-bold mb-5">LIBRARY</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                {notes.map((note) => (
                    <Note key = {note.id} id = {note.id} title = {note.title} content = {note.content}/>
                ))}
            </div>
            

            {noteModal &&
       <Modal closeNoteModal={closeNoteModal}/>}

            
        </div>
    )
}
import { Ellipsis } from 'lucide-react';
import { useNotes } from '../context/NotesContext'
import { useState } from 'react';
import { Modal } from './Modal';

interface NoteProps{
    title: string; 
    content: string; 
}

export function Note({title, content} : NoteProps ){ 
    const {deleteNote, editNote} = useNotes(); 
    
    const [optionsModal, setOptionsModal] = useState(false);
    const [noteModal, setNoteModalOpen] = useState(false);


  const setModalOpen = () => {
    setNoteModalOpen(true); 
  }
  
  const closeNoteModal = () => {
    setNoteModalOpen(false);
  }

  const handleSaveNote = (newNote: NoteProps) => {
    if(title && content){
      const noteToEdit: NoteProps = {title, content} 
      editNote(noteToEdit, newNote); 

      setNoteModalOpen(false)
    }
    
  }

    /* if(title && content){
        console.log(title,content)
    } */

    const showOptions = () => {
        setOptionsModal(!optionsModal)

    }
    const handleDeleteNote = () => {
        const note: NoteProps ={title, content}
        deleteNote(note)
    }
   


    return(
        <div className = "flex justify-center items-center flex-col">
            <h1 className = "text-xl p-2 outline-none text-orange-500 font-semibold">
                {title}
            </h1>
            <div 
            className = "bg-white flex p-3 flex-col shadow-xl w-64 rounded-lg h-40 ml-4 overflow-hidden">
                <div className = "flex justify-end text-slate-500 relative">
                    <Ellipsis 
                    onClick = {showOptions}
                    className = "cursor-pointer hover:bg-slate-200 rounded-full select-none"/>
                
                    <div className = {`bg-white absolute shadow-shadow-28 top-8 ${optionsModal ? '' : 'hidden'}`}>
                        <div className = "py-2 px-6 text-center text-red-600 font-bold hover:bg-slate-200">
                            <button onClick = {handleDeleteNote}>Excluir</button>
                        </div>
                        <div className = "py-2 px-6 text-center text-black hover:bg-slate-200">
                            <button onClick = {setModalOpen}>Editar</button>
                        </div>
                    </div>
                </div>
                <p className = "">{content}</p>
            </div>

            {noteModal &&
       <Modal closeNoteModal={closeNoteModal} onSaveNote = {handleSaveNote}/>}

            
            
        </div>
    )
}
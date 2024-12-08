import { Ellipsis } from 'lucide-react';
import { useNotes } from '../context/NotesContext'
import { useState } from 'react';
import { Modal } from './Modal';
import { NoteModal } from './NoteModal';

import { motion, AnimatePresence } from 'framer-motion'; 

interface NoteProps{
    title: string; 
    content: string; 
}

export function Note({title, content} : NoteProps ){ 
    const {deleteNote, editNote} = useNotes(); 
    
    const [optionsModal, setOptionsModal] = useState(false);
    const [noteModal, setNoteModalOpen] = useState(false);
    const [fullNoteModal, setFullNoteModal] = useState(false); 

     


  const setModalOpen = () => {
    setNoteModalOpen(true); 
  }
  
  const closeNoteModal = () => {
    setNoteModalOpen(false);
  }

  const openFullNote = () => {
    console.log("abridno")
    setFullNoteModal(true); 
  }

  const closeFullNote = () => {
    console.log("fechando")
    setFullNoteModal(false) 
  }
  

  const handleSaveNote = (newNote: NoteProps) => {
    if(title && content){
      const noteToEdit: NoteProps = {title, content} 
      editNote(noteToEdit, newNote); 

      setNoteModalOpen(false)
    }
    
  }

    const showOptions = () => {
        setOptionsModal(!optionsModal)
    }
    
    const handleDeleteNote = () => {
        const note: NoteProps ={title, content}
        deleteNote(note)
    }
   


    return(
        <div className = " main flex justify-center items-center flex-col">
            <h1 className = "text-xl p-2 outline-none text-orange-500 font-semibold">
                {title}
            </h1>
            <div 
            
            className = "bg-white flex p-5 flex-col shadow-xl w-64 rounded-lg h-40 ml-4 overflow-hidden">
                <div className = "flex justify-end text-slate-500 relative" >
                    
                    <Ellipsis 
                    onClick = {showOptions}
                    className = "cursor-pointer hover:bg-slate-200 rounded-full select-none"/>
                
                    <AnimatePresence>
                      {optionsModal && (
                        <motion.div 
                        initial = {{opacity: 0, scale: 1}}
                        animate = {{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 1}}
                        transition={{duration:0.1}}
    
                        className = "bg-white absolute shadow-shadow-28 top-8">
                            <div className = "py-2 px-6 text-center text-red-600 font-bold hover:bg-slate-200">
                                <button onClick = {handleDeleteNote}>Excluir</button>
                            </div>
                            <div className = "py-2 px-6 text-center text-black hover:bg-slate-200">
                                <button onClick = {setModalOpen}>Editar</button>
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                </div>
                <p className = "cursor-pointer" onClick={openFullNote}>{content}</p>
            </div>

            {noteModal &&
       <Modal closeNoteModal={closeNoteModal} onSaveNote = {handleSaveNote}/>}

            { fullNoteModal
                    && <NoteModal title = {title} content = {content} closeFullNote={closeFullNote}/> }

        </div>
    )
}
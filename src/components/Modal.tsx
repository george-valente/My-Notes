import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotes } from '../context/NotesContext'
import { Hash } from 'lucide-react';

interface NewNote{
    title: string; 
    content: string; 
}


interface ModalProps {
    closeNoteModal: () => void
}

export function Modal({ closeNoteModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagsModal, setTagsModal] = useState(false); 

    const { createNote } = useNotes();

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!title && !content){
            return; 
        }

        const newNote: NewNote = {
            title: title,
            content: content
        }
        console.log(newNote)
        createNote(newNote);
        closeNoteModal();

        if (location.pathname !== "/notes") {
            navigate("/notes")
        }
    }

    /* open tags modal */
    const openTagsModal = () => {
        console.log("abrindo o tags modal"); 
        setTagsModal(!tagsModal); 
    }

    /* const closeTagsModal = () => {
        console.log("fechando o tags modal"); 
        setTagsModal(false); 
    } */


    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-md w-5/12 p-4"
            >
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder="Title"
                        className="text-2xl p-2 outline-none placeholder-blue-500" />

                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        rows={7}
                        placeholder="Try on! Write anything you want."
                        className="p-2 outline-none placeholder-zinc-600 resize-none"></textarea>

                    <div className = "pb-2 relative">
                        <button 
                        onClick = {openTagsModal}
                        className = "p-2 bg-zinc-300 rounded-full">
                            <Hash className = "text-blue-600 hover:animate-pulse" size = {20}/>
                        </button>
                    </div>
                    {tagsModal && 
                        <div className = " bg-slate-50 absolute bottom-[6.5rem] border  antialiased font-semibold shadow-shadow-28 z-50 "> 
                        <ul className = "text-sm">
                            <li className ="py-2 pl-2 pr-16 hover:bg-zinc-300 cursor-pointer">Pessoal </li>
                            <li className ="py-2 pl-2 pr-16 hover:bg-zinc-300 cursor-pointer">Trabalho</li>
                            <li className ="py-2 pl-2 pr-16 hover:bg-zinc-300 cursor-pointer">Afazeres</li>
                            <li className ="py-2 pl-2 pr-16 hover:bg-zinc-300 cursor-pointer">Compras</li>
                        </ul>
                            
                        </div>
                    }

                    <div className="flex justify-between">
                        <button
                            onClick={closeNoteModal}
                            className="p-2 bg-zinc-300 rounded-full">Fechar</button>
                        {content && title ?
                            <button
                                className="flex gap-2 px-4 py-2 rounded-full bg-blue-400 text-white font-semibold  hover:brightness-90">
                                Salvar
                            </button> : (
                                <button
                                    type="submit"
                                    disabled={!content || !title}
                                    className="flex gap-2 px-4 py-2 rounded-full bg-blue-400 text-white font-semibold brightness-75">
                                    Salvar
                                </button>
                            )
                        }

                    </div>
                </form>

            </motion.div>
        </div>

    )
}
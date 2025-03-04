import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotes } from '../context/NotesContext'

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

    const { createNote } = useNotes();

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
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
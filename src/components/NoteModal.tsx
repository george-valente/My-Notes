import { XIcon } from "lucide-react";
import { motion } from 'framer-motion';
import { FormEvent, useState } from "react";
import { useNotes } from "../context/NotesContext";

interface updatedNote{
    id: number; 
    title?: string; 
    content?:string; 
}
interface NoteModalInterface {
    id: number; 
    title: string;
    content: string;
    closeFullNote: () => void
}

export function NoteModal({ id, title, content, closeFullNote }: NoteModalInterface) {
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);

    const {editNote} = useNotes(); 

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); 
        const updatedNote: updatedNote = {
            id: id,
            title: editedTitle,
            content: editedContent
        }

        editNote(id, updatedNote);  
        closeFullNote();    
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-md w-5/12">
                <form onSubmit = {handleSubmit}>
                    <div className="flex justify-between items-center mb-4 border border-gray-300 py-2 px-4">
                        <input
                            type="text"
                            className="text-blue-500 font-bold antialiased text-lg outline-none"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)} />
                        {/* <span className="text-blue-500 font-bold antialiased text-lg">{title}</span> */}
                        <button onClick={closeFullNote} >
                            <XIcon></XIcon>
                        </button>
                    </div>
                    
                    <div className="p-4">
                        <input
                            type="text"
                            className="text-black antialised w-full"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)} />
                        {/* <p className="text-black antialiased">
                        {content}
                    </p> */}
                    </div>
                    <div className=" flex justify-end mt-4">
                        <button
                            className="flex gap-2 px-4 py-2 rounded-full bg-blue-500 text-white font-semibold  hover:brightness-90">
                            Salvar alterações
                        </button>
                    </div>

                </form>

            </motion.div>
        </div>
    )

}
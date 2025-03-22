import { Hash, X, XIcon } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { api } from "../services/api";

interface Tag {
    name: string;
}

interface updatedNote {
    id: number;
    title?: string;
    content?: string;
    tags?: Array<string>
}

interface NoteModalInterface {
    id: number;
    title: string;
    content: string;
    tags: Array<string>;
    closeFullNote: () => void
}

export function NoteModal({ id, title, content, tags, closeFullNote }: NoteModalInterface) {
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    const [tagsModal, setTagsModal] = useState(false);
    const [allTags, setAllTags] = useState<Array<Tag>>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    //controlar a visilidade do modal 
    const [isOpen, setIsOpen] = useState(true); 

    const { editNote } = useNotes();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(tags);
        const updatedNote: updatedNote = {
            id: id,
            title: editedTitle,
            content: editedContent,
            tags: selectedTags
        }

        editNote(id, updatedNote);
        setIsOpen(false); 
        setTimeout(() => closeFullNote(), 200); 
    }

    useEffect(() => {
        const getTags = async () => {
            console.log("oii abri")
            try {
                const response = await api.get('/tags');
                setAllTags(response.data);
            }
            catch (error) {
                console.error("Erro ao carregar tags", error);
            }
        }

        getTags();
    }, [])

    /* open tags modal */
    const openTagsModal = () => {
        console.log("abrindo o tags modal");
        setTagsModal(!tagsModal);
    }

    const selectTagTest = (tag: Tag) => {
        if (selectedTags.includes(tag.name)) {
            return;
        }
        const newSelectedTag = tag.name;
        setSelectedTags([...selectedTags, newSelectedTag]);
    }

    const removeTag = (tag: string) => {
        const selectedTag = tag;

        setSelectedTags(selectedTags.filter(tag => tag != selectedTag));
    }

    const handleClose = () => {
        setIsOpen(false); 
        setTimeout(() => closeFullNote(), 100); 
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-md md:w-5/12">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between items-center mb-4 border border-gray-300 py-2 px-4 rounded-md">
                            <input
                                type="text"
                                className="text-blue-500 font-bold antialiased text-lg outline-none"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)} />
                            {/* <span className="text-blue-500 font-bold antialiased text-lg">{title}</span> */}
                            <button >
                                <XIcon onClick = {handleClose}></XIcon>
                            </button>
                        </div>
    
                        <div className="p-4">
                            <textarea
                                rows={6}
                                className="text-black antialised w-full resize-none outline-none"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)} />
                            {/* <p className="text-black antialiased">
                            {content}
                        </p> */}
                        </div>
    
                        <div className="flex gap-2 justify-start items-center p-2 relative">
                            <button
                                type="button"
    
                                className="p-2 bg-zinc-300 rounded-full">
                                <Hash
                                    onClick={openTagsModal}
                                    className="text-blue-600 hover:animate-pulse" size={20} />
                            </button>
                            <ul className="flex gap-2 overflow-x-scroll">
                                {/* Exibiçaõ das tags escolhidas*/}
                                {selectedTags && selectedTags.map((tag, index) => (
                                    <motion.li
                                        initial = {{opacity: 0, x: -20}}
                                        animate = {{opacity: 1 , x: 0}}
                                        exit = {{opacity: 0, x: 20}}
                                        transition={{duration: 0.3}}
                                        className="flex items-center gap-2 bg-zinc-300 p-2 rounded-full "
                                        key={index}>#{tag}
                                        <X
                                            onClick={() => removeTag(tag)}
                                            className="text-slate-700 cursor-pointer hover:text-black" size={16} />
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
    
                        {/* Seleção de tags */}
                        {(tagsModal && allTags) && (
                            <div className="bg-slate-50 absolute bottom-[10rem] border antialiased font-semibold shadow-shadow-28 z-50 ">
                                <ul className=" h-40 overflow-y-scroll">
                                    {allTags.map((tag, index) => (
                                        <li
                                            onClick={() => selectTagTest(tag)}
                                            key={index}
                                            className="py-2 pl-2 pr-16 hover:bg-zinc-300 cursor-pointer text-sm ">
                                            {tag.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
    
                        <div className="border-t border-gray-300 my-2 "></div>
    
                        <div className=" flex justify-end mt-4 p-4">
                            <button
                                className="flex gap-2 px-4 py-2 rounded-full bg-blue-500 text-white font-semibold  hover:brightness-90">
                                Salvar alterações
                            </button>
                        </div>
    
                    </form>
    
                </motion.div>
                
            </div>
            

            )}
            </AnimatePresence>
        
        
    )

}
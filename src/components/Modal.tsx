import { motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotes } from '../context/NotesContext'
import { Hash, X } from 'lucide-react';
import { api } from '../services/api';

interface Tag{
    name: string; 
}

interface NewNote {
    title: string;
    content: string;
    tags: Array<string>
}

interface ModalProps {
    closeNoteModal: () => void
}

export function Modal({ closeNoteModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagsModal, setTagsModal] = useState(false);

    const [tags, setTags] = useState<Array<Tag>>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]); 

    const { createNote } = useNotes();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const getTags = async () => {
            console.log("oii abri")
            try {
                const response = await api.get('/tags');
                setTags(response.data);
            }
            catch (error) {
                console.error("Erro ao carregar tags", error);
            }
        }

        getTags(); 
    }, [])

    const selectTagTest = (tag: Tag) => {
        if(selectedTags.includes(tag.name)){
            return; 
        }
        const newSelectedTag = tag.name; 
        setSelectedTags([...selectedTags, newSelectedTag]);  
    }

    const removeTag = (tag: string) => {
        const selectedTag = tag; 

        setSelectedTags(selectedTags.filter(tag => tag != selectedTag));  
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!title && !content) {
            return;
        }

        const newNote: NewNote = {
            title: title,
            content: content,
            tags: selectedTags
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


    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center  ">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-md md:w-5/12 p-4"
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

                    <div className="flex gap-2 justify-start items-center pb-2 relative ">
                        <button
                            type="button"
                            onClick={openTagsModal}
                            className="p-2 bg-zinc-300 rounded-full">
                            <Hash className="text-blue-600 hover:animate-pulse" size={20} />
                        </button>
                        <ul className="flex gap-2 overflow-x-scroll">
                        {/* Exibiçaõ das tags escolhidas*/}
                        {selectedTags && selectedTags.map((tag, index) => (
                                <li 
                                className="flex items-center gap-2 bg-zinc-300 p-2 rounded-full " 
                                key={index}>#{tag}
                                    <X 
                                    onClick = {() => removeTag(tag)}
                                    className="text-slate-700 cursor-pointer hover:text-black" size={16} />
                                </li>
                        ))}
                        </ul>

                    </div>
                    <div className="border-t border-gray-300 my-2 "></div>
                    {/* Seleção de tags */}
                    {(tagsModal && tags) &&  (
                        <div className="bg-slate-50 absolute bottom-[8.5rem] border antialiased font-semibold shadow-shadow-28 z-50 ">
                            <ul className = " h-40 overflow-y-scroll">
                                {tags.map((tag, index) => (
                                    <li 
                                    onClick = {() => selectTagTest(tag)}
                                    key={index} 
                                    className="py-2 pl-2 pr-16 hover:bg-zinc-300 cursor-pointer text-sm ">
                                        {tag.name} 
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                    <div className="flex justify-between">
                        <button
                            onClick={closeNoteModal}
                            className="p-2 bg-zinc-300 rounded-full font-semibold">Fechar</button>
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
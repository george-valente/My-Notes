import { XIcon } from "lucide-react";
import { motion } from 'framer-motion';

interface NoteModalInterface {
    title: string;
    content: string;
    closeFullNote: () => void
}

export function NoteModal({ title, content, closeFullNote }: NoteModalInterface) {

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-md w-5/12 p-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-500 font-bold antialiased text-lg">{title}</span>
                    <button onClick={closeFullNote} >
                        <XIcon></XIcon>
                    </button>
                </div>
                <div className="">
                    <p className="text-black antialiased">
                        {content}
                    </p>
                </div>
            </motion.div>
        </div>
    )

}
import { useNotes } from '../context/NotesContext'

interface NoteProps{
    title: string; 
    content: string; 
}
export function Note({title, content} : NoteProps ){ 
    if(title && content){
        console.log(title,content)
    }

    return(
        <div className = "flex justify-center items-center flex-col">
            <h1 className = "text-xl p-2 outline-none text-orange-500 font-semibold">
                {title}
            </h1>
            <div className = "bg-white flex p-3 flex-col shadow-xl w-64 rounded-lg h-40 ml-4 overflow-hidden">
                <p className = "">{content}</p>
            </div>
        </div>
    )
}
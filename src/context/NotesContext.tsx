import { createContext, ReactNode, useContext, useState} from 'react'; 

export interface Note{
    title: string; 
    content: string; 
}

export interface NotesContextType{
    notes: Note[]; 
    addNote: (newNote: Note) => void; 
    title: string; 
    setTitle: React.Dispatch<React.SetStateAction<string>>; 
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>; 
} 

const NotesContext = createContext<NotesContextType | undefined>(undefined); 

interface NotesProviderProps{
    children: ReactNode; 
}

export const NotesProvider = ({children}: NotesProviderProps) => {
    const [notes, setNotes ] = useState<Note[]>([]);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>(''); 

    const addNote = (newNote: Note) => {
        setNotes(prevNotes => [...prevNotes, newNote]); 
        setTitle('')
        setContent('')
    }

    return(
        <NotesContext.Provider value={{ notes, addNote, title, setTitle, content, setContent }}>
            {children}
        </NotesContext.Provider>
    )

}

export const useNotes = (): NotesContextType => {
    const context = useContext(NotesContext);
    if(!context){
        throw new Error('NotesContext must be used within a NotesProvider')
    }
    return context; 
}
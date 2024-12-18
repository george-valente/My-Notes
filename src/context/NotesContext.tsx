    import { createContext, ReactNode, useContext, useState} from 'react'; 

    export interface Note{
        title: string; 
        content: string; 
    }

    export interface NotesContextType{
        notes: Note[]; 
        addNote: (newNote: Note) => void; 
        deleteNote: (note: Note) => void;
        editNote: (note: Note, newNote: Note) => void; 
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
        const deleteNote = (noteToDelete: Note) => {
            setNotes(notes.filter((note) => note.title !== noteToDelete.title ))
            console.log(notes); 

        }
        const editNote = (noteToEdit: Note, newNote: Note) => {
            console.log(noteToEdit)
            console.log(newNote)
            const noteIndex = notes.findIndex(element => element.title === noteToEdit.title);
            console.log(noteIndex);

            if(noteIndex !== -1){
                const newNotes = [...notes];
                newNotes.splice(noteIndex,1,newNote);

                setNotes(newNotes);
                console.log(newNotes);
            }
        }

        return(
            <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, title, setTitle, content, setContent }}>
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
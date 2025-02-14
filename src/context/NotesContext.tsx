import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';

//Note Interface, contains its attributes.
export interface Note {
    id: number;
    title: string;
    content: string;
}

//Context Interface - contain everything i need to export this context.
export interface NotesContextType {
    notes: Note[];
    loading: boolean;
    loadNotes: () => Promise<void>;
    createNote: (newNote: Omit<Note, 'id'>) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    editNote: (id: number, updatedNote: Partial<Note>) => Promise<void>;
}

//creating the context.
const NotesContext = createContext<NotesContextType | undefined>(undefined);


interface NotesProviderProps {
    children: ReactNode;
}

//Provider - componente que gerencia o estado das notas e define os métodos para acessa-la
export const NotesProvider = ({ children }: NotesProviderProps) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);

    // Load all Notes
    const loadNotes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/notes');
            setNotes(response.data);
        } catch (error) {
            console.error(`Erro ao carregar notas: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    // Create Note
    const createNote = async (newNote: Omit<Note, 'id'>) => {
        try {
            const response = await api.post('/notes', newNote);
            setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (error) {
            console.error(`Erro ao criar nota: ${error}`);
        }
    };

    // Update note
    const editNote = async (id: number, updatedNote: Partial<Note>) => {
        try {
            const response = await api.put(`/notes/${id}`, updatedNote);
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note.id === id ? response.data : note))
            );
        } catch (error) {
            console.error(`Erro ao atualizar nota: ${error}`);
        }
    };

    // Delete note
    const deleteNote = async (id: number) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        } catch (error) {
            console.error(`Erro ao excluir nota: ${error}`);
        }
    };

    return (
        <NotesContext.Provider value={{ notes, loading, loadNotes, createNote, editNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
};


export const useNotes = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
};

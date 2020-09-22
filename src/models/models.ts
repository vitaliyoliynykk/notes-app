export interface Note {
    title: string;
    description: string;
    date: number;
    id: string;
    fontSize: string;
    textAlign: 'left' | 'center' | 'right';
}

export interface SearchInputValue {
    getSearchInputValue: (searchValue: string) => void;
    isDarkMode: boolean;
}

export interface RemoveNoteItem {
    deleteNoteItem: (id: string) => void;
}

export interface NotesState {
    user: firebase.User | null;
    activeNote: Note | null;
    notes: Note[];
    searchNotes: Note[];
    isDarkMode: boolean;
    loading: boolean;
    isOpenNotesList: boolean;
    searchValue: string | null;
}

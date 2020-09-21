export interface Note {
    title: string;
    description: string;
    date: string;
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
    isDarkMode: boolean;
    loading: boolean;
    isOpenMobileLayout: boolean;
}

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
}

export interface RemoveNoteItem {
    deleteNoteItem: (id: string) => void;
}

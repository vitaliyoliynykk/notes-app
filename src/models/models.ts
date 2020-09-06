export interface Note {
    title: string;
    description: string;
}

export interface Props {
    getSearchInputValue: (searchValue: string) => void;
}

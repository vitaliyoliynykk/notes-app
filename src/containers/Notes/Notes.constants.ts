import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../models/models';

export const getDefaultNote = (): Note => ({
    title: 'This is your note...',
    description: 'Write something...',
    date: Date.now(),
    id: uuidv4(),
    fontSize: '22px',
    textAlign: 'left',
});

export const FIRST_ELEMENT = 0;
export const ONE_NOTE_IN_ARRAY = 1;

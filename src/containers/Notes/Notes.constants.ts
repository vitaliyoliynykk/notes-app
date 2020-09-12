import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../models/models';

export const getDefaultNote = (): Note => ({
    title: 'This is your note...',
    description: 'Write something...',
    date: new Date().toDateString(),
    id: uuidv4(),
    fontSize: '30px',
    textAlign: 'left',
});

export const FIRST_ELEMENT = 0;

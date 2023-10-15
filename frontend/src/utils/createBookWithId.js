import { v4 as uuidv4 } from 'uuid';

export const createBookWithId = (book, source = 'usually') => {
  return {
    ...book,
    source,
    isFavourite: false,
    id: uuidv4(),
  };
};

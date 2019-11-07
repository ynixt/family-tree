import Person from './person';

export default interface Family {
    id: number;
    version: number;
    persons: Person[];
}

export default interface Person {
    id?: number;
    ghost?: boolean;
    male?: boolean;
    name?: string;
    birth?: Date|string;
    death?: Date|string;
    childrens?: Person[];
    spouse?: Person;
    spouseId?: number;
    fatherId?: number;
    motherId?: number;
    father?: Person;
    mother?: Person;
    tempId?: Date;
}

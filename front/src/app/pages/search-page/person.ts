export default interface Person {
    oid: number;
    name: string;
    father?: string;
    mother?: string;
    familyId: number;
}
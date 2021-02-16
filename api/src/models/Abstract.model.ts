export abstract class AbstractModel {
    public dateCreated: Date;
    public dateUpdated?: Date;
    public readonly id: string | number;
}

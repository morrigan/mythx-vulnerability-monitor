import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "Examples",
})
export default class Example extends Model<Example> {

    @Column({
        type: DataType.STRING,
    })
    public help: string;

}

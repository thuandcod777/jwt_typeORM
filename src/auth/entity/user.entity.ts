import {Column,Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn("increment")
    id!: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: false,
    })
    username!: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: false,
    })
    useremail!: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: false,
    })
    userpassword!: string;
}
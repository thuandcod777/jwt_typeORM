import {Column,Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User{
    @PrimaryGeneratedColumn("increment")
    id!: string;

    @Column({
        type: "varchar",
        nullable: true,
        unique: false,
    })
    username!: string;

    @Column({
        type: "varchar",
        nullable: true,
        unique: false,
    })
    useremail!: string;

    @Column({
        type: "varchar",
        nullable: true,
        unique: false,
    })
    userpassword!: string;
}
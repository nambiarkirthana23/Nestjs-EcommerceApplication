import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,Timestamp, UpdateDateColumn } from "typeorm";
import { Roles } from "../enums/user-enums";
@Entity({name:'User'})
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    //@Column({select:false})
    @Column({})
    password:string;

    // @Column({type:'enum',enum:Roles,array:true,default:Roles.USER})
    // roles:Roles[]

// @Column({ type: 'enum', enum: Roles, default: Roles.USER })
// roles: Roles;


@CreateDateColumn()
createdAt:Timestamp;

@UpdateDateColumn()
updatedAt:Timestamp;



}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Grade from './Grade';

@Entity()
export default class Wilder {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(()=> Grade, (grade)=> grade.wilder)
    grades: Grade[];

}
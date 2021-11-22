import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,

} from 'typeorm';
import { Event } from './event.entity';


@Entity()
export class Schedule { 
    @PrimaryGeneratedColumn('increment')
    id_schedule:number;

    @Column()
    title:string;

    @Column()
    local:string;

    @Column({length:5})
    horario:string;

    @Column()
    data:Date;

    @Column()
    menssage:string;

    @ManyToOne(() => Event, event => event.schedule,{onDelete:'CASCADE'})
    event: Event;


}
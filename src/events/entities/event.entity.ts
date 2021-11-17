import { Church } from 'src/church/entities/church.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn

 } from 'typeorm';
import { Schedule } from './schedule.entity';


@Entity()
export class Event{
    @PrimaryGeneratedColumn('increment')
    id_event: number;

    @Column()
    name:string;

    @Column()
    local:string;

    @Column()
    start_date:Date;

    @Column()
    end_date:Date;
    
    @Column({length:200})
    image:string;

    @Column({length:200})
    anexo:string;

    @CreateDateColumn()
    created_at:Date;
    
    @ManyToOne(() => Church, church => church.event)
    church: Church;

    @OneToMany(() => Schedule, schedule => schedule.event)
    schedule: Schedule[];
    

}
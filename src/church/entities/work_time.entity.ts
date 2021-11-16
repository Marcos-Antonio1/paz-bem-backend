import {Column, Entity,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import { Church } from './church.entity';


@Entity()
export class WorkTime{
    @PrimaryGeneratedColumn('increment')
    id_time: number;

    @Column({length:20})
    morning_time: string;

    @Column({length:20})
    afternoon_time: string;

    @Column({
        type:"enum",
        enum:[1,2,3,4,5,6,7],
        unique: true
    })
    day_week:number;

    @ManyToOne(() => Church, church => church.times)
    church: Church;
}

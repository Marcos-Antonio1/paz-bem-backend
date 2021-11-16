import { Church } from 'src/church/entities/church.entity';
import {
    Column,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn
} from 'typeorm';


@Entity()
export class WeeklyEvents{

    @PrimaryGeneratedColumn()
    id_weekly_events:number;

    @Column()
    name:string;

    @Column({
        type:'enum',
        enum: [1,2,3,4,5,6,7]
    })
    day_week:number;

    @Column({length:5})
    time:string

    @Column({length:200})
    image:string

    @ManyToOne(() => Church, church => church.week_events)
    church: Church;

}
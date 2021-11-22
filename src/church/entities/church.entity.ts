import { Publication } from 'src/publication/entities/publication.entity';
import { WorkTime } from './work_time.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { WeeklyEvents } from 'src/events/entities/weekly_events.entity';
import { Event } from 'src/events/entities/event.entity';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
export class Church {
    @PrimaryGeneratedColumn('uuid')
    id_church:string;
    
    @Column({length:50})
    nome:string;

    @Column({length:50})
    rua:string;

    @Column({length:70,unique:true})
    email:string;

    @Column({length:80})
    password:string;

    @Column({length:2})
    estado:string;

    @Column({length:50})
    cidad:string;

    @Column({length:200})
    image:string;

    @Column({length:8})
    cep:string;

    @Column({length:13})
    telefone1:string;

    @Column({length:13})
    telefone2:string;

    @Column({length:13})
    whats1:string;
    
    @Column({length:13})
    whats2:string;
    
    @Column({length:50})
    pix1:string;
    
    @Column({length:50})
    pix2:string;

    @OneToMany(() => WorkTime, worktime => worktime.church)
    times: WorkTime[];

    @OneToMany(() => Publication, publi => publi.church)
    publi:Publication[];

    @OneToMany(() => WeeklyEvents, week_events  => week_events.church)
    week_events:WeeklyEvents[];

    @OneToMany(() => Event, event  => event.church)
    event:Event[];

    @BeforeInsert()
    async cryptoPassword(){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password,salt);
    }   

}
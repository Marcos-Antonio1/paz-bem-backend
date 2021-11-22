import { Church } from 'src/church/entities/church.entity';
import { 
    Entity, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column, 
    ManyToOne
    
} from 'typeorm';

@Entity()
export class Publication {

    @PrimaryGeneratedColumn('increment')
    publication_id:number;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @Column()
    menssage:string;

    @Column()
    image:string;

    @ManyToOne(() => Church, church => church.publi,{onDelete:'CASCADE'})
    church: Church;

}
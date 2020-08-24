import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from 'src/group/entity/group.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  nickname: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column('varchar', { array: true, nullable: true })
  groupId?: string[];
  @Column('varchar', { array: true, nullable: true })
  friends?: string[];
}

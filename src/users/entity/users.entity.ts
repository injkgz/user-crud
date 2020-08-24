import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Group } from 'src/group/entity/group.entity';

@Entity()
export class Users {
  @ObjectIdColumn({type:'uuid'})
  id: string;
  @Column({type:'varchar'})
  name: string;
  @Column({type:'varchar'})
  email: string;
  @Column({type:'varchar'})
  fullName: string;
  @Column({type:'varchar'})
  phone: string;
  @Column('varchar', {array: true})
  groupId?: string[];
}

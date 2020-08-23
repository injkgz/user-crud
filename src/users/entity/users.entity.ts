import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Group } from 'src/group/entity/group.entity';

@Entity()
export class Users {
  @ObjectIdColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  fullName: string;
  @Column()
  phone: string;
  @Column()
  groupId?: string[];
}

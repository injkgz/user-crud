import { Column, Entity, ObjectIdColumn } from 'typeorm';

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
}

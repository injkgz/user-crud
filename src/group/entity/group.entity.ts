import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Group {
  @ObjectIdColumn()
  id: string;
  @Column()
  title: string;
}

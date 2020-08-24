import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Group {
  @ObjectIdColumn({type:'uuid'})
  id: string;
  @Column({type:'varchar'})
  title: string;
}

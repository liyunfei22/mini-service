import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;
}

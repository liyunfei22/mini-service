import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Beef {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  name: string;
}

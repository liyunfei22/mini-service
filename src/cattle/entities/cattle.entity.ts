import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cattle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  name: string;
}

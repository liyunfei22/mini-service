import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cattle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, comment: '名称' })
  name: string;

  @Column({ type: 'varchar', length: 256, comment: '蛋白质' })
  protein: string;

  @Column({ type: 'varchar', length: 256, comment: '能量' })
  energy: string;

  @Column({ type: 'varchar', length: 256, comment: '钙' })
  calcium: string;
}

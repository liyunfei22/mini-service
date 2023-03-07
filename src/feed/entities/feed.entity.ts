import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  fe: string;

  @Column()
  ga: string;

  @Column()
  p: string;

  @CreateDateColumn({
    //自动生成列
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;
}

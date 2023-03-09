import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
interface Detail {
  [key: string]: string;
}

@Entity()
export class Order { 
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({
    nullable: false
  })
  user_id: string;

  @Column("simple-json")
  order_detail: Detail;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;

  @DeleteDateColumn()
  deleted_time: Date;

  @Column({
    default: false
  })
  is_delete: boolean;
}

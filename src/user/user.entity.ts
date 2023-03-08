import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    default: '',
  })
  name: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column('simple-enum', {
    enum: ['admin', 'visitor'],
    default: 'visitor',
  })
  role: string;

  @Column({
    default: '',
  })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}

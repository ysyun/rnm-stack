import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('user_iot')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  // USER, ADMIN, SUPER
  @Column({ default: 'USER' })
  role!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}

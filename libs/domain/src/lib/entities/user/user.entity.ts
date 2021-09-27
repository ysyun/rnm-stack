import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_iot')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ default: false })
  isActive!: boolean;

  // USER, ADMIN, SUPER
  @Column({ default: 'USER' })
  role!: string;
}

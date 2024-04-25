import { Module } from 'src/modules/entities/module.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('userModules')
export class UserModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Module)
  @JoinColumn()
  module: Module;

  @Column({ type: 'boolean' })
  view: boolean;

  @Column({ type: 'boolean' })
  create: boolean;

  @Column({ type: 'boolean' })
  update: boolean;

  @Column({ type: 'boolean' })
  delete: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

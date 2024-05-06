import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AuthType {
  DEFAULT = 'default',
  GOOGLE = 'google',
}

export enum UserType {
  ADMIN = 'admin',
  STAFF = 'staff',
  CUSTOMER = 'customer',
  ARTIST = 'artist',
  SUPPLIER = 'supplier',
  ACCOUNTANT = 'accountant',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Gender, default: null, nullable: true })
  gender: Gender | null;

  @Column({ type: 'enum', enum: UserType, default: UserType.CUSTOMER })
  userType: UserType;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  lastName: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 100, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  photoUrl: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'enum', enum: AuthType, default: AuthType.DEFAULT })
  authType: AuthType;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

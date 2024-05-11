import { ExternalInfo } from 'src/external-infos/entities/external-info.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => ExternalInfo)
  @JoinColumn({})
  externalInfo: ExternalInfo | null;

  @Column({ length: 500 })
  artistName: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ type: 'text', nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  artistSince: Date;

  @Column({ type: 'text', nullable: true })
  vatNumber: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column('json', { nullable: true })
  nationalities: string[];

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

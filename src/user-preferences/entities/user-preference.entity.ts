import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Language {
  PT = 'pt-pt',
  PTBR = 'pt-br',
  EN = 'en',
  ES = 'es',
  FR = 'FR',
  IT = 'IT',
}

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

@Entity('userPreferences')
export class UserPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Language, default: Language.EN })
  language: Language;

  @Column({ type: 'enum', enum: Theme, default: Theme.LIGHT })
  theme: Theme;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

import { Artist } from 'src/artists/entities/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('artistNationalities')
export class ArtistNationality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Artist)
  @JoinColumn()
  artist: Artist;

  @Column()
  country: string;

  @Column()
  nationality: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

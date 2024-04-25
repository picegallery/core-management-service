import { Artist } from 'src/artists/entities/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('artistAddresses')
export class ArtistAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Artist)
  @JoinColumn()
  artist: Artist;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postcode: string;

  @Column()
  country: string;

  @Column()
  lat: string;

  @Column()
  long: string;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

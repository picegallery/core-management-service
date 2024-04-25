import { ArtistArtwork } from 'src/artist-artworks/entities/artist-artwork.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('exhibitionArtworks')
export class ExhibitionArtwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ArtistArtwork)
  @JoinColumn({})
  artwork: ArtistArtwork;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

import { ExhibitionArtwork } from 'src/exhibition-artworks/entities/exhibition-artwork.entity';
import { ExternalInfo } from 'src/external-infos/entities/external-info.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

enum ExhibitionType {
  HYBRID = 'hybrid',
  VIRTUAL = 'virtual',
  PHYSICAL = 'physical',
  ARTFAIR = 'art-fair',
  OTHER = 'other',
}

@Entity('exhibitions')
export class Exhibition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ExternalInfo)
  @JoinColumn({})
  externalInfo: ExternalInfo | null;

  @Column({
    type: 'enum',
    enum: ExhibitionType,
    default: ExhibitionType.OTHER,
  })
  exhibitionType: ExhibitionType;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  bannerUrl: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => ExhibitionArtwork,
    (exhibitionArtwork) => exhibitionArtwork.artwork,
  )
  artworks: ExhibitionArtwork[];
}

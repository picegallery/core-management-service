import { Artist } from 'src/artists/entities/artist.entity';
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

enum ShippingBy {
  ARTIST = 'artist',
  GALLERY = 'gallery',
  OTHER = 'other',
}

enum Category {
  PRINT = 'print',
  PAINTING = 'painting',
  SCULPTURE = 'sculpture',
  OTHER = 'other',
}

@Entity('artistArtworks')
export class ArtistArtwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Artist)
  @JoinColumn()
  artist: Artist;

  @Column({ type: 'enum', enum: Category, default: Category.OTHER })
  category: Category;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal' })
  price: string;

  @Column()
  registrationDate: Date;

  @Column()
  availability: boolean;

  @Column()
  stockQuantity: number;

  @Column()
  shippingFrom: string;

  @Column({ type: 'enum', enum: ShippingBy, default: ShippingBy.OTHER })
  shippingBy: ShippingBy;

  @Column('text', { nullable: true, array: true })
  mediums: string[];

  @Column('text', { nullable: true, array: true })
  sizes: string[];

  @Column('text', { nullable: true, array: true })
  tags: string[];

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

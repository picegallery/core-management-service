import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum SourceType {
  COLLECTION = 'collection',
  PRODUCT = 'product',
  OTHER = 'other',
}

export enum OriginType {
  SHOPIFY = 'shopify',
  OTHER = 'other',
}

@Entity('externalInfos')
export class ExternalInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SourceType, default: SourceType.OTHER })
  sourceType: SourceType;

  @Column({ type: 'enum', enum: OriginType, default: OriginType.OTHER })
  originType: OriginType;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

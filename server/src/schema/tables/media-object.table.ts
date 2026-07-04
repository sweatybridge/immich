import {
  Column,
  CreateDateColumn,
  ForeignKeyColumn,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Table,
  Timestamp,
  UpdateDateColumn,
} from '@immich/sql-tools';
import { ColumnType } from 'kysely';
import { AssetTable } from 'src/schema/tables/asset.table';
import { UserTable } from 'src/schema/tables/user.table';

@Table('media_object')
export class MediaObjectTable {
  @PrimaryGeneratedColumn()
  id!: Generated<string>;

  @ForeignKeyColumn(() => UserTable, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  ownerId!: string;

  @ForeignKeyColumn(() => AssetTable, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
  assetId!: string | null;

  @Column()
  kind!: string;

  @Column({ type: 'character varying', nullable: true })
  mimeType!: string | null;

  @Column({ type: 'bigint' })
  sizeBytes!: ColumnType<number>;

  @Column({ type: 'bytea', nullable: true })
  checksum!: Buffer | null;

  @CreateDateColumn()
  createdAt!: Generated<Timestamp>;

  @UpdateDateColumn()
  updatedAt!: Generated<Timestamp>;
}

@Table('media_object_chunk')
export class MediaObjectChunkTable {
  @ForeignKeyColumn(() => MediaObjectTable, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    primary: true,
  })
  objectId!: string;

  @PrimaryColumn({ type: 'integer' })
  chunkIndex!: number;

  @Column({ type: 'bytea' })
  data!: Buffer;
}

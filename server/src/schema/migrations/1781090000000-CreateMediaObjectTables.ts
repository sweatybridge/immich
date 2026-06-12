import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`CREATE TABLE "media_object" (
  "id" uuid NOT NULL DEFAULT immich_uuid_v7(),
  "ownerId" uuid NOT NULL,
  "assetId" uuid,
  "kind" character varying NOT NULL,
  "mimeType" character varying,
  "sizeBytes" bigint NOT NULL,
  "checksum" bytea,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "media_object_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "media_object_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "media_object_pkey" PRIMARY KEY ("id")
);`.execute(db);

  await sql`CREATE TABLE "media_object_chunk" (
  "objectId" uuid NOT NULL,
  "chunkIndex" integer NOT NULL,
  "data" bytea NOT NULL,
  CONSTRAINT "media_object_chunk_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "media_object" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "media_object_chunk_pkey" PRIMARY KEY ("objectId", "chunkIndex")
);`.execute(db);

  await sql`CREATE INDEX "media_object_assetId_idx" ON "media_object" ("assetId");`.execute(db);
  await sql`CREATE INDEX "media_object_ownerId_idx" ON "media_object" ("ownerId");`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP TABLE "media_object_chunk";`.execute(db);
  await sql`DROP TABLE "media_object";`.execute(db);
}

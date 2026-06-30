-- AlterTable
ALTER TABLE "writing_entry" RENAME CONSTRAINT "writing_entrie_pkey" TO "writing_entry_pkey";

-- RenameForeignKey
ALTER TABLE "writing_entry" RENAME CONSTRAINT "writing_entrie_user_id_fkey" TO "writing_entry_user_id_fkey";

-- RenameIndex
ALTER INDEX "writing_entrie_user_id_created_at_idx" RENAME TO "writing_entry_user_id_created_at_idx";

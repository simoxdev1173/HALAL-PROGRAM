-- Optional logos are stored on the approved registry records while the
-- original application data remains the source of truth.
ALTER TABLE "DesignationBodyApplication" ADD COLUMN "logoUrl" TEXT;
ALTER TABLE "AppointedBody" ADD COLUMN "logoUrl" TEXT;

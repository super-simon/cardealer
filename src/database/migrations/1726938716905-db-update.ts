import { MigrationInterface, QueryRunner } from "typeorm";

export class DbUpdate1726938716905 implements MigrationInterface {
    name = 'DbUpdate1726938716905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adverts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "description" text NOT NULL, "model_id" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_36876931b51109a932d0bf3b40a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("title" text NOT NULL, CONSTRAINT "PK_63112b0144d402133ac9c067edf" PRIMARY KEY ("title"))`);
        await queryRunner.query(`CREATE TABLE "models" ("title" text NOT NULL, "brand_id" text NOT NULL, CONSTRAINT "unique_model" UNIQUE ("title", "brand_id"), CONSTRAINT "PK_2e6f023ce7ea58de51ba5ac02ea" PRIMARY KEY ("title", "brand_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('CLIENT', 'SELLER', 'MANAGER', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'CLIENT'`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_8ac827ad389b71e18c8ac7da50f" FOREIGN KEY ("model_id", "model_id") REFERENCES "models"("title","brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_98153415de7e9b3024220e02ee1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0" FOREIGN KEY ("brand_id") REFERENCES "brands"("title") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_98153415de7e9b3024220e02ee1"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_8ac827ad389b71e18c8ac7da50f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "adverts"`);
    }

}

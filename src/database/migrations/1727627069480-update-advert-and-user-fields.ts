import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAdvertAndUserFields1727627069480
  implements MigrationInterface
{
  name = 'UpdateAdvertAndUserFields1727627069480';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "adverts" ADD "price" double precision NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."adverts_currency_enum" AS ENUM('UAH', 'EUR', 'USD')`,
    );
    await queryRunner.query(
      `ALTER TABLE "adverts" ADD "currency" "public"."adverts_currency_enum" NOT NULL DEFAULT 'UAH'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."adverts_status_enum" AS ENUM('DRAFT', 'ACTIVE', 'DISABLED', 'DELETED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "adverts" ADD "status" "public"."adverts_status_enum" NOT NULL DEFAULT 'DRAFT'`,
    );
    await queryRunner.query(
      `ALTER TABLE "adverts" ADD "revision" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_type_enum" AS ENUM('BASE', 'PREMIUM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "type" "public"."users_type_enum" NOT NULL DEFAULT 'BASE'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('BASE', 'PREMIUM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" "public"."users_status_enum" NOT NULL DEFAULT 'BASE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
    await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "revision"`);
    await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."adverts_status_enum"`);
    await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "currency"`);
    await queryRunner.query(`DROP TYPE "public"."adverts_currency_enum"`);
    await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "price"`);
  }
}

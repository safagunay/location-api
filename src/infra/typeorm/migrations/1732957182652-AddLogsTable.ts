import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLogsTable1732957182652 implements MigrationInterface {
  name = 'AddLogsTable1732957182652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "logs" ("userId" character varying(255) NOT NULL, "timestamp" TIMESTAMP NOT NULL, "areaId" integer NOT NULL, CONSTRAINT "PK_5b9ac575e595f4b2719c38cf12c" PRIMARY KEY ("userId", "timestamp"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" ADD CONSTRAINT "FK_bc8b8ae89088dc439d301412e10" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logs" DROP CONSTRAINT "FK_bc8b8ae89088dc439d301412e10"`,
    );
    await queryRunner.query(`DROP TABLE "logs"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLogsTable1732973069994 implements MigrationInterface {
  name = 'AddLogsTable1732973069994';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "logs" ("userId" character varying(255) NOT NULL, "timestamp" TIMESTAMP NOT NULL, "areaId" integer NOT NULL, CONSTRAINT "PK_95126974a74eea00acf72865513" PRIMARY KEY ("userId", "timestamp", "areaId"))`,
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

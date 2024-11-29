import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAreasTable1732876629337 implements MigrationInterface {
    name = 'AddAreasTable1732876629337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "areas" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "northEastLat" numeric(9,6) NOT NULL, "northEastLng" numeric(9,6) NOT NULL, "southWestLat" numeric(9,6) NOT NULL, "southWestLng" numeric(9,6) NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "areas"`);
    }

}

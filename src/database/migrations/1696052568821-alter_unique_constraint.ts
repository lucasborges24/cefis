import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUniqueConstraint1696052568821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX idx_unique_title_teacherId ON course (title, teacher_id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_unique_title_teacherId ON course`);
  }
}

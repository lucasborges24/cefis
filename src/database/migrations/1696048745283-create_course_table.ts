import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseTable1696048745283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE course (
            id int NOT NULL AUTO_INCREMENT,
            title varchar(131) NOT NULL,
            duration int unsigned NOT NULL DEFAULT 0,
            teacher_id int unsigned NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY teacher_id_idx (teacher_id),
            CONSTRAINT teacher_id FOREIGN KEY (teacher_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE course;
        `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1696025891909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TABLE users (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(131) NOT NULL,
        email varchar(131) NOT NULL,
        password varchar(63) NOT NULL,
        role varchar(63) NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY IDX_UNIQUE_EMAIL (email)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DROP TABLE user;
    `);
    console.log('Migration CreateUserTable1696025891909 has been executed');
  }
}

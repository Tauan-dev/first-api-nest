import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTagsTable1707483182729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "courses_tags",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          // as  chaves estrangeiras para indicar a ligação entre as tabelas tag e courses serão outras migrations que irão alterar essa tabela aqui
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("courses_tags");
  }
}

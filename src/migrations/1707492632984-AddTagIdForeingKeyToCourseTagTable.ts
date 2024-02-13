import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddTagIdForeingKeyToCourseTagTable1707492632984
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "courses_tags",
      new TableColumn({
        name: "tags_id",
        type: "varchar(36)", // Corrigido o tipo de dados para "varchar(36)"
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "courses_tags",
      new TableForeignKey({
        name: "courses_tags_tags",
        columnNames: ["tags_id"],
        referencedTableName: "tags",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("courses_tags", "courses_tags_tags");

    await queryRunner.dropColumn("courses_tags", "tags_id");
  }
}

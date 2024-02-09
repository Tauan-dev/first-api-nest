import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddCourseIdForeingKeyToCourseTagsTable1707487752719
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "courses_tags",
      new TableColumn({
        name: "courses_id",
        type: "varchar", //  a tipagem é igual a do sql
        length: "36",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "courses_tags", //(tabela onde a chave está sendo inserida)
      new TableForeignKey({
        name: "courses_tags_courses", //(nome da chave estrangeira) relacionando a tabela courses_tags com a tabela courses
        columnNames: ["courses_id"], // qual atributo está sendo relacionado
        referencedTableName: "courses", // a tabela que vai ser referenciada pela chave estrangeira
        referencedColumnNames: ["id"], // qual colunas vão se relacionar "ser referenciadas"
        onDelete: "SET NULL", // quando o dado referenciado for apagado ( o que fica a cargo das regras de negócio)
      }),
      // na tabela course_tags temos a chave estrangeira de nome courses_tags_courses, que relaciona coursesId com a tabela courses_tags, com o id da tabela de courses
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    // o revert aqui deve primeiro excluir a chave estrangeira e depois excluir a coluna que foi adicionada
    await queryRunner.dropForeignKey("courses_tags", "courses_tags_courses"); // primeiro parametro é o nome da tabela, e o segundo o nome da chave que vai ser dropada
    await queryRunner.dropColumn("courses_tags", "courses_id"); // dropa o atributo que foi adicionado
  }
}

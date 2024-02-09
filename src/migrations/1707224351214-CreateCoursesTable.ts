import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1707224351214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        //aqui é passado a propriedade das tabelas
        name: "courses", // nome da tabela
        columns: [
          {
            name: "id",
            type: "varchar(36)", // definido como varchar pois o mysql não tem um tipo de dado pra uuid
            isPrimary: true, // define chave primária
            generationStrategy: "uuid", // indica ao typeOrm que deve se gerar UUIDs automaticamente para o campo 'id'
          },
          {
            name: "name",
            type: "varchar", // definido como varchar
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created-at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
    );
  } // é executado quando é utilizado o  comando migration run

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("courses");
  } // desfazer as alterações feitas no up
}

// cli vai precisar de uma conexão com o datasource para acessar o banco e fazer essas mudanças na database

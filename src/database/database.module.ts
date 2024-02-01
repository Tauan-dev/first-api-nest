import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "src/course/entities/course.entity";
import { Tag } from "src/course/entities/tag.entity";
import { DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "tauan198",
  database: "nest",
  entities: [Course, Tag], //é utilizado para definidar cada entidade que o typeorm vai utilizar para definir os campos de cada tabela do banco de dados, onde cada entidade se reflete em uma tabela
  synchronize: true, //futuramente será mudado pelas migrations
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // função do type orm para configurar a conexão com banco
      useFactory: () => {
        return {
          ...dataSourceOptions,
        }; //useFactory permite instânciar uma clase ou recurso, o que ajuda a disponibilizar as configs de dados já feitas
      },
    }),
  ],
})
export class DatabaseModule {}

// os dados pra conexão do banco geralmente são feitos no app.module, porém por boa prática ele é colocado separado nesse modulo e depois é exportado para lá

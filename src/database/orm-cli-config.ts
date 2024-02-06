import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1707224351214 } from "src/migrations/1707224351214-CreateCoursesTable";
import { CreateTagTable1707229609808 } from "src/migrations/1707229609808-CreateTagTable";

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1707224351214, CreateTagTable1707229609808],
});

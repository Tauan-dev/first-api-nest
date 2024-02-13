import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1707224351214 } from "src/migrations/1707224351214-CreateCoursesTable";
import { CreateTagTable1707229609808 } from "src/migrations/1707229609808-CreateTagTable";
import { CreateCoursesTagsTable1707483182729 } from "src/migrations/1707483182729-CreateCoursesTagsTable";
import { AddCourseIdForeingKeyToCourseTagsTable1707487752719 } from "src/migrations/1707487752719-AddCourseIdForeingKeyToCourseTagsTable";
import { AddTagIdForeingKeyToCourseTagTable1707492632984 } from "src/migrations/1707492632984-AddTagIdForeingKeyToCourseTagTable";

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1707224351214,
    CreateTagTable1707229609808,
    CreateCoursesTagsTable1707483182729,
    AddCourseIdForeingKeyToCourseTagsTable1707487752719,
    AddTagIdForeingKeyToCourseTagTable1707492632984,
  ],
});

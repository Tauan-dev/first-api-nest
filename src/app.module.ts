import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CourseController } from "./course/course.controller";
import { DatabaseModule } from "./database/database.module";
import { CourseModule } from "./course/course.module";
import { CourseService } from "./course/course.service";

@Module({
  imports: [CourseModule, DatabaseModule],
  controllers: [AppController, CourseController],
  providers: [AppService, CourseService],
})
export class AppModule {}

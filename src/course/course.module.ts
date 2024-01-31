import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Course])], // a importação do typeOrm deve ser feita no module de course para que o controller possa manipular a entidade do typeOrm (sendo utilizado o forFeature, onde é passado um array com a entidade)
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Tag } from "./entities/tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Course, Tag])], // a importação do typeOrm deve ser feita no module de course para que o controller possa manipular a entidade do typeOrm (sendo utilizado o forFeature, onde é passado um array com a entidade)
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService, TypeOrmModule.forFeature([Course, Tag])], // resolveu o problema de importação: "Nest can't resolve dependencies of the CourseService (?). Please make sure that the argument "CourseRepository" at index [0] is available in the AppModule context."
})
export class CourseModule {}

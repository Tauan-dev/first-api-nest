import { Inject, Injectable } from "@nestjs/common";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>, // recebe o tipo repository do type orm e utiliza como parametro entidade course
  ) {}

  // com isso temos um repositório disponivel para a manipulação(utilizar dentro dos métodos)

  //METHODS CRUDING

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number) {
    return this.courses.find((course) => course.id === id);
  }
  // percorre cada item de dentro de um array e retorna os dados com id correspondente

  create(createCourse: any) {
    this.courses.push(...createCourse);
  }

  update(id: number, updateCourse: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = {
        ...updateCourse,
      };
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}

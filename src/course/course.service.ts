import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateCourse } from "./dto/update-course.dto";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>, // recebe o tipo repository do type orm e utiliza como parametro entidade course
  ) {}

  // com isso temos um repositório disponivel para a manipulação(utilizar dentro dos métodos)

  //METHODS CRUDING

  async findAll() {
    return await this.courseRepository.find();
  } // todos os métodos estão realizando operações assíncronas (se observar o retorno é uma promisse), ou seja isso vai levar um tempo até acontecer, ao acessar o banco de dados e depois retornar a resposta, por esse motivo os métodos serão assincronos

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course whit ID ${id} not found`);
    }
    // o !course vai sempre garantir que o course a ser manipulado existe
    return course;
  }

  async create(createCourse: any) {
    const course = this.courseRepository.create(createCourse); // o método não é assincrono pois só cria a instância/objeto com base nos parametros (entidade)
    return this.courseRepository.save(course); // salva a instância criada acima
  }

  async update(id: number, updateCourse: any) {
    const course = await this.courseRepository.preload({
      ...updateCourse,
      id,
    });
    if (!course) {
      throw new NotFoundException(`Course whit id ${id} not found	`);
    }
    return this.courseRepository.save(course); // salva a instância criada
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new NotFoundException(`Course not found`);
    }
    return this.courseRepository.remove(course); // deleta o dado
  }
}

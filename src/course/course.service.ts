import { Injectable, NotFoundException } from "@nestjs/common";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { CreateCourse } from "./dto/create-course.dto";
import { UpdateCourse } from "./dto/update-course.dto";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>, // recebe o tipo repository do type orm e utiliza como parametro entidade course
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {} // para manipular os dados de tag usando a propiedade cascade, é necessário criar um repository para a entidade

  // com isso temos um repositório disponivel para a manipulação(utilizar dentro dos métodos)

  //METHODS CRUDING

  async findAll() {
    return await this.courseRepository.find({
      relations: ["tags"], // trás os dados relacionados quando fizer as buscas
    });
  } // todos os métodos estão realizando operações assíncronas (se observar o retorno é uma promisse), ou seja isso vai levar um tempo até acontecer, ao acessar o banco de dados e depois retornar a resposta, por esse motivo os métodos serão assincronos

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ["tags"],
    });
    if (!course) {
      throw new NotFoundException(`Course whit ID ${id} not found`);
    }
    // o !course vai sempre garantir que o course a ser manipulado existe
    return course;
  }

  async create(createCourse: CreateCourse) {
    const tags = await Promise.all(
      createCourse.tags.map((name) => this.preloadTagByName(name)),
    ); // é necessário percorrer o array de tags que está sendo recebido, onde para cada posição do array é necessário uma operação assincrona, identificando as tags
    const course = this.courseRepository.create({ ...CreateCourse, tags });

    // o método não é assincrono pois só cria a instância/objeto com base nos parametros (entidade)
    return this.courseRepository.save(course); // salva a instância criada acima
  }

  async update(id: number, updateCourse: UpdateCourse) {
    const tags =
      updateCourse.tags &&
      (await Promise.all(
        updateCourse.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourse,
      id,
      tags,
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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
} // vai identificar a existência de uma tag utilizada, onde caso ela não exista, é criada

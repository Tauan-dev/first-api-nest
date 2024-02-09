import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourse } from "./dto/create-course.dto";
import { UpdateCourse } from "./dto/update-course.dto";

@Controller("course")
// para receber a instância do service, seja em qualquer parte do código que va utilizar o service, é necessário a criação de uma classe constructor, onde é configurado a propriedade que vai receber a instância do service
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  // a partir do momento que é definido a instância desse serviço (classe), vai ser injetado nessa Classe, onde termos acesso direto aos metodos criados pelo service, onde é chamado dentro do controller utilizando o this.(nome da instância)
  @Get("list")
  findAll() {
    return "Listagem de cursos";
  }

  // retorno por id
  // @Get("id")
  // findOne(@Param() params){
  //     return `curso com id ${params.id}`;
  // }

  // após passar o decorator Param, deve ser declarado qual o nome da variável que vai receber esses valores.

  
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(id);
  }

  // a forma mas correta de se fazer é desestruturar o params, onde o id(atributo passado de parametro  no get), é passado no @param, e ao lado decalramos um nome e tipo a essa variável, que permite a utilização dentro do escopo do metódo

  // pode ser passado um segundo parametro, adicionando ao Get e desestruturando da mesma forma

  @Post()
  create(@Body() CreateCourse: CreateCourse) {
    return this.courseService.create(CreateCourse);
  }
  // DTO : utilizando o dto de interface, o body é retirado e os dados a serem transferidos estão todos declarados dentro do corpo do dto

  //para lidar com statuts code, é declarado um decorator @Http.code(nrm do status) acima do decorator do metodo utilizado @Get, @Post etc.

  @Put(":id")
  update(@Param("id") id: string, @Body() UpdateCourse: UpdateCourse) {
    return this.courseService.update(id, UpdateCourse);
  }

  @Delete()
  remove(@Param("id") id: string) {
    return this.courseService.remove(id);
  }

  // para atualização são utilizado Patch e Put, sendo patch utilizado para atualização de um recurso e PUT para atualização todos os dados
}
// é necessário criar metódos para lidar com as rotas e listar os recursos. O parametro ("course") funciona como a rota do Nodejs ex:("/course", req,res{}). O decorator @Get ganha a funcionalidade do metodo HTTP get

// outro exemplo para a criação de rotas são as rotas aninhadas, onde a URL comumente utilizada no NodeJS ex:("/course/list", req,res{}).

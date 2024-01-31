import { PartialType } from "@nestjs/mapped-types";
import { CreateCourse } from "./create-course.dto";

export class UpdateCourse extends PartialType(CreateCourse) {}

// para não necessitar ficar repetindo dados na UpdateCourse, o Nest oferece um pacote chamado mappedTypes, instalado da seguinte forma: npm install @nestjs/mapped-types, que traz uma função chamada Partial Type, o que permite que ao invés de repetir tudo do createCourse, extenda os dados feitos lá

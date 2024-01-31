import { IsString } from "class-validator";

export class CreateCourse {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true }) //valida cada elemento do array como string
  readonly tags: string[];
}

// para garantir a imutabilidade dos dados, é utilizado o readonly
//(Imutabilidade): Algo que não pode ser alterado, no conceito de programação, a imutabilidade se aplica a objetos/variáveis que não podem ter seu estado modificado após serem criados

// Validation Pipe: utilizando os decorators da biblioteca class-validator, é garantido que os dados recebidos irão respeitar o que é pedido através da requisição

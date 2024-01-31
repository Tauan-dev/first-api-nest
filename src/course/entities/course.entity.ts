import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("courses") //esse parametro passado no decorator @Entity, vai ser o nome da tabela dentro do banco de dados
export class Course {
  @PrimaryGeneratedColumn() // decorator passado para indicar chave primária, sendo que os demais são gerados como @Column
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("json", { nullable: true })
  tags: Array<string>;
}

//para a entitie se tornar uma entidade do typeorm é utilizado o decorator @Entity

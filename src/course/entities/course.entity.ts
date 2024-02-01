import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity("courses") //esse parametro passado no decorator @Entity, vai ser o nome da tabela dentro do banco de dados
export class Course {
  @PrimaryGeneratedColumn() // decorator passado para indicar chave primária, sendo que os demais são gerados como @Column
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable() // usado na tabela principal em uma relação ManyToMany para indicar quem é o proprietário da relação
  @ManyToMany(() => Tag, (tag) => tag.courses)
  tags: Tag[];
  // os parametros recebidos são respectivamente () => Tag, sendo a entidade relacionada e (tag) => tag.courses que é o inverseSide, ou seja a propriedade course na entidade tag
}

//para a entitie se tornar uma entidade do typeorm é utilizado o decorator @Entity

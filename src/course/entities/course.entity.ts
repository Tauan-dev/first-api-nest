import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag.entity";
import { randomUUID } from "crypto";

@Entity("courses") //esse parametro passado no decorator @Entity, vai ser o nome da tabela dentro do banco de dados
export class Course {
  @PrimaryGeneratedColumn() // decorator passado para indicar chave primária, sendo que os demais são gerados como @Column
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @JoinTable() // usado na tabela principal em uma relação ManyToMany para indicar quem é o proprietário da relação
  @ManyToMany(() => Tag, (tag) => tag.courses, {
    cascade: true, // indica que qualquer dado da entidade tag, que estiver nas operações de post ou put/patch
  })
  tags: Tag[];
  // os parametros recebidos são respectivamente () => Tag, sendo a entidade relacionada e (tag) => tag.courses que é o inverseSide, ou seja a propriedade course na entidade tag

  @BeforeInsert()
  generateID() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }
}

//para a entitie se tornar uma entidade do typeorm é utilizado o decorator @Entity

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course.entity";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  created_at: Date;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];
}

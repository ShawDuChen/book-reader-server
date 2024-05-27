import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity("author")
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  sex?: string;

  @Column({ type: "varchar", length: 11, nullable: true })
  tel?: string;

  @Column({ type: "int", nullable: true, default: 1 })
  status?: number;

  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];

  @Column({ type: "varchar", length: 255, nullable: true })
  remark?: string;

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @Column({ type: "datetime", name: "updated_at", nullable: true })
  updated_at?: string;

  @Column({ type: "varchar", nullable: true })
  updated_by?: string;
}

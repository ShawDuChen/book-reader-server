import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity("chapter")
export class Chapter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  no!: string;

  @Column()
  title!: string;

  @Column({ type: "text" })
  content!: string;

  @Column()
  book_id!: number;

  @OneToOne(() => Book)
  @JoinColumn({
    name: "book_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "book_id",
  })
  book?: Book;

  @Column()
  url?: string;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}

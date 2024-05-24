import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Chapter } from "./chapter.entity";
import { Author } from "./author.entity";

@Entity("book")
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category_id!: number;

  @OneToOne(() => Category)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "category_id",
  })
  category?: Category;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters?: Chapter[];

  @Column()
  author_id!: number;

  @OneToOne(() => Author)
  @JoinColumn({
    name: "author_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "author_id",
  })
  author?: Author;

  @Column()
  fetch_url?: string;

  @Column()
  remark?: string;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Chapter } from "./chapter.entity";
import { Author } from "./author.entity";

@Entity("book")
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "int" })
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

  @Column({ type: "int" })
  author_id!: number;

  @OneToOne(() => Author)
  @JoinColumn({
    name: "author_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "author_id",
  })
  author?: Author;

  @Column({ type: "varchar", length: 255, nullable: true })
  fetch_url?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  remark?: string;

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", nullable: true })
  updated_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  updated_by?: string;
}

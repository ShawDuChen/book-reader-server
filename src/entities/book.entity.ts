import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Chapter } from "./chapter.entity";
import { Author } from "./author.entity";
import CrudBaseEntity from "./tools/base-entity";
import { CrawlRule } from "./crawl-rule.entity";
import { BookComment } from "./book-comment.entity";

@Entity("book")
export class Book extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "书名" })
  name!: string;

  @Column({ type: "int", comment: "分类ID" })
  category_id!: number;

  @ManyToOne(() => Category)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "book_category_id",
  })
  category?: Category;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters?: Chapter[];

  @Column({ type: "int", comment: "作者ID" })
  author_id!: number;

  @ManyToOne(() => Author)
  @JoinColumn({
    name: "author_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "book_author_id",
  })
  author?: Author;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "爬取URL" })
  fetch_url?: string;

  @Column({ type: "int", comment: "爬取规则ID", nullable: true })
  crawl_rule_id?: number;

  @ManyToOne(() => CrawlRule)
  @JoinColumn({
    name: "crawl_rule_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "book_crawl_rule_id",
  })
  crawl_rule?: CrawlRule;

  @OneToMany(() => BookComment, (comment) => comment.book)
  comments?: BookComment[];

  @Column({ type: "varchar", length: 255, nullable: true, comment: "书本封面" })
  cover?: string;
}

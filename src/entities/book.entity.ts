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
import CrudBaseEntity from "./tools/base-entity";
import { CrawlRule } from "./crawl-rule.entity";

@Entity("book")
export class Book extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "书名" })
  name!: string;

  @Column({ type: "int", comment: "分类ID" })
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

  @Column({ type: "int", comment: "作者ID" })
  author_id!: number;

  @OneToOne(() => Author)
  @JoinColumn({
    name: "author_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "author_id",
  })
  author?: Author;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "爬取URL" })
  fetch_url?: string;

  @Column({ type: "int", comment: "爬取规则ID", nullable: true })
  crawl_rule_id?: number;

  @OneToOne(() => CrawlRule)
  @JoinColumn({
    name: "crawl_rule_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "crawl_rule_id",
  })
  crawl_rule?: CrawlRule;
}

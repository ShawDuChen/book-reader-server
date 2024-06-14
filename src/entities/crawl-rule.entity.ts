import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import CrudBaseEntity from "./tools/base-entity";
import { Book } from "./book.entity";

@Entity("crawl_rule")
export class CrawlRule extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 32, comment: "规则名称" })
  name!: string;

  @Column({ type: "varchar", length: 255, comment: "站点地址" })
  website_url!: string;

  @Column({ type: "varchar", length: 64, comment: "列表选择器" })
  list_selector!: string;

  @Column({ type: "varchar", length: 64, comment: "内容选择器" })
  content_selector!: string;

  @Column({
    type: "int",
    comment: "状态:1-可用;0-不可用;",
    nullable: true,
    default: 1,
  })
  status?: number;

  @ManyToOne(() => Book, (book) => book.crawl_rule)
  books?: Book[];
}

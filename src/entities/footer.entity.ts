import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import CrudBaseEntity from "./tools/base-entity";

export enum SiteFooterType {
  ABOUT = "ABOUT",
  CONTACT = "CONTACT",
  NEWS = "NEWS",
  SOCIAL = "SOCIAL",
}

export enum SiteFooterSubType {
  PLATFORM = "PLATFORM",
  COMPANY = "COMPANY",
  PAPER = "PAPER",
}

@Entity("site_footer")
export class SiteFooter extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "标题" })
  title!: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "外连接" })
  link?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "描述" })
  description?: string;

  @Column({ type: "enum", enum: SiteFooterType, comment: "类型" })
  type!: SiteFooterType;

  @Column({
    type: "enum",
    enum: SiteFooterSubType,
    nullable: true,
    comment: "子类型",
  })
  sub_type?: SiteFooterSubType;
}

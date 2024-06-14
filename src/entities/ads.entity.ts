import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CrudBaseEntity from "./tools/base-entity";
import { Advertiser } from "./advertiser.entity";
import { DateTimeTransformer } from "./tools/date-time-transformer";

@Entity("ads")
export class Ads extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "广告标题" })
  title!: string;

  @Column({ type: "varchar", length: 255, comment: "广告外链接" })
  link!: string;

  @Column({ type: "varchar", length: 255, comment: "广告图片", nullable: true })
  image?: string;

  @Column({ type: "varchar", length: 255, comment: "广告描述", nullable: true })
  description?: string;

  @Column({ type: "int", comment: "投放人" })
  advertiser_id!: number;

  @ManyToOne(() => Advertiser)
  @JoinColumn({
    name: "advertiser_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "ads_advertiser_id",
  })
  advertiser?: Advertiser;

  @Column({
    type: "datetime",
    name: "expired_at",
    nullable: true,
    comment: "过期时间",
    transformer: new DateTimeTransformer(),
  })
  expired_at?: string;
}

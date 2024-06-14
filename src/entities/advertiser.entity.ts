import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CrudBaseEntity from "./tools/base-entity";
import { Ads } from "./ads.entity";

@Entity("advertiser")
export class Advertiser extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "投放人" })
  name!: string;

  @Column({ type: "varchar", length: 255, comment: "联系电话" })
  tel!: string;

  @Column({ type: "varchar", length: 255, comment: "联系地址", nullable: true })
  address?: string;

  @OneToMany(() => Ads, (ads) => ads.advertiser)
  ads_list?: Ads[];
}

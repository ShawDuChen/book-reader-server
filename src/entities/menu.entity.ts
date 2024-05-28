import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import CrudBaseEntity from "./tools/base-entity";

@Entity("menu")
export class Menu extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "菜单名称" })
  name!: string;

  @Column({ type: "int", default: 0, comment: "父菜单" })
  parent_id!: number;

  @Column({ type: "varchar", length: 32, nullable: true, comment: "菜单路由" })
  path?: string;

  @Column({ type: "varchar", length: 64, nullable: true, comment: "菜单图标" })
  icon?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "菜单组件" })
  component?: string;

  @Column({ type: "int", default: 1, comment: "是否可见" })
  visible?: number;

  @Column({ type: "int", default: 0, comment: "排序" })
  order?: number;
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import CrudBaseEntity from "./tools/base-entity";
import { Menu } from "./menu.entity";

@Entity("role")
export class Role extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "角色名称" })
  name!: string;

  @Column({ type: "text", comment: "权限字符串" })
  authorities!: string;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus?: Menu[];
}

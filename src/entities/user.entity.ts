import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./role.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ name: "username", type: "varchar", length: 32, comment: "用户名" })
  username!: string;

  @Column({ type: "varchar", length: 255, comment: "密码" })
  password!: string;

  @Column({ type: "varchar", length: 32, comment: "用户昵称" })
  nickname!: string;

  @Column({ type: "varchar", length: 1, nullable: true, comment: "性别" })
  sex?: string;

  @Column({ type: "varchar", length: 11, nullable: true, comment: "联系方式" })
  tel?: string;

  @Column({ type: "varchar", length: 64, nullable: true, comment: "电子邮箱" })
  email?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "联系地址" })
  address?: string;

  @Column({ type: "int", nullable: true, default: 1, comment: "状态" })
  status?: number;

  @Column({ type: "int", nullable: true, comment: "角色ID" })
  role_id?: number;

  @ManyToOne(() => Role)
  @JoinColumn({
    name: "role_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "role_id",
  })
  role?: Role;

  @Column({ type: "int", nullable: true, default: 0, comment: "是否超管" })
  is_super?: number;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "备注" })
  remark?: string;

  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
    nullable: true,
    comment: "创建日期",
  })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "创建人" })
  created_by?: string;

  @UpdateDateColumn({
    type: "datetime",
    name: "updated_at",
    nullable: true,
    comment: "更新日期",
  })
  updated_at?: string;

  @Column({ type: "varchar", nullable: true, comment: "最后操作人" })
  updated_by?: string;
}

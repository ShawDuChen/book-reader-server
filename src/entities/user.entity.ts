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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "username", type: "varchar", length: 32 })
  username!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 32 })
  nickname!: string;

  @Column({ type: "varchar", length: 1, nullable: true })
  sex?: string;

  @Column({ type: "varchar", length: 11, nullable: true })
  tel?: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  email?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address?: string;

  @Column({ type: "int", nullable: true, default: 1 })
  status?: number;

  @Column({ type: "int", nullable: true })
  role_id?: number;

  @ManyToOne(() => Role)
  @JoinColumn({
    name: "role_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "role_id",
  })
  role?: Role;

  @Column({ type: "int", nullable: true, default: 0 })
  is_super?: number;

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", nullable: true })
  updated_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  updated_by?: string;
}

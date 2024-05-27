import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text" })
  authorities!: string;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", default: null })
  updated_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  updated_by?: string;
}

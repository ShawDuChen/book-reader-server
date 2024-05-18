import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "username" })
  username!: string;

  @Column()
  password!: string;

  @Column()
  sex!: string;

  @Column()
  tel!: string;

  @Column()
  email!: string;

  @Column()
  address!: string;

  @Column()
  status!: string;

  @Column()
  role_id?: number;

  @OneToOne(() => Role)
  @JoinColumn({
    name: "role_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "role_id",
  })
  role?: Role;

  @Column({ name: "created_by" })
  created_by!: string;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column({ name: "updated_by" })
  updated_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;
}

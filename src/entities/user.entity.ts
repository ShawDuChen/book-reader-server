import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn({ name: "username" })
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

  @Column({ name: "created_by" })
  created_by!: string;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column({ name: "updated_by" })
  updated_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("code")
export class Code {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  columns?: string;

  @Column()
  remark?: string;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}

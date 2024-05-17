import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("logger")
export class Logger {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  method!: string;

  @Column()
  url!: string;

  @Column()
  status!: number;

  @Column({ type: "text" })
  request_body!: string;

  @Column({ type: "text" })
  response_body!: string;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}

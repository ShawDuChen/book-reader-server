import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("author")
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  sex?: string;

  @Column()
  tel?: string;

  @Column()
  status?: number;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity("chapter")
export class Chapter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  no!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  content?: string;

  @Column({ type: "int" })
  book_id!: number;

  @OneToOne(() => Book)
  @JoinColumn({
    name: "book_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "book_id",
  })
  book?: Book;

  @Column({ type: "varchar", length: 255, nullable: true })
  url?: string;

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", nullable: true })
  updated_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  updated_by?: string;
}

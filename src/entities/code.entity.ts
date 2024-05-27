import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("code")
export class Code {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  columns?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  remark?: string;

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", nullable: true })
  updated_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  updated_by?: string;
}

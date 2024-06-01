import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CrudBaseEntity from "./tools/base-entity";
import { User } from "./user.entity";

export enum SourceType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  OTHER = "OTHER",
}

@Entity("source")
export class Source extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "资源路径" })
  url!: string;

  @Column({
    type: "enum",
    enum: SourceType,
    comment: "资源类型",
    default: SourceType.OTHER,
  })
  type!: SourceType;

  @Column({ type: "int", comment: "用户ID" })
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_source_user_id",
  })
  user?: User;
}

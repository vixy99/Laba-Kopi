import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../role.enum";
import { Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @Column({unique: true})
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.Kasir})
  role: Role

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({default: null})
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

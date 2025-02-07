import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number; // Assert that id will be initialized later

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column({ unique: true })
  isbn!: string;
}

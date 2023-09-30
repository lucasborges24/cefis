import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 131, nullable: false })
  title: string;

  @Column({ unsigned: true, nullable: false, default: 0 })
  duration: number;

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @ManyToOne(() => UserEntity, (user) => user.courses)
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacher?: UserEntity;
}

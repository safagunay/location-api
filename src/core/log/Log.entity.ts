import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { AreaEntity } from '../area';

@Entity('logs')
export class LogEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  userId: string;

  @PrimaryColumn({ type: 'timestamp' })
  timestamp: Date;

  @PrimaryColumn({ type: 'integer' })
  areaId: number;

  @ManyToOne(() => AreaEntity, (area) => area.logs)
  area: AreaEntity;
}

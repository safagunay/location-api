import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LocationDto } from '../location/LocationDto.type';
import { LogEntity } from '../log/Log.entity';

@Entity('areas')
export class AreaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'numeric', precision: 9, scale: 6 })
  northEastLat: number;

  @Column({ type: 'numeric', precision: 9, scale: 6 })
  northEastLng: number;

  @Column({ type: 'numeric', precision: 9, scale: 6 })
  southWestLat: number;

  @Column({ type: 'numeric', precision: 9, scale: 6 })
  southWestLng: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => LogEntity, (log) => log.area)
  logs: LogEntity[];

  /**
   * Returns true if the given location is in the bounds of this area.
   */
  contains(location: LocationDto): boolean {
    const { latitude, longitude } = location;

    const isLatInRange =
      latitude >= this.southWestLat && latitude <= this.northEastLat;
    const isLngInRange =
      longitude >= this.southWestLng && longitude <= this.northEastLng;

    return isLatInRange && isLngInRange;
  }
}

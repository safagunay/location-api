import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Location } from '../location/Location.type';

@Entity('areas')
export class AreaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'numeric', nullable: false, precision: 9, scale: 6 })
  northEastLat: number;

  @Column({ type: 'numeric', nullable: false, precision: 9, scale: 6 })
  northEastLng: number;

  @Column({ type: 'numeric', nullable: false, precision: 9, scale: 6 })
  southWestLat: number;

  @Column({ type: 'numeric', nullable: false, precision: 9, scale: 6 })
  southWestLng: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  /**
   * Returns true if the given location is in the bounds of this area.
   */
  contains(location: Location): boolean {
    const { latitude, longitude } = location;

    const isLatInRange =
      latitude >= this.southWestLat && latitude <= this.northEastLat;
    const isLngInRange =
      longitude >= this.southWestLng && longitude <= this.northEastLng;

    return isLatInRange && isLngInRange;
  }
}

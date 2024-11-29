import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export async function getRepository<T extends ObjectLiteral>(
  dataSource: DataSource,
  entityClass: EntityTarget<T>,
): Promise<Repository<T>> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource.getRepository(entityClass);
}

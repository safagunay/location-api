import { Repository } from 'typeorm';
import { LogEntity } from 'src/core';

export async function getUserLogs(
  userId: string,
  logRepository: Repository<LogEntity>,
): Promise<LogEntity[]> {
  return await logRepository.find({
    where: { userId },
    relations: { area: true },
  });
}

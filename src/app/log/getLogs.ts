import { Repository } from 'typeorm';
import { LogEntity } from 'src/core';

export async function getLogs(
  logRepository: Repository<LogEntity>,
): Promise<LogEntity[]> {
  return await logRepository.find();
}

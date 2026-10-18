
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DataSource } from 'typeorm';
import databaseConfig from '../config/database.config';
import { User } from '../users/entities/user.entity';

export default new DataSource({
  ...databaseConfig(),
  entities: [join(__dirname, '..', '**', '*.entity.js')],
  migrations: [join(__dirname, 'migrations', '*.js')],
});
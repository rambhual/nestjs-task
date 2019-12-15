import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-54-83-202-132.compute-1.amazonaws.com',
  port: 5432,
  username: 'edrfttowwckkmr',
  password: '1c09d3c1349a80debefa7aa813f68b9da0a310fe4dc4d935a78358868b44911b',
  database: 'd5qmp04oo2nap3',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: true,
  logging: false,
};

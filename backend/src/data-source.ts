import { DataSource } from 'typeorm';
import { Book } from './entities/Book'; 

export const AppDataSource = new DataSource({
  type: 'sqlite',                
  database: './database.sqlite',   
  synchronize: true,              
  logging: true,                  
  entities: [Book],              
});

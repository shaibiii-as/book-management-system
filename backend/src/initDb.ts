import { AppDataSource } from './data-source';

export const initDb = async () => {
  try {
    // Initialize the connection to the database
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
};

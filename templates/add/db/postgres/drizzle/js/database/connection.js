import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

const connectDB = async () => {
  try {
    // Test the connection
    await client`SELECT 1`;
    console.log('PostgreSQL connected via Drizzle');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export { db, connectDB };
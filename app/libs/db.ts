import Database  from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

export const initializeDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS counts (
      id INTEGER PRIMARY KEY,
      trick_count INTEGER DEFAULT 0,
      treat_count INTEGER DEFAULT 0
    );
  `);

  const countExists = db.prepare('SELECT * FROM counts WHERE id = 1').get();
  if (!countExists) {
    db.prepare('INSERT INTO counts (trick_count, treat_count) VALUES (0, 0)').run();
  }
};

export default db;

const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

async function createAdmin() {
  try {
    const db = new sqlite3.Database('./database.sqlite');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    db.run(`INSERT INTO users (name, email, password, role, status) 
            VALUES (?, ?, ?, 'admin', 'active')`, 
           ['Admin User', 'admin@cumroad.com', hashedPassword], 
           function(err) {
      if (err) {
        console.log('❌ Error:', err.message);
        if (err.message.includes('UNIQUE constraint')) {
          console.log('📌 Admin kasutaja juba eksisteerib!');
        }
      } else {
        console.log('✅ Admin kasutaja loodud edukalt!');
        console.log('📧 Email: admin@cumroad.com');
        console.log('🔑 Parool: admin123');
        console.log('👑 Roll: admin');
      }
      db.close();
    });
  } catch (error) {
    console.error('❌ Viga admin kasutaja loomisel:', error);
  }
}

createAdmin();

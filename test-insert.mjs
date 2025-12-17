import mysql from 'mysql2/promise';

async function testInsert() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    // Insert a test point
    const [pointResult] = await connection.execute(
      'INSERT INTO points (name, email, whatsapp, latitude, longitude, city, uf, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      ['Test Point', 'test@example.com', '1234567890', '-23.5505', '-46.6333', 'São Paulo', 'SP', 'test.jpg']
    );
    
    const pointId = pointResult.insertId;
    console.log('Point inserted with ID:', pointId);
    
    // Try to insert point items
    const itemIds = [1, 2, 3];
    for (const itemId of itemIds) {
      const [itemResult] = await connection.execute(
        'INSERT INTO pointItems (pointId, itemId) VALUES (?, ?)',
        [pointId, itemId]
      );
      console.log('PointItem inserted:', itemResult.insertId);
    }
    
    console.log('Test successful!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

testInsert();

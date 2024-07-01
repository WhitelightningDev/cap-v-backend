const crypto = require('crypto');

// Function to generate a random secret key
function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Generate and log a new secret key
const newSecretKey = generateSecretKey();
console.log('New secret key:', newSecretKey);

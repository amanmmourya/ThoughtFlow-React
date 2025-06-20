import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET; // must be 32 chars
const iv = crypto.randomBytes(16); // initialization vector

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return {
    iv: iv.toString('hex'),
    content: encrypted,
  };
};

export const decrypt = ({ iv, content }) => {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(content, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
};

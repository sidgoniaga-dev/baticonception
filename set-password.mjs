// Définit le mot de passe admin du CMS.
// Usage : node set-password.mjs email@client.be MonMotDePasse
import crypto from 'crypto';
import fs from 'fs';

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage : node set-password.mjs email@client.be MotDePasse');
  process.exit(1);
}
if (password.length < 8) {
  console.error('Mot de passe trop court (8 caractères minimum).');
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64);
const stored = `${salt.toString('hex')}:${hash.toString('hex')}`;

const envPath = new URL('.env', import.meta.url).pathname;
let env = '';
try { env = fs.readFileSync(envPath, 'utf-8'); } catch {}

function setVar(src, key, value) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, 'm');
  if (re.test(src)) return src.replace(re, line);
  return src + (src.endsWith('\n') || src === '' ? '' : '\n') + line + '\n';
}

env = setVar(env, 'ADMIN_EMAIL', email);
env = setVar(env, 'ADMIN_PASSWORD_HASH', stored);
if (!/^SESSION_SECRET=.+$/m.test(env)) {
  env = setVar(env, 'SESSION_SECRET', crypto.randomBytes(32).toString('hex'));
}

fs.writeFileSync(envPath, env);
console.log(`✓ Identifiants admin enregistrés dans .env pour ${email}`);
console.log('  Redémarrez le serveur pour appliquer.');

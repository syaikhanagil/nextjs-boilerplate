import bcrypt from 'bcryptjs';

export async function comparePassword(password: string, encrypted: string) {
  return bcrypt.compareSync(password, encrypted);
}

export async function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export async function encrypt(str: string, key: number) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = (str.charCodeAt(i) + key) % 256;
    result += String.fromCharCode(charCode);
  }
  return result;
}

export async function decrypt(str: string, key: number) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = (str.charCodeAt(i) - key + 256) % 256;
    result += String.fromCharCode(charCode);
  }
  return result;
}

/**
 * Password Strength Evaluation
 * @param password
 *
 */
export function passwordStrengthEvaluation(password: string) {
  let score = 0;
  if (!password) return 'default';
  // Check password length
  if (password.length > 8) score += 2;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
      return 'very-weak';
    case 2:
    case 3:
      return 'weak';
    case 4:
      return 'medium';
    case 5:
      return 'strong';
    case 6:
      return 'very-strong';
  }
}

/**
 * Password Composition Evaluation
 * @param password
 *
 */
export function passwordCompositionEvaluation(password: string) {
  const checklist = {
    length: false,
    lowercase: false,
    uppercase: false,
    symbol: false,
    number: false,
  };

  if (!password) return checklist;

  // Check password length
  if (password.length > 7) checklist.length = true;
  else checklist.length = false;

  // Contains lowercase
  if (/[a-z]/.test(password)) checklist.lowercase = true;
  else checklist.lowercase = false;

  // Contains uppercase
  if (/[A-Z]/.test(password)) checklist.uppercase = true;
  else checklist.uppercase = false;

  // Contains numbers
  if (/\d/.test(password)) checklist.number = true;
  else checklist.number = false;

  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) checklist.symbol = true;
  else checklist.symbol = false;

  return checklist;
}

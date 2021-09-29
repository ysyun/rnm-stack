import * as bcrypt from 'bcrypt';

export const bcryptHash = (plainText: string, saltOrRounds = 12): Promise<string> => {
  return bcrypt.hash(plainText, saltOrRounds);
}

export const bcryptCompare = (plainText: string, hashedMessage: string): Promise<boolean> => {
  return bcrypt.compare(plainText, hashedMessage);
}

import { badWords } from 'src/config/censor';

export class CensorHelper {
  public static isEligible(text: string): boolean {
    return !badWords.some((word) => text.includes(word));
  }
}

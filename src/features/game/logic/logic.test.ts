import { describe, it, expect } from 'vitest';
import { evaluateGuess } from './logic';

describe('evaluateGuess', () => {
  it('identifies green letters correctly', () => {
    const result = evaluateGuess('DAVID', 'DAVID');
    expect(result).toEqual(['green', 'green', 'green', 'green', 'green']);
  });

  it('identifies yellow letters correctly', () => {
    const result = evaluateGuess('IDAHO', 'DAVID');
    // I is yellow (index 0 in guess, index 3 in secret ("D-A-V-I-D"))
    // D is yellow (index 1 in guess, index 0 in secret)
    // A is yellow (index 2 in guess, index 1 in secret)
    // H is dark
    // O is dark
    expect(result[0]).toBe('yellow');
    expect(result[1]).toBe('yellow');
    expect(result[2]).toBe('yellow');
    expect(result[3]).toBe('dark');
    expect(result[4]).toBe('dark');
  });

  it('identifies dark letters correctly', () => {
    const result = evaluateGuess('ZORRO', 'DAVID');
    expect(result).toEqual(['dark', 'dark', 'dark', 'dark', 'dark']);
  });
});

import { describe, it, expect } from 'vitest'
import { getWord, existsWord } from '../words.js'

describe('words.js helper functions', () => {
  describe('getWord()', () => {
    it('should return a string', () => {
      const word = getWord()
      expect(typeof word).toBe('string')
    })

    it('should return an uppercase word', () => {
      const word = getWord()
      expect(word).toBe(word.toUpperCase())
    })

    it('should return a word with length 5', () => {
      const word = getWord()
      expect(word.length).toBe(5)
    })

    it('should return different words on multiple calls (random)', () => {
      const words = new Set()
      // Call multiple times to test randomness
      for (let i = 0; i < 10; i++) {
        words.add(getWord())
      }
      // Should have at least some variety (not all same word)
      expect(words.size).toBeGreaterThan(1)
    })
  })

  describe('existsWord()', () => {
    it('should return true for valid words (lowercase)', () => {
      expect(existsWord('аббат')).toBe(true)
      expect(existsWord('автор')).toBe(true)
      expect(existsWord('якорь')).toBe(true)
    })

    it('should return true for valid words (uppercase)', () => {
      expect(existsWord('АББАТ')).toBe(true)
      expect(existsWord('АВТОР')).toBe(true)
      expect(existsWord('ЯКОРЬ')).toBe(true)
    })

    it('should return true for valid words (mixed case)', () => {
      expect(existsWord('Аббат')).toBe(true)
      expect(existsWord('АвТоР')).toBe(true)
    })

    it('should return false for invalid words', () => {
      expect(existsWord('xxxxx')).toBe(false)
      expect(existsWord('abcde')).toBe(false)
      expect(existsWord('12345')).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(existsWord('')).toBe(false)
    })

    it('should return false for words with wrong length', () => {
      expect(existsWord('аб')).toBe(false)
      expect(existsWord('аббатт')).toBe(false)
      expect(existsWord('а')).toBe(false)
    })
  })
})


import { describe, it, expect } from 'vitest'
import { getKeyboardLayout } from '../keyboard.js'

describe('keyboard.js helper functions', () => {
  describe('getKeyboardLayout()', () => {
    it('should return correct layout for row 0', () => {
      const layout = getKeyboardLayout({ row: 0 })
      expect(layout).toBeInstanceOf(Array)
      expect(layout.length).toBe(12) // 'ЙЦУКЕНГШЩЗХЪ' has 12 characters
      expect(layout[0].label).toBe('Й')
      expect(layout[0].key).toBe('q')
      expect(layout[11].label).toBe('Ъ')
    })

    it('should return correct layout for row 1', () => {
      const layout = getKeyboardLayout({ row: 1 })
      expect(layout).toBeInstanceOf(Array)
      expect(layout.length).toBe(11) // 'ФЫВАПРОЛДЖЭ' has 11 characters
      expect(layout[0].label).toBe('Ф')
      expect(layout[0].key).toBe('a')
      expect(layout[10].label).toBe('Э')
    })

    it('should return correct layout for row 2', () => {
      const layout = getKeyboardLayout({ row: 2 })
      expect(layout).toBeInstanceOf(Array)
      expect(layout.length).toBe(9) // 'ЯЧСМИТЬБЮ' has 9 characters (ЯЧСМИТЬБЮ)
      expect(layout[0].label).toBe('Я')
      expect(layout[0].key).toBe('z')
      expect(layout[8].label).toBe('Ю')
    })

    it('should have correct structure for each key', () => {
      const layout = getKeyboardLayout({ row: 0 })
      layout.forEach(key => {
        expect(key).toHaveProperty('key')
        expect(key).toHaveProperty('label')
        expect(typeof key.key).toBe('string')
        expect(typeof key.label).toBe('string')
      })
    })

    it('should throw error for invalid row index (too high)', () => {
      expect(() => {
        getKeyboardLayout({ row: 3 })
      }).toThrow('Индекс строки выходит за размерность клавиатуры')
    })

    it('should throw error for invalid row index (negative)', () => {
      expect(() => {
        getKeyboardLayout({ row: -1 })
      }).toThrow()
    })
  })
})


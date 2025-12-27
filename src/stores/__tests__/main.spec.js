import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '../main.js'

// Mock uuid
vi.mock('uuid', () => ({
  v4: () => 'test-uuid-123'
}))

// Mock words helper
vi.mock('src/helpers/words.js', () => ({
  getWord: () => 'ТЕСТО',
  existsWord: (word) => {
    const validWords = ['тесто', 'слово', 'игра', 'теста']
    return validWords.includes(word.toLowerCase())
  }
}))

describe('Game Store (main.js)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('init()', () => {
    it('should initialize game state', () => {
      const store = useGameStore()
      store.init()

      expect(store.target).toBe('ТЕСТО')
      expect(store.currentWord).toBe('')
      expect(store.currentIndex).toBe(0)
      expect(store.gameOver).toBe(false)
      expect(store.gameWin).toBe(false)
    })

    it('should create 6 word slots', () => {
      const store = useGameStore()
      store.init()

      expect(store.words.length).toBe(6)
      store.words.forEach(word => {
        expect(word).toHaveProperty('id')
        expect(word).toHaveProperty('word')
        expect(word).toHaveProperty('exist')
        expect(word).toHaveProperty('check')
        expect(word.word).toBe('')
        expect(word.exist).toBe(true)
        expect(word.check).toBe(false)
      })
    })

    it('should reset state when called multiple times', () => {
      const store = useGameStore()
      store.init()
      store.currentWord = 'ТЕСТ'
      store.currentIndex = 2
      store.gameOver = true

      store.init()

      expect(store.currentWord).toBe('')
      expect(store.currentIndex).toBe(0)
      expect(store.gameOver).toBe(false)
    })
  })

  describe('input()', () => {
    it('should add letter to current word', () => {
      const store = useGameStore()
      store.init()

      store.input('Т')
      expect(store.currentWord).toBe('Т')
      expect(store.words[0].word).toBe('Т')

      store.input('Е')
      expect(store.currentWord).toBe('ТЕ')
      expect(store.words[0].word).toBe('ТЕ')
    })

    it('should not exceed max length of 5', () => {
      const store = useGameStore()
      store.init()

      store.input('Т')
      store.input('Е')
      store.input('С')
      store.input('Т')
      store.input('О')
      expect(store.currentWord.length).toBe(5)

      store.input('X') // Should not add
      expect(store.currentWord.length).toBe(5)
      expect(store.currentWord).toBe('ТЕСТО')
    })

    it('should update current word in words array', () => {
      const store = useGameStore()
      store.init()

      store.input('Т')
      expect(store.words[store.currentIndex].word).toBe('Т')
    })
  })

  describe('backSpace()', () => {
    it('should remove last letter from current word', () => {
      const store = useGameStore()
      store.init()

      store.input('Т')
      store.input('Е')
      expect(store.currentWord).toBe('ТЕ')

      store.backSpace()
      expect(store.currentWord).toBe('Т')
      expect(store.words[0].word).toBe('Т')
    })

    it('should not remove if word is empty', () => {
      const store = useGameStore()
      store.init()

      store.backSpace()
      expect(store.currentWord).toBe('')
    })

    it('should reset exist flag to true', () => {
      const store = useGameStore()
      store.init()

      store.input('XXXXX')
      store.done() // This will set exist to false
      expect(store.words[0].exist).toBe(false)

      store.backSpace()
      expect(store.words[0].exist).toBe(true)
    })
  })

  describe('done()', () => {
    it('should validate word and mark as checked if valid', () => {
      const store = useGameStore()
      store.init()

      store.input('с')
      store.input('л')
      store.input('о')
      store.input('в')
      store.input('о')

      store.done()

      expect(store.words[0].check).toBe(true)
      expect(store.words[0].exist).toBe(true)
    })

    it('should set exist to false for invalid words', () => {
      const store = useGameStore()
      store.init()

      store.input('X')
      store.input('X')
      store.input('X')
      store.input('X')
      store.input('X')

      store.done()

      expect(store.words[0].exist).toBe(false)
      expect(store.words[0].check).toBe(false)
    })

    it('should advance to next word if valid and not winning', () => {
      const store = useGameStore()
      store.init()
      store.target = 'ТЕСТО'

      store.input('с')
      store.input('л')
      store.input('о')
      store.input('в')
      store.input('о')

      store.done()

      expect(store.currentIndex).toBe(1)
      expect(store.currentWord).toBe('')
    })

    it('should trigger win when word matches target', () => {
      const store = useGameStore()
      store.init()
      store.target = 'ТЕСТО'

      store.input('Т')
      store.input('Е')
      store.input('С')
      store.input('Т')
      store.input('О')

      store.done()

      expect(store.gameWin).toBe(true)
      expect(store.gameOver).toBe(true)
    })

    it('should trigger lose on last attempt with wrong word', () => {
      const store = useGameStore()
      store.init()
      store.target = 'ТЕСТО'

      // Fill 5 attempts
      for (let i = 0; i < 5; i++) {
        store.input('с')
        store.input('л')
        store.input('о')
        store.input('в')
        store.input('о')
        store.done()
      }

      expect(store.currentIndex).toBe(5)

      // Last attempt
      store.input('с')
      store.input('л')
      store.input('о')
      store.input('в')
      store.input('о')
      store.done()

      expect(store.gameWin).toBe(false)
      expect(store.gameOver).toBe(true)
    })
  })

  describe('win() and lose()', () => {
    it('should set gameWin and gameOver to true on win', () => {
      const store = useGameStore()
      store.init()

      store.win()

      expect(store.gameWin).toBe(true)
      expect(store.gameOver).toBe(true)
    })

    it('should set gameWin to false and gameOver to true on lose', () => {
      const store = useGameStore()
      store.init()

      store.lose()

      expect(store.gameWin).toBe(false)
      expect(store.gameOver).toBe(true)
    })
  })

  describe('Getters', () => {
    describe('empty', () => {
      it('should return true when currentWord is empty', () => {
        const store = useGameStore()
        store.init()

        expect(store.empty).toBe(true)
      })

      it('should return false when currentWord has letters', () => {
        const store = useGameStore()
        store.init()

        store.input('Т')
        expect(store.empty).toBe(false)
      })
    })

    describe('full', () => {
      it('should return false when currentWord is not full', () => {
        const store = useGameStore()
        store.init()

        store.input('Т')
        expect(store.full).toBe(false)
      })

      it('should return true when currentWord has 5 letters', () => {
        const store = useGameStore()
        store.init()

        store.input('Т')
        store.input('Е')
        store.input('С')
        store.input('Т')
        store.input('О')

        expect(store.full).toBe(true)
      })
    })

    describe('allL', () => {
      it('should return unique letters from all previous words', () => {
        const store = useGameStore()
        store.init()

        store.input('с')
        store.input('л')
        store.input('о')
        store.input('в')
        store.input('о')
        store.done()

        store.input('и')
        store.input('г')
        store.input('р')
        store.input('а')
        store.done()

        const allLetters = store.allL
        expect(allLetters.length).toBeGreaterThan(0)
        // Should contain unique letters from 'слово' and 'игра'
        expect(allLetters).toContain('с')
        expect(allLetters).toContain('и')
      })
    })

    describe('equalL', () => {
      it('should return letters that match target position', () => {
        const store = useGameStore()
        store.init()
        store.target = 'ТЕСТО'

        // Input word that has some matching letters in correct positions
        // 'ТЕСТО' is the target
        // Let's use 'ТЕСТА' which has Т, Е, С, Т in matching positions
        store.input('Т')
        store.input('Е')
        store.input('С')
        store.input('Т')
        store.input('А') // Different last letter
        store.done()

        // Now currentIndex is 1, equalL looks at words[0]
        // 'ТЕСТА' vs 'ТЕСТО' - Т, Е, С, Т match in positions 0,1,2,3
        const equalLetters = store.equalL
        expect(equalLetters.length).toBeGreaterThan(0)
        // Should contain matching letters
        expect(equalLetters).toContain('Т')
        expect(equalLetters).toContain('Е')
        expect(equalLetters).toContain('С')
      })

      it('should return empty string when no words have been checked', () => {
        const store = useGameStore()
        store.init()
        store.target = 'ТЕСТО'

        const equalLetters = store.equalL
        expect(equalLetters).toBe('')
      })

      it('should return empty string when word matches target (win condition)', () => {
        const store = useGameStore()
        store.init()
        store.target = 'ТЕСТО'

        // Input word that matches target exactly - triggers win
        store.input('Т')
        store.input('Е')
        store.input('С')
        store.input('Т')
        store.input('О')
        store.done()

        // When win is triggered, currentIndex doesn't advance
        // So equalL looks at words.slice(0, 0) which is empty
        const equalLetters = store.equalL
        expect(equalLetters).toBe('')
      })
    })
  })
})


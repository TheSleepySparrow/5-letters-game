import { defineStore } from 'pinia'
import { getWord, existsWord } from 'src/helpers/words.js'
import { v4 } from 'uuid'
import { useMetricsStore } from './metrics.js'

const MAX_LENGTH = 5
const MAX_TRYING = 6

export const useGameStore = defineStore('game', {
  state: () => ({
    target: '',
    currentWord: '',
    currentIndex: 0,
    words: [],
    gameOver: false,
    gameWin: false
  }),
  getters: {
    empty: state => state.currentWord.length === 0,
    full: state => state.currentWord.length === MAX_LENGTH,
    allL: state => state.words.slice(0, state.currentIndex).reduce((acc, el) => {
      acc += el.word
      return [...new Set(acc)].join('')
    }, ''),
    equalL: state => state.words.slice(0, state.currentIndex).reduce((acc, el) => {
      for (let i = 0; i < MAX_LENGTH; i++) {
        if (el.word[i] === state.target[i]) {
          acc += el.word[i]
        }
      }
      return [...new Set(acc)].join('')
    }, '')
  },
  actions: {
    init () {
      this.$reset()
      this.target = getWord()
      console.log(this.target)
      for (let i = 0; i < MAX_TRYING; i++) {
        this.words.push({
          id: v4(),
          word: '',
          exist: true,
          check: false
        })
      }
      // Track game start
      const metricsStore = useMetricsStore()
      metricsStore.startGame()
    },
    input (l) {
      if (this.currentWord.length === MAX_LENGTH) return
      this.currentWord += l
      this.words[this.currentIndex].word = this.currentWord
    },
    backSpace () {
      if (this.currentWord.length === 0) return
      this.currentWord = this.currentWord.slice(0, -1)
      this.words[this.currentIndex].word = this.currentWord
      this.words[this.currentIndex].exist = true
    },
    done () {
      if (existsWord(this.currentWord)) {
        this.words[this.currentIndex].check = true
        if (this.currentWord === this.target) {
          return this.win()
        }
        if (this.currentIndex === MAX_TRYING - 1) {
          return this.lose()
        }
        this.currentIndex += 1
        this.currentWord = ''
      } else {
        this.words[this.currentIndex].exist = false
      }
    },
    win () {
      console.log('Победа')
      this.gameWin = true
      this.gameOver = true
      // Track game end (win)
      const metricsStore = useMetricsStore()
      metricsStore.endGame(true)
    },
    lose () {
      console.log('Лузер')
      this.gameWin = false
      this.gameOver = true
      // Track game end (loss)
      const metricsStore = useMetricsStore()
      metricsStore.endGame(false)
    }
  }
})

import { defineStore } from 'pinia'
import { getMetrics, trackGameStart, trackGameEnd, resetMetrics } from 'src/services/metrics.js'

/**
 * Format milliseconds to mm:ss format
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time string
 */
function formatTime (ms) {
  if (!ms || ms === 0) return '00:00'
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    totalTime: 0,
    lastGameTime: 0,
    gameStartTime: null
  }),

  getters: {
    /**
     * Calculate win rate percentage
     */
    winRate (state) {
      if (state.totalGames === 0) return 0
      return Math.round((state.totalWins / state.totalGames) * 100)
    },

    /**
     * Calculate average game time in milliseconds
     */
    averageGameTime (state) {
      if (state.totalGames === 0) return 0
      return Math.round(state.totalTime / state.totalGames)
    },

    /**
     * Get formatted average game time
     */
    formattedAverageTime (state) {
      return formatTime(this.averageGameTime)
    },

    /**
     * Get formatted last game time
     */
    formattedLastGameTime (state) {
      return formatTime(state.lastGameTime)
    },

    /**
     * Get all statistics formatted for display
     */
    formattedStats (state) {
      return {
        totalGames: state.totalGames,
        totalWins: state.totalWins,
        totalLosses: state.totalLosses,
        winRate: this.winRate,
        averageTime: this.formattedAverageTime,
        lastGameTime: this.formattedLastGameTime
      }
    }
  },

  actions: {
    /**
     * Initialize metrics from localStorage
     */
    init () {
      const metrics = getMetrics()
      this.totalGames = metrics.totalGames
      this.totalWins = metrics.totalWins
      this.totalLosses = metrics.totalLosses
      this.totalTime = metrics.totalTime
      this.lastGameTime = metrics.lastGameTime
      this.gameStartTime = metrics.gameStartTime
    },

    /**
     * Track game start
     */
    startGame () {
      this.gameStartTime = trackGameStart()
    },

    /**
     * Track game end and update statistics
     * @param {boolean} isWin - Whether the game was won
     */
    endGame (isWin) {
      const duration = trackGameEnd(isWin)
      
      // Update local state
      this.totalGames += 1
      if (isWin) {
        this.totalWins += 1
      } else {
        this.totalLosses += 1
      }
      this.totalTime += duration
      this.lastGameTime = duration
      this.gameStartTime = null
    },

    /**
     * Reset all metrics
     */
    reset () {
      resetMetrics()
      this.totalGames = 0
      this.totalWins = 0
      this.totalLosses = 0
      this.totalTime = 0
      this.lastGameTime = 0
      this.gameStartTime = null
    }
  }
})


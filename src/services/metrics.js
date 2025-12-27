const STORAGE_KEY = 'game-metrics'

/**
 * Get default metrics structure
 */
function getDefaultMetrics () {
  return {
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    totalTime: 0, // milliseconds
    lastGameTime: 0, // milliseconds
    gameStartTime: null // timestamp when current game started
  }
}

/**
 * Get metrics from localStorage
 * @returns {Object} Metrics object
 */
export function getMetrics () {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load metrics from localStorage:', error)
  }
  return getDefaultMetrics()
}

/**
 * Save metrics to localStorage
 * @param {Object} metrics - Metrics object to save
 */
function saveMetrics (metrics) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics))
  } catch (error) {
    console.error('Failed to save metrics to localStorage:', error)
  }
}

/**
 * Track game start - record start timestamp
 */
export function trackGameStart () {
  const metrics = getMetrics()
  metrics.gameStartTime = Date.now()
  saveMetrics(metrics)
  return metrics.gameStartTime
}

/**
 * Track game end - calculate duration and update statistics
 * @param {boolean} isWin - Whether the game was won
 * @returns {number} Game duration in milliseconds
 */
export function trackGameEnd (isWin) {
  const metrics = getMetrics()
  
  if (!metrics.gameStartTime) {
    console.warn('Game end tracked without start time')
    return 0
  }

  const endTime = Date.now()
  const duration = endTime - metrics.gameStartTime

  // Update statistics
  metrics.totalGames += 1
  if (isWin) {
    metrics.totalWins += 1
  } else {
    metrics.totalLosses += 1
  }
  metrics.totalTime += duration
  metrics.lastGameTime = duration
  metrics.gameStartTime = null // Clear start time

  saveMetrics(metrics)
  return duration
}

/**
 * Reset all metrics
 */
export function resetMetrics () {
  const defaultMetrics = getDefaultMetrics()
  saveMetrics(defaultMetrics)
  return defaultMetrics
}


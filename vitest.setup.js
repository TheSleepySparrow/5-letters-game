import { config } from '@vue/test-utils'
import { Quasar } from 'quasar'

// Mock Quasar for tests
config.global.plugins = [Quasar]

// Mock window.Capacitor if needed
if (typeof window !== 'undefined') {
  window.Capacitor = window.Capacitor || {}
}


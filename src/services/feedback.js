import emailjs from '@emailjs/browser'
import emailjsConfig from '../config/emailjs'

/**
 * Send user feedback via EmailJS
 * @param {number} rating - Rating from 1 to 5
 * @param {string} comment - User's comment/feedback text
 * @returns {Promise} Promise that resolves when email is sent
 */
export async function sendFeedback (rating, comment) {
  try {
    // Check if EmailJS is configured
    if (!emailjsConfig ||
        !emailjsConfig.serviceId ||
        !emailjsConfig.templateId ||
        !emailjsConfig.publicKey ||
        emailjsConfig.serviceId === 'YOUR_SERVICE_ID' ||
        emailjsConfig.templateId === 'YOUR_TEMPLATE_ID' ||
        emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY') {
      throw new Error('EmailJS не настроен. Пожалуйста, настройте src/config/emailjs.js согласно инструкции в emailjs.example.js')
    }

    // Get device info
    const deviceInfo = getDeviceInfo()

    // Prepare template parameters
    const templateParams = {
      rating: rating.toString(),
      comment: comment || '(No comment provided)',
      deviceInfo: deviceInfo,
      timestamp: new Date().toISOString(),
      to_email: 'aimilovanova@edu.hse.ru'
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    )

    return {
      success: true,
      messageId: response.text
    }
  } catch (error) {
    console.error('Failed to send feedback:', error)
    throw new Error(error.message || 'Не удалось отправить отзыв. Пожалуйста, попробуйте позже.')
  }
}

/**
 * Get device information for feedback
 * @returns {string} Device info string
 */
function getDeviceInfo () {
  const info = []
  
  // User agent
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    info.push(`User Agent: ${navigator.userAgent}`)
  }

  // Platform
  if (typeof navigator !== 'undefined' && navigator.platform) {
    info.push(`Platform: ${navigator.platform}`)
  }

  // Screen resolution
  if (typeof screen !== 'undefined') {
    info.push(`Screen: ${screen.width}x${screen.height}`)
  }

  // Language
  if (typeof navigator !== 'undefined' && navigator.language) {
    info.push(`Language: ${navigator.language}`)
  }

  // Check if running in Capacitor
  if (typeof window !== 'undefined' && window.Capacitor) {
    info.push('Platform: Capacitor Mobile App')
  } else {
    info.push('Platform: Web Browser')
  }

  return info.join(' | ') || 'Unknown device'
}


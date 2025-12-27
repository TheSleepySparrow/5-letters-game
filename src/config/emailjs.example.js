/**
 * EmailJS Configuration
 *
 * To set up EmailJS:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{rating}} - User rating (1-5)
 *    - {{comment}} - User comment
 *    - {{deviceInfo}} - Device information
 *    - {{timestamp}} - Submission timestamp
 *    - {{to_email}} - Recipient email
 * 4. Copy this file to emailjs.js and fill in your credentials
 * 5. Add emailjs.js to .gitignore (already done)
 */

export default {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
}

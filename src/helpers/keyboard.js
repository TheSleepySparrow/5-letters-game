const KEYBOARD = [
  {
    labels: 'ЙЦУКЕНГШЩЗХЪ',
    keys: 'qwertyuiop[]'
  },
  {
    labels: 'ФЫВАПРОЛДЖЭ',
    keys: 'asdfghjkl;\''
  },
  {
    labels: 'ЯЧСМИТЬБЮ',
    keys: 'zxcvbnm,.'
  }
]
export const getKeyboardLayout = ({ row = 0 }) => {
  if (row >= KEYBOARD.length) throw new Error('Индекс строки выходит за размерность клавиатуры')
  return KEYBOARD[row].labels.split('').map((el, i) => ({
    key: KEYBOARD[row].keys.charAt(i),
    label: el
  }))
}

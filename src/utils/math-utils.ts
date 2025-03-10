export function getRandomNumber(x: number, y: number) {
  return Math.floor(Math.random() * (y - x + 1)) + x
}

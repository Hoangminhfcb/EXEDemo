export function randomEmail(name: string): string {
  const chars = "0123456789";
  let randomNum = "";
  for (let i = 0; i < 4; i++) {
    randomNum += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${name.toLowerCase()}${randomNum}@gmail.com`;
}

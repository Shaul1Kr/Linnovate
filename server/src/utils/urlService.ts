const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const base = characters.length;

// Function to convert a number to Base62
export const encode = (num: number): string => {
  let shortUrl = "";
  while (num > 0) {
    shortUrl = shortUrl + characters[num % base];
    num = Math.floor(num / base);
  }
  return shortUrl || "a"; // Ensure at least 'a' is returned
};

export const decode = (shortUrl: string) => {
  return shortUrl
    .split("")
    .map((letter) => characters.indexOf(letter))
    .reduce((prev, current, index) => prev + current * base ** index, 0);
};

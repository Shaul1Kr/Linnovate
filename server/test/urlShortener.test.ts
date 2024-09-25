// __tests__/urlShortener.test.ts
import { encode, decode } from "../src/utils/shortener"; // Adjust the import based on your structure

describe("URL Shortener", () => {
  test("encode should return a short string for a given number", () => {
    const num = 12345;
    const shortUrl = encode(num);
    expect(shortUrl).toBeTruthy(); // Check that a short URL is returned
    expect(typeof shortUrl).toBe("string"); // Ensure it's a string
  });

  test("decode should return the original number from the short URL", () => {
    const num = 12345;
    const shortUrl = encode(num);
    const decodedNum = decode(shortUrl);
    expect(decodedNum).toEqual(num); // Check that decoding returns the original number
  });

  test("encode and decode should be inverses of each other", () => {
    const num = 98765;
    const shortUrl = encode(num);
    const decodedNum = decode(shortUrl);
    expect(decodedNum).toEqual(num); // Verify that encoding then decoding returns the original number
  });
});

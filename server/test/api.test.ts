// __tests__/api.test.ts
import request from "supertest";
import { app } from "../src/index";

describe("API Endpoints", () => {
  test("POST /api/shorten should create a short URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ longUrl: "https://example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("shortUrl");
  });

  test("GET /api/shorten/:shortUrl should redirect to the original URL", async () => {
    const longUrl = "https://example.com";
    const response = await request(app).post("/shorten").send({ longUrl });

    const shortUrl = response.body.shortUrl.split("/").pop(); // Get the short URL part

    const redirectResponse = await request(app).get(`/${shortUrl}`);
    expect(redirectResponse.status).toBe(302); // Assuming it redirects
    expect(redirectResponse.headers.location).toBe(longUrl);
  });
});

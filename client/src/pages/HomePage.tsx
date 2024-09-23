import { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longUrl) {
      setError("Please enter a valid URL");
      return;
    }
    try {
      const response = await axios.post("/api/shorten", { longUrl });
      setShortUrl(response.data.shortUrl);
      setError("");
    } catch (err) {
      setError("Error shortening the URL");
    }
  };

  return (
    <div className="url-shortener">
      <h1>URL Shortener</h1>
      <div>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
        />
        <button onClick={handleShorten}>Shorten URL</button>
      </div>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result">
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button onClick={() => navigator.clipboard.writeText(shortUrl)}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

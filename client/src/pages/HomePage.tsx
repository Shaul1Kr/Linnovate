import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

export default function HomePage() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleShorten = async () => {
    if (!longUrl) {
      setError("Please enter a valid URL");
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await axios.post("/api/shorten", { longUrl });
      setShortUrl(response.data.shortUrl);
      setError("");
      setSnackbarOpen(false);
    } catch (err) {
      setError("Error shortening the URL");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          URL Shortener
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Enter your long URL below to shorten it. Share the shortened URL with
          ease!
        </Typography>

        <TextField
          fullWidth
          label="Enter long URL"
          variant="outlined"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleShorten}
          fullWidth
        >
          Shorten URL
        </Button>

        {shortUrl && (
          <div style={{ marginTop: "1.5rem" }}>
            <Typography variant="body1">Shortened URL:</Typography>
            <Typography variant="body2">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              style={{ marginTop: "0.5rem" }}
            >
              Copy
            </Button>
          </div>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RedirectPage() {
  const { shortUrl } = useParams();
  console.log({ shortUrl });

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await axios.get(`/api/${shortUrl}`);

        if (response.data.longUrl) {
          window.location.href = response.data.longUrl;
        } else {
          console.error("Short URL not found");
        }
      } catch (error) {
        console.error("Error fetching the long URL:", error);
      }
    };

    fetchLongUrl();
  }, [shortUrl]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

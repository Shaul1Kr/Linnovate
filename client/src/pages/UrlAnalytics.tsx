import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box"; // Import Box for centering

// Define the interface for the URL analytics data
interface UrlData {
  urlId: string;
  longUrl: string;
  totalAccesses: number;
  lastAccessed: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "longUrl", headerName: "Long URL", width: 950 },
  { field: "totalAccesses", headerName: "Total Accessed", width: 130 },
  { field: "lastAccessed", headerName: "Last Accessed Date", width: 280 },
];

export default function UrlAnalytics() {
  const [urlsData, setUrlsData] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get<UrlData[]>("/api/analytics");
        setUrlsData(response.data);
      } catch (error) {
        console.error("Error fetching Analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  const rows = urlsData;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensures it centers vertically in full viewport height
      }}
    >
      <Paper sx={{ width: "80%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[5, 10, 25, 50, 100]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

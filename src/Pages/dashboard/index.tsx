import { getCrawlHistoryRequest } from "@/api/dashboard";
import type { ICrawlJobResult } from "@/api/url-management/types";
import { getErrorMessage } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [crawlHistory, setCrawlHistory] = useState<ICrawlJobResult[]>([]);

  const columns = useMemo<GridColDef<ICrawlJobResult>[]>(
    () => [
      { field: "title", headerName: "Title", flex: 0.2 },
      { field: "html_version", headerName: "HTML Version", flex: 0.2 },
      {
        field: "internal_links",
        headerName: "Total Internal Links",
        flex: 0.2,
        renderCell: ({ row }) => row?.link_analysis?.internal_links,
      },
      {
        field: "external_links",
        headerName: "Total External Links",
        flex: 0.2,
        renderCell: ({ row }) => row?.link_analysis?.external_links,
      },
      {
        field: "inaccessible_links",
        headerName: "Total Inaccessible Links",
        flex: 0.2,
        renderCell: ({ row }) => row?.link_analysis?.inaccessible_links?.length,
      },
      {
        field: "actions",
        type: "actions",
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<Icon icon={"tabler:eye"} />}
            label="View Details"
            onClick={() => handleViewDetails(row)}
            showInMenu
          />,
        ],
      },
    ],
    []
  );

  const handleViewDetails = (data: ICrawlJobResult) => {
    console.log({ data });
    navigate("details", { state: data });
  };

  useEffect(() => {
    handleFetchHistory();
  }, []);

  const handleFetchHistory = async () => {
    try {
      setIsLoading(true);
      const result = await getCrawlHistoryRequest();
      if (result) setCrawlHistory(result?.history);
    } catch (error) {
      // @ts-expect-error ignore briefly
      const errorMessage = error?.response?.data?.error;
      toast.error(
        `Error getting result history. ${getErrorMessage(
          errorMessage || error
        )}`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      <Box>
        <Card>
          <CardContent>
            <DataGrid
              columns={columns}
              rows={crawlHistory}
              loading={isLoading}
              rowCount={crawlHistory?.length}
              pageSizeOptions={[5, 10]}
              showToolbar
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;

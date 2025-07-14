import {
  deleteAnalysisRequest,
  getCrawlHistoryRequest,
  rerunAnalysisRequest,
  stopAnalysisRequest,
} from "@/api/dashboard";
import type { ICrawlJobResult } from "@/api/url-management/types";
import { getErrorMessage } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [crawlHistory, setCrawlHistory] = useState<ICrawlJobResult[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
  const [selectedRowsData, setSelectedRowsData] = useState<ICrawlJobResult[]>(
    []
  );

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
          <GridActionsCellItem
            icon={
              <Tooltip title="Stop Processing">
                <Icon icon={"tabler:hand-stop"} />
              </Tooltip>
            }
            label="Stop Job"
            onClick={() => handleStopJob(row)}
          />,
        ],
      },
    ],
    []
  );

  const handleViewDetails = (data: ICrawlJobResult) => {
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

  const handleRerun = async () => {
    if (selectedRowsData.length === 0) {
      toast.info("Select at least 1 analysis to rerun");
      return;
    }
    const urls = selectedRowsData.map((item) => item.url);
    try {
      setIsLoading(true);
      const result = await rerunAnalysisRequest({ urls });
      if (result) toast.success(result?.message);
    } catch (error) {
      // @ts-expect-error ignore briefly
      const errorMessage = error?.response?.data?.error;
      toast.error(
        `Error rerunning analysis. ${getErrorMessage(errorMessage || error)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAnalysis = async () => {
    if (selectedRowsData.length === 0) {
      toast.info("Select at least 1 analysis to delete");
      return;
    }
    const urls = selectedRowsData.map((item) => item.url);
    try {
      setIsLoading(true);
      const result = await deleteAnalysisRequest({ urls });
      console.log({ result });
      if (result) {
        toast.success(result?.message);
        handleFetchHistory();
      }
    } catch (error) {
      // @ts-expect-error ignore briefly
      const errorMessage = error?.response?.data?.error;
      toast.error(
        `Error deleting analysis. ${getErrorMessage(errorMessage || error)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopJob = async (row: ICrawlJobResult) => {
    const payload = { job_id: row.job_id, action: "stop" };
    try {
      setIsLoading(true);
      const result = await stopAnalysisRequest(payload);
      // console.log({ result });
      if (result) {
        toast.success(result?.message);
        handleFetchHistory();
      }
    } catch (error) {
      // @ts-expect-error ignore briefly
      const errorMessage = error?.response?.data?.error;
      toast.error(
        `Error stopping analysis. ${getErrorMessage(errorMessage || error)}`
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
          <Box sx={{ m: 2 }}>
            <Stack direction={"row"} gap={2}>
              <Button
                variant="contained"
                startIcon={<Icon icon={"tabler:reload"} />}
                onClick={handleRerun}
              >
                Re-run Analysis
                {isLoading && <CircularProgress size={14} color="inherit" />}
              </Button>
              <Button
                variant="contained"
                startIcon={<Icon icon={"tabler:trash"} />}
                onClick={handleDeleteAnalysis}
              >
                Delete Analysis
                {isLoading && <CircularProgress size={14} color="inherit" />}
              </Button>
            </Stack>
          </Box>
          <CardContent>
            <DataGrid
              columns={columns}
              rows={crawlHistory}
              loading={isLoading}
              rowCount={crawlHistory?.length}
              pageSizeOptions={[5, 10]}
              showToolbar
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel, details) => {
                const ids = Array.from(newRowSelectionModel.ids);
                const rows = ids.map((item) => details.api.getRow(item));
                setSelectedRowsData(rows);
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
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

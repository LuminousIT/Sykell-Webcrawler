import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import type {
  ICrawlJobResult,
  TCrawlJobHistory,
} from "@/api/url-management/types";
import { formatDate, getErrorMessage } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CrawlResultDialog } from "./CrawlResultDialog";
import { stopAnalysisRequest } from "@/api/dashboard";
import { toast } from "react-toastify";

type Props = {
  history: TCrawlJobHistory[];
  loading: boolean;
  refetchJobHistory: () => void;
};
export const CrawlJobHistory = ({
  history,
  loading,
  refetchJobHistory,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [rowItem, setRowItem] = useState<ICrawlJobResult[] | null>(null);
  const columns = useMemo<GridColDef<TCrawlJobHistory>[]>(
    () => [
      { field: "id", headerName: "Job ID", flex: 0.2 },
      { field: "total_urls", headerName: "Total URLs", flex: 0.2 },
      { field: "progress", headerName: "Progress", flex: 0.2 },
      {
        field: "status",
        headerName: "Status",
        flex: 0.2,
        renderCell: ({ row }) => (
          <Chip
            label={row.status}
            color={row.status === "completed" ? "success" : "info"}
          />
        ),
      },

      {
        field: "created_at",
        headerName: "Date Created",
        flex: 0.2,
        renderCell: ({ row }) => formatDate(row.created_at),
      },
      {
        field: "started_at",
        headerName: "Date Started",
        flex: 0.2,
        renderCell: ({ row }) => formatDate(row.started_at),
      },
      {
        field: "completed_at",
        headerName: "Date Completed",
        flex: 0.2,
        renderCell: ({ row }) => formatDate(row.completed_at),
      },
      {
        field: "actions",
        type: "actions",
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<Icon icon={"tabler:eye"} />}
            label="View Results"
            onClick={() => handleShowResults(row?.results)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Stop Processing">
                <>
                  <Icon icon={"tabler:hand-stop"} />
                  {isLoading && <CircularProgress color="inherit" size={14} />}
                </>
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

  const handleStopJob = async (row: TCrawlJobHistory) => {
    const payload = { job_id: row.job_id, action: "stop" };
    try {
      setIsLoading(true);
      const result = await stopAnalysisRequest(payload);
      // console.log({ result });
      if (result) {
        toast.success(result?.message);
        refetchJobHistory();
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

  const handleShowResults = (row: ICrawlJobResult[]) => {
    if (row) setRowItem(row);
    setIsResultDialogOpen(!isResultDialogOpen);
  };

  const handleToggleDialog = () => {
    setIsResultDialogOpen(!isResultDialogOpen);
  };
  return (
    <Box>
      <Card>
        <CardHeader title="Crawl Job History" />
        <CardContent>
          <DataGrid
            columns={columns}
            rows={history}
            loading={loading}
            rowCount={history?.length}
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

      <CrawlResultDialog
        open={isResultDialogOpen}
        results={rowItem}
        handleToggleDialog={handleToggleDialog}
        refetchJobHistory={refetchJobHistory}
      />
    </Box>
  );
};

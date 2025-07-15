import { deleteAnalysisRequest, rerunAnalysisRequest } from "@/api/dashboard";
import type { ICrawlJobResult } from "@/api/url-management/types";
import { getErrorMessage } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  handleToggleDialog: () => void;
  results: ICrawlJobResult[] | null;
  refetchJobHistory: () => void;
};
export const CrawlResultDialog = ({
  open,
  handleToggleDialog,
  results = [],
  refetchJobHistory,
}: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
        ],
      },
    ],
    []
  );

  const handleViewDetails = (data: ICrawlJobResult) => {
    navigate("/dashboard/details", { state: data });
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
      await refetchJobHistory();
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
        await refetchJobHistory();
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

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleToggleDialog}
      aria-labelledby="crawl-result"
      aria-describedby="crawl-result"
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
        {results === null && (
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "tomato",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography variant="h5">
              {" "}
              No Results exist for this Crawl Job{" "}
            </Typography>
          </Box>
        )}
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
        <DataGrid
          columns={columns}
          rows={results as ICrawlJobResult[]}
          rowCount={results?.length}
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
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ m: 2 }}
          variant="contained"
          onClick={() => handleToggleDialog()}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

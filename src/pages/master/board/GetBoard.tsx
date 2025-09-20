import { useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { Edit, Trash2, Plus } from "lucide-react";
import Pagination from "../../../components/ui/Pagination";
import { useGetBoardsQuery, useDeleteBoardMutation, Board, BoardListResponse } from "../../../services/api/boardApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setBoards } from "../../../features/boardSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

function BoardPage() {
  const [boardName, setBoardName] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: apiResponse, isLoading, error, refetch } = useGetBoardsQuery({
    page: currentPage,
    limit: rowsPerPage,
    board_name: boardName || undefined,
    status: status === "" ? undefined : Number(status),
    from_date: fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
    to_date: toDate ? format(toDate, "yyyy-MM-dd") : undefined,
  });

  const [deleteBoard] = useDeleteBoardMutation();

  // Extract boards array from API response
  const getBoardsFromResponse = (response: BoardListResponse | undefined): Board[] => {
    if (!response) return [];

    if (Array.isArray(response)) {
      return response;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response.boards)) {
      return response.boards;
    } else if (Array.isArray(response.items)) {
      return response.items;
    } else if (Array.isArray(response.results)) {
      return response.results;
    }

    return [];
  };

  const boardsData = getBoardsFromResponse(apiResponse as BoardListResponse);

  useEffect(() => {
    if (boardsData.length > 0) {
      const normalizedBoards = boardsData.map((b) => ({
        id: b.id || (b as any).board_id, // Handle both id and board_id
        board_name: b.board_name,
        status: b.status,
        created_at: b.created_at,
      }));
      dispatch(setBoards(normalizedBoards));
    }
  }, [apiResponse, dispatch]);

  const boards = useSelector((state: RootState) => state.board.boards);

  // Get total count from response
  const totalCount = (apiResponse as BoardListResponse)?.total ||
    (apiResponse as BoardListResponse)?.totalCount ||
    boards.length;

  const isErrorWithData = (error: any): error is { data: { message: string } } => {
    return error && typeof error === 'object' && 'data' in error;
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure to delete this board?")) {
      try {
        const res = await deleteBoard(id).unwrap();
        if (res.status) {
          alert(res.message);
          refetch();
        } else {
          alert(res.message);
        }
      } catch (error: any) {
        console.error("Failed to delete board:", error);
        (error.data?.message || "Failed to delete board");
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [boardName, status, fromDate, toDate]);

  // Helper function to get board ID (handles both id and board_id)
  const getBoardId = (board: Board): number => {
    return board.id || (board as any).board_id;
  };

  return (
    <div>
      <PageMeta title="Board Dashboard" description="Manage boards with filters & actions" />
      <PageBreadcrumb pageTitle="Board" />

      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <h2 className="text-lg font-semibold text-gray-700">Board List</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" onClick={() => navigate('/form')}>
            <Plus size={18} /> Add Board
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Board Name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="border px-3 py-2 rounded w-full text-sm"
          />
          <select
            title="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded w-full text-sm"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          {/* From Date */}

          <div className="relative w-full">
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="From Date"
              className="border px-10 py-2 rounded w-full"
              calendarClassName="rounded-lg shadow-md"
              isClearable
            />
            <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>


          <div className="relative w-full">
            {/* To Date */}
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="To Date"
              className="border px-10 py-2 rounded w-full"
              calendarClassName="rounded-lg shadow-md"
              isClearable
            />
            <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>


        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Error loading boards: {isErrorWithData(error) ? error.data.message : "Unknown error"}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Board Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    Loading...
                  </td>
                </tr>
              ) : boardsData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    No boards found.
                  </td>
                </tr>
              ) : (
                boardsData
                  .filter((fltr) =>
                    boardName.trim() === ""
                      ? true
                      : fltr.board_name.toLowerCase().includes(boardName.toLowerCase())
                  ).map((board: Board, index: number) => (
                    <tr key={getBoardId(board)} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-6 py-4">{board.board_name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${board.status == 1
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {board.status == 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {board.created_at ? new Date(board.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <button
                          title="edit"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => navigate(`/board/edit/${getBoardId(board)}`)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          type="button"
                          title="trash"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(getBoardId(board))}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {boardsData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / rowsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default BoardPage;
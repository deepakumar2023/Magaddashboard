// import { useState, useEffect } from "react";
// import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
// import PageMeta from "../../../components/common/PageMeta";
// import { Edit, Trash2, Plus } from "lucide-react";
// import Pagination from "../../../components/ui/Pagination";
// import { useGetBoardsQuery, useDeleteBoardMutation, Board } from "../../../services/api/boardApi";
// import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../store/store";
// import { setBoards } from "../../../features/boardSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";

// // Interface for API response
// interface ApiResponse {
//   data?: Board[];
//   boards?: Board[];
//   items?: Board[];
//   results?: Board[];
//   total?: number;
//   totalCount?: number;
//   page?: number;
//   totalPages?: number;
// }

// function BoardPage() {
//   const [boardName, setBoardName] = useState("");
//   const [status, setStatus] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   // Use the query hook with proper parameters
//   const { data: apiResponse, isLoading, error, refetch } = useGetBoardsQuery({
//     page: currentPage,
//     limit: rowsPerPage,
//     board_name: boardName || undefined,
//     status: status === "" ? undefined : Number(status),
//     from_date: fromDate || undefined,
//     to_date: toDate || undefined,
//   });


//   const [deleteBoard] = useDeleteBoardMutation();

//   // Extract boards array from API response
//   const getBoardsFromResponse = (response: ApiResponse | undefined): Board[] => {
//     if (!response) return [];

//     // Check various possible properties where boards might be stored
//     if (Array.isArray(response)) {
//       return response; // If the API directly returns an array
//     } else if (Array.isArray(response.data)) {
//       return response.data;
//     } else if (Array.isArray(response.boards)) {
//       return response.boards;
//     } else if (Array.isArray(response.items)) {
//       return response.items;
//     } else if (Array.isArray(response.results)) {
//       return response.results;
//     }

//     return [];
//   };

//   // Extract boards array
//   const boardsData = getBoardsFromResponse(apiResponse as ApiResponse);

//   useEffect(() => {
//     if (boardsData.length > 0) {
//       const normalizedBoards = boardsData.map((b) => ({
//         id: b.board_id ?? b.id,  // ensure we always have `id`
//         board_name: b.board_name,
//         status: b.status,
//         created_at: b.created_at,
//       }));
//       dispatch(setBoards(normalizedBoards));
//     }
//   }, [apiResponse, dispatch]);

//   // Now safely use Redux data anywhere
//   const boards = useSelector((state: RootState) => state.board.boards);
//   console.log("Redux saved state:", boards);




//   // Get total count from response or use boards length
//   const totalCount = (apiResponse as ApiResponse)?.total ||
//     (apiResponse as ApiResponse)?.totalCount ||
//     boards.length;


//   // Type guard to check if error has data property
//   const isErrorWithData = (error: any): error is { data: { message: string } } => {
//     return error && typeof error === 'object' && 'data' in error;
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm("Are you sure to delete this board?")) {
//       try {
//         await deleteBoard(id).unwrap();
//         refetch();
//         alert("Board deleted successfully!");
//       } catch (error) {
//         console.error("Failed to delete board:", error);
//         alert("Failed to delete board. Please try again.");
//       }
//     }
//   };

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [boardName, status, fromDate, toDate]);

//   // Debug: Check what data is being returned
//   useEffect(() => {
//     console.log("API Response:", apiResponse);
//     console.log("Extracted boards:", boards);
//     console.log("Loading:", isLoading);
//     console.log("Error:", error);
//   }, [apiResponse, boards, isLoading, error]);

//   return (
//     <div>
//       <PageMeta title="Board Dashboard" description="Manage boards with filters & actions" />
//       <PageBreadcrumb pageTitle="Board" />

//       <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
//           <h2 className="text-lg font-semibold text-gray-700">Board List</h2>
//           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" onClick={() => navigate('/form')}>
//             <Plus size={18} /> Add Board
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Board Name"
//             value={boardName}
//             onChange={(e) => setBoardName(e.target.value)}
//             className="border px-3 py-2 rounded w-full text-sm"
//           />
//           <select
//             title="status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="border px-3 py-2 rounded w-full text-sm"
//           >
//             <option value="">All Status</option>
//             <option value="1">Active</option>
//             <option value="0">Inactive</option>
//           </select>
//           {/* From Date */}
//           <DatePicker
//             selected={fromDate ? new Date(fromDate) : null}
//             onChange={(date) => setFromDate(date ? format(date, "yyyy-MM-dd") : "")}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="From Date"
//             className="border px-3 py-2 rounded w-full text-sm"
//             calendarClassName="rounded-lg shadow-md"
//             isClearable
//           />

//           {/* To Date */}
//           <DatePicker
//             selected={toDate ? new Date(toDate) : null}
//             onChange={(date) => setToDate(date ? format(date, "yyyy-MM-dd") : "")}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="To Date"
//             className="border px-3 py-2 rounded w-full text-sm"
//             calendarClassName="rounded-lg shadow-md"
//             isClearable
//           />
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             Error loading boards: {isErrorWithData(error) ? error.data.message : "Unknown error"}
//           </div>
//         )}



//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left text-gray-600">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
//               <tr>
//                 <th className="px-6 py-3">S.No</th>
//                 <th className="px-6 py-3">Board Name</th>
//                 <th className="px-6 py-3">Status</th>
//                 <th className="px-6 py-3">Created At</th>
//                 <th className="px-6 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center text-gray-500 py-4">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : boards.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="text-center text-gray-500 py-4">
//                     No boards found.
//                   </td>
//                 </tr>
//               ) : (
//                 boardsData
//                   .filter((fltr) =>
//                     boardName.trim() === ""
//                       ? true
//                       : fltr.board_name.toLowerCase().includes(boardName.toLowerCase())
//                   ).map((board: Board, index: number) => (
//                     <tr key={board.board_id} className="border-b hover:bg-gray-50">
//                       <td className="px-6 py-4">{(currentPage - 1) * rowsPerPage + index + 1}</td>
//                       <td className="px-6 py-4">{board.board_name}</td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-2 py-1 rounded text-xs ${board.status === 1
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                             }`}
//                         >
//                           {board.status === 1 ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         {new Date(board.created_at).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 flex justify-center gap-3">
//                         <button
//                           title="edit"
//                           className="text-blue-600 hover:text-blue-800"
//                           onClick={() => navigate(`/board/edit/${board.board_id}`)}
//                         >
//                           <Edit size={18} />
//                         </button>
//                         <button
//                           type="button"
//                           title="trash"
//                           className="text-red-600 hover:text-red-800"
//                           onClick={() => handleDelete(board.board_id)}
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination - Only show if we have data */}
//         {boards.length > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={Math.ceil(totalCount / rowsPerPage)}
//             onPageChange={(page) => setCurrentPage(page)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(rows) => {
//               setRowsPerPage(rows);
//               setCurrentPage(1);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default BoardPage;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Pagination from "../../../components/ui/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  useGetBoardsQuery,
  useDeleteBoardMutation,
} from "../../../services/api/boardApi";
import { setBoards } from "../../../features/boardSlice";

import { FaRegCalendarAlt } from "react-icons/fa";


export default function BoardPage() {
  const [boardName, setBoardName] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: boardsData, isLoading, refetch } = useGetBoardsQuery({
    page: currentPage,
    limit: rowsPerPage,
    board_name: boardName || undefined,
    status: status === "" ? undefined : Number(status),
    from_date: fromDate || undefined,
    to_date: toDate || undefined,
  });

  const [deleteBoard] = useDeleteBoardMutation();

  // Save API data to Redux
  useEffect(() => {
    if (boardsData) dispatch(setBoards(boardsData));
  }, [boardsData, dispatch]);

  const boards = useSelector((state: RootState) => state.board.boards);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure to delete this board?")) {
      try {
        await deleteBoard(id).unwrap();
        refetch();
        alert("Board deleted successfully!");
      } catch {
        alert("Failed to delete board.");
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [boardName, status, fromDate, toDate]);

  const totalCount = boardsData?.length || boards.length;

  return (
    <div>
      <PageMeta title="Board Dashboard" description="Manage boards" />
      <PageBreadcrumb pageTitle="Board" />

      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-lg font-semibold text-gray-700">Board List</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => navigate("/form")}
          >
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
            className="border px-3 py-2 rounded w-full"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>

          {/* <DatePicker
            selected={fromDate ? new Date(fromDate) : null}
            onChange={(date) => setFromDate(date ? format(date, "yyyy-MM-dd") : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="From Date"
            className="border px-3 py-2 rounded w-full"
            isClearable
          /> */}

          <div className="relative w-full">
            <DatePicker
              selected={fromDate ? new Date(fromDate) : null}
              onChange={(date) => setFromDate(date ? format(date, "yyyy-MM-dd") : "")}
              dateFormat="yyyy-MM-dd"
              placeholderText="From Date"
              className="border px-10 py-2 rounded w-full"
              isClearable
            />
            <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div >

          {/* To Date */}
          <div className="relative w-full">
            <DatePicker
              selected={toDate ? new Date(toDate) : null}
              onChange={(date) => setToDate(date ? format(date, "yyyy-MM-dd") : "")}
              dateFormat="yyyy-MM-dd"
              placeholderText="To Date"
              className="border px-10 py-2 rounded w-full"
              isClearable
            />
            <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
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
                  <td colSpan={5} className="text-center py-4">Loading...</td>
                </tr>
              ) : boards.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">No boards found.</td>
                </tr>
              ) : (
                boards.map((board, idx) => (
                  <tr key={board.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                    <td className="px-6 py-4">{board.board_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${board.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {board.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{board.created_at && new Date(board.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <button onClick={() => navigate(`/board/edit/${board.id}`)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(board.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {boards.length > 0 && (
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

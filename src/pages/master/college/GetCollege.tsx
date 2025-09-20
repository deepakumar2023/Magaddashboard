import { useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { Trash2, Plus } from "lucide-react";
import Pagination from "../../../components/ui/Pagination";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  College,
  useDeleteCollegeMutation,
  useGetCollegesQuery,
} from "../../../services/api/collegeApi";

// Interface for API response
interface ApiResponse {
  data?: College[];
  colleges?: College[];
  items?: College[];
  results?: College[];
  total?: number;
  totalCount?: number;
  page?: number;
  totalPages?: number;
}

function CollegePage() {
  const [collegeName, setCollegeName] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // ✅ Use college query
  const { data: apiResponse, isLoading, error, refetch } = useGetCollegesQuery({
    page: currentPage,
    limit: rowsPerPage,
    college_name: collegeName || undefined,
    status: status === "" ? undefined : Number(status),
    from_date: fromDate || undefined,
    to_date: toDate || undefined,
  });

  const [deleteCollege] = useDeleteCollegeMutation();

  // Extract colleges array from API response
  const getCollegesFromResponse = (response: ApiResponse | undefined): College[] => {
    if (!response) return [];

    if (Array.isArray(response)) {
      return response;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response.colleges)) {
      return response.colleges;
    } else if (Array.isArray(response.items)) {
      return response.items;
    } else if (Array.isArray(response.results)) {
      return response.results;
    }

    return [];
  };

  const colleges = getCollegesFromResponse(apiResponse as ApiResponse);

  const totalCount =
    (apiResponse as ApiResponse)?.total ||
    (apiResponse as ApiResponse)?.totalCount ||
    colleges.length;

  const isErrorWithData = (error: any): error is { data: { message: string } } => {
    return error && typeof error === "object" && "data" in error;
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure to delete this college?")) {
      try {
        await deleteCollege(id).unwrap();
        refetch();
        alert("College deleted successfully!");
      } catch (error) {
        console.error("Failed to delete college:", error);
        alert("Failed to delete college. Please try again.");
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [collegeName, status, fromDate, toDate]);

  useEffect(() => {
    console.log("API Response:", apiResponse);
    console.log("Extracted colleges:", colleges);
    console.log("Loading:", isLoading);
    console.log("Error:", error);
  }, [apiResponse, colleges, isLoading, error]);

  return (
    <div>
      <PageMeta title="College Dashboard" description="Manage colleges with filters & actions" />
      <PageBreadcrumb pageTitle="College" />

      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <h2 className="text-lg font-semibold text-gray-700">College List</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/add-college-form")}
          >
            <Plus size={18} /> Add College
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="College Name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
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
          <DatePicker
            selected={fromDate ? new Date(fromDate) : null}
            onChange={(date) => setFromDate(date ? format(date, "yyyy-MM-dd") : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="From Date"
            className="border px-3 py-2 rounded w-full text-sm"
            calendarClassName="rounded-lg shadow-md"
            isClearable
          />

          {/* To Date */}
          <DatePicker
            selected={toDate ? new Date(toDate) : null}
            onChange={(date) => setToDate(date ? format(date, "yyyy-MM-dd") : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="To Date"
            className="border px-3 py-2 rounded w-full text-sm"
            calendarClassName="rounded-lg shadow-md"
            isClearable
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Error loading colleges:{" "}
            {isErrorWithData(error) ? error.data.message : "Unknown error"}
          </div>
        )}

        

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">College Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Degree</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
                    Loading...
                  </td>
                </tr>
              ) : colleges.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
                    No colleges found.
                  </td>
                </tr>
              ) : (
                colleges
                  .filter((fltr) =>
                    collegeName.trim() === ""
                      ? true
                      : fltr.college_name
                          .toLowerCase()
                          .includes(collegeName.toLowerCase())
                  )
                  .map((college: College, index: number) => (
                    <tr key={college.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={()=> navigate(`/college/${college.id}`)}  >
                      <td className="px-6 py-4">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4">{college.college_name}</td>
                      <td className="px-6 py-4">{college.college_type}</td>
                      <td className="px-6 py-4">{college.degree_type}</td>
                      <td className="px-6 py-4">{college.college_address}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            college.status === 1
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {college.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {college.created_at
                          ? new Date(college.created_at).toLocaleDateString()
                          : "--"}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <button
                          type="button"
                          title="trash"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(college.id)}
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
        {colleges.length > 0 && (
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

export default CollegePage;

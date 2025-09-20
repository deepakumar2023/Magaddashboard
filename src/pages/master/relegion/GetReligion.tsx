import { useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { Edit, Trash2, Plus } from "lucide-react";
import Pagination from "../../../components/ui/Pagination";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import { FaRegCalendarAlt } from "react-icons/fa";
import { Religion, useDeleteReligionMutation, useGetReligionQuery } from "../../../services/api/religion";

// Interface for API response
interface ApiResponse {
  data?: Religion[];
  religions?: Religion[];
  items?: Religion[];
  results?: Religion[];
  total?: number;
  totalCount?: number;
  page?: number;
  totalPages?: number;
}

function ReligionPage() {
  const [religionName, setReligionName] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // ✅ Use religion query hook
  const { data: apiResponse, isLoading, error, refetch } = useGetReligionQuery({
    page: currentPage,
    limit: rowsPerPage,
    religion_name: religionName || undefined,
    status: status === "" ? undefined : Number(status),
    from_date: fromDate || undefined,
    to_date: toDate || undefined,
  });

  const [deleteReligion] = useDeleteReligionMutation();

  // Extract Religions array from API response
  const getReligionsFromResponse = (response: ApiResponse | undefined): Religion[] => {
    if (!response) return [];

    if (Array.isArray(response)) {
      return response;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response.religions)) {
      return response.religions;
    } else if (Array.isArray(response.items)) {
      return response.items;
    } else if (Array.isArray(response.results)) {
      return response.results;
    }

    return [];
  };

  const religions = getReligionsFromResponse(apiResponse as ApiResponse);

  const totalCount =
    (apiResponse as ApiResponse)?.total ||
    (apiResponse as ApiResponse)?.totalCount ||
    religions.length;

  const isErrorWithData = (error: any): error is { data: { message: string } } => {
    return error && typeof error === "object" && "data" in error;
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure to delete this religion?")) {
      try {
        await deleteReligion(id).unwrap();
        refetch();
        alert("Religion deleted successfully!");
      } catch (error) {
        console.error("Failed to delete religion:", error);
        alert("Failed to delete religion. Please try again.");
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [religionName, status, fromDate, toDate]);

  useEffect(() => {
    console.log("API Response:", apiResponse);
    console.log("Extracted religions:", religions);
    console.log("Loading:", isLoading);
    console.log("Error:", error);
  }, [apiResponse, religions, isLoading, error]);

  return (
    <div>
      <PageMeta title="Religion Dashboard" description="Manage religions with filters & actions" />
      <PageBreadcrumb pageTitle="Religion" />

      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <h2 className="text-lg font-semibold text-gray-700">Religion List</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/add-religion-form")}
          >
            <Plus size={18} /> Add Religion
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Religion Name"
            value={religionName}
            onChange={(e) => setReligionName(e.target.value)}
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
              selected={fromDate ? new Date(fromDate) : null}
              onChange={(date) => setFromDate(date ? format(date, "yyyy-MM-dd") : "")}
              dateFormat="yyyy-MM-dd"
              placeholderText="From Date"
              className="border px-10 py-2 rounded w-full"
              calendarClassName="rounded-lg shadow-md"
              isClearable
            />
            <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* To Date */}
          <div className="relative w-full">
            <DatePicker
              selected={toDate ? new Date(toDate) : null}
              onChange={(date) => setToDate(date ? format(date, "yyyy-MM-dd") : "")}
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
            Error loading religions: {isErrorWithData(error) ? error.data.message : "Unknown error"}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Religion Name</th>
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
              ) : religions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    No religions found.
                  </td>
                </tr>
              ) : (
                religions
                  .filter((fltr) =>
                    religionName.trim() === ""
                      ? true
                      : fltr.religion_name.toLowerCase().includes(religionName.toLowerCase())
                  )
                  .map((religion: any, index: any) => (
                    <tr key={religion.religion_id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-6 py-4">{religion.religion_name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            religion.status === 1
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {religion.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {religion?.created_at
                          ? new Date(religion.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <button
                          title="edit"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => navigate(`/religion/edit/${religion.religion_id}`)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          type="button"
                          title="trash"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(religion?.religion_id)}
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
        {religions.length > 0 && (
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

export default ReligionPage;

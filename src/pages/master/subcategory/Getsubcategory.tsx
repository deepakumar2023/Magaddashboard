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
import { FaRegCalendarAlt } from "react-icons/fa";

import {
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
} from "../../../services/api/subcategoryApi";
import { setSubCategories } from "../../../features/subCategorySlice";

export default function SubCategoryPage() {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: subCategoriesData, isLoading, refetch } = useGetSubCategoriesQuery({
    page: currentPage,
    limit: rowsPerPage,
    sub_category_name: subCategoryName || undefined,
    status: status === "" ? undefined : Number(status),
    from_date: fromDate || undefined,
    to_date: toDate || undefined,
  });

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  // Save API data to Redux
  useEffect(() => {
    if (subCategoriesData) dispatch(setSubCategories(subCategoriesData));
  }, [subCategoriesData, dispatch]);

  const subCategories = useSelector((state: RootState) => state.subCategory.subCategories);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure to delete this subcategory?")) {
      try {
        await deleteSubCategory(id).unwrap();
        refetch();
        alert("SubCategory deleted successfully!");
      } catch {
        alert("Failed to delete subcategory.");
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [subCategoryName, status, fromDate, toDate]);

  const totalCount = subCategoriesData?.length || subCategories.length;

  return (
    <div>
      <PageMeta title="SubCategory Dashboard" description="Manage subcategories" />
      <PageBreadcrumb pageTitle="SubCategory" />

      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-lg font-semibold text-gray-700">SubCategory List</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => navigate("/sub-category/form")}
          >
            <Plus size={18} /> Add SubCategory
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="SubCategory Name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
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
          </div>

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
                <th className="px-6 py-3">SubCategory Name</th>
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
              ) : subCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">No subcategories found.</td>
                </tr>
              ) : (
                subCategories.map((sub, idx) => (
                  <tr key={sub.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                    <td className="px-6 py-4">{sub.sub_category_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${sub.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {sub.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{sub.created_at && new Date(sub.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <button onClick={() => navigate(`/sub-category/edit/${sub.id}`)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(sub.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {subCategories.length > 0 && (
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

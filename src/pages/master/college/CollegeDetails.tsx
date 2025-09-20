import { useParams } from "react-router-dom";
import { useGetCollegeByIdQuery } from "../../../services/api/collegeApi";

export default function CollegeDetailCard() {
  const { id } = useParams(); // get college ID from route
  const { data: college, isLoading, error } = useGetCollegeByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-lg">
        Failed to load college details.
      </div>
    );
  }

  if (!college) {
    return (
      <div className="p-6 bg-yellow-50 text-yellow-700 rounded-lg">
        College not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {college.college_name}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              college.status === 1
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {college.status === 1 ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">College Type</p>
            <p className="text-gray-800 font-medium">{college.college_type}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Degree Type</p>
            <p className="text-gray-800 font-medium">{college.degree_type}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">District ID</p>
            <p className="text-gray-800 font-medium">{college.district_id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">State ID</p>
            <p className="text-gray-800 font-medium">{college.state_id}</p>
          </div>
          {college.college_code && (
            <div>
              <p className="text-gray-500 text-sm">College Code</p>
              <p className="text-gray-800 font-medium">{college.college_code}</p>
            </div>
          )}
          {college.pin && (
            <div>
              <p className="text-gray-500 text-sm">PIN Code</p>
              <p className="text-gray-800 font-medium">{college.pin}</p>
            </div>
          )}
        </div>

        {/* Address */}
        {college.college_address && (
          <div className="mt-6">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="text-gray-800 font-medium">{college.college_address}</p>
          </div>
        )}

        {/* Principal */}
        {college.principal_name && (
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Principal</p>
            <p className="text-gray-800 font-medium">{college.principal_name}</p>
          </div>
        )}

        {/* Created At */}
        {college.created_at && (
          <div className="mt-4 text-gray-500 text-sm">
            Created on:{" "}
            {new Date(college.created_at).toLocaleDateString("en-IN")}
          </div>
        )}
      </div>
    </div>
  );
}

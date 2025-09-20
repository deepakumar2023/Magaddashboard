import { useState, FormEvent } from "react";

import { useNavigate } from "react-router";
import { useCreateCollegeMutation } from "../../../services/api/collegeApi"; // ✅ renamed

export default function CollegeAddForm() {
    const [collegeName, setCollegeName] = useState<string>("");
    const [collegeType, setCollegeType] = useState<string>("");
    const [districtId, setDistrictId] = useState<number>();
    const [stateId, setStateId] = useState<number>();
    const [collegeAddress, setCollegeAddress] = useState<string>("");
    const [degree, setDegree] = useState<string>("");
    const [status, setStatus] = useState<number>(1);
    

    const navigate = useNavigate();
    const [createCollege, { isLoading }] = useCreateCollegeMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("college_name", collegeName.trim());
        formData.append("college_type", collegeType);
        formData.append("district_id", String(districtId));
        formData.append("state_id", String(stateId));
        formData.append("college_address", String(collegeAddress));
        formData.append("degree_type", String(degree));
        formData.append("status", String(status));

        try {
            const res = await createCollege(formData).unwrap();

            if (res.status) {
                
                // reset
                setCollegeName("");
                setCollegeType("");
                setDistrictId(0);
                setStateId(0);
                setCollegeAddress("");
                setDegree("");
                setStatus(1);
                navigate("/college");
            } else {
              
            }
        } catch (err) {
            console.error("❌ Error creating college:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                {/* College Name */}
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">
                        College Add Form
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="college-name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                College Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="college-name"
                                    type="text"
                                    value={collegeName}
                                    onChange={(e) => setCollegeName(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                    text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                    placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                    focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>

                        {/* College Type */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="college-type"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                College Type
                            </label>
                            <div className="mt-2">
                                <input
                                    id="college-type"
                                    type="text"
                                    value={collegeType}
                                    onChange={(e) => setCollegeType(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                    text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                    placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                    focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>

                        {/* District ID */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="district-id"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                District ID
                            </label>
                            <div className="mt-2">
                                <input
                                    id="district-id"
                                    type="number"
                                    value={districtId}
                                    onChange={(e) => setDistrictId(Number(e.target.value))}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                    text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                    placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                    focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>

                        {/* State ID */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="state-id"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                State ID
                            </label>
                            <div className="mt-2">
                                <input
                                    id="state-id"
                                    type="number"
                                    value={stateId}
                                    onChange={(e) => setStateId(Number(e.target.value))}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                    text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                    placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                    focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* College Address */}
                <div className="sm:col-span-6">
                    <label
                        htmlFor="college-address"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        College Address
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="college-address"
                            value={collegeAddress}
                            onChange={(e) => setCollegeAddress(e.target.value)}
                            rows={3}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
        text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
        placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
        focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="Enter full address"
                            required
                        />
                    </div>
                </div>

                {/* Degree Type */}
                <div className="sm:col-span-3">
                    <label
                        htmlFor="degree-type"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Degree Type
                    </label>
                    <div className="mt-2">
                        <select
                            id="degree-type"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
        text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
        placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
        focus:outline-indigo-600 sm:text-sm/6"
                            required
                        >
                            <option value="">Select Degree</option>
                            <option value="UG">Undergraduate</option>
                            <option value="PG">Postgraduate</option>
                            <option value="Diploma">Diploma</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                </div>


                {/* Status */}
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm/6 font-semibold text-gray-900">
                                Status
                            </legend>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="inactive"
                                        name="status"
                                        type="radio"
                                        checked={status === 0}
                                        onChange={() => setStatus(0)}
                                    />
                                    <label
                                        htmlFor="inactive"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Inactive
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="active"
                                        name="status"
                                        type="radio"
                                        checked={status === 1}
                                        onChange={() => setStatus(1)}
                                    />
                                    <label
                                        htmlFor="active"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Active
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs 
            hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}

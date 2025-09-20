import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useCreateCategoryMutation } from "../../../services/api/categoryApi";


export default function CategoryAddform() {
    const [categoryName, setCategoryName] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const navigate = useNavigate();

    const [createCategory, { isLoading }] = useCreateCategoryMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        // ✅ Always append
        formData.append("category_name", categoryName.trim());
        formData.append("status", String(status));

        try {
            const res = await createCategory(formData).unwrap();

            if (res.status) {
                toast.success(res.message);
                setCategoryName("");
                setStatus(0);
                navigate("/category");
            } else {
                console.log("❌ " + res.message, res.errors);
            }
        } catch (err) {
            console.error("❌ Error creating category:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                {/* Board Name */}
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Category Add Form</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="board-name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Category Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="category-name"
                                    name="category-name"
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
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
                                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white 
                               before:absolute before:inset-1 before:rounded-full before:bg-white 
                               not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                               disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 
                               forced-colors:appearance-auto forced-colors:before:hidden"
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
                                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white 
                               before:absolute before:inset-1 before:rounded-full before:bg-white 
                               not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                               disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 
                               forced-colors:appearance-auto forced-colors:before:hidden"
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

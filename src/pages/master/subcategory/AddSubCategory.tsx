// pages/master/subcategory/AddSubCategory.tsx
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useCreateSubCategoryMutation } from "../../../services/api/subcategoryApi";

export default function SubCategoryAddForm() {
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [status, setStatus] = useState<number>(1);
  const navigate = useNavigate();

  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { sub_category_name: subCategoryName.trim(), status };

    try {
      const res = await createSubCategory(payload).unwrap();

      if (res.status) {
        toast.success(res.message);
        setSubCategoryName("");
        setStatus(1);
        navigate("/sub-category");
      } else {
        toast.error(res.message || "Failed to create subcategory");
        console.error(res.errors);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "API Error");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="sub-category-name">SubCategory Name</label>
        <input
          id="sub-category-name"
          type="text"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <fieldset>
        <legend>Status</legend>
        <div className="flex gap-4 mt-2">
          <label>
            <input type="radio" checked={status === 1} onChange={() => setStatus(1)} /> Active
          </label>
          <label>
            <input type="radio" checked={status === 0} onChange={() => setStatus(0)} /> Inactive
          </label>
        </div>
      </fieldset>

      <div className="flex gap-4 mt-4">
        <button type="button" onClick={() => navigate("/sub-category")}>
          Cancel
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

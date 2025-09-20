// import { useState, FormEvent } from "react";
// import { useCreateBoardMutation } from "../../services/api/boardApi"; // adjust path
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { addBoard } from "../../features/boardSlice";
// import { useNavigate } from "react-router";


// export default function Boardform() {
//     const [boardName, setBoardName] = useState<string>("");
//     const [status, setStatus] = useState<number>(0); // 0 = inactive, 1 = active
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();

//     const [createBoard, { isLoading }] =
//         useCreateBoardMutation();

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         try {
//             const res = await createBoard({
//                 board_name: boardName,
//                 status: status,
//             }).unwrap();

//             console.log(res, "Response");

//             if (res.status) {
//                 toast.success(res.message);

//                 dispatch(
//                     addBoard({
//                         id: res.data.board_id, // map board_id → id
//                         board_name: res.data.board_name,
//                         status: Number(res.data.status),
//                         created_at: res.data.created_at,
//                     })
//                 );


//                 // reset form
//                 setBoardName("");
//                 setStatus(0);
//                 navigate('/board');
//             } else {
//                 console.log("❌ " + res.message + "\n" + (res.error ?? ""));
//             }
//         } catch (err) {
//             console.error("❌ Error creating board:", err);
//         }
//     };



//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="space-y-12">
//                 {/* Board Name */}
//                 <div className="border-b border-gray-900/10 pb-12">
//                     <h2 className="text-base/7 font-semibold text-gray-900">Form</h2>
//                     <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                         <div className="sm:col-span-3">
//                             <label
//                                 htmlFor="board-name"
//                                 className="block text-sm/6 font-medium text-gray-900"
//                             >
//                                 Board Name
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="board-name"
//                                     name="board-name"
//                                     type="text"
//                                     value={boardName}
//                                     onChange={(e) => setBoardName(e.target.value)}
//                                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
//                              text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
//                              placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
//                              focus:outline-indigo-600 sm:text-sm/6"
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Status */}
//                 <div className="border-b border-gray-900/10 pb-12">
//                     <div className="mt-10 space-y-10">
//                         <fieldset>
//                             <legend className="text-sm/6 font-semibold text-gray-900">
//                                 Status
//                             </legend>
//                             <div className="mt-6 space-y-6">
//                                 <div className="flex items-center gap-x-3">
//                                     <input
//                                         id="inactive"
//                                         name="status"
//                                         type="radio"
//                                         checked={status === 0}
//                                         onChange={() => setStatus(0)}
//                                         className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white 
//                                before:absolute before:inset-1 before:rounded-full before:bg-white 
//                                not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 
//                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
//                                disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 
//                                forced-colors:appearance-auto forced-colors:before:hidden"
//                                     />
//                                     <label
//                                         htmlFor="inactive"
//                                         className="block text-sm/6 font-medium text-gray-900"
//                                     >
//                                         Inactive
//                                     </label>
//                                 </div>
//                                 <div className="flex items-center gap-x-3">
//                                     <input
//                                         id="active"
//                                         name="status"
//                                         type="radio"
//                                         checked={status === 1}
//                                         onChange={() => setStatus(1)}
//                                         className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white 
//                                before:absolute before:inset-1 before:rounded-full before:bg-white 
//                                not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 
//                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
//                                disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 
//                                forced-colors:appearance-auto forced-colors:before:hidden"
//                                     />
//                                     <label
//                                         htmlFor="active"
//                                         className="block text-sm/6 font-medium text-gray-900"
//                                     >
//                                         Active
//                                     </label>
//                                 </div>
//                             </div>
//                         </fieldset>
//                     </div>
//                 </div>
//             </div>

//             {/* Buttons */}
//             <div className="mt-6 flex items-center justify-end gap-x-6">
//                 <button type="button" className="text-sm/6 font-semibold text-gray-900">
//                     Cancel
//                 </button>
//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs 
//                      hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 
//                      focus-visible:outline-indigo-600 disabled:opacity-50"
//                 >
//                     {isLoading ? "Saving..." : "Save"}
//                 </button>
//             </div>
//         </form>
//     );
// }



import { useState, FormEvent } from "react";
import { useCreateBoardMutation } from "../../services/api/boardApi"; // adjust path
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addBoard } from "../../features/boardSlice";
import { useNavigate } from "react-router";

export default function Boardform() {
  const [boardName, setBoardName] = useState<string>("");
  const [status, setStatus] = useState<number>(0); // 0 = inactive, 1 = active
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [createBoard, { isLoading }] = useCreateBoardMutation();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       // Use await directly without assigning to res to avoid TS warning
//       const result = await createBoard({
//         board_name: boardName, // ✅ must be snake_case
//         status: status,
//       }).unwrap();

//       if (result.status) {
//         toast.success(result.message);

//         dispatch(
//           addBoard({
//             id: result.data.board_id, // map board_id → id
//             board_name: result.data.board_name, // ✅ use snake_case
//             status: Number(result.data.status),
//             created_at: result.data.created_at,
//           })
//         );

//         setBoardName("");
//         setStatus(0);
//         navigate("/board");
//       } else {
//         toast.error(result.message);
//       }
//     } catch (err) {
//       console.error("❌ Error creating board:", err);
//       toast.error("Something went wrong!");
//     }
//   };




const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const result = await createBoard({
      board_name: boardName,
      status,
    }).unwrap() as any // ✅ assert the correct type

    if (result.status) {
      toast.success(result.message);

      dispatch(
        addBoard({
          id: result.data.board_id,      // map correctly
          board_name: result.data.board_name,
          status: Number(result.data.status),
          created_at: result.data.created_at,
        })
      );

      setBoardName("");
      setStatus(0);
      navigate("/board");
    } else {
      toast.error(result.message);
    }
  } catch (err) {
    console.error("❌ Error creating board:", err);
    toast.error("Something went wrong!");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        {/* Board Name */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Form</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="board-name" className="block text-sm/6 font-medium text-gray-900">
                Board Name
              </label>
              <div className="mt-2">
                <input
                  id="board-name"
                  name="board-name"
                  type="text"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="border-b border-gray-900/10 pb-12">
          <fieldset>
            <legend className="text-sm/6 font-semibold text-gray-900">Status</legend>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="inactive"
                  name="status"
                  type="radio"
                  checked={status === 0}
                  onChange={() => setStatus(0)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label htmlFor="inactive" className="block text-sm/6 font-medium text-gray-900">
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
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label htmlFor="active" className="block text-sm/6 font-medium text-gray-900">
                  Active
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
          onClick={() => navigate("/board")}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

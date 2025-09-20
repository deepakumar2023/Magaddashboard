// import { useState, FormEvent } from "react";
// import { Link, useNavigate } from "react-router";
// import { useDispatch } from "react-redux";

// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
// import Button from "../ui/button/Button";
// // import { useLoginMutation } from "../../services/api"; // ✅ RTK Query login API
// import { setCredentials } from "../../features/authSlice"; // ✅ Redux slice
// import { AppDispatch } from "../../store/store";
// import { useLoginMutation } from "../../services/api/authApi";

// export default function SignInForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   const [username, setusername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       // ✅ backend API call
//       const userData = await login({ username, password }).unwrap();

//       // ✅ token + user ko Redux me save
//       dispatch(setCredentials(userData));

//       // ✅ redirect dashboard
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Login failed: ", err);
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex flex-col flex-1">
//       <div className="w-full max-w-md pt-10 mx-auto">
//         <Link
//           to="/"
//           className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <ChevronLeftIcon className="size-5" />
//           Back to dashboard
//         </Link>
//       </div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               Sign In
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Enter your username and password to sign in!
//             </p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="space-y-6">
//               {/* username */}
//               <div>
//                 <Label>
//                   username <span className="text-error-500">*</span>
//                 </Label>
//                 <Input
//                   type="username"
//                   placeholder="Enter Name"
//                   value={username}
//                   onChange={(e) => setusername(e.target.value)}

//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <Label>
//                   Password <span className="text-error-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}

//                   />
//                   <span
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                   >
//                     {showPassword ? (
//                       <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                     ) : (
//                       <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <Checkbox checked={isChecked} onChange={setIsChecked} />
//                   <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
//                     Keep me logged in
//                   </span>
//                 </div>
//                 <Link
//                   to="/reset-password"
//                   className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Submit */}
//               <div>
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   size="sm"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Signing in..." : "Sign in"}
//                 </Button>
//               </div>
//             </div>
//           </form>

//           {/* Footer */}
//           <div className="mt-5">
//             <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
//               >
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { setCredentials } from "../../features/authSlice";
import { AppDispatch } from "../../store/store";
import { useLoginMutation } from "../../services/api/authApi";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});

    try {
      // Create FormData object instead of JSON
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const userData = await login(formData).unwrap();
      console.log(userData,"userData")
      localStorage.setItem("token", userData.token);
      dispatch(setCredentials(userData));
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500">
              Enter your username and password to sign in!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Username */}
              <div>
                <Label>
                  Username <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 size-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={isChecked} 
                    onChange={(checked) => setIsChecked(checked)} 
                  />
                  <span className="block font-normal text-gray-700 text-theme-sm">
                    Keep me logged in
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <div>
                <Button
                  type="submit"
                  className="w-full"
                  size="sm"
                  disabled={isLoading}
              
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 sm:text-start">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
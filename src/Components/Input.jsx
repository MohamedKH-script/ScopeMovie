import { useId, useState } from "react";
import EyeIcon from "../assets/eye1.svg?react";

function Input({ type = "text", name, label, placeholder, autoComplete, ...rest }) {
  const id = useId();
  const isPassword = type === "password";
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 pt-2 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className={`h-12 w-full rounded-lg border border-white/5 bg-[#171720] px-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-[#9061f9] focus:ring-2 focus:ring-[#9061f9]/30 ${
            isPassword ? "pr-12" : ""
          }`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-zinc-400 hover:text-white"
          >
            <EyeIcon className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
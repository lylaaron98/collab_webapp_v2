import { useState } from "react";

export default function Toggle({ label, toggled, onClick }) {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label className="relative inline-block h-[30px] w-[60px]">
      <input
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
        className="size-0 opacity-0"
      />
      <span
        className={`absolute inset-0 cursor-pointer rounded-full bg-gray-600 transition-colors duration-300 ${
          isToggled ? "bg-green-500" : ""
        }`}
      ></span>
      <strong
        className={`absolute left-full ml-2.5 h-full cursor-pointer whitespace-nowrap leading-[30px] ${
          isToggled ? "text-green-500" : "text-gray-600"
        }`}
      >
        {label}
      </strong>
      <span
        className={`absolute bottom-[2.6px] left-[3px] size-[25px] rounded-full bg-white transition-transform duration-300 ${
          !isToggled ? "translate-x-[30px]" : ""
        }`}
      ></span>
    </label>
  );
}

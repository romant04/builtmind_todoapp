import { FC } from "react";
import { ThemeSwitch } from "./theme-switch";

export const Navbar: FC = () => (
  <div className="w-full py-3 px-12 bg-purple-900 flex justify-between">
    <h1 className="text-white text-2xl">Todo app</h1>
    <ThemeSwitch />
  </div>
);

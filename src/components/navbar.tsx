import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { setTheme } from "../app/reducers/theme-slice";

export const Navbar: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div className="w-full py-3 px-12 bg-purple-900 flex justify-between">
      <h1 className="text-white text-2xl">Todo app</h1>
      <button
        className="text-white text-2xl hover:text-gray-100"
        onClick={() =>
          dispatch(setTheme({ theme: theme === "dark" ? "light" : "dark" }))
        }
      >
        {theme === "dark" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>
    </div>
  );
};

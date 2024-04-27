import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setTheme } from "../app/reducers/theme-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const ThemeSwitch: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
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
  );
};

import { FC, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setTheme } from "./app/reducers/theme-slice";

export const App: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme({ theme: savedTheme as "dark" | "light" }));
    }
  }, []);

  return (
    <BrowserRouter>
      <div
        className={`${
          theme === "dark" ? "dark bg-gray-900" : "bg-gray-100"
        } h-full`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

import { createBrowserRouter } from "react-router-dom";
import Layout from "../side/components/Layout/Layout";
import Cart from "../side/pages/cart/Cart";
import LayoutAdmin from "../auth/components/layout/LayoutAdmin";
import SignInPage from "../auth/pages/SignInPage";
import SignUpPage from "../auth/pages/SignUpPage";
import PrivateProvider from "../providers/PrivateProvider";
import HomePage from "../side/pages/HomePage";
import UserSettings from "../side/pages/UserSettings";
import NoteFoundPage from "../side/pages/NoteFoundPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateProvider>
        <Layout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/userSettings",
        element: <UserSettings />,
      },
      {
        path: "/*",
        element: <NoteFoundPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PrivateProvider>
        <LayoutAdmin />
      </PrivateProvider>
    ),
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);

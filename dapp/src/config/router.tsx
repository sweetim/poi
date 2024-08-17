import {
  AppRootPage,
  LandingPage,
  RootPage,
} from "@/routes"
import {
  AppMapsPage,
  AppPoiPage,
  AppSettingsPage,
  AppWalletPage,
} from "@/routes/app"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/app",
        element: <AppRootPage />,
        children: [
          {
            path: "",
            element: <AppMapsPage />,
          },
          {
            path: "poi",
            element: <AppPoiPage />,
          },
          {
            path: "wallet",
            element: <AppWalletPage />,
          },
          {
            path: "settings",
            element: <AppSettingsPage />,
          },
        ],
      },
    ],
  },
])

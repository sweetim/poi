import { ProtectedRoute } from "@/modules/common"
import {
  AppRootPage,
  LandingPage,
  RootPage,
} from "@/routes"
import {
  AppCreatePage,
  AppMapsPage,
  AppPoiBookmarkPage,
  AppPoiByIdPage,
  AppPoiCapturePage,
  AppPoiCompletedPage,
  AppPoiPage,
  AppPoiRootPage,
  AppSettingsPage,
  AppWalletPage,
} from "@/routes/app"
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom"

export type PoiByIdPageParams = {
  id: string
}

const poiByIdPageLoader = async ({ params }: any) => {
  return params as PoiByIdPageParams
}

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
        element: (
          <ProtectedRoute>
            <AppRootPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <AppMapsPage />,
          },
          {
            path: "poi",
            element: <AppPoiRootPage />,
            children: [
              {
                path: "",
                element: <AppPoiPage />,
                children: [
                  {
                    index: true,
                    element: <Navigate to={"bookmark"} />,
                  },
                  {
                    path: "bookmark",
                    element: <AppPoiBookmarkPage />,
                  },
                  {
                    path: "completed",
                    element: <AppPoiCompletedPage />,
                  },
                ],
              },
              {
                path: "id/:id",
                element: <AppPoiByIdPage />,
                loader: poiByIdPageLoader,
              },
              {
                path: "capture",
                element: <AppPoiCapturePage />,
              },
            ],
          },
          {
            path: "create",
            element: <AppCreatePage />,
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

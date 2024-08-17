import { BottomNavBar } from "@/modules/nav"
import { APIProvider } from "@vis.gl/react-google-maps"
import { Layout } from "antd"
import {
  Content,
  Footer,
} from "antd/lib/layout/layout"
import { FC } from "react"
import { Outlet } from "react-router-dom"

const AppRootPage: FC = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <Layout className="h-full bg-primary">
        <Content className="h-full">
          <Outlet />
        </Content>
        <Footer className="!p-0">
          <BottomNavBar />
        </Footer>
      </Layout>
    </APIProvider>
  )
}

export default AppRootPage

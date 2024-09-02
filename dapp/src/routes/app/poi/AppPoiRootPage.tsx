import { ArrowLeft } from "@phosphor-icons/react"
import {
  Button,
  Space,
} from "antd"
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom"
import {
  match,
  P,
} from "ts-pattern"

const AppPoiRootPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  async function backClickHandler() {
    navigate(-1)
  }

  const renderNavBar = () => (
    <Space className="p-2">
      <Button
        type="primary"
        shape="circle"
        icon={<ArrowLeft size={20} color="#e1e7fd" weight="bold" />}
        onClick={backClickHandler}
      >
      </Button>
      <h1>POI</h1>
    </Space>
  )

  return (
    <div className="flex flex-col w-full h-full">
      {match(/\/app\/poi\/id\/([\d]+)/.exec(location.pathname)?.length)
        .with(P.number.gt(0), () => renderNavBar())
        .otherwise(() => <></>)}
      <Outlet />
    </div>
  )
}

export default AppPoiRootPage

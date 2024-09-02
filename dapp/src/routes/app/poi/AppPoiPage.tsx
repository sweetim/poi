import {
  BookmarkSimple,
  CheckSquare,
} from "@phosphor-icons/react"
import { Space } from "antd"
import clsx from "clsx"
import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom"
import { match } from "ts-pattern"

const navItems = [
  {
    to: "bookmark",
    icon: BookmarkSimple,
  },
  {
    to: "completed",
    icon: CheckSquare,
  },
]

const AppPoiPage = () => {
  const location = useLocation()
  const currentToRoute = location.pathname
    .split("/")
    .pop()

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-row text-center">
        {navItems.map(item => {
          const isPathMatching = currentToRoute === item.to

          const divClassName = clsx(
            "flex-1 p-2",
            {
              "border-blue-500 border-b-2": isPathMatching,
            },
          )

          const navIconColor = match(isPathMatching)
            .with(true, () => "#1677FF")
            .otherwise(() => "#6b7280")

          const NavIcon = item.icon

          return (
            <div key={item.to} className={divClassName}>
              <Space>
                <NavIcon
                  size={32}
                  color={navIconColor}
                  weight="fill"
                />
                <Link className="font-medium text-gray-500 capitalize" to={item.to}>
                  {item.to}
                </Link>
              </Space>
            </div>
          )
        })}
      </div>
      <Outlet />
    </div>
  )
}

export default AppPoiPage

import {
  Icon,
  MapPinArea,
  MapTrifold,
  PlusCircle,
  UserCircleGear,
  Wallet,
} from "@phosphor-icons/react"
import clsx from "clsx"
import { FC } from "react"
import {
  Link,
  useLocation,
} from "react-router-dom"
import { match } from "ts-pattern"

type NavBarItem = {
  to: string
  icon: Icon
  title: string
}

const navBarItems: NavBarItem[] = [
  {
    to: "/app",
    icon: MapTrifold,
    title: "Maps",
  },
  {
    to: "/app/poi",
    icon: MapPinArea,
    title: "PoI",
  },
  {
    to: "/app/create",
    icon: PlusCircle,
    title: "Create",
  },
  {
    to: "/app/wallet",
    icon: Wallet,
    title: "Wallet",
  },
  {
    to: "/app/settings",
    icon: UserCircleGear,
    title: "Settings",
  },
]

const BottomNavBar: FC = () => {
  const location = useLocation()
  const currentToRoute = location.pathname
    .split("/", 3)
    .join("/")

  return (
    <div className="w-full h-16 bg-primary border-none z-50">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navBarItems.map((item, index) => {
          const isPathMatching = currentToRoute === item.to

          const spanClassName = clsx(
            "text-sm text-gray-500 group-hover:text-[#1677FF]",
            {
              "text-[#1677FF]": isPathMatching,
            },
          )

          const navIconColor = match(isPathMatching)
            .with(true, () => "#1677FF")
            .otherwise(() => "#6b7280")

          const NavIcon = item.icon

          return (
            <Link
              to={item.to}
              className="inline-flex flex-col items-center justify-center px-5 group"
              key={index}
            >
              <NavIcon
                size={32}
                color={navIconColor}
                weight="fill"
                className="group-hover:fill-[#1677FF]"
              />
              <span className={spanClassName}>
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavBar

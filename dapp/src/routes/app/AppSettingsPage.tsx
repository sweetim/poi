import { useWalletInfo } from "@/hooks"
import { User } from "@phosphor-icons/react"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  Button,
  Space,
} from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import {
  match,
  P,
} from "ts-pattern"

const AppSettingsPage: FC = () => {
  const navigate = useNavigate()
  const { logout } = useWeb3Auth()
  const { walletAddress, userInfo } = useWalletInfo()

  async function logoutClickHandler() {
    await logout()
    navigate("/")
  }

  const avatar = match(userInfo?.profileImage)
    .with(P.string, () => <Avatar size={128} src={userInfo?.profileImage} />)
    .otherwise(() => <Avatar size={128} icon={<User size={64} color="#ffebeb" weight="fill" />} />)

  return (
    <div className="w-full text-center mt-20">
      <Space direction="vertical" size="large" align="center">
        {avatar}
        <Paragraph
          style={{ width: 300, color: "white" }}
          ellipsis
          copyable
          className="font-bold"
        >
          {walletAddress && walletAddress.toString()}
        </Paragraph>
        <Button type="primary" size="large" onClick={logoutClickHandler}>
          LOGOUT
        </Button>
      </Space>
    </div>
  )
}

export default AppSettingsPage

import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import { Button } from "antd"
import {
  FC,
  useEffect,
} from "react"
import { useNavigate } from "react-router-dom"

const LandingPage: FC = () => {
  const navigate = useNavigate()

  const {
    isConnected,
    connect,
  } = useWeb3Auth()

  useEffect(() => {
    if (isConnected) {
      navigate("/app")
    }
  }, [ isConnected ])

  async function loginClickHandler() {
    // await connect()
    navigate("/app")
  }

  return (
    <div className="h-full w-full">
      <Button
        size="large"
        type="primary"
        className="w-full"
        onClick={loginClickHandler}
      >
        Login
      </Button>
    </div>
  )
}

export default LandingPage

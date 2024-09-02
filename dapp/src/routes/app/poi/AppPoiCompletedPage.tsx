import { usePoiStore } from "@/store/usePoiStore"
import { List } from "antd"
import { useNavigate } from "react-router-dom"

const AppPoiCompletedPage = () => {
  const navigate = useNavigate()
  const poi = usePoiStore(state => state.poi)

  async function itemClickHandler(id: number) {
    navigate(`../id/${id}`)
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={poi}
      renderItem={item => (
        <List.Item
          className="!px-2"
          onClick={() => itemClickHandler(item.id)}
          actions={[
            <p>{item.reward}</p>,
          ]}
        >
          <List.Item.Meta
            title={`${item.owner.substring(0, 8)}...${item.owner.substring(item.owner.length - 8)}`}
            description={new Date(item.createdAt_s * 1000).toLocaleString()}
          />
        </List.Item>
      )}
    />
  )
}

export default AppPoiCompletedPage

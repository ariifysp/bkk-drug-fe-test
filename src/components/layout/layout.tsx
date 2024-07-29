import Content from "./content"
import Navbar from "./navbar"

const BaseLayout = ({children}: any) => {
  return (
    <div>
      <Navbar/>
      <div className="mt-20">
        <Content>{children}</Content>
      </div>
    </div>
  )
}

export default BaseLayout
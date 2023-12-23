import { Container} from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Layout from "./layout/Layout"
import Login from "./pages/Login"

function App() {
  return (
    <Container>
      <Routes>
      {/* <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route> */}

        
        <Route path="/" element={<Layout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/auth/registration" element={<Registration/>}/>
        <Route path="/auth/login" element={<Login/>}/>
        </Route>
      </Routes>
    </Container>
  )
}

export default App

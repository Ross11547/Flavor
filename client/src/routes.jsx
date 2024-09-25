import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import { ROUTES } from "./enums/routes/Routes"
import Layout from "./pages/private/_layout"

const RoutesComponent = () => {

    return (
        <main>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.DASHBOARD} element={<Layout />} >
                    <Route path={ROUTES.DASHBOARD} element={<Login />} />
                    <Route path={ROUTES.USUARIO} element={<Login />} />
                </Route>
            </Routes>
        </main>
    )
}
export default RoutesComponent();
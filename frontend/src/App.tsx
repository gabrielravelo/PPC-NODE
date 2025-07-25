import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import { AuthProvider } from "./context/AuthContext"
import { Navbar } from "./components/Navbar"
import { Toaster } from "react-hot-toast"


export const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Toaster position="bottom-right" />
                <Navbar />
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    )
}

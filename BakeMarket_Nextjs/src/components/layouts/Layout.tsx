import Header from "./Header"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main>{children}</main>

        </>
    )
}

export default MainLayout
import NavBar from "./_components/navabar";

export default function layout ({children} : {children : React.ReactNode}) {
    return (
        <div className="h-full">
            <NavBar />
            <main className="pt-40 h-full">
                {children}
            </main>
        </div>
    )
}
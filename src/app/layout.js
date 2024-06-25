import StoreProvider from "@/store/storeProvider";
import "./globals.css";

export const metadata = {
    title: "Genea Notes",
    description: "A notes app",
};

export default function RootLayout({ children }) {
    return (
        <StoreProvider>
            <html lang="en" className="flex justify-center">
                <body className="h-full w-full flex flex-col justify-center items-center max-w-screen-2xl gap-10 p-10 bg-slate-200">{children}</body>
            </html>
        </StoreProvider>
    );
}

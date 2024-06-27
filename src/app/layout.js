import StoreProvider from "@/store/storeProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Genea Keep",
    description: "A notes app",
};

const courier = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }) {
    return (
        <StoreProvider>
            <html lang="en" className="flex justify-center">
                <body
                    className={cn(
                        "h-full w-full flex flex-col justify-center items-center max-w-screen-2xl gap-10 p-4 sm:p-10 bg-slate-200",
                        courier.className
                    )}
                >
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}

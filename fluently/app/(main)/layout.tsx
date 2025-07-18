import { MobileHeader } from "@/components/mobileHeader";
import { Sidebar } from "@/components/sidebar";
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <ClerkProvider>
                <MobileHeader />
                <Sidebar className="hidden lg:flex"/>
                <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
                    <div className="bg-indigo-500 h-full">
                        {children}
                    </div>
                </main>
            </ClerkProvider>
        </>
    );
};

export default MainLayout;

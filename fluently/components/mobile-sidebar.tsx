import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "./ui/sheet";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";
export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white"/>
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};
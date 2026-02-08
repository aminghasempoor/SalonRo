import BannerComponent from "./Banner";
import Categories from "@/components/Home/Desktop/Categories";

export default function DesktopHome() {
    return (
        <div className="container mx-auto h-full w-full">
            <BannerComponent />
            <Categories />
        </div>
    );
}

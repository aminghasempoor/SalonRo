import BannerComponent from "./Banner";
import Categories from "@/components/Home/Desktop/Categories";
import Reservation from "@/components/Home/Desktop/Reservation";

export default function DesktopHome() {
    return (
        <div className="container mx-auto h-full w-full">
            <BannerComponent />
            <Categories />
            <Reservation />
        </div>
    );
}

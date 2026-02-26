import BannerComponent from "./Banner";
import Categories from "./Categories";
import Reservation from "./Reservation";
import Salons from "./Salons";

export default function DesktopHome() {
    return (
        <div className="container mx-auto h-full w-full">
            <BannerComponent />
            <Categories />
            <Reservation />
            <Salons />
        </div>
    );
}

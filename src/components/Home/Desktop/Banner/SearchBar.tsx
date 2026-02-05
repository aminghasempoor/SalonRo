import SearchItem from "./SearchItem";
import { CalenderIcon, LocationIcon, SearchIcon } from "@/assets";
import { useModalStore } from "@/stores/useModalStore";
import LocationModal from "./LocationModal";

export default function SearchBar() {
    const openModal = useModalStore((s) => s.openModal);
    return (
        <div className="bg-card flex max-w-2xl items-center justify-between gap-1 rounded-full p-4">
            {/* آدرس */}
            <SearchItem icon={<LocationIcon className="size-5" />}>
                <button
                    type="button"
                    onClick={() => openModal(<LocationModal />)}
                    className="w-full text-right text-gray-500"
                >
                    آدرس
                </button>
            </SearchItem>

            {/* تاریخ */}
            <SearchItem icon={<CalenderIcon className="size-5" />}>
                <input type="date" className="w-full bg-transparent text-gray-500 outline-none" />
            </SearchItem>

            {/* دسته بندی */}
            <SearchItem icon={<SearchIcon className="size-5" />}>
                <select className="w-full bg-transparent text-gray-500 outline-none">
                    <option>دسته بندی</option>
                    <option>رستوران</option>
                    <option>کافی‌شاپ</option>
                </select>
            </SearchItem>
        </div>
    );
}

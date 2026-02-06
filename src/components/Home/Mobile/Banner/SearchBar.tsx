import SearchItem from "./SearchItem";
import { CalenderIcon, LocationIcon, SearchIcon } from "@/assets";
import { useModalStore } from "@/stores/useModalStore";
import LocationModal from "./LocationModal";
import NoFormSelect from "@/components/UI/NoFormSelect";
import DatePickerField from "@/components/UI/DatePickerField";
const options = [
    { label: "Home", value: "home" },
    { label: "Search", value: "search" },
]

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
                <DatePickerField name="bill_of_lading_date" setValue={()=>{
                    console.log("hello DatePickerField")}} />
            </SearchItem>

            {/* دسته بندی */}
            <SearchItem icon={<SearchIcon className="size-5" />}>
                <NoFormSelect
                    value={""}
                    onChange={()=>{
                        console.log("hello")}}
                    options={options}
                    loading={false}
                    error={null}
                    placeholder="علت انسداد"
                    // onOpen={fetchReasons}
                />
            </SearchItem>
        </div>
    );
}

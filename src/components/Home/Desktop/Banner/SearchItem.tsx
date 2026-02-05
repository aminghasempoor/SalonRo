interface SearchItemProps {
    icon: React.ReactNode;
    children: React.ReactNode;
}

function SearchItem({ icon, children }: SearchItemProps) {
    return (
        <div className="flex min-w-[180px] items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm">
            <div className="text-gray-400">{icon}</div>

            <div className="flex-1">{children}</div>
        </div>
    );
}
export default SearchItem;

import BottomSheet from "@/components/UI/BottomSheet";
import MapProviderComponent from "@/providers/MapProviderComponent";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <MapProviderComponent>
            {children}
            <BottomSheet />
        </MapProviderComponent>
    );
}

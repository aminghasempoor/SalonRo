"use client"
import MainMap from "@/components/MainMap";
import LocationMarker from "./LocationMarker";

const LocationModal = () => {
    return (
        <div style={{ width: "100%", height: "100dvh", position: "relative" }}>
        <MainMap>
            <LocationMarker location={{lat : 36.541, lng : 54.56}} onDragEnd={()=> {
                console.log("hello")}} />
        </MainMap>
        </div>

    );
};
export default LocationModal;

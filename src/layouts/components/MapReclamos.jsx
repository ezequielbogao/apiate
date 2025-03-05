import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, updateCenter } from "../../redux/slices/reclamosSlice";

const MapReclamos = () => {
    const { personales } = useSelector((state) => state.personal);
    const { center, locations } = useSelector((state) => state.reclamos);
    const dispatch = useDispatch();
    const mapRef = useRef();

    useEffect(() => {
        if (personales && personales.documento) {
            dispatch(fetchLocations(personales.documento));
            if (mapRef.current && mapRef.current.leafletElement) {
                mapRef.current.leafletElement.invalidateSize();
            }
            if (locations.length > 0) {
                const firstLocation = locations[0];
                updateCenter([firstLocation.latitud, firstLocation.longitud]);
            }
        }
    }, []);

    const polygon = [
        [-34.565944, -58.655582],
        [-34.605472, -58.713749],
        [-34.557904, -58.7769],
        [-34.549944, -58.768073],
        [-34.551413, -58.766168],
        [-34.547127, -58.761481],
        [-34.550835, -58.756388],
        [-34.548432, -58.753835],
        [-34.548819, -58.753255],
        [-34.52589, -58.728661],
        [-34.525773, -58.728833],
        [-34.518328, -58.721048],
    ];

    const purpleOptions = { color: "#79c2e6" };

    return (
        personales && (
            <div
                className="p-1 bg-azure-300 rounded-md"
                style={{
                    height: "100vh",
                    width: "100%",
                }}>
                <MapContainer
                    ref={mapRef}
                    center={center}
                    zoom={15}
                    style={{
                        height: "100%",
                        width: "100%",
                    }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />

                    {locations.map((loc, index) => (
                        <Marker
                            key={index}
                            position={[loc.longitud, loc.latitud]}>
                            <Popup>
                                {loc.calle} - {loc.altura}
                            </Popup>
                        </Marker>
                    ))}
                    <Polygon pathOptions={purpleOptions} positions={polygon} />
                </MapContainer>
            </div>
        )
    );
};

export default MapReclamos;

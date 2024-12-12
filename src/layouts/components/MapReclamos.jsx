import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
// import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMenu } from "../../Context/MenuContext";
import axios from "axios";
import { toast } from "react-toastify";

const MapReclamos = () => {
    const { persona, setError } = useMenu();
    const [locations, setLocations] = useState([]);
    const [center, setCenter] = useState([
        -34.575267972791536, -58.72954234901199,
    ]);
    const mapRef = useRef();
    const loadLocations = async () => {
        let locs = [];
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/callejero/${persona.documento}`
            );
            locs = response.data.data;
            setLocations(locs);
        } catch (err) {
            console.log(err);
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        }
    };

    useEffect(() => {
        if (persona) {
            loadLocations();
            if (mapRef.current && mapRef.current.leafletElement) {
                mapRef.current.leafletElement.invalidateSize();
            }
            if (locations.length > 0) {
                const firstLocation = locations[0];
                setCenter([firstLocation.latitud, firstLocation.longitud]);
            }
        }
    }, [persona]);

    const polygon = [
        [-34.502726, -58.644883],
        [-34.534328, -58.606439],
        [-34.605472, -58.713749],
        [-34.557904, -58.7769],
        [-34.549944, -58.768073],
        [-34.551413, -58.766168],
        [-34.546772, -58.758194],
        [-34.550835, -58.756388],
        [-34.548432, -58.753835],
        [-34.548829, -58.751567],
        [-34.52589, -58.728661],
        [-34.525773, -58.728833],
        [-34.521639, -58.723032],
        [-34.520639, -58.723519],
        [-34.517704, -58.718775],
        [-34.532677, -58.700953],
        [-34.525349, -58.693572],
        [-34.52975, -58.686992],
    ];

    const purpleOptions = { color: "purple" };

    return (
        persona && (
            <div style={{ height: "100vh", width: "100%" }}>
                <MapContainer
                    ref={mapRef}
                    center={center}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}>
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

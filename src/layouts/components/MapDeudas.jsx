import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
// import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMenu } from "@ctx/MenuContext";
import axios from "axios";
import { toast } from "react-toastify";

const MapDeudas = () => {
    const { persona, setError } = useMenu();
    const [locations, setLocations] = useState([]);
    const [center, setCenter] = useState([
        -34.575267972791536, -58.72954234901199,
    ]);
    const mapRef = useRef();
    const getDeudas = async () => {
        let locs = [];
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/rafam/comercios/deudas`
            );
            locs = response.data.data;
            let cord = locs.map((e) => {
                if (e.latitud && e.longitud) {
                    return { longitud: e.longitud, latitud: e.latitud };
                } else {
                    return null;
                }
            });

            let validCord = cord.filter((coords) => coords !== null);
            console.log(validCord);
            setLocations(validCord);
        } catch (err) {
            console.log(err);
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        }
    };

    useEffect(() => {
        getDeudas();
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
                    <Marker key={index} position={[loc.longitud, loc.latitud]}>
                        <Popup>
                            {loc.calle} - {loc.altura}
                        </Popup>
                    </Marker>
                ))}
                <Polygon pathOptions={purpleOptions} positions={polygon} />
            </MapContainer>
        </div>
    );
};

export default MapDeudas;

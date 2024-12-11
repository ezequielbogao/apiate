import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
                </MapContainer>
            </div>
        )
    );
};

export default MapReclamos;

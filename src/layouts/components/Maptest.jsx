import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Maptest = () => {
    const position = [-34.575267972791536, -58.72954234901199]; // Coordenadas latitud, longitud
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.leafletElement.invalidateSize();
        }
    }, []);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer
                ref={mapRef}
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={position}>
                    <Popup>Aquí está el punto en tus coordenadas.</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Maptest;

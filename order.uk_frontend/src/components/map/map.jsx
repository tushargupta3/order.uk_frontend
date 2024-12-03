/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./map.module.css";
delete L.Icon.Default.prototype._getIconUrl;

const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
};
const MapWithInfoCard = ({ restaurantData }) => {
  const [position, setPosition] = useState([58.0, 58.0]);

  useEffect(() => {
    if (restaurantData?.mapLocation) {
      const mapLocation = JSON.parse(restaurantData?.mapLocation);
      setPosition(mapLocation);
    }
  }, [restaurantData]);

  const pinIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Example pin icon URL
    iconSize: [40, 40], // Size of the icon
    iconAnchor: [20, 40], // Anchor point for positioning
    popupAnchor: [0, -40], // Anchor for the popup relative to the icon
  });

  return (
    <div className={styles.container}>
      <div className={styles.infoCard}>
        <h2>{restaurantData?.name}</h2>
        <h3>South London</h3>
        <p>{restaurantData?.address}</p>
        <p>
          <strong>Phone number</strong><br></br><span>{restaurantData?.contactInfo?.phoneNumber}</span>
        </p>
        <p>
          <strong>Website</strong>:{" "}<br></br>
          <a href={restaurantData?.contactInfo?.website} target="_blank" rel="noreferrer">
            {restaurantData?.contactInfo?.website}
          </a>
        </p>
      </div>
      <MapContainer
        center={position}
        zoom={15}
        zoomControl={false}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={pinIcon}>
          <Popup>
            <div style={{ textAlign: "center", backgroundColor: "white", width: "200px", height: "100px" }}>
              <strong>{restaurantData?.name}</strong>
            </div>
          </Popup>
        </Marker>
        <UpdateMapCenter position={position} />
      </MapContainer>
    </div>
  );
};

export default MapWithInfoCard;
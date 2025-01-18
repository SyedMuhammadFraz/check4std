import React from 'react'
import * as leaflet from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "leaflet/dist/images/marker-shadow.png"

function LeafletMap() {
    const [mapState, setMapState] = React.useState(
        {
            lat: 41.257017,
            lng: 29.077524,
            zoom: 13,
        }
    )
    return (
        <div>
            <h3>Map</h3>

            <div id="map">

                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100vh', width: '100wh' }}
                >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default LeafletMap
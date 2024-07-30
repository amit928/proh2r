// components/MapComponent.js
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, AnimatedRegion, MarkerAnimated } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView, Platform } from 'react-native';

const LiveLocation = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.00000003,
        longitudeDelta: 0.0023,
    });

    const [markerState, setMarkerState] = useState({ latitude: 37.78825,
        longitude: -122.4324, })

    const markerRef = useRef(null);
    const mapViewRef = useRef(null);
    // const flag = useRef(false);

    useEffect(() => {
        console.log("region", region);
        const watchId = Geolocation.watchPosition(
            (position) => {
                const { coords } = position;
                if (coords) {
                    const { latitude, longitude } = coords;
                    console.log('mapViewRef', mapViewRef);

                    // if (!flag.current) {
                    // setRegion({ ...region, latitude, longitude });
                    // mapViewRef.current.animateToRegion({ ...region, latitude, longitude }, 1000)
                    // flag.current =  true
                    // }


                    // Animate marker to the updated location
                    if (markerRef.current) {

                        if (Platform.OS == 'android') {
                            mapViewRef.current.animateToRegion({ ...region, latitude, longitude }, 1000)
                            markerRef.current.animateMarkerToCoordinate({ latitude, longitude }, 700);
                        }
                        else {
                            setMarkerState({ latitude, longitude })
                            setRegion({ ...region, latitude, longitude });
                        }


                        // console.log("markerRef", markerRef);
                    }
                }
            },
            (error) => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0.2,
                interval: 200, // Update every 0.2 second
                fastestInterval: 100, // Minimum interval between updates
            }
        );


        return () => {
            Geolocation.clearWatch(watchId);
        };
    }, []);

    function onRegionChange(newRegion) {
        // console.log(typeof region.setValue);
        console.log("ss", region);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView ref={mapViewRef} style={{ flex: 1 }} region={region}
            // onRegionChange={onRegionChange}
            >
                <MarkerAnimated ref={markerRef} coordinate={markerState} />
            </MapView>
        </SafeAreaView>
    );
};

export default LiveLocation;

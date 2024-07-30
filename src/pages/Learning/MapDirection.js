import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapWithRoute = () => {
    
    const directions = {
        "bbox": [
            8.681423,
            49.414599,
            8.690123,
            49.420514
        ],
        "routes": [
            {
                "summary": {
                    "distance": 1372.6,
                    "duration": 292.79999999999995
                },
                "segments": [
                    {
                        "distance": 891.1,
                        "duration": 189.7,
                        "steps": [
                            {
                                "distance": 1.8,
                                "duration": 0.4,
                                "type": 11,
                                "instruction": "Head west on Gerhart-Hauptmann-Straße",
                                "name": "Gerhart-Hauptmann-Straße",
                                "way_points": [
                                    0,
                                    1
                                ]
                            },
                            {
                                "distance": 313.8,
                                "duration": 75.3,
                                "type": 1,
                                "instruction": "Turn right onto Wielandtstraße",
                                "name": "Wielandtstraße",
                                "way_points": [
                                    1,
                                    6
                                ]
                            },
                            {
                                "distance": 251.7,
                                "duration": 36.2,
                                "type": 1,
                                "instruction": "Turn right onto Mönchhofstraße",
                                "name": "Mönchhofstraße",
                                "way_points": [
                                    6,
                                    10
                                ]
                            },
                            {
                                "distance": 211.8,
                                "duration": 50.8,
                                "type": 0,
                                "instruction": "Turn left onto Keplerstraße",
                                "name": "Keplerstraße",
                                "way_points": [
                                    10,
                                    13
                                ]
                            },
                            {
                                "distance": 109.5,
                                "duration": 26.3,
                                "type": 1,
                                "instruction": "Turn right onto Moltkestraße",
                                "name": "Moltkestraße",
                                "way_points": [
                                    13,
                                    14
                                ]
                            },
                            {
                                "distance": 2.4,
                                "duration": 0.6,
                                "type": 0,
                                "instruction": "Turn left onto Werderplatz",
                                "name": "Werderplatz",
                                "way_points": [
                                    14,
                                    15
                                ]
                            },
                            {
                                "distance": 0.0,
                                "duration": 0.0,
                                "type": 10,
                                "instruction": "Arrive at Werderplatz, on the right",
                                "name": "-",
                                "way_points": [
                                    15,
                                    15
                                ]
                            }
                        ]
                    },
                    {
                        "distance": 481.5,
                        "duration": 103.1,
                        "steps": [
                            {
                                "distance": 2.4,
                                "duration": 0.6,
                                "type": 11,
                                "instruction": "Head south on Werderplatz",
                                "name": "Werderplatz",
                                "way_points": [
                                    15,
                                    16
                                ]
                            },
                            {
                                "distance": 265.5,
                                "duration": 63.7,
                                "type": 0,
                                "instruction": "Turn left onto Moltkestraße",
                                "name": "Moltkestraße",
                                "way_points": [
                                    16,
                                    20
                                ]
                            },
                            {
                                "distance": 83.0,
                                "duration": 7.5,
                                "type": 2,
                                "instruction": "Turn sharp left onto Handschuhsheimer Landstraße, B 3",
                                "name": "Handschuhsheimer Landstraße, B 3",
                                "way_points": [
                                    20,
                                    22
                                ]
                            },
                            {
                                "distance": 130.6,
                                "duration": 31.4,
                                "type": 0,
                                "instruction": "Turn left onto Roonstraße",
                                "name": "Roonstraße",
                                "way_points": [
                                    22,
                                    23
                                ]
                            },
                            {
                                "distance": 0.0,
                                "duration": 0.0,
                                "type": 10,
                                "instruction": "Arrive at Roonstraße, straight ahead",
                                "name": "-",
                                "way_points": [
                                    23,
                                    23
                                ]
                            }
                        ]
                    }
                ],
                "bbox": [
                    8.681423,
                    49.414599,
                    8.690123,
                    49.420514
                ],
                "geometry": "ghrlHir~s@?BIC{ELgDo@aBa@}@I?sB?k@BwD?_JgAJgHt@I@]iHC?B?KuB]oFASg@wImAt@y@f@d@bJ",
                "way_points": [
                    0,
                    15,
                    23
                ],
                "legs": []
            }
        ],
        "metadata": {
            "attribution": "openrouteservice.org | OpenStreetMap contributors",
            "service": "routing",
            "timestamp": 1703074062741,
            "query": {
                "coordinates": [
                    [
                        8.681495,
                        49.41461
                    ],
                    [
                        8.686507,
                        49.41943
                    ],
                    [
                        8.687872,
                        49.420318
                    ]
                ],
                "profile": "driving-car",
                "format": "json"
            },
            "engine": {
                "version": "7.1.0",
                "build_date": "2023-12-10T05:30:50Z",
                "graph_date": "2023-12-10T14:12:23Z"
            }
        }
    }
  const coordinates = directions.routes[0].segments[0].steps.map(step => ({
    latitude: step.way_points[0],
    longitude: step.way_points[1],
  }));

  const startPoint = coordinates[0];
  const endPoint = coordinates[coordinates.length - 1];

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: (startPoint.latitude + endPoint.latitude) / 2,
        longitude: (startPoint.longitude + endPoint.longitude) / 2,
        latitudeDelta: Math.abs(startPoint.latitude - endPoint.latitude) * 2,
        longitudeDelta: Math.abs(startPoint.longitude - endPoint.longitude) * 2,
      }}
    >
      <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="blue" />
      <Marker coordinate={startPoint} title="Start Point" />
      <Marker coordinate={endPoint} title="End Point" />
    </MapView>
  );
};

export default MapWithRoute;

import { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants, setRestaurant } from "../../redux/modules/restaurants.js";

const containerStyle = {
  position: "relative",
  display: "flex",
  width: "100%",
  height: "100%",
};

export const MapContainer = (props) => {
  const [map, setMap] = useState(null);
  const { google, inputQuery, placeID } = props;
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (inputQuery) {
      searchByQuery(inputQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputQuery]);

  function searchByQuery(query) {
    const service = new google.maps.places.PlacesService(map);
    dispatch(setRestaurants([]));
    const request = {
      location: map.center,
      radius: 10000,
      type: ["restaurant"],
      textQuery: query,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setMap(map);
        map.setCenter(results[0].geometry.location);
      } else {
        console.error(`Error: ${status}`);
      }
    });
  }

  useEffect(() => {
    if (placeID) {
      searchByPlaceID(placeID);
    }
  }, [placeID]);

  function searchByPlaceID(placeID) {
    const service = new google.maps.places.PlacesService(map);
    dispatch(setRestaurant(null));
    const request = {
      placeId: placeID,
      fields: ["name", "vicinity", "formatted_phone_number" ,"opening_hours", "place_id"],
    };
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurant(place));
      }
    });
  }

  function searchNearby(map) {
    const service = new google.maps.places.PlacesService(map);
    dispatch(setRestaurants([]));
    const request = {
      location: map.center,
      radius: 10000,
      type: ["restaurant"],
    };
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurants(results));
      }
    });
  }

  function onMapReady(_, map) {
    setMap(map);
    searchNearby(map);
  }

  return (
    <Map
      google={google}
      style={containerStyle}
      centerAroundCurrentLocation
      onReady={onMapReady}
      onRecenter={onMapReady}
    >
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.palce_id}
          name={restaurant.name}
          position={{
            lat: restaurant.geometry.location.lat(),
            lng: restaurant.geometry.location.lng(),
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
  language: "pt-BR",
})(MapContainer);

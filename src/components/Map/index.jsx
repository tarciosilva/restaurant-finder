import { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRestaurants,
  setRestaurant,
} from "../../redux/modules/restaurants.js";

const style = {
  position: "fixed",
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
      searchByQuery(inputQuery, map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputQuery]);

  function searchByQuery(query, map) {
    const service = new google.maps.places.PlacesService(map);
    dispatch(setRestaurants([]));
    const request = {
      location: map.center,
      radius: 2000,
      type: ["restaurant"],
      query: query,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        orderByRating(results).reverse();
        dispatch(setRestaurants(results));
      }else {
        console.log("error");
      }
    });
  }

  useEffect(() => {
    if (placeID) {
      searchByPlaceID(placeID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeID]);

  function searchByPlaceID(placeID) {
    const service = new google.maps.places.PlacesService(map);
    dispatch(setRestaurant(null));
    const request = {
      placeId: placeID,
      fields: [
        "name",
        "vicinity",
        "formatted_phone_number",
        "opening_hours",
        "place_id",
      ],
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
      radius: 5000,
      type: ["restaurant"],
    };
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        orderByRating(results).reverse();
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
      google={window.google}
      style={style}
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

const orderByRating = (array) => {
  return array.sort((a, b) => {
    if (a?.rating && b?.rating) {
      return a.rating < b.rating ? -1 : true;
    } else return 1;
  });
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
  language: "pt-BR",
  libraries: ["places"],
})(MapContainer);

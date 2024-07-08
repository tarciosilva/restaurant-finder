import React, { Fragment, useState } from "react";
import {
  Container,
  Logo,
  SearchInput,
  Wrapper,
  CarouselTitle,
  MapContainer,
  ModalTitle,
  ModalContent,
} from "./style";
import logo from "../../assets/tsilva_logo.png";
import InputSearch from "../../components/Input";
import Carousel from "../../components/Carousel/index";
import Map from "../../components/Map";
import porsche from "./../../assets/eletric-cars/Porsche_Taycan_5_2025.webp";
import Card from "../../components/Cards";
import { useSelector } from "react-redux";
import { Modal, Skeleton } from "../../components";
import Loader from "../../components/Loader/index.jsx";

const Home = () => {
  const [modalOpned, setModalOpened] = useState(false);
  const [query, setQuery] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [placeID, setPlaceID] = useState(null);
  const { restaurants, restaurantSelected } = useSelector(
    (state) => state.restaurants
  );

  function handlleKeyPress(event) {
    if (event.key === "Enter") {
      setQuery(inputValue);
    }
  }

  function handleOpenModal(place_id) {
    setPlaceID(place_id);
    setModalOpened(true);
  }

  return (
    <Wrapper>
      <Container>
        <SearchInput>
          <Logo src={logo} alt="logo" />
          <InputSearch
            onQuery={handlleKeyPress}
            onInput={setInputValue}
            inPut={inputValue}
          />
          <CarouselTitle>Restaurantes Próximos</CarouselTitle>
          {restaurants.length > 0 ? (
            <Fragment>
              <Carousel restaurants={restaurants} defaultImage={porsche} />
            </Fragment>
          ) : (
            <Loader />
          )}
        </SearchInput>
        {restaurants.length > 0 ? (
          <Fragment>
            {restaurants.map((restaurant) => {
              return (
                <Card
                  key={restaurant.place_id}
                  restaurant={restaurant}
                  defaultImage={porsche}
                  onClick={() => handleOpenModal(restaurant.place_id)}
                />
              );
            })}
          </Fragment>
        ) : (
          <div style={{marginTop:"5px"}}>
            <Skeleton width={"10px"} height={"136px"} />
            <Skeleton width={"10px"} height={"136px"} />
            <Skeleton width={"10px"} height={"136px"} />
          </div>
        )}
      </Container>

      <MapContainer>
        <Map inputQuery={query} placeID={placeID} />
      </MapContainer>
      <Modal open={modalOpned} onClose={() => setModalOpened(!modalOpned)}>
        {restaurantSelected ? (
          <Fragment>
            <ModalTitle>{restaurantSelected?.name}</ModalTitle>
            <ModalContent>
              Endereço: {restaurantSelected?.vicinity}
            </ModalContent>
            <ModalContent>
              Contato: {restaurantSelected?.formatted_phone_number}
            </ModalContent>
            <ModalContent>
              {restaurantSelected?.opening_hours?.isOpen
                ? "Aberto Agora :)"
                : "Fechado agora :("}
            </ModalContent>
          </Fragment>
        ) : (
          <Fragment>
            <Skeleton width={"5px"} height={"15px"} />
            <Skeleton width={"10px"} height={"10px"} />
            <Skeleton width={"10px"} height={"10px"} />
            <Skeleton width={"10px"} height={"10px"} />
          </Fragment>
        )}
      </Modal>
    </Wrapper>
  );
};

export default Home;

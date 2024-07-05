import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.backColor};
  display: flex;
  flex-direction: ${(props) => props.flex};
`;

const Container = styled.aside`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) =>
    props.theme.colors
      .primary}; //props é passado como argumento pelo ThemeProvider
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100vh;
  overflow-y: scroll;
`;

const SearchInput = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const Logo = styled.img`
  width: 100%;
`;

const MapContainer = styled.div`
    display: flex;
    width: 100%
    height: 100vh;
`;

const CarouselTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;
  margin: 1rem 0;
  padding: 1rem;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  letter-spacing: 0.25rem;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  line-height: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ModalContent = styled.p`
  font-weight: regular;
  padding: .25rem;
`;



export {
  Container,
  SearchInput,
  Logo,
  Wrapper,
  MapContainer,
  CarouselTitle,
  ModalTitle,
  ModalContent,
};

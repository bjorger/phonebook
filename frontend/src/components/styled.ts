import styled from "styled-components";
import ContactsIcon from "@mui/icons-material/Contacts";

interface HeadlineProps {
    textAlign?: "left" | "right" | "center";
}

interface FlexContainerProps {
    flexDirection?: "row" | "column";
    alignItems?: "center" | "start" | "end" | "stretch" | "flex-start" | "flex-end";
    justifyContent?: "center" | "space-between" | "start" | "space-around" | "space-evenly";
    background?: string;
    margin?: string;
}

export const Headline = styled.h1<HeadlineProps>`
    ${({ theme }) => theme.fonts.h1};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
`;

export const FlexContainer = styled.div<FlexContainerProps>`
    display: flex;
    flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : "row")};
    align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
    justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "center")};
    background: ${({ background }) => (background ? background : "transparent")};
    margin: ${({ margin }) => (margin ? margin : "0")};
`;

export const Contacts = styled(ContactsIcon)`
    margin-right: 10px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    background-color: ${({ theme }) => theme.palette.background};
`;

export const Layout = styled.div`
    min-height: 100vh;
    grid-column: 1 / span 24;

    @media (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
        grid-column: 3 / span 20;
    }
`;

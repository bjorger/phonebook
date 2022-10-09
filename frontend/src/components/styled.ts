import styled from "styled-components";
import ContactsIcon from "@mui/icons-material/Contacts";
//#f8f4f4
interface HeadlineProps {
    textAlign?: "left" | "right" | "center";
}

interface FlexContainerProps {
    flexDirection?: "row" | "column";
    alignItems?: "center" | "start" | "end" | "stretch" | "flex-start" | "flex-end";
    justifyContent?: "center" | "space-between" | "start" | "space-around" | "space-evenly";
}

export const Headline = styled.h1<HeadlineProps>`
    text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
`;

export const FlexContainer = styled.div<FlexContainerProps>`
    display: flex;
    flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : "row")};
    align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
    justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "center")}; ;
`;

export const Contacts = styled(ContactsIcon)`
    margin-right: 10px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(24, 1fr);
`;

export const Layout = styled.div`
    background-color: ${({ theme }) => theme.palette.background};
    min-height: 100vh;
    grid-column: 1 / span 24;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        grid-column: 3 / span 20;
    }
`;

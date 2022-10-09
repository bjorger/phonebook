import { css, FlattenInterpolation, ThemeProps } from "styled-components/macro";

interface Breakpoints {
    sm: number;
}

interface Palette {
    background: string;
    gray: string;
}

interface Fonts {
    h1: FlattenInterpolation<ThemeProps<unknown>>;
}

interface Theme {
    breakpoints: Breakpoints;
    palette: Palette;
    fonts: Fonts;
}

const breakpoints: Breakpoints = {
    sm: 768,
};

const theme: Theme = {
    breakpoints,
    palette: {
        background: "#f8f4f4",
        gray: "#808080",
    },
    fonts: {
        h1: css`
            font-size: 36px;
            line-height: 36px;
            font-weight: 700;

            @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.md}px`}) {
                font-size: 40px;
                line-height: 50px;
            }
        `,
    },
};

export default theme;

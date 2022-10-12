import { css, FlattenInterpolation, ThemeProps, SimpleInterpolation } from "styled-components/macro";

interface Breakpoints {
    sm: number;
}

interface Palette {
    background: string;
    gray: string;
    white: string;
    error: string;
}

interface Fonts {
    h1: FlattenInterpolation<ThemeProps<unknown>>;
    error: SimpleInterpolation;
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
        white: "#FFFFFF",
        error: "#FF9494",
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
        error: css`
            font-size: 12px;
            line-height: 14px;
            font-weight: 700;
        `,
    },
};

export default theme;

import { c, render, useState } from "atomico/core";
import { styled, ThemeProvider } from "../src";

const theme = {
    colors: {
        brand: "red",
    },
    space: 8,
};

const StyledTest = styled("p")<{ color: string }>`
    background-color: ${(props) => (props.theme as any).colors.brand};
    color: ${(props) => props.color};
    margin-block: 20px;
    padding: ${(props) => (props.theme as any).space}px;

    &:hover {
        color: grey;
    }
`;

function app() {
    const [color, setColor] = useState("black");

    return (
        <host shadowDom>
            <ThemeProvider value={theme}>
                <StyledTest color={color}>Test</StyledTest>
                <button
                    onclick={() =>
                        setColor((prevColor) =>
                            prevColor === "black" ? "white" : "black"
                        )
                    }
                >
                    Change color
                </button>
            </ThemeProvider>
        </host>
    );
}

const App = c(app);

customElements.define("styled-app", App);

render(
    <host>
        <App />
    </host>,
    document.querySelector("#app")
);

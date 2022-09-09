import { c, render, useState } from "atomico/core";
import { styled, ThemeProvider } from "../src";

const theme = {
    colors: {
        brand: "red",
    },
    space: 10,
};

const StyledTest = styled("p")<{ dataStyle: { color: string } }>`
    background-color: ${(props) => (props.theme as any).colors.brand};
    color: ${(props) => props.dataStyle.color};
    margin-block: 20px;
    padding: ${(props) => (props.theme as any).space}px;

    &:hover {
        color: lightgreen;
    }
`;

const StyledButton = styled("button")({
    color: "black",
    cursor: "pointer",
    padding: 5,
});

function app() {
    const [color, setColor] = useState("black");

    return (
        <host shadowDom>
            <ThemeProvider value={theme}>
                <StyledTest data-style={{ color }}>Test</StyledTest>
                <StyledButton
                    onclick={() =>
                        setColor((prevColor) =>
                            prevColor === "black" ? "white" : "black"
                        )
                    }
                >
                    Change color
                </StyledButton>
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
    document.querySelector("#app")!
);

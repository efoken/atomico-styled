import { c, render, useState } from "atomico/core";
import { styled } from "../src";

const StyledTest = styled("p")<{ color: string }>`
    color: ${(props) => props.color};
    background-color: gray;
`;

function app() {
    const [color, setColor] = useState("red");

    return (
        <host shadowDom>
            <StyledTest color={color}>Test</StyledTest>
            <button
                onclick={() =>
                    setColor((prevColor) =>
                        prevColor === "red" ? "blue" : "red"
                    )
                }
            >
                Change color
            </button>
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

import { render } from "atomico/core";
import { styled } from "../src";

const Test = styled("p")<{ color: "red" | "blue" }>`
    color: ${(props) => props.color};
    background-color: gray;
`;

render(
    <host>
        <Test color="red">Test</Test>
    </host>,
    document.querySelector("#app")
);

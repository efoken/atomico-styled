# atomico-styled

Styled components for Atomico.

## Example

```jsx
import { render } from "atomico/core";
import { styled } from "atomico-styled";

const Div = styled("div")`
    color: ${(props) => props.color};
    background-color: black;
`;

render(
    <host>
        <Div color="white">Example</Div>
    </host>,
    document.querySelector("#app")
);
```

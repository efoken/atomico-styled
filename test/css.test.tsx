import { fixture } from "atomico/test-dom";
import { css } from "../src";

describe("css", () => {
    test("float property", () => {
        const cls1 = css`
            :host {
                float: left;
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("handles more than 10 dynamic properties", () => {
        const cls1 = css`
            :host {
                text-decoration: ${"underline"};
                border-right: solid blue 54px;
                background: ${"white"};
                color: ${"black"};
                display: ${"block"};
                border-radius: ${"3px"};
                padding: ${"25px"};
                width: ${"500px"};
                z-index: ${100};
                font-size: ${"18px"};
                text-align: ${"center"};
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("falsy value in nested selector on object", () => {
        const cls1 = css({
            ":host": { ":hover": { display: null, color: "hotpink" } },
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("boolean as value", () => {
        const cls1 = css({
            ":host": {
                display: "flex",
                color: false,
                backgroundColor: true,
            },
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("auto px", () => {
        const cls1 = css({
            ":host": {
                display: "flex",
                flex: 1,
                fontSize: 10,
                "--custom": 5,
            },
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("random interpolation with undefined values", () => {
        const cls2 = css`
            :host {
                ${undefined};
                justify-content: center;
            }
        `;
        const tree = fixture(<style>{cls2}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("random expression", () => {
        const cls2 = css`
            :host {
                font-size: 20px;
                @media (min-width: 420px) {
                    color: blue;
                    ${css`
                        width: 96px;
                        height: 96px;
                    `};
                    line-height: 40px;
                }
                background: green;
            }
        `;
        const tree = fixture(<style>{cls2}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("simple composition", () => {
        const cls1 = css`
            display: flex;
            &:hover {
                color: hotpink;
            }
        `;
        const cls2 = css`
            :host {
                ${cls1};
                justify-content: center;
            }
        `;
        const tree = fixture(<style>{cls2}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("handles objects", () => {
        const cls1 = css({
            ":host": {
                float: "left",
                display: "flex",
                color: `${"blue"}`,
                fontSize: `${"20px"}`,
                height: 50,
                width: 20,
            },
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("handles array of objects", () => {
        const cls1 = css([{ ":host": { height: 50, width: 20 } }, null]);
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("computed key is only dynamic", () => {
        const cls1 = css({ ":host": { fontSize: 10, [`w${"idth"}`]: 20 } });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("composition with objects", () => {
        const cls1 = css({
            display: "flex",
            width: 30,
            height: "calc(40vw - 50px)",
            "&:hover": { color: "blue" },
            ":after": {
                content: '" "',
                color: "red",
            },
            "@media(min-width: 420px)": {
                color: "green",
            },
        });
        const cls2 = css`
            :host {
                ${cls1};
                justify-content: center;
            }
        `;

        const tree = fixture(<style>{cls2}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("@supports", () => {
        const cls1 = css`
            :host {
                @supports (display: grid) {
                    display: grid;
                }
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test.skip("nested at rules", () => {
        const cls1 = css`
            :host {
                @supports (display: grid) {
                    display: grid;
                    @supports (display: flex) {
                        display: flex;
                    }
                }
                @media (min-width: 420px) {
                    color: pink;
                    @media (max-width: 500px) {
                        color: hotpink;
                    }
                }
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("nested array", () => {
        const cls1 = css({
            ":host": [
                [{ display: "inline" }],
                [{ display: "inline-block" }],
                [
                    { display: "block" },
                    [
                        { display: "flex" },
                        [
                            { display: "table" },
                            { color: "darkorchid" },
                            [
                                {
                                    fontSize: 16,
                                },
                                [
                                    {
                                        "&:after": {
                                            backgroundColor: "aquamarine",
                                        },
                                    },
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("explicit false", () => {
        const cls1 = css(false);
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("array with explicit false", () => {
        const cls1 = css([[{ ":host": { display: "flex" } }], false]);
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("array with explicit true", () => {
        const cls1 = css([[{ ":host": { display: "flex" } }], true]);
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("nested", () => {
        const cls1 = css`
            :host {
                color: yellow;
                & .some-class {
                    display: flex;
                    & .some-other-class {
                        background-color: hotpink;
                    }
                    @media (max-width: 600px) {
                        background-color: pink;
                    }
                }
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("explicit &", () => {
        const cls1 = css`
            &.another-class {
                display: flex;
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("falsy property value in object", () => {
        const cls1 = css({
            ":host:": { display: "flex", backgroundColor: undefined },
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("registered styles as nested selector value in object", () => {
        const cls1 = css({ display: "flex", backgroundColor: "hotpink" });
        const cls2 = css({ ":hover": cls1 });
        const tree = fixture(<style>{cls2}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("composition stuff", () => {
        const cls1 = css({ ":host": { justifyContent: "center" } });
        const cls2 = css([cls1]);
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
        const tree2 = fixture(<style>{cls2}</style>);
        expect(tree2).toMatchSnapshot();
    });

    test("null rule", () => {
        const cls1 = css();
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("css variables", () => {
        const cls1 = css`
            :host {
                --some-var: 1px;
                width: var(--some-var);
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("null value", () => {
        const cls1 = css(null);
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("weakmap", () => {
        const styles = { ":host": { display: "flex" } };
        const cls1 = css(styles);
        const cls2 = css(styles);
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
        const tree2 = fixture(<style>{cls2}</style>);
        expect(tree2).toMatchSnapshot();
    });

    test("multiline declaration", () => {
        const cls1 = css`
            display: grid;
            grid:
                "AppBar" auto
                "Main" 1fr
                / 1fr;
        `;

        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("multiline selector", () => {
        const cls1 = css`
            .my-class:hover .its-child {
                background: pink;
            }
        `;

        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("rule after media query", () => {
        const cls1 = css`
            @media (min-width: 600px) {
                :host {
                    color: green;
                }
            }
            :host {
                color: hotpink;
            }
        `;
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("nested at rule", () => {
        const cls1 = css({
            ":host": {
                "@media (min-width: 980px)": {
                    backgroundColor: "blue",
                    "@supports (width: 100vw)": {
                        backgroundColor: "red",
                    },
                },
            },
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });

    test("array fallback", () => {
        const cls1 = css({
            ":host": {
                color: ["yellow", "hotpink"],
            },
        });
        const tree = fixture(<style>{cls1}</style>);
        expect(tree).toMatchSnapshot();
    });
});

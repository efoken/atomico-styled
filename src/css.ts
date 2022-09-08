import { serializeStyles } from "@emotion/serialize";
import { css as createCss, Sheet } from "atomico/core";
import { compile, middleware, prefixer, serialize, stringify } from "stylis";

const cache: Record<string, string> = {};

export function css(strings: TemplateStringsArray, ...values: any[]): Sheet;

export function css(...values: any[]): Sheet;

export function css(this: any, ...values: any[]) {
    const serialized = serializeStyles(values, cache, this);
    return createCss([
        serialize(
            compile(serialized.styles),
            middleware([prefixer, stringify])
        ),
    ] as any);
}

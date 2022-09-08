import { serializeStyles } from "@emotion/serialize";
import { compile, middleware, prefixer, serialize, stringify } from "stylis";

const cache: Record<string, string> = {};

export function css(strings: TemplateStringsArray, ...values: any[]): string;

export function css(...values: any[]): string;

export function css(this: any, ...values: any[]) {
    const serialized = serializeStyles(values, cache, this);
    return serialize(
        compile(serialized.styles),
        middleware([prefixer, stringify])
    );
}

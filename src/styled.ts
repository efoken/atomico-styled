import { useAttributes } from "@atomico/hooks/use-attributes";
import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";
import hash from "@emotion/hash";
import { c, css as createSheet, h } from "atomico/core";
import { useTheme } from "./context";
import { css } from "./css";
import { StyledFunction, StyledOptions } from "./types";
import { interleave } from "./utils";

const elements: Partial<
    Record<keyof HTMLElementTagNameMap, typeof HTMLElement>
> = {
    a: HTMLAnchorElement,
    area: HTMLAreaElement,
    audio: HTMLAudioElement,
    base: HTMLBaseElement,
    blockquote: HTMLQuoteElement,
    body: HTMLBodyElement,
    br: HTMLBRElement,
    button: HTMLButtonElement,
    canvas: HTMLCanvasElement,
    caption: HTMLTableCaptionElement,
    col: HTMLTableColElement,
    colgroup: HTMLTableColElement,
    data: HTMLDataElement,
    datalist: HTMLDataListElement,
    del: HTMLModElement,
    details: HTMLDetailsElement,
    dialog: HTMLDialogElement,
    div: HTMLDivElement,
    dl: HTMLDListElement,
    embed: HTMLEmbedElement,
    fieldset: HTMLFieldSetElement,
    form: HTMLFormElement,
    h1: HTMLHeadingElement,
    h2: HTMLHeadingElement,
    h3: HTMLHeadingElement,
    h4: HTMLHeadingElement,
    h5: HTMLHeadingElement,
    h6: HTMLHeadingElement,
    head: HTMLHeadElement,
    hr: HTMLHRElement,
    html: HTMLHtmlElement,
    iframe: HTMLIFrameElement,
    img: HTMLImageElement,
    input: HTMLInputElement,
    ins: HTMLModElement,
    label: HTMLLabelElement,
    legend: HTMLLegendElement,
    li: HTMLLIElement,
    link: HTMLLinkElement,
    map: HTMLMapElement,
    menu: HTMLMenuElement,
    meta: HTMLMetaElement,
    meter: HTMLMeterElement,
    object: HTMLObjectElement,
    ol: HTMLOListElement,
    optgroup: HTMLOptGroupElement,
    option: HTMLOptionElement,
    output: HTMLOutputElement,
    p: HTMLParagraphElement,
    picture: HTMLPictureElement,
    pre: HTMLPreElement,
    progress: HTMLProgressElement,
    q: HTMLQuoteElement,
    script: HTMLScriptElement,
    select: HTMLSelectElement,
    slot: HTMLSlotElement,
    source: HTMLSourceElement,
    span: HTMLSpanElement,
    style: HTMLStyleElement,
    table: HTMLTableElement,
    tbody: HTMLTableSectionElement,
    td: HTMLTableCellElement,
    template: HTMLTemplateElement,
    textarea: HTMLTextAreaElement,
    tfoot: HTMLTableSectionElement,
    th: HTMLTableCellElement,
    thead: HTMLTableSectionElement,
    time: HTMLTimeElement,
    title: HTMLTitleElement,
    tr: HTMLTableRowElement,
    track: HTMLTrackElement,
    ul: HTMLUListElement,
    video: HTMLVideoElement,
};

export function styled<
    Tag extends keyof HTMLElementTagNameMap,
    Props extends object = {}
>(
    element: Tag,
    { label, resolver }: StyledOptions = {}
): StyledFunction<Props> {
    return (...rawStyles: any[] | any) => {
        const name = label
            ? `styled-${label}`
            : `styled-${element}-${hash(JSON.stringify(rawStyles))}`;

        const styles =
            rawStyles[0] == null || rawStyles[0].raw == null
                ? rawStyles
                : interleave(rawStyles);

        const Styled = c(() => {
            const theme = useTheme();

            const props = useAttributes();

            Object.entries(props).forEach(([key, value]) => {
                try {
                    props[key] = JSON.parse(value);
                } catch {
                    // do nothing
                }
            });

            Object.assign(props, { theme });

            useCssLightDom(
                createSheet([
                    css.apply(props, [
                        ":host{",
                        ...(resolver?.(props as any) ?? []),
                        ...styles,
                        "}",
                    ]),
                ] as any)
            );

            return h("host", null);
        }, elements[element]);

        if (!customElements.get(name)) {
            customElements.define(name, Styled, {
                extends: element,
            });
        }

        return Styled as any;
    };
}

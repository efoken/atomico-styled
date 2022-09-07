import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";
import hash from "@emotion/hash";
import { c, Component, h, useHost } from "atomico/core";
import { css } from "./css";
import { CreateStyledComponent } from "./types";
import { interleave } from "./utils";

const elements: Partial<
    Record<keyof HTMLElementTagNameMap, typeof HTMLElement>
> = {
    a: HTMLAnchorElement,
    abbr: HTMLElement,
    address: HTMLElement,
    area: HTMLAreaElement,
    article: HTMLElement,
    aside: HTMLElement,
    audio: HTMLAudioElement,
    b: HTMLElement,
    base: HTMLBaseElement,
    bdi: HTMLElement,
    bdo: HTMLElement,
    blockquote: HTMLQuoteElement,
    body: HTMLBodyElement,
    br: HTMLBRElement,
    button: HTMLButtonElement,
    canvas: HTMLCanvasElement,
    caption: HTMLTableCaptionElement,
    cite: HTMLElement,
    code: HTMLElement,
    col: HTMLTableColElement,
    colgroup: HTMLTableColElement,
    data: HTMLDataElement,
    datalist: HTMLDataListElement,
    dd: HTMLElement,
    del: HTMLModElement,
    details: HTMLDetailsElement,
    dfn: HTMLElement,
    dialog: HTMLDialogElement,
    div: HTMLDivElement,
    dl: HTMLDListElement,
    dt: HTMLElement,
    em: HTMLElement,
    embed: HTMLEmbedElement,
    fieldset: HTMLFieldSetElement,
    figcaption: HTMLElement,
    figure: HTMLElement,
    footer: HTMLElement,
    form: HTMLFormElement,
    h1: HTMLHeadingElement,
    h2: HTMLHeadingElement,
    h3: HTMLHeadingElement,
    h4: HTMLHeadingElement,
    h5: HTMLHeadingElement,
    h6: HTMLHeadingElement,
    head: HTMLHeadElement,
    header: HTMLElement,
    hgroup: HTMLElement,
    hr: HTMLHRElement,
    html: HTMLHtmlElement,
    i: HTMLElement,
    iframe: HTMLIFrameElement,
    img: HTMLImageElement,
    input: HTMLInputElement,
    ins: HTMLModElement,
    kbd: HTMLElement,
    label: HTMLLabelElement,
    legend: HTMLLegendElement,
    li: HTMLLIElement,
    link: HTMLLinkElement,
    main: HTMLElement,
    map: HTMLMapElement,
    mark: HTMLElement,
    menu: HTMLMenuElement,
    meta: HTMLMetaElement,
    meter: HTMLMeterElement,
    nav: HTMLElement,
    noscript: HTMLElement,
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
    rp: HTMLElement,
    rt: HTMLElement,
    ruby: HTMLElement,
    s: HTMLElement,
    samp: HTMLElement,
    script: HTMLScriptElement,
    section: HTMLElement,
    select: HTMLSelectElement,
    slot: HTMLSlotElement,
    small: HTMLElement,
    source: HTMLSourceElement,
    span: HTMLSpanElement,
    strong: HTMLElement,
    style: HTMLStyleElement,
    sub: HTMLElement,
    summary: HTMLElement,
    sup: HTMLElement,
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
    u: HTMLElement,
    ul: HTMLUListElement,
    var: HTMLElement,
    video: HTMLVideoElement,
    wbr: HTMLElement,
};

export function styled<
    Tag extends keyof HTMLElementTagNameMap,
    Props extends object = {}
>(element: Tag): CreateStyledComponent<Props> {
    return (...rawStyles: any[] | any) => {
        const name = `css-${hash(JSON.stringify(rawStyles))}`;

        const styles =
            rawStyles[0] == null || rawStyles[0].raw === undefined
                ? rawStyles
                : interleave(rawStyles);

        const Styled: Component = () => {
            const host = useHost();
            const props = Object.fromEntries(
                Object.entries(host.current.attributes).map(([, attr]) => {
                    host.current.removeAttribute(attr.nodeName);
                    return [attr.nodeName, attr.nodeValue];
                })
            );
            useCssLightDom(css.apply(props, [":host{", ...styles, "}"]));
            return h("host", {});
        };

        Styled.props = {};

        if (!customElements.get(name)) {
            customElements.define(name, c(Styled, elements[element]), {
                extends: element,
            });
        }

        return customElements.get(name) as any;
    };
}

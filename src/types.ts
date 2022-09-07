import { Interpolation } from "@emotion/serialize";
import { Atomico } from "atomico/types/dom";

export interface StyledComponent<
    Props extends object,
    Base extends HTMLElement = HTMLElement
> extends Atomico<Props, Base> {}

export interface CreateStyledComponent<
    Props extends object,
    Base extends HTMLElement = HTMLElement
> {
    <AdditionalProps extends object = {}>(
        ...styles: Interpolation<Props & AdditionalProps & { theme: any }>[]
    ): StyledComponent<Props & AdditionalProps, Base>;

    (
        template: TemplateStringsArray,
        ...styles: Interpolation<Props & { theme: any }>[]
    ): StyledComponent<Props, Base>;

    <AdditionalProps extends object>(
        template: TemplateStringsArray,
        ...styles: Interpolation<Props & AdditionalProps & { theme: any }>[]
    ): StyledComponent<Props & AdditionalProps, Base>;
}

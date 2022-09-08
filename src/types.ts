import { Interpolation } from "@emotion/serialize";
import { Atomico } from "atomico/types/dom";

export interface Theme {}

export interface StyledOptions {
    label?: string;
}

interface StyledComponent<
    Props extends object,
    Base extends HTMLElement = HTMLElement
> extends Atomico<Props, Base> {}

export interface StyledFunction<
    Props extends object,
    Base extends HTMLElement = HTMLElement
> {
    <AdditionalProps extends object = {}>(
        ...styles: Interpolation<Props & AdditionalProps & { theme: Theme }>[]
    ): StyledComponent<Props & AdditionalProps, Base>;

    (
        template: TemplateStringsArray,
        ...styles: Interpolation<Props & { theme: Theme }>[]
    ): StyledComponent<Props, Base>;

    <AdditionalProps extends object>(
        template: TemplateStringsArray,
        ...styles: Interpolation<Props & AdditionalProps & { theme: Theme }>[]
    ): StyledComponent<Props & AdditionalProps, Base>;
}

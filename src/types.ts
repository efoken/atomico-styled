import { Interpolation } from "@emotion/serialize";
import { Atomico } from "atomico/types/dom";

export interface Theme {}

export interface StyledOptions {
    label?: string;
    resolver?: (props: object & { theme: Theme }) => any[];
}

type KebabCase<S> = S extends `${infer C}${infer T}`
    ? T extends Uncapitalize<T>
        ? `${Uncapitalize<C>}${KebabCase<T>}`
        : `${Uncapitalize<C>}-${KebabCase<T>}`
    : S;

type KebabCaseProps<Props extends object> = {
    [K in keyof Props as KebabCase<K>]: Props[K];
};

interface StyledComponent<
    Props extends object,
    Base extends HTMLElement = HTMLElement
> extends Atomico<KebabCaseProps<Props>, Base> {}

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

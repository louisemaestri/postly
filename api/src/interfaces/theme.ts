export interface ThemeModifier {
    label: string;
    value: string;
}

export interface Theme {
    name: string;
    modifiers: Array<ThemeModifier>
}
import { capitalizeFirstLetterOfEveryWord } from "./stringUtils";

export const toOption = (input: [label: string, value: string] | string) => {
    if (Array.isArray(input) && input.length === 2) {
        const [value, label] = input;
        return {
            value,
            label: capitalizeFirstLetterOfEveryWord(label),
        };
    } else {
        return {
            value: input,
            label: capitalizeFirstLetterOfEveryWord(input),
        };
    }
};

export const objToOptions = (input: string[]) => {
    const sorted = input.toSorted();
    const mapped = sorted.map(toOption);

    return mapped;
};
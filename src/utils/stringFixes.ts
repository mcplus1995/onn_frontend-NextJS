import { capitalizeFirstLetterOfEveryWord } from "./stringUtils";

export const normalizeWithFixes = (text: string, autoCapitalize: boolean = false) => {
    let ret = "";
    if (stringFixes.has(text)) {
        ret = stringFixes.get(text) || "";
    }

    // If still empty check with capitalized version as well
    if (ret === "" && stringFixes.has(capitalizeFirstLetterOfEveryWord(text))) {
        ret = stringFixes.get(capitalizeFirstLetterOfEveryWord(text)) || "";
    }

    // If we still haven't found anything - return input string unchanged
    if (ret === "") {
        ret = autoCapitalize ? capitalizeFirstLetterOfEveryWord(text) : text;
    }

    return ret;
}

const stringFixes = new Map<string, string>();
stringFixes.set('china', 'China');
stringFixes.set('China', 'China');
stringFixes.set('eu', 'EU');
stringFixes.set('Eu', 'EU');
stringFixes.set('usa', 'USA');
stringFixes.set('Usa', 'USA');
stringFixes.set('rok', 'ROK');
stringFixes.set('Rok', 'ROK');
stringFixes.set('un security council', 'UN Security Council');
stringFixes.set('Un Security Council', 'UN Security Council');
stringFixes.set('violation of unsc resolutions', 'Violation of UNSC resolutions');
stringFixes.set('Violation Of Unsc Resolutions', 'Violation of UNSC resolutions');

export default stringFixes;
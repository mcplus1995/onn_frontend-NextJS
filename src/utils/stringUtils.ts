export const stringToSlug = (string: string) => {
    if (!string) return "";
    return string.toLocaleLowerCase().replace(/\s/g, "-");
  };
  
  const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  export const slugToString = (string: string) => {
    if (!string) return "";
    return capitalizeFirstLetter(string.replace("-", " "));
  };
  
  export const capitalizeFirstLetterOfEveryWord = (string: string) => {
    if (!string) return "";
    const words = string.split(" ");
    words.forEach((word, index) => {
      words[index] = capitalizeFirstLetter(word);
    });
    return words.join(" ");
  };
  
  export const nl2br = (string: string) => {
    return string.replace(/\n/g, "<br />");
  };
  
  export const pluralize = (count: number, singular: string, plural: string) => {
    return `${count} ${count > 1 ? plural : singular}`;
  };
  
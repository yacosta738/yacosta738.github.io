export const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const inlineLinks = (className: string) => {
  const elements = Array.from(document.querySelectorAll(className));
  const allLinks = new Array<HTMLElement[]>();
  elements.forEach((el) => allLinks.push(Array.from(el.querySelectorAll("a"))));
  if (allLinks.length > 0) {
    allLinks.forEach((links) => {
      links.forEach((link) => link.classList.add("inline-link"));
    });
  }
};

export const formatDate = (
  date: string,
  dateFormat = "MMMM, yyyy",
  locale = "en"
): string => {
  let lc;
  switch (locale) {
    case "en":
        lc = "en-US";
        break;
    case "es":
        lc = "es-ES";
        break;
    default:
        lc = "en-US";
        break;
    }
    const d = new Date(date);
    return d.toLocaleDateString(lc, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        hour12: false,
        timeZone: "America/New_York",
        dateStyle: "full",
        timeStyle: "short",
        formatMatcher: "basic"
    });
    
};

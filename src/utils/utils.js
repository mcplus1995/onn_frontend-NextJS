import * as R from "ramda";

import { format, formatDistanceToNow, parseISO } from "date-fns";

import { capitalizeFirstLetterOfEveryWord } from "./stringUtils";
import env from "@/env";

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const toOption = R.ifElse(
  R.is(Array),
  ([value, label]) => ({
    value,
    label: capitalizeFirstLetterOfEveryWord(label),
  }),
  (item) => ({ value: item, label: capitalizeFirstLetterOfEveryWord(item) })
);

export const objToOptions = (obj) => {
  const pairs = R.toPairs(obj || []);
  const sortedPairs = pairs.sort((a, b) => a[0].localeCompare(b[0])); // Sort by key in ascending order
  return R.map(toOption, sortedPairs);
};

export function addConfirm(fn, msg = "Are you sure?") {
  const r = window.confirm(msg);

  if (r === true) {
    fn();
  }

  return null;
}

export function formatDate(datetime, full = false) {
  if (!datetime) {
    return "";
  }
  const _format = full ? "yyyy-MM-dd h:mm a" : "yyyy-MM-dd";
  return format(parseISO(datetime), _format);
}

export function formatDistance(datetime, suffix = true) {
  if (!datetime) {
    return "";
  }
  return formatDistanceToNow(parseISO(datetime), { addSuffix: suffix });
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function formatFTSHeadline(headline) {
  const chunks = headline.split("[__fts]");
  const elms = [];
  for (let i = 0; i < chunks.length; i++) {
    const Comp = i % 2 === 0 ? "span" : "mark";
    elms.push(<Comp key={"fts-" + i}>{chunks[i]}</Comp>);
  }
  return elms;
}

const _colorCache = {};
export function getColor(_string, _opts) {
  const string = _string.slice(0, 25);

  if (_colorCache[string]) return _colorCache[string];

  const opts = _opts || {};
  opts.hue = opts.hue || [0, 360];
  opts.sat = opts.sat || [75, 100];
  opts.lit = opts.lit || [30, 50];

  const range = function (hash, min, max) {
    const diff = max - min;
    const x = ((hash % diff) + diff) % diff;
    return x + min;
  };

  let hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const h = range(hash, opts.hue[0], opts.hue[1]);
  const s = range(hash, opts.sat[0], opts.sat[1]);
  const l = range(hash, opts.lit[0], opts.lit[1]);

  const color = `hsl(${h}, ${s}%, ${l}%)`;
  _colorCache[string] = color;
  return color;
}

export const isDevelopementEnv = () => process.env.NODE_ENV === "development";
export const isProductionEnv = () => process.env.NODE_ENV === "production";

export const getFrontendBaseUrl = () => {
  return env.urls.cms;
};

export const getBackendBaseUrl = () => {
  return env.urls.onn;
};

export const stripTags = (content) => {
  return content.replace(/(<([^>]+)>)/gi, "");
};

export const stripTagsExceptFirstHeading = (content, shouldStripHeadings) => {
  let isFirstHeading = true;
  let retContent = "";
  console.log({ before: content, shouldStripHeadings });
  retContent = content.replace(
    /<(\/?)(\w+)([^>]*)>/gi,
    (matched, closingSlash, tagName, rest) => {
      // If it's a heading tag and we haven't processed one before, keep it
      if (
        !shouldStripHeadings &&
        isFirstHeading &&
        (tagName.toLowerCase() === "h2" ||
          tagName.toLowerCase() === "h3" ||
          tagName.toLowerCase() === "h4")
      ) {
        if (closingSlash) {
          // If it's a closing tag, we've processed the first heading
          isFirstHeading = false;
        }
        return matched;
      }
      // Otherwise, strip the tag
      return "";
    }
  );
  console.log({ after: retContent });
  return retContent;
};

export const cleanHtml = (inputHtml) => {
  if (typeof window === "undefined") {
    return inputHtml;
  }
  let parser = new DOMParser();
  let parsedHtml = parser.parseFromString(inputHtml, "text/html");
  let body = parsedHtml.body;

  // Remove footnotes for card preview
  let footnotes = body.querySelectorAll(".footnote");
  // console.log({ footnotes });
  footnotes.forEach((footnote) => footnote.remove());

  // Add spaces around headline tags within the content. Otherwise they look weird
  let headlines = body.querySelectorAll("h2, h3, h4, h5");
  headlines.forEach((headline) => {
    headline.textContent = " " + headline.textContent + " ";
  });

  // Remove all HTML tags except the first h2, h3, or h4
  let output = "";
  for (let i = 0; i < body.childNodes.length; i++) {
    let node = body.childNodes[i];
    if (
      i === 0 &&
      (node.tagName === "H2" ||
        node.tagName === "H3" ||
        node.tagName === "H4" ||
        node.tagName === "H5")
    ) {
      // Remove attributes from the first h2, h3 or h4 tag
      let tagText =
        "<" +
        node.tagName.toLowerCase() +
        ">" +
        node.textContent +
        "</" +
        node.tagName.toLowerCase() +
        ">";
      output += tagText;
    } else {
      // Remove all other HTML tags
      output += node.textContent;
    }
  }
  return output;
};

// recursively build a tree from the given array of objects
// where objects have a 'parent' object property with the parent 'id'
// export function getTree(xs = []) {
//   function _getChildren(parent) {
//     const children = xs.filter(R.pathEq(['parent', 'id'], parent));
//     return R.map((c) => R.assoc('children', _getChildren(c.id), c), children);
//   }
//
//   const tree = R.filter(R.propEq('parent', null), xs);
//   return R.map((t) => R.assoc('children', _getChildren(t.id), t), tree);
// }
//

import * as R from "ramda";

import axios from "axios";
import qs from "query-string";
import env from "../env";

function getCookie(cookie, name) {
  const match = cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return match ? match[2] : "";
}

// creates and axios instance; accepts base url
// and optionally a nextjs request object
function axiosClient(baseURL, req) {
  const cookie = req ? req.headers.cookie : document.cookie;
  const headers = {};
  if (cookie) {
    const csrfToken = getCookie(cookie, "csrftoken");
    if (csrfToken && csrfToken !== "") {
      headers["X-CSRFToken"] = csrfToken;
    }

    if (req) {
      headers.cookie = cookie;
    }
  }

  return axios.create({
    baseURL,
    headers,
    withCredentials: true,
    paramsSerializer: qs.stringify,
  });
}
export const api = (req) => axiosClient(`${env.urls.onn}api/`, req);
export const apiP = (req) => axiosClient(`${env.urls.onn}p/`, req);

// ---- helper function ----
// creates and action for the giver api, where action:
// takes a list: [method, path, params, responseTransformer]
// and optionally applies the responseTransformer to the response data
function _action(_api) {
  return (config) =>
    (...args) => {
      const [method, path, params, responseTransformer] = config;

      const payload = R.includes(method, ["get", "options"])
        ? { params }
        : params;
      return _api(...args)
        [method](path, payload)
        .then(({ data }) =>
          responseTransformer ? responseTransformer(data) : data
        )
        .catch((err) => {
          if (err.response) {
            throw err.response;
          } else {
            throw err;
          }
        });
    };
}

export const action = _action(api);
export const actionP = _action(apiP);

export default api;

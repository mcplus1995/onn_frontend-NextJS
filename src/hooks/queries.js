import * as R from "ramda";

import queries from "../api/queries";
import { useQuery } from "react-query";

// generate react-query useQuery hooks with this. takes an object:
// {
//  [name]: (...args) => ({key: , action: })
//  ...
// }
// and generates a useName hook
const generateQueryHooks = R.compose(
  R.fromPairs,
  R.map(([name, fn]) => [
    `use${name[0].toUpperCase()}${name.slice(1)}`,
    (...args) => {
      const { key, action, reactQueryOptions = null } = fn(...args);
      if (reactQueryOptions)
        return useQuery(key, () => action(), reactQueryOptions);
      else return useQuery(key, () => action());
    },
  ]),
  R.toPairs
);

export default generateQueryHooks(queries);

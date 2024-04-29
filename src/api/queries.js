import * as R from "ramda";

import { action, actionP } from "./client.js";

const api = {
  auth: () => ({
    key: ["users", "auth"],
    action: action(["get", "users/me/"]),
  }),

  pathwaysMeta: () => ({
    key: ["meta", "pathways"],
    action: actionP(["get", "meta/pathways/"]),
  }),
  sanctionsMeta: () => ({
    key: ["meta", "sanctions"],
    action: actionP(["get", "meta/sanctions/"]),
  }),
  analysisMeta: () => ({
    key: ["meta", "analysis"],
    action: actionP(["get", "meta/analysis/"]),
  }),

  things: (filters) => ({
    key: ["things", "list", filters],
    action: actionP(["get", "things/", filters]),
  }),
  thing: (slug) => ({
    key: ["things", "detail", slug],
    action: actionP(["get", `things/${slug}/`]),
  }),
  thingRevisions: (filters) => ({
    key: ["things", "revisions", filters],
    action: action(["get", `thing_revisions/`, filters]),
  }),
  thingRevision: (id) => ({
    key: ["things", "revision", id],
    action: action(["get", `thing_revisions/${id}/`]),
  }),
  pathways: (filters) => ({
    key: ["pathways", "list", filters],
    action: actionP(["get", "pathways/", filters]),
  }),
  pathway: (slug) => {
    return {
      key: ["pathways", "detail", slug],
      action: actionP(["get", `pathways/${slug}/`]),
    };
  },

  sanctions: (filters) => ({
    key: ["sanctions", "list", filters],
    action: actionP(["get", "sanctions/", filters]),
  }),
  sanctionStats: (filters) => ({
    key: ["sanctions", "stats", filters],
    action: actionP(["get", "sanctions/stats/", filters]),
  }),

  articles: (filters, reactQueryOptions) => ({
    key: ["articles", "list", filters],
    action: action(["get", "articles/", { ...filters }]),
    reactQueryOptions,
  }),
  article: (id) => ({
    key: ["articles", "detail", id],
    action: action(["get", `articles/${id}/`, null, doubleLineBreak]),
  }),

  articleSiteGroupings: (filters, reactQueryOptions) => ({
    key: ["articlesitegroupings"],
    action: action(["get", `articlesitegroupings/`, { ...filters }]),
    reactQueryOptions
  }),

  thread: (tId) => ({
    key: ["comments", "target", tId],
    action: action(["get", "comments/", { target_id: tId }]),
  }),
  recentComments: () => ({
    key: ["comments", "recent"],
    action: action([
      "get",
      "comments/",
      { o: "-created_at", page_size: 10 },
      R.prop("results"),
    ]),
  }),

  tags: (filters) => ({
    key: ["tags", "list", filters],
    action: action(["get", "tags/", filters]),
  }),
  categories: (filters) => ({
    key: ["categories", "list", filters],
    action: actionP(["get", "categories/", filters]),
  }),
};

// temp hack for better formatting
const doubleLineBreak = R.over(
  R.lensProp("content"),
  R.compose(R.trim, R.replace(/\n/g, "\n\n"))
);

export default api;
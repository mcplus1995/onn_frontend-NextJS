/**
 * Generated by @openapi-codegen
 *
 * @version 10.9.1
 */
export type Query = {
  /**
   * Control what fields are being returned in the object.
   *
   * @example *
   * @example *.*
   */
  fields?: string[];
  /**
   * @example {"<field>":{"<operator>":"<value>"}}
   */
  filter?: Record<string, any>;
  /**
   * Filter by items that contain the given search query in one of their fields.
   */
  search?: string;
  /**
   * How to sort the returned items.
   *
   * @example -date_created
   */
  sort?: string[];
  /**
   * Set the maximum number of items that will be returned
   */
  limit?: number;
  /**
   * How many items to skip when fetching data.
   */
  offset?: number;
  /**
   * Cursor for use in pagination. Often used in combination with limit.
   */
  page?: number;
  /**
   * Deep allows you to set any of the other query parameters on a nested relational dataset.
   *
   * @example {"related_articles":{"_limit":3}}
   */
  deep?: Record<string, any>;
};

export type XMetadata = {
  /**
   * Returns the total item count of the collection you're querying.
   */
  total_count?: number;
  /**
   * Returns the item count of the collection you're querying, taking the current filter/search parameters into account.
   */
  filter_count?: number;
};

/**
 * @x-collection escalation_pathways
 */
export type ItemsEscalationPathways = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
  /**
   * This slug will be automatically generated/updated based on the title field
   */
  slug?: string | null;
  content?: string | null;
  region_id?: number | ItemsEscalationRegions | null;
  djangoId?: string | null;
  /**
   * This is the JSON representation of the page content after transition from django
   */
  djangoContent?: void | null;
  statuses?: (number | ItemsEscalationPathwayStatuses)[] | null;
  articles?: (number | ItemsArticlesEscalationPathways)[] | null;
};

/**
 * @x-collection escalation_pathway_statuses
 */
export type ItemsEscalationPathwayStatuses = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
  description?: string | null;
  impact?: number | null;
  likelihood?: number | null;
  escalation_pathway_id?: number | ItemsEscalationPathways | null;
  djangoId?: string | null;
  djangoContent?: void | null;
};

/**
 * @x-collection escalation_regions
 */
export type ItemsEscalationRegions = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  /**
   * This slug will be automatically generated/updated based on the title field
   */
  slug?: string | null;
  title?: string | null;
  djangoId?: string | null;
  pathways?: (number | ItemsEscalationPathways)[] | null;
};

/**
 * @x-collection global
 */
export type ItemsGlobal = {
  id?: number;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  description?: string | null;
  title?: string | null;
  favicon?: string | Files | null;
  oef_content?: string | null;
  oef_display_cta?: boolean | null;
  oef_cta_label?: string | null;
  oef_cta_link?: string | null;
};

/**
 * @x-collection homepage
 */
export type ItemsHomepage = {
  id?: number;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
  blocks?: (number | ItemsHomepageBlocks)[] | null;
};

/**
 * @x-collection navigations
 */
export type ItemsNavigations = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  /**
   * This serves as the internal title for this navigation
   */
  title?: string | null;
  items?: void | null;
};

/**
 * @x-collection sanction_entities
 */
export type ItemsSanctionEntities = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string;
};

/**
 * @x-collection sanction_sectors
 */
export type ItemsSanctionSectors = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
};

/**
 * @x-collection sanction_types
 */
export type ItemsSanctionTypes = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
};

/**
 * @x-collection sanctions
 */
export type ItemsSanctions = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  parent?: number | ItemsSanctions | null;
  entity?: number | ItemsSanctionEntities | null;
  /**
   * @format date
   */
  date?: string | null;
  sanction_status?: string | null;
  reference?: string | null;
  short_description?: string | null;
  text_internal?: string | null;
  djangoId?: string | null;
  slug?: string | null;
  title?: string | null;
  statutory_basis?: string | null;
  link?: string | null;
  type?: (number | ItemsSanctionsSanctionTypes)[] | null;
  purpose?: (number | ItemsSanctionsSanctionPurposes)[] | null;
  sector?: (number | ItemsSanctionsSanctionSectors)[] | null;
};

/**
 * @x-collection sanctions_sanction_purposes
 */
export type ItemsSanctionsSanctionPurposes = {
  id?: number;
  sanctions_id?: number | ItemsSanctions | null;
  sanction_purposes_id?: number | ItemsSanctionPurposes | null;
};

/**
 * @x-collection wiki_page
 */
export type ItemsWikiPage = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
  /**
   * This slug will be automatically generated/updated based on the title field
   */
  slug?: string | null;
  teaser_text?: string | null;
  content?: string | null;
  parent?: number | ItemsWikiPage | null;
  /**
   * This title will be used instead of the title property if this page is used within a navigation
   */
  nav_title?: string | null;
  /**
   * This is for historical purposes during migration
   */
  djangoId?: string | null;
  /**
   * This is the JSON representation of the page content after transition from django
   */
  djangoContent?: void | null;
  hero?: string | Files | null;
  children?: (number | ItemsWikiPage)[] | null;
  categories?: (number | ItemsWikiPageWikiCategory)[] | null;
};

/**
 * @x-collection wiki_page_wiki_category
 */
export type ItemsWikiPageWikiCategory = {
  id?: number;
  wiki_page_id?: number | ItemsWikiPage | null;
  wiki_category_id?: number | ItemsWikiCategory | null;
};

/**
 * @x-collection sanctions_sanction_types
 */
export type ItemsSanctionsSanctionTypes = {
  id?: number;
  sanctions_id?: number | ItemsSanctions | null;
  sanction_types_id?: number | ItemsSanctionTypes | null;
};

/**
 * @x-collection wiki_category
 */
export type ItemsWikiCategory = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
  /**
   * This slug will be automatically generated/updated based on the title field
   */
  slug?: string | null;
  description?: string | null;
  /**
   * This title will be used instead of the title property if this page is used within a navigation
   */
  nav_title?: string | null;
  wiki_pages?: (number | ItemsWikiPageWikiCategory)[] | null;
};

/**
 * @x-collection article_sources_articles
 */
export type ItemsArticleSourcesArticles = {
  id?: number;
  article_sources_id?: number | ItemsArticleSources | null;
  articles_id?: number | ItemsArticles | null;
};

/**
 * @x-collection homepage_blocks
 */
export type ItemsHomepageBlocks = {
  id?: number;
  homepage_id?: number | ItemsHomepage | null;
  item?:
    | (string | ItemsBlockCardgroup | ItemsBlockHero | ItemsBlockRichtext)[]
    | null;
  sort?: number | null;
  collection?: string | null;
};

/**
 * @x-collection sanction_purposes
 */
export type ItemsSanctionPurposes = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
};

/**
 * @x-collection sanctions_sanction_sectors
 */
export type ItemsSanctionsSanctionSectors = {
  id?: number;
  sanctions_id?: number | ItemsSanctions | null;
  sanction_sectors_id?: number | ItemsSanctionSectors | null;
};

/**
 * @x-collection directus_files
 */
export type Files = {
  /**
   * Unique identifier for the file.
   *
   * @example 8cbb43fe-4cdf-4991-8352-c461779cec02
   */
  id?: string;
  /**
   * Where the file is stored. Either `local` for the local filesystem or the name of the storage adapter (for example `s3`).
   *
   * @example local
   */
  storage?: string;
  /**
   * Name of the file on disk. By default, Directus uses a random hash for the filename.
   *
   * @example a88c3b72-ac58-5436-a4ec-b2858531333a.jpg
   */
  filename_disk?: string;
  /**
   * How you want to the file to be named when it's being downloaded.
   *
   * @example avatar.jpg
   */
  filename_download?: string;
  /**
   * Title for the file. Is extracted from the filename on upload, but can be edited by the user.
   *
   * @example User Avatar
   */
  title?: string;
  /**
   * MIME type of the file.
   *
   * @example image/jpeg
   */
  type?: string;
  /**
   * Virtual folder where this file resides in.
   *
   * @example null
   */
  folder?: string | Folders | null;
  /**
   * Who uploaded the file.
   *
   * @example 63716273-0f29-4648-8a2a-2af2948f6f78
   */
  uploaded_by?: string | Users;
  /**
   * When the file was uploaded.
   *
   * @example 2019-12-03T00:10:15+00:00
   * @format date-time
   */
  uploaded_on?: string;
  /**
   * @format uuid
   */
  modified_by?: string | null;
  /**
   * @format timestamp
   */
  modified_on?: string;
  /**
   * Character set of the file.
   *
   * @example binary
   */
  charset?: string | null;
  /**
   * Size of the file in bytes.
   *
   * @example 137862
   */
  filesize?: number;
  /**
   * Width of the file in pixels. Only applies to images.
   *
   * @example 800
   */
  width?: number | null;
  /**
   * Height of the file in pixels. Only applies to images.
   *
   * @example 838
   */
  height?: number | null;
  /**
   * Duration of the file in seconds. Only applies to audio and video.
   *
   * @example 0
   */
  duration?: number | null;
  /**
   * Where the file was embedded from.
   *
   * @example null
   */
  embed?: string | null;
  /**
   * Description for the file.
   */
  description?: string | null;
  /**
   * Where the file was created. Is automatically populated based on Exif data for images.
   */
  location?: string | null;
  /**
   * Tags for the file. Is automatically populated based on Exif data for images.
   */
  tags?: string[] | null;
  /**
   * IPTC, Exif, and ICC metadata extracted from file
   */
  metadata?: Record<string, any> | null;
  focal_point_x?: number | null;
  focal_point_y?: number | null;
};

/**
 * @x-collection article_sources
 */
export type ItemsArticleSources = {
  id?: number;
  status?: string;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  start_url?: string | null;
  crawl_config?: void | null;
  title?: string | null;
  is_active?: boolean | null;
  /**
   * Add multiple keywords seperated by comma
   */
  keywords?: string | null;
  articles?: (number | ItemsArticles)[] | null;
};

/**
 * @x-collection articles
 */
export type ItemsArticles = {
  id?: number;
  status?: string | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  /**
   * This slug will be automatically generated/updated based on the title field
   */
  slug?: string | null;
  content?: string | null;
  is_relevant?: boolean | null;
  /**
   * @format float
   */
  relevance_score?: number | null;
  /**
   * @format timestamp
   */
  crawled_at?: string | null;
  raw_data?: void | null;
  tags?: void | null;
  article_source?: number | ItemsArticleSources | null;
  djangoId?: string | null;
  title?: string | null;
  language?: string | null;
  escalation_pathways?: (number | ItemsArticlesEscalationPathways)[] | null;
  interacting_users?: (number | ItemsArticlesDirectusUsers)[] | null;
};

/**
 * @x-collection articles_directus_users
 */
export type ItemsArticlesDirectusUsers = {
  id?: number;
  articles_id?: number | ItemsArticles | null;
  /**
   * @format uuid
   */
  directus_users_id?: string | null;
};

/**
 * @x-collection articles_escalation_pathways
 */
export type ItemsArticlesEscalationPathways = {
  id?: number;
  articles_id?: number | ItemsArticles | null;
  escalation_pathways_id?: number | ItemsEscalationPathways | null;
};

/**
 * @x-collection block_cardgroup
 */
export type ItemsBlockCardgroup = {
  id?: number;
  status?: string;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  headline?: string | null;
  content?: string | null;
  group_type?: string | null;
  cards?: (number | ItemsBlockCardgroupCards)[] | null;
  pages?: (number | ItemsBlockCardgroupCMSPage)[] | null;
};

/**
 * @x-collection block_cardgroup_cards
 */
export type ItemsBlockCardgroupCards = {
  id?: number;
  cardgroup_id?: number | ItemsBlockCardgroup | null;
  icon?: string | null;
  headline?: string | null;
  content?: string | null;
  link_label?: string | null;
  link_url?: string | null;
  link?: boolean | null;
  sort?: number | null;
  custom_icon?: string | Files | null;
};

/**
 * @x-collection block_cardgroup_cms_page
 */
export type ItemsBlockCardgroupCMSPage = {
  id?: number;
  block_cardgroup_id?: number | ItemsBlockCardgroup | null;
  cms_page_id?: number | ItemsCMSPage | null;
};

/**
 * @x-collection block_hero
 */
export type ItemsBlockHero = {
  id?: number;
  status?: string;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  image?: string | Files | null;
  overlay_text?: string | null;
  overlay_color?: string | null;
};

/**
 * @x-collection cms_page
 */
export type ItemsCMSPage = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  hero?: string | Files | null;
  title?: string | null;
  summary?: string | null;
  content?: string | null;
  tags?: void | null;
  /**
   * This slug will be automatically generated/updated based on the title field
   */
  slug?: string | null;
  /**
   * This title will be used instead of the title property if this page is used within a navigation
   */
  nav_title?: string | null;
  hero_caption?: string | null;
  categories?: (number | ItemsCMSPageCMSCategory)[] | null;
};

/**
 * @x-collection block_richtext
 */
export type ItemsBlockRichtext = {
  id?: number;
  status?: string;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  headline?: string | null;
  content?: void | null;
};

/**
 * @x-collection cms_category
 */
export type ItemsCMSCategory = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  title?: string | null;
  intro_text?: string | null;
  /**
   * This slug will be automatically generated/updated based on the title field
   */
  slug?: string | null;
  /**
   * This title will be used instead of the title property if this page is used within a navigation
   */
  nav_title?: string | null;
};

/**
 * @x-collection cms_page_cms_category
 */
export type ItemsCMSPageCMSCategory = {
  id?: number;
  cms_page_id?: number | ItemsCMSPage | null;
  cms_category_id?: number | ItemsCMSCategory | null;
};

/**
 * @x-collection comments
 */
export type ItemsComments = {
  id?: number;
  status?: string;
  sort?: number | null;
  /**
   * @format uuid
   */
  user_created?: string | null;
  /**
   * @format timestamp
   */
  date_created?: string | null;
  /**
   * @format uuid
   */
  user_updated?: string | null;
  /**
   * @format timestamp
   */
  date_updated?: string | null;
  comment?: string | null;
  /**
   * @format uuid
   */
  author?: string | null;
  parent?: number | ItemsComments | null;
};

/**
 * @x-collection directus_fields
 */
export type Fields = {
  id?: number;
  /**
   * Unique name of the collection this field is in.
   *
   * @example about_us
   */
  collection?: string;
  /**
   * Unique name of the field. Field name is unique within the collection.
   *
   * @example id
   */
  field?: string;
  special?: string[] | null;
  interface?: string | null;
  options?: void | null;
  display?: string | null;
  display_options?: void | null;
  readonly?: boolean;
  hidden?: boolean;
  sort?: number | null;
  width?: string | null;
  translations?: void | null;
  note?: string | null;
  conditions?: void | null;
  required?: boolean | null;
  group?: number | Fields | null;
  validation?: void | null;
  validation_message?: string | null;
};

/**
 * @x-collection directus_relations
 */
export type Relations = {
  /**
   * Unique identifier for the relation.
   *
   * @example 1
   */
  id?: number;
  /**
   * Collection that has the field that holds the foreign key.
   *
   * @example directus_activity
   */
  many_collection?: string;
  /**
   * Foreign key. Field that holds the primary key of the related collection.
   *
   * @example user
   */
  many_field?: string;
  /**
   * Collection on the _one_ side of the relationship.
   *
   * @example directus_users
   */
  one_collection?: string;
  /**
   * Alias column that serves as the _one_ side of the relationship.
   *
   * @example null
   */
  one_field?: string | null;
  one_collection_field?: string | null;
  one_allowed_collections?: string[] | null;
  /**
   * Field on the junction table that holds the many field of the related relation.
   *
   * @example null
   */
  junction_field?: string | null;
  sort_field?: string | null;
  one_deselect_action?: string;
};

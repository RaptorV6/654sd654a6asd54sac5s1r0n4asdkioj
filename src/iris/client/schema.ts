// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
  Int: number;
  Float: number;
  String: string;
  Boolean: boolean;
  ID: string;
  CmsDate: Date;
  CmsDateTime: Date;
  CmsI18NLocaleCode: string;
  CmsJSON: Record<string, any>;
  DateTime: Date;
  FormSubmissionData: Record<string, any>;
  NaiveDate: Date;
  NaiveTime: Date;
  UpsertFormsFromJsonData: UpsertFormsFromJsonData;
  UpsertSironaPermissionsFromJsonData: any;
  UpsertSironaRolesFromJsonData: UpsertSironaRolesFromJsonData;
};

export type AbsenceTypeGql = "D" | "H" | "I" | "L" | "N" | "O" | "OTHER" | "V";

/** Building of a hospital, clinic, etc. */
export interface Building {
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  location: Location | null;
  locationId: Scalars["ID"] | null;
  name: Scalars["String"];
  shortcut: Scalars["String"] | null;
  __typename: "Building";
}

export interface BuildingConnection {
  /** A list of edges. */
  edges: BuildingEdge[];
  /** A list of nodes. */
  nodes: Building[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "BuildingConnection";
}

export type BuildingConnectionSortByField = "NAME";

/** An edge in a connection. */
export interface BuildingEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Building;
  __typename: "BuildingEdge";
}

export interface CmsAkesoNewsPost {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"] | null;
  teaserText: Scalars["String"];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  locale: Scalars["String"] | null;
  localizations_connection: CmsAkesoNewsPostRelationResponseCollection | null;
  localizations: (CmsAkesoNewsPost | null)[];
  __typename: "CmsAkesoNewsPost";
}

export interface CmsAkesoNewsPostEntityResponseCollection {
  nodes: CmsAkesoNewsPost[];
  pageInfo: CmsPagination;
  __typename: "CmsAkesoNewsPostEntityResponseCollection";
}

export interface CmsAkesoNewsPostRelationResponseCollection {
  nodes: CmsAkesoNewsPost[];
  __typename: "CmsAkesoNewsPostRelationResponseCollection";
}

export interface CmsComponentLinksExterniLinka {
  id: Scalars["ID"];
  label: Scalars["String"];
  href: Scalars["String"];
  __typename: "CmsComponentLinksExterniLinka";
}

export interface CmsDeleteMutationResponse {
  documentId: Scalars["ID"];
  __typename: "CmsDeleteMutationResponse";
}

export type CmsGenericMorph = (
  | CmsComponentLinksExterniLinka
  | CmsUploadFile
  | CmsAkesoNewsPost
  | CmsIntranetBenefit
  | CmsIntranetEducationCategory
  | CmsIntranetEducationInstruction
  | CmsIntranetEmployeeContact
  | CmsIntranetEvent
  | CmsIntranetEventReport
  | CmsIntranetFaq
  | CmsIntranetLink
  | CmsIntranetLocation
  | CmsIntranetMagazineNea
  | CmsIntranetNewsItem
  | CmsIntranetRole
  | CmsItBlogAbout
  | CmsItBlogBanner
  | CmsItBlogPost
  | CmsItBlogTag
  | CmsSalusEducationPost
  | CmsSalusEducationTag
  | CmsSalusFaq
  | CmsSalusVzdelavaniVerifiedBy
) & { __isUnion?: true };

export interface CmsIntranetBenefit {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  teaserText: Scalars["String"] | null;
  teaserImage: CmsUploadFile | null;
  body: Scalars["CmsJSON"] | null;
  author: Scalars["String"] | null;
  approverEmails: Scalars["String"] | null;
  locations_connection: CmsIntranetLocationRelationResponseCollection | null;
  locations: (CmsIntranetLocation | null)[];
  attachedDocuments_connection: CmsUploadFileRelationResponseCollection | null;
  attachedDocuments: (CmsUploadFile | null)[];
  externalLinks: (CmsComponentLinksExterniLinka | null)[] | null;
  validFrom: Scalars["CmsDateTime"] | null;
  validTo: Scalars["CmsDateTime"] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetBenefit";
}

export interface CmsIntranetBenefitEntityResponseCollection {
  nodes: CmsIntranetBenefit[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetBenefitEntityResponseCollection";
}

export interface CmsIntranetEducationCategory {
  documentId: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetEducationCategory";
}

export interface CmsIntranetEducationCategoryEntityResponseCollection {
  nodes: CmsIntranetEducationCategory[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetEducationCategoryEntityResponseCollection";
}

export interface CmsIntranetEducationCategoryRelationResponseCollection {
  nodes: CmsIntranetEducationCategory[];
  __typename: "CmsIntranetEducationCategoryRelationResponseCollection";
}

export interface CmsIntranetEducationInstruction {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  teaserText: Scalars["String"] | null;
  teaserImage: CmsUploadFile | null;
  body: Scalars["CmsJSON"] | null;
  author: Scalars["String"] | null;
  locations_connection: CmsIntranetLocationRelationResponseCollection | null;
  locations: (CmsIntranetLocation | null)[];
  roles_connection: CmsIntranetRoleRelationResponseCollection | null;
  roles: (CmsIntranetRole | null)[];
  categories_connection: CmsIntranetEducationCategoryRelationResponseCollection | null;
  categories: (CmsIntranetEducationCategory | null)[];
  attachedDocuments_connection: CmsUploadFileRelationResponseCollection | null;
  attachedDocuments: (CmsUploadFile | null)[];
  externalLinks: (CmsComponentLinksExterniLinka | null)[] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetEducationInstruction";
}

export interface CmsIntranetEducationInstructionEntityResponseCollection {
  nodes: CmsIntranetEducationInstruction[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetEducationInstructionEntityResponseCollection";
}

export interface CmsIntranetEmployeeContact {
  documentId: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"] | null;
  phoneNumberInternal: Scalars["String"] | null;
  phoneNumberWorkMobile: Scalars["String"] | null;
  phoneNumberPrivateMobile: Scalars["String"] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetEmployeeContact";
}

export interface CmsIntranetEmployeeContactEntityResponseCollection {
  nodes: CmsIntranetEmployeeContact[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetEmployeeContactEntityResponseCollection";
}

export interface CmsIntranetEvent {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  startDate: Scalars["CmsDateTime"];
  endDate: Scalars["CmsDateTime"];
  body: Scalars["CmsJSON"] | null;
  locations_connection: CmsIntranetLocationRelationResponseCollection | null;
  locations: (CmsIntranetLocation | null)[];
  attachedDocuments_connection: CmsUploadFileRelationResponseCollection | null;
  attachedDocuments: (CmsUploadFile | null)[];
  externalLinks: (CmsComponentLinksExterniLinka | null)[] | null;
  validFrom: Scalars["CmsDateTime"] | null;
  validTo: Scalars["CmsDateTime"] | null;
  reports_connection: CmsIntranetEventReportRelationResponseCollection | null;
  reports: (CmsIntranetEventReport | null)[];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetEvent";
}

export interface CmsIntranetEventEntityResponseCollection {
  nodes: CmsIntranetEvent[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetEventEntityResponseCollection";
}

export interface CmsIntranetEventReport {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  body: Scalars["CmsJSON"] | null;
  mediaGallery_connection: CmsUploadFileRelationResponseCollection | null;
  mediaGallery: (CmsUploadFile | null)[];
  locations_connection: CmsIntranetLocationRelationResponseCollection | null;
  locations: (CmsIntranetLocation | null)[];
  attachedDocuments_connection: CmsUploadFileRelationResponseCollection | null;
  attachedDocuments: (CmsUploadFile | null)[];
  externalLinks: (CmsComponentLinksExterniLinka | null)[] | null;
  event: CmsIntranetEvent | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetEventReport";
}

export interface CmsIntranetEventReportEntityResponseCollection {
  nodes: CmsIntranetEventReport[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetEventReportEntityResponseCollection";
}

export interface CmsIntranetEventReportRelationResponseCollection {
  nodes: CmsIntranetEventReport[];
  __typename: "CmsIntranetEventReportRelationResponseCollection";
}

export interface CmsIntranetFaq {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  body: Scalars["CmsJSON"] | null;
  locations_connection: CmsIntranetLocationRelationResponseCollection | null;
  locations: (CmsIntranetLocation | null)[];
  attachedDocuments_connection: CmsUploadFileRelationResponseCollection | null;
  attachedDocuments: (CmsUploadFile | null)[];
  externalLinks: (CmsComponentLinksExterniLinka | null)[] | null;
  validFrom: Scalars["CmsDateTime"] | null;
  validTo: Scalars["CmsDateTime"] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetFaq";
}

export interface CmsIntranetFaqEntityResponseCollection {
  nodes: CmsIntranetFaq[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetFaqEntityResponseCollection";
}

export interface CmsIntranetLink {
  documentId: Scalars["ID"];
  label: Scalars["String"];
  href: Scalars["String"];
  type: ENUM_CMS_INTRANETLINK_TYPE | null;
  teaserText: Scalars["String"] | null;
  locations_connection: CmsIntranetLocationRelationResponseCollection | null;
  locations: (CmsIntranetLocation | null)[];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetLink";
}

export interface CmsIntranetLinkEntityResponseCollection {
  nodes: CmsIntranetLink[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetLinkEntityResponseCollection";
}

export interface CmsIntranetLocation {
  documentId: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetLocation";
}

export interface CmsIntranetLocationEntityResponseCollection {
  nodes: CmsIntranetLocation[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetLocationEntityResponseCollection";
}

export interface CmsIntranetLocationRelationResponseCollection {
  nodes: CmsIntranetLocation[];
  __typename: "CmsIntranetLocationRelationResponseCollection";
}

export interface CmsIntranetMagazineNea {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  teaserImage: CmsUploadFile | null;
  releaseDate: Scalars["CmsDate"] | null;
  href: Scalars["String"] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetMagazineNea";
}

export interface CmsIntranetMagazineNeaEntityResponseCollection {
  nodes: CmsIntranetMagazineNea[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetMagazineNeaEntityResponseCollection";
}

export interface CmsIntranetNewsItem {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  teaserText: Scalars["String"] | null;
  teaserImage: CmsUploadFile | null;
  body: Scalars["CmsJSON"] | null;
  author: Scalars["String"] | null;
  locations_connection: CmsIntranetLocationRelationResponseCollection | null;
  locations: (CmsIntranetLocation | null)[];
  roles_connection: CmsIntranetRoleRelationResponseCollection | null;
  roles: (CmsIntranetRole | null)[];
  validFrom: Scalars["CmsDateTime"] | null;
  validTo: Scalars["CmsDateTime"] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetNewsItem";
}

export interface CmsIntranetNewsItemEntityResponseCollection {
  nodes: CmsIntranetNewsItem[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetNewsItemEntityResponseCollection";
}

export interface CmsIntranetRole {
  documentId: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsIntranetRole";
}

export interface CmsIntranetRoleEntityResponseCollection {
  nodes: CmsIntranetRole[];
  pageInfo: CmsPagination;
  __typename: "CmsIntranetRoleEntityResponseCollection";
}

export interface CmsIntranetRoleRelationResponseCollection {
  nodes: CmsIntranetRole[];
  __typename: "CmsIntranetRoleRelationResponseCollection";
}

export interface CmsItBlogAbout {
  documentId: Scalars["ID"];
  about: Scalars["String"] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsItBlogAbout";
}

export interface CmsItBlogAboutEntityResponseCollection {
  nodes: CmsItBlogAbout[];
  pageInfo: CmsPagination;
  __typename: "CmsItBlogAboutEntityResponseCollection";
}

export interface CmsItBlogBanner {
  documentId: Scalars["ID"];
  image: CmsUploadFile | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsItBlogBanner";
}

export interface CmsItBlogBannerEntityResponseCollection {
  nodes: CmsItBlogBanner[];
  pageInfo: CmsPagination;
  __typename: "CmsItBlogBannerEntityResponseCollection";
}

export interface CmsItBlogPost {
  documentId: Scalars["ID"];
  title: Scalars["String"] | null;
  slug: Scalars["String"] | null;
  teaserImage: CmsUploadFile | null;
  author: Scalars["String"] | null;
  date: Scalars["CmsDate"] | null;
  avatar: CmsUploadFile | null;
  body: Scalars["String"] | null;
  thumbsUp: Scalars["Int"] | null;
  thumbsDown: Scalars["Int"] | null;
  categoryTag_connection: CmsItBlogTagRelationResponseCollection | null;
  categoryTag: (CmsItBlogTag | null)[];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsItBlogPost";
}

export interface CmsItBlogPostEntityResponseCollection {
  nodes: CmsItBlogPost[];
  pageInfo: CmsPagination;
  __typename: "CmsItBlogPostEntityResponseCollection";
}

export interface CmsItBlogPostRelationResponseCollection {
  nodes: CmsItBlogPost[];
  __typename: "CmsItBlogPostRelationResponseCollection";
}

export interface CmsItBlogTag {
  documentId: Scalars["ID"];
  title: Scalars["String"] | null;
  slug: Scalars["String"] | null;
  assign_categoryTag_connection: CmsItBlogPostRelationResponseCollection | null;
  assign_categoryTag: (CmsItBlogPost | null)[];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsItBlogTag";
}

export interface CmsItBlogTagEntityResponseCollection {
  nodes: CmsItBlogTag[];
  pageInfo: CmsPagination;
  __typename: "CmsItBlogTagEntityResponseCollection";
}

export interface CmsItBlogTagRelationResponseCollection {
  nodes: CmsItBlogTag[];
  __typename: "CmsItBlogTagRelationResponseCollection";
}

export interface CmsPagination {
  total: Scalars["Int"];
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  pageCount: Scalars["Int"];
  __typename: "CmsPagination";
}

export type CmsPublicationStatus = "DRAFT" | "PUBLISHED";

export interface CmsSalusEducationPost {
  documentId: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  teaserText: Scalars["String"];
  teaserImage: CmsUploadFile | null;
  body: Scalars["CmsJSON"];
  tags_connection: CmsSalusEducationTagRelationResponseCollection | null;
  tags: (CmsSalusEducationTag | null)[];
  verifiedBy: CmsSalusVzdelavaniVerifiedBy | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  locale: Scalars["String"] | null;
  localizations_connection: CmsSalusEducationPostRelationResponseCollection | null;
  localizations: (CmsSalusEducationPost | null)[];
  __typename: "CmsSalusEducationPost";
}

export interface CmsSalusEducationPostEntityResponseCollection {
  nodes: CmsSalusEducationPost[];
  pageInfo: CmsPagination;
  __typename: "CmsSalusEducationPostEntityResponseCollection";
}

export interface CmsSalusEducationPostRelationResponseCollection {
  nodes: CmsSalusEducationPost[];
  __typename: "CmsSalusEducationPostRelationResponseCollection";
}

export interface CmsSalusEducationTag {
  documentId: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  educationPosts_connection: CmsSalusEducationPostRelationResponseCollection | null;
  educationPosts: (CmsSalusEducationPost | null)[];
  educationPageOrder: Scalars["Int"] | null;
  isCategory: Scalars["Boolean"];
  weight: Scalars["Int"] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  locale: Scalars["String"] | null;
  localizations_connection: CmsSalusEducationTagRelationResponseCollection | null;
  localizations: (CmsSalusEducationTag | null)[];
  __typename: "CmsSalusEducationTag";
}

export interface CmsSalusEducationTagEntityResponseCollection {
  nodes: CmsSalusEducationTag[];
  pageInfo: CmsPagination;
  __typename: "CmsSalusEducationTagEntityResponseCollection";
}

export interface CmsSalusEducationTagRelationResponseCollection {
  nodes: CmsSalusEducationTag[];
  __typename: "CmsSalusEducationTagRelationResponseCollection";
}

export interface CmsSalusFaq {
  documentId: Scalars["ID"];
  question: Scalars["String"];
  answer: Scalars["CmsJSON"];
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  locale: Scalars["String"] | null;
  localizations_connection: CmsSalusFaqRelationResponseCollection | null;
  localizations: (CmsSalusFaq | null)[];
  __typename: "CmsSalusFaq";
}

export interface CmsSalusFaqEntityResponseCollection {
  nodes: CmsSalusFaq[];
  pageInfo: CmsPagination;
  __typename: "CmsSalusFaqEntityResponseCollection";
}

export interface CmsSalusFaqRelationResponseCollection {
  nodes: CmsSalusFaq[];
  __typename: "CmsSalusFaqRelationResponseCollection";
}

export interface CmsSalusVzdelavaniVerifiedBy {
  documentId: Scalars["ID"];
  name: Scalars["String"];
  namePrefix: Scalars["String"] | null;
  nameSuffix: Scalars["String"] | null;
  image: CmsUploadFile | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsSalusVzdelavaniVerifiedBy";
}

export interface CmsSalusVzdelavaniVerifiedByEntityResponseCollection {
  nodes: CmsSalusVzdelavaniVerifiedBy[];
  pageInfo: CmsPagination;
  __typename: "CmsSalusVzdelavaniVerifiedByEntityResponseCollection";
}

export interface CmsUploadFile {
  documentId: Scalars["ID"];
  name: Scalars["String"];
  alternativeText: Scalars["String"] | null;
  caption: Scalars["String"] | null;
  width: Scalars["Int"] | null;
  height: Scalars["Int"] | null;
  formats: Scalars["CmsJSON"] | null;
  hash: Scalars["String"];
  ext: Scalars["String"] | null;
  mime: Scalars["String"];
  size: Scalars["Float"];
  url: Scalars["String"];
  previewUrl: Scalars["String"] | null;
  provider: Scalars["String"];
  provider_metadata: Scalars["CmsJSON"] | null;
  related: (CmsGenericMorph | null)[] | null;
  createdAt: Scalars["CmsDateTime"] | null;
  updatedAt: Scalars["CmsDateTime"] | null;
  publishedAt: Scalars["CmsDateTime"] | null;
  __typename: "CmsUploadFile";
}

export interface CmsUploadFileRelationResponseCollection {
  nodes: CmsUploadFile[];
  __typename: "CmsUploadFileRelationResponseCollection";
}

export interface CostCenter {
  code: Scalars["String"];
  facility: Facility;
  facilityId: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "CostCenter";
}

export interface DietAccount {
  allowedDebit: Scalars["String"];
  balance: Scalars["String"];
  consumer: DietConsumer | null;
  consumerId: Scalars["ID"] | null;
  disabledFlag: Scalars["Boolean"];
  id: Scalars["ID"];
  lastMove: Scalars["DateTime"] | null;
  validTo: Scalars["DateTime"] | null;
  __typename: "DietAccount";
}

export interface DietAccountConnection {
  /** A list of edges. */
  edges: DietAccountEdge[];
  /** A list of nodes. */
  nodes: DietAccount[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "DietAccountConnection";
}

export type DietAccountConnectionSortByField = "ID";

/** An edge in a connection. */
export interface DietAccountEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: DietAccount;
  __typename: "DietAccountEdge";
}

export interface DietAccountTransaction {
  /** Transaction account */
  account: DietAccount | null;
  accountId: Scalars["ID"];
  /** Amount (price) of the transaction */
  amount: Scalars["String"];
  dietOrder: DietOrder | null;
  dietOrderId: Scalars["ID"] | null;
  id: Scalars["ID"];
  originalTrans: DietAccountTransaction | null;
  originalTransactionId: Scalars["ID"] | null;
  status: Scalars["Int"];
  transactionDate: Scalars["DateTime"];
  /** Type of transaction */
  transactionType: DietAccountTransactionType | null;
  transactionTypeId: Scalars["ID"];
  __typename: "DietAccountTransaction";
}

export interface DietAccountTransactionConnection {
  /** A list of edges. */
  edges: DietAccountTransactionEdge[];
  /** A list of nodes. */
  nodes: DietAccountTransaction[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "DietAccountTransactionConnection";
}

export type DietAccountTransactionConnectionSortByField = "ID" | "TRANSACTION_DATE";

/** An edge in a connection. */
export interface DietAccountTransactionEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: DietAccountTransaction;
  __typename: "DietAccountTransactionEdge";
}

export interface DietAccountTransactionType {
  disabledFlag: Scalars["Boolean"];
  fullName: Scalars["String"] | null;
  id: Scalars["ID"];
  shortName: Scalars["String"] | null;
  __typename: "DietAccountTransactionType";
}

export interface DietConsumer {
  fullName: Scalars["String"] | null;
  id: Scalars["ID"];
  worker: DietWorker | null;
  workerId: Scalars["ID"];
  __typename: "DietConsumer";
}

export interface DietConsumerConnection {
  /** A list of edges. */
  edges: DietConsumerEdge[];
  /** A list of nodes. */
  nodes: DietConsumer[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "DietConsumerConnection";
}

export type DietConsumerConnectionSortByField = "ID";

/** An edge in a connection. */
export interface DietConsumerEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: DietConsumer;
  __typename: "DietConsumerEdge";
}

export interface DietFacility {
  facilityCode: Scalars["String"];
  facilityName: Scalars["String"];
  id: Scalars["ID"];
  __typename: "DietFacility";
}

export interface DietFoodType {
  disabledFlag: Scalars["Boolean"];
  fullName: Scalars["String"] | null;
  id: Scalars["ID"];
  shortName: Scalars["String"];
  __typename: "DietFoodType";
}

export interface DietMenu {
  allergens: Scalars["String"] | null;
  dietFacility: DietFacility;
  dietFacilityId: Scalars["ID"];
  dietFoodType: DietFoodType;
  dietFoodTypeId: Scalars["ID"];
  dietType: DietType;
  dietTypeId: Scalars["ID"];
  foodName: Scalars["String"];
  id: Scalars["String"];
  menuDate: Scalars["DateTime"];
  __typename: "DietMenu";
}

export interface DietMenuConnection {
  /** A list of edges. */
  edges: DietMenuEdge[];
  /** A list of nodes. */
  nodes: DietMenu[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "DietMenuConnection";
}

export type DietMenuConnectionSortByField = "ID";

/** An edge in a connection. */
export interface DietMenuEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: DietMenu;
  __typename: "DietMenuEdge";
}

export interface DietOrder {
  createdDate: Scalars["DateTime"] | null;
  deliveredDate: Scalars["DateTime"] | null;
  dietConsumer: DietConsumer | null;
  dietConsumerId: Scalars["ID"];
  dietMenu: DietMenu;
  dietMenuId: Scalars["String"];
  dietOriginalOrder: DietOrder | null;
  id: Scalars["ID"];
  orderAmount: Scalars["Int"];
  orderDate: Scalars["DateTime"];
  orderStatus: Scalars["Int"];
  originalOrderId: Scalars["ID"] | null;
  __typename: "DietOrder";
}

export interface DietOrderConnection {
  /** A list of edges. */
  edges: DietOrderEdge[];
  /** A list of nodes. */
  nodes: DietOrder[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "DietOrderConnection";
}

export type DietOrderConnectionSortByField = "ID" | "ORDER_DATE";

/** An edge in a connection. */
export interface DietOrderEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: DietOrder;
  __typename: "DietOrderEdge";
}

export interface DietType {
  code: Scalars["String"];
  disabled: Scalars["Boolean"];
  id: Scalars["ID"];
  name: Scalars["String"] | null;
  order: Scalars["Int"];
  __typename: "DietType";
}

export interface DietTypeConnection {
  /** A list of edges. */
  edges: DietTypeEdge[];
  /** A list of nodes. */
  nodes: DietType[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "DietTypeConnection";
}

export type DietTypeConnectionSortByField = "CODE" | "ID" | "NAME";

/** An edge in a connection. */
export interface DietTypeEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: DietType;
  __typename: "DietTypeEdge";
}

export interface DietWorker {
  dietFacilityId: Scalars["ID"] | null;
  disabledFlag: Scalars["Boolean"];
  firstName: Scalars["String"] | null;
  id: Scalars["ID"];
  lastName: Scalars["String"] | null;
  personalNumber: Scalars["String"] | null;
  titleAfter: Scalars["String"] | null;
  titleBefore: Scalars["String"] | null;
  userAkordId: Scalars["Int"] | null;
  __typename: "DietWorker";
}

export interface Doctor {
  active: Scalars["Boolean"] | null;
  advice: Scalars["Boolean"] | null;
  description: Scalars["String"] | null;
  fictive: Scalars["Boolean"] | null;
  firstName: Scalars["String"];
  fullName: Scalars["String"];
  id: Scalars["ID"];
  instruction: Scalars["String"] | null;
  lastName: Scalars["String"];
  namePrefix: Scalars["String"] | null;
  nameSuffix: Scalars["String"] | null;
  telephone: Scalars["String"] | null;
  veryFullName: Scalars["String"];
  __typename: "Doctor";
}

export interface DoctorConnection {
  /** A list of edges. */
  edges: DoctorEdge[];
  /** A list of nodes. */
  nodes: Doctor[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "DoctorConnection";
}

export type DoctorConnectionSortByField = "NAME";

/** An edge in a connection. */
export interface DoctorEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Doctor;
  __typename: "DoctorEdge";
}

export interface Employee {
  /** First name of the employee. */
  firstName: Scalars["String"];
  /** ID of the employee. */
  id: Scalars["ID"];
  /** Last name of the employee. */
  lastName: Scalars["String"];
  /**
   * @deprecated Use implementation in EmployeeFacilityCard instead.
   * Connection of AMOS slots scheduled for this employee.
   */
  scheduledSlots: SlotConnection | null;
  /**
   * Employee's education records.
   *
   * By default returns only valid education records included.
   * If you want to include invalid records, set `include_invalid` to `true`.
   */
  education: EmployeeEducation[];
  /** List of email addresses separated by comma. */
  emailAddresses: Scalars["String"][] | null;
  /** Employee assigned facilities list. */
  facilities: Facility[];
  /** Employee's cards for facilities. */
  facilityCards: EmployeeFacilityCard[];
  /** Encoded {LastName} {FirstName}. */
  fullName: Scalars["String"];
  /**
   * Employee image as base64 encoded string of JPG image.
   *
   * In frontend, you can use this string as `src` attribute of `img` tag with value
   * `src="data:image/png;base64,<value_of_field>"`.
   */
  image: EmployeeImage | null;
  /** `true` if the employee is active. */
  isActive: Scalars["Boolean"];
  /** Prefix of the employee's name. Degree, title, etc. */
  namePrefix: Scalars["String"];
  /** Suffix of the employee's name. Degree, title, etc. */
  nameSuffix: Scalars["String"];
  /** List of phone numbers separated by comma. */
  phoneNumbers: Scalars["String"][] | null;
  /** Users for the employee. */
  users: EmployeeUser[];
  /** Encoded {NamePrefix} {LastName} {FirstName} {NameSuffix}. */
  veryFullName: Scalars["String"];
  /** List of forms assigned to the employee. */
  assignedForms: EmployeeForm[];
  /** Count of forms assigned to the employee. */
  assignedFormsCount: Scalars["Int"];
  /** Checks if the employee has a Sirona profile. */
  hasSironaProfile: Scalars["Boolean"];
  /** Checks if the employee has a Smenovka profile. */
  hasSmenovkaProfile: Scalars["Boolean"];
  /** Checks if the employee has a Tabsy profile. */
  hasTabsyProfile: Scalars["Boolean"];
  /** Checks if the employee has a Zapka profile. */
  hasZapkaProfile: Scalars["Boolean"];
  /** Sirona profile of the employee. */
  sironaProfile: SironaEmployeeProfile | null;
  /** Smenovka profile of the employee. */
  smenovkaProfile: SmenovkaEmployeeProfile | null;
  /** Tabsy profile of the employee. */
  tabsyProfile: TabsyEmployeeProfile | null;
  /** Zapka profile of the employee. */
  zapkaProfile: ZapkaEmployeeProfile | null;
  __typename: "Employee";
}

export interface EmployeeAbsence {
  absenceType: AbsenceTypeGql;
  contractNumber: Scalars["String"] | null;
  day: Scalars["Int"];
  employeeCardId: Scalars["ID"];
  facilityId: Scalars["ID"];
  hours: Scalars["Float"];
  month: Scalars["Int"];
  retrieved: Scalars["Float"];
  year: Scalars["Int"];
  __typename: "EmployeeAbsence";
}

export interface EmployeeConnection {
  /** A list of edges. */
  edges: EmployeeEdge[];
  /** A list of nodes. */
  nodes: Employee[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "EmployeeConnection";
}

export type EmployeeConnectionSortByField = "FULL_NAME" | "ID";

/** An edge in a connection. */
export interface EmployeeEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Employee;
  __typename: "EmployeeEdge";
}

export interface EmployeeEducation {
  employee: Employee;
  employeeId: Scalars["ID"];
  graducationDate: Scalars["DateTime"] | null;
  id: Scalars["ID"];
  /** Education kind. */
  kind: EmployeeEducationKind | null;
  /** Education kind ID. */
  kindId: Scalars["ID"] | null;
  name: Scalars["String"] | null;
  note: Scalars["String"] | null;
  validTo: Scalars["DateTime"] | null;
  __typename: "EmployeeEducation";
}

export interface EmployeeEducationKind {
  code: Scalars["String"];
  facility: Facility;
  facilityId: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
  target: EmployeeEducationKindTarget;
  __typename: "EmployeeEducationKind";
}

export type EmployeeEducationKindTarget =
  | "CERTIFICATES"
  | "FUNCTIONAL_LICENSE"
  | "LICENSES"
  | "SPECIALISATION_DOCTORS"
  | "SPECIALISATION_NLZP"
  | "STRAIN";

export interface EmployeeFacilityCard {
  /** Employee first name. */
  firstName: Scalars["String"] | null;
  id: Scalars["ID"];
  /** Employee last name. */
  lastName: Scalars["String"] | null;
  /** Connection of AMOS slots scheduled for this employee. */
  scheduledSlots: SlotConnection | null;
  /**
   * List of authorized absences of the employee in the facility.
   *
   * If `year` and `month` are provided, only absences for the given year and month are returned.
   *
   * Default `year` is the current year.
   */
  authorizedAbsences: EmployeeAbsence[];
  /** Birth registration number of the employee. */
  birthRegistrationNumber: Scalars["String"] | null;
  /** Returns all contracts of the employee in the facility. */
  contracts: EmployeeWorkContract[];
  /** Login to the domain for the Facility. */
  domainLogin: Scalars["String"] | null;
  /** Email address of the employee. */
  emailAddress: Scalars["String"] | null;
  /** Returns the employee of the employee card. */
  employee: Employee;
  /** ID of the employee. */
  employeeId: Scalars["ID"];
  /** Number of the employee in the facility. */
  employeeNumber: Scalars["String"] | null;
  /** Returns the facility of the employee card. */
  facility: Facility;
  /** ID of the facility. */
  facilityId: Scalars["ID"];
  /** Employee has main employment in the facility. */
  hasEmploymentMain: Scalars["Boolean"];
  /** Employee has partial employment in the facility. */
  hasEmploymentPartial: Scalars["Boolean"];
  /** Insurance number of the employee. */
  insuranceNumber: Scalars["String"] | null;
  /** Is the card active. */
  isActive: Scalars["Boolean"];
  /** Returns all organization hierarchies of the employee in the facility. */
  organizationHierarchies: OrganizationHierarchyEmployee[];
  /** Phone number of the employee. */
  phoneNumber: Scalars["String"] | null;
  akordWorkerId: Scalars["ID"] | null;
  dietAccountId: Scalars["ID"] | null;
  dietConsumerId: Scalars["ID"] | null;
  dietFacilityId: Scalars["ID"] | null;
  /** List of diet menus for this employee and facility. */
  dietMenus: DietMenu[];
  /** List of diet orders for this employee and facility. */
  dietOrders: DietOrder[];
  scheduledSurgeries: ScheduledSurgeryConnection;
  __typename: "EmployeeFacilityCard";
}

export interface EmployeeForm {
  employee: Employee;
  employeeId: Scalars["ID"];
  form: Form;
  formId: Scalars["ID"];
  id: Scalars["ID"];
  __typename: "EmployeeForm";
}

export interface EmployeeFormPayload {
  employeeForm: EmployeeForm;
  __typename: "EmployeeFormPayload";
}

export interface EmployeeImage {
  employeeId: Scalars["ID"];
  id: Scalars["ID"];
  imageBase64: Scalars["String"];
  imageHeight: Scalars["Int"];
  imageWidth: Scalars["Int"];
  size: EmployeeImageSize;
  __typename: "EmployeeImage";
}

export type EmployeeImageSize = "LARGE" | "MEDIUM" | "THUMB";

export interface EmployeeUser {
  domainLogin: Scalars["String"];
  employee: Employee;
  employeeId: Scalars["ID"];
  id: Scalars["ID"];
  akordId: Scalars["Int"] | null;
  __typename: "EmployeeUser";
}

export interface EmployeeUserConnection {
  /** A list of edges. */
  edges: EmployeeUserEdge[];
  /** A list of nodes. */
  nodes: EmployeeUser[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "EmployeeUserConnection";
}

export type EmployeeUserConnectionSortByField = "DOMAIN_NAME" | "FULL_NAME" | "ID";

/** An edge in a connection. */
export interface EmployeeUserEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: EmployeeUser;
  __typename: "EmployeeUserEdge";
}

export interface EmployeeWorkContract {
  contractNumber: Scalars["String"];
  employeeCard: EmployeeFacilityCard;
  employeeCardId: Scalars["ID"];
  facility: Facility;
  facilityId: Scalars["ID"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  validFrom: Scalars["NaiveDate"] | null;
  validTo: Scalars["NaiveDate"] | null;
  workContractKind: WorkContractKind;
  workContractKindId: Scalars["ID"];
  __typename: "EmployeeWorkContract";
}

/**
 * Employment kinds.
 *
 * This is a list of employment kinds that are used to describe the employment of a employee.
 */
export interface EmploymentKind {
  description: Scalars["String"] | null;
  employmentKindSourceId: Scalars["Int"];
  facility: Facility;
  facilityId: Scalars["ID"];
  id: Scalars["ID"];
  /** The time scope of the employment kind. */
  scope: Scalars["String"] | null;
  /** Hours per one shift. */
  shiftHours: Scalars["String"] | null;
  __typename: "EmploymentKind";
}

export type ENUM_CMS_INTRANETLINK_TYPE = "aplikace" | "interni" | "externi";

export interface Examination {
  baseExamination: Examination | null;
  baseExaminationId: Scalars["ID"] | null;
  /** Duration of the Examination in minutes. */
  duration: Scalars["Int"];
  fictive: Scalars["Boolean"] | null;
  filterInvisible: Scalars["Boolean"] | null;
  forceSequence: Scalars["Boolean"] | null;
  id: Scalars["ID"];
  instructionPatient: Scalars["String"] | null;
  instructionPersonnel: Scalars["String"] | null;
  name: Scalars["String"];
  receptionInvisible: Scalars["Boolean"] | null;
  slotColor: Scalars["String"] | null;
  statim: Scalars["Boolean"] | null;
  workplace: Workplace;
  workplaceId: Scalars["ID"];
  __typename: "Examination";
}

export interface ExaminationConnection {
  /** A list of edges. */
  edges: ExaminationEdge[];
  /** A list of nodes. */
  nodes: Examination[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "ExaminationConnection";
}

export type ExaminationConnectionSortByField = "NAME";

/** An edge in a connection. */
export interface ExaminationEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Examination;
  __typename: "ExaminationEdge";
}

export interface Facility {
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "Facility";
}

export interface Form {
  code: Scalars["String"];
  consumer: FormConsumer;
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  kind: FormKind;
  name: Scalars["String"];
  title: Scalars["String"];
  /** Returns current version of the form. */
  version: FormVersion | null;
  versions: FormVersion[];
  __typename: "Form";
}

export interface FormConnection {
  /** A list of edges. */
  edges: FormEdge[];
  /** A list of nodes. */
  nodes: Form[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "FormConnection";
}

export type FormConnectionSortByField = "CODE" | "ID" | "NAME" | "TITLE";

export type FormConsumer = "PATIENT" | "STAFF";

/** An edge in a connection. */
export interface FormEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Form;
  __typename: "FormEdge";
}

export interface FormFillSession {
  departmentAkordId: Scalars["Int"] | null;
  documentationAkordId: Scalars["Int"] | null;
  formSubmission: FormSubmission;
  formSubmissionId: Scalars["ID"];
  id: Scalars["ID"];
  stationAkordId: Scalars["Int"] | null;
  __typename: "FormFillSession";
}

export interface FormFillSessionPayload {
  formFillSession: FormFillSession;
  __typename: "FormFillSessionPayload";
}

export type FormKind = "CONSENT" | "QUESTIONNAIRE";

export interface FormPayload {
  form: Form;
  __typename: "FormPayload";
}

export interface FormResultBind {
  akordVislBlobId: Scalars["Int"] | null;
  formSubmissionId: Scalars["ID"];
  id: Scalars["ID"];
  resultKindId: Scalars["ID"];
  __typename: "FormResultBind";
}

export interface FormResultBindPayloadGql {
  formResultBind: FormResultBind;
  __typename: "FormResultBindPayloadGql";
}

export interface FormResultKind {
  code: Scalars["String"];
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "FormResultKind";
}

export interface FormResultKindPayloadGql {
  formResultKind: FormResultKind;
  __typename: "FormResultKindPayloadGql";
}

export interface FormSubmission {
  attachments: FormSubmissionAttachment[];
  attachmentsCount: Scalars["Int"];
  completedAt: Scalars["DateTime"] | null;
  createdAt: Scalars["DateTime"];
  dataJson: Scalars["FormSubmissionData"] | null;
  fillSessions: FormFillSession[];
  formId: Scalars["ID"];
  formVersionId: Scalars["ID"];
  id: Scalars["ID"];
  isCompleted: Scalars["Boolean"];
  patientId: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
  __typename: "FormSubmission";
}

export interface FormSubmissionAttachment {
  dataBase64: Scalars["String"];
  fileName: Scalars["String"];
  formSubmission: FormSubmission;
  formSubmissionId: Scalars["ID"];
  id: Scalars["ID"];
  mimeType: Scalars["String"];
  __typename: "FormSubmissionAttachment";
}

export interface FormSubmissionAttachmentPayload {
  formSubmissionAttachment: FormSubmissionAttachment;
  __typename: "FormSubmissionAttachmentPayload";
}

export interface FormSubmissionConnection {
  /** A list of edges. */
  edges: FormSubmissionEdge[];
  /** A list of nodes. */
  nodes: FormSubmission[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "FormSubmissionConnection";
}

export type FormSubmissionConnectionSortByField = "COMPLETED_AT" | "CREATED_AT" | "ID";

/** An edge in a connection. */
export interface FormSubmissionEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: FormSubmission;
  __typename: "FormSubmissionEdge";
}

export interface FormSubmissionPayload {
  formSubmission: FormSubmission;
  __typename: "FormSubmissionPayload";
}

export interface FormVersion {
  description: Scalars["String"] | null;
  form: Form;
  formId: Scalars["ID"];
  id: Scalars["ID"];
  number: Scalars["String"];
  validFrom: Scalars["DateTime"];
  validTo: Scalars["DateTime"] | null;
  __typename: "FormVersion";
}

export interface FormVersionPayload {
  formVersion: FormVersion;
  __typename: "FormVersionPayload";
}

export interface Location {
  ccCallingPrefix: Scalars["String"] | null;
  commGroup: Scalars["String"] | null;
  databaseMailProfile: Scalars["String"] | null;
  description: Scalars["String"] | null;
  einkUrl: Scalars["String"] | null;
  email: Scalars["String"] | null;
  emailBody: Scalars["String"] | null;
  id: Scalars["ID"];
  logo: Scalars["String"] | null;
  name: Scalars["String"];
  nameAlternative: Scalars["String"] | null;
  shortcut: Scalars["String"] | null;
  __typename: "Location";
}

export interface Mutation {
  createCmsAkesoNewsPost: CmsAkesoNewsPost | null;
  updateCmsAkesoNewsPost: CmsAkesoNewsPost | null;
  deleteCmsAkesoNewsPost: CmsDeleteMutationResponse | null;
  createCmsIntranetBenefit: CmsIntranetBenefit | null;
  updateCmsIntranetBenefit: CmsIntranetBenefit | null;
  deleteCmsIntranetBenefit: CmsDeleteMutationResponse | null;
  createCmsIntranetEducationCategory: CmsIntranetEducationCategory | null;
  updateCmsIntranetEducationCategory: CmsIntranetEducationCategory | null;
  deleteCmsIntranetEducationCategory: CmsDeleteMutationResponse | null;
  createCmsIntranetEducationInstruction: CmsIntranetEducationInstruction | null;
  updateCmsIntranetEducationInstruction: CmsIntranetEducationInstruction | null;
  deleteCmsIntranetEducationInstruction: CmsDeleteMutationResponse | null;
  createCmsIntranetEmployeeContact: CmsIntranetEmployeeContact | null;
  updateCmsIntranetEmployeeContact: CmsIntranetEmployeeContact | null;
  deleteCmsIntranetEmployeeContact: CmsDeleteMutationResponse | null;
  createCmsIntranetEvent: CmsIntranetEvent | null;
  updateCmsIntranetEvent: CmsIntranetEvent | null;
  deleteCmsIntranetEvent: CmsDeleteMutationResponse | null;
  createCmsIntranetEventReport: CmsIntranetEventReport | null;
  updateCmsIntranetEventReport: CmsIntranetEventReport | null;
  deleteCmsIntranetEventReport: CmsDeleteMutationResponse | null;
  createCmsIntranetFaq: CmsIntranetFaq | null;
  updateCmsIntranetFaq: CmsIntranetFaq | null;
  deleteCmsIntranetFaq: CmsDeleteMutationResponse | null;
  createCmsIntranetLink: CmsIntranetLink | null;
  updateCmsIntranetLink: CmsIntranetLink | null;
  deleteCmsIntranetLink: CmsDeleteMutationResponse | null;
  createCmsIntranetLocation: CmsIntranetLocation | null;
  updateCmsIntranetLocation: CmsIntranetLocation | null;
  deleteCmsIntranetLocation: CmsDeleteMutationResponse | null;
  createCmsIntranetMagazineNea: CmsIntranetMagazineNea | null;
  updateCmsIntranetMagazineNea: CmsIntranetMagazineNea | null;
  deleteCmsIntranetMagazineNea: CmsDeleteMutationResponse | null;
  createCmsIntranetNewsItem: CmsIntranetNewsItem | null;
  updateCmsIntranetNewsItem: CmsIntranetNewsItem | null;
  deleteCmsIntranetNewsItem: CmsDeleteMutationResponse | null;
  createCmsIntranetRole: CmsIntranetRole | null;
  updateCmsIntranetRole: CmsIntranetRole | null;
  deleteCmsIntranetRole: CmsDeleteMutationResponse | null;
  createCmsItBlogAbout: CmsItBlogAbout | null;
  updateCmsItBlogAbout: CmsItBlogAbout | null;
  deleteCmsItBlogAbout: CmsDeleteMutationResponse | null;
  createCmsItBlogBanner: CmsItBlogBanner | null;
  updateCmsItBlogBanner: CmsItBlogBanner | null;
  deleteCmsItBlogBanner: CmsDeleteMutationResponse | null;
  createCmsItBlogPost: CmsItBlogPost | null;
  updateCmsItBlogPost: CmsItBlogPost | null;
  deleteCmsItBlogPost: CmsDeleteMutationResponse | null;
  createCmsItBlogTag: CmsItBlogTag | null;
  updateCmsItBlogTag: CmsItBlogTag | null;
  deleteCmsItBlogTag: CmsDeleteMutationResponse | null;
  createCmsSalusEducationPost: CmsSalusEducationPost | null;
  updateCmsSalusEducationPost: CmsSalusEducationPost | null;
  deleteCmsSalusEducationPost: CmsDeleteMutationResponse | null;
  createCmsSalusEducationTag: CmsSalusEducationTag | null;
  updateCmsSalusEducationTag: CmsSalusEducationTag | null;
  deleteCmsSalusEducationTag: CmsDeleteMutationResponse | null;
  createCmsSalusFaq: CmsSalusFaq | null;
  updateCmsSalusFaq: CmsSalusFaq | null;
  deleteCmsSalusFaq: CmsDeleteMutationResponse | null;
  createCmsSalusVzdelavaniVerifiedBy: CmsSalusVzdelavaniVerifiedBy | null;
  updateCmsSalusVzdelavaniVerifiedBy: CmsSalusVzdelavaniVerifiedBy | null;
  deleteCmsSalusVzdelavaniVerifiedBy: CmsDeleteMutationResponse | null;
  completeFormSubmission: FormSubmissionPayload;
  createEmployeeForm: EmployeeFormPayload;
  /** Create a new form. */
  createForm: FormPayload;
  createFormFillSession: FormFillSessionPayload;
  createFormResultBind: FormResultBindPayloadGql;
  createFormResultKind: FormResultKindPayloadGql;
  createFormSubmission: FormSubmissionPayload;
  createFormSubmissionAttachment: FormSubmissionAttachmentPayload;
  createFormVersion: FormVersionPayload;
  /** Create a new Salus Patient Profile. */
  createSalusPatientProfile: SalusPatientProfilePayload;
  /** Create a new Salus Patient Session. */
  createSalusPatientSession: SalusPatientSessionPayload;
  /** Create a new Salus Verification Token. */
  createSalusVerificationToken: SalusVerificationTokenPayload;
  createSironaEmployeeProfile: SironaEmployeeProfilePayload;
  createSironaEmployeeProfileGrant: SironaEmployeeProfileGrantPayload;
  createSironaPermission: SironaPermissionPayload;
  createSironaRole: SironaRolePayload;
  createSmenovkaEmployeeProfile: SmenovkaEmployeeProfilePayload;
  createSmenovkaEmployeeProfileGrant: SmenovkaEmployeeProfileGrantPayload;
  createSmenovkaPermission: SmenovkaPermissionPayload;
  createSmenovkaRole: SmenovkaRolePayload;
  createTabsyEmployeeProfile: TabsyEmployeeProfilePayload;
  createZapkaEmployeeProfile: ZapkaEmployeeProfilePayload;
  createZapkaEmployeeProfileGrant: ZapkaEmployeeProfileGrantPayload;
  createZapkaPermission: ZapkaPermissionPayload;
  createZapkaRole: ZapkaRolePayload;
  deactivateFormVersion: FormVersionPayload;
  deactivateSironaEmployeeProfile: SironaEmployeeProfilePayload;
  deactivateSmenovkaEmployeeProfile: SmenovkaEmployeeProfilePayload;
  deactivateZapkaEmployeeProfile: ZapkaEmployeeProfilePayload;
  deleteEmployeeForm: EmployeeFormPayload;
  deleteFormFillSession: FormFillSessionPayload;
  deleteFormResultBind: FormResultBindPayloadGql;
  deleteFormResultKind: FormResultKindPayloadGql;
  deleteFormSubmissionAttachment: FormSubmissionAttachmentPayload;
  /** Delete a Salus Patient Profile. */
  deleteSalusPatientProfile: SalusPatientProfilePayload;
  /** Delete a Salus Patient Session by session ID. */
  deleteSalusPatientSession: SalusPatientSessionPayload;
  /** Delete a Salus Patient Session by session token. */
  deleteSalusPatientSessionBySessionToken: SalusPatientSessionPayload;
  /** Delete the Salus Verification Token. */
  deleteSalusVerificationToken: SalusVerificationTokenPayload;
  deleteSironaEmployeeProfileGrant: SironaEmployeeProfileGrantPayload;
  deleteSironaPermission: SironaPermissionPayload;
  deleteSironaRole: SironaRolePayload;
  deleteSmenovkaEmployeeProfileGrant: SmenovkaEmployeeProfileGrantPayload;
  deleteSmenovkaPermission: SmenovkaPermissionPayload;
  deleteSmenovkaRole: SmenovkaRolePayload;
  deleteTabsyEmployeeProfile: TabsyEmployeeProfilePayload;
  deleteZapkaEmployeeProfileGrant: ZapkaEmployeeProfileGrantPayload;
  deleteZapkaPermission: ZapkaPermissionPayload;
  deleteZapkaRole: ZapkaRolePayload;
  reactivateFormVersion: FormVersionPayload;
  reactivateSironaEmployeeProfile: SironaEmployeeProfilePayload;
  reactivateSmenovkaEmployeeProfile: SmenovkaEmployeeProfilePayload;
  reactivateZapkaEmployeeProfile: ZapkaEmployeeProfilePayload;
  /** Update a form. */
  updateForm: FormPayload;
  updateFormFillSession: FormFillSessionPayload;
  updateFormResultBind: FormResultBindPayloadGql;
  updateFormResultKind: FormResultKindPayloadGql;
  updateFormSubmission: FormSubmissionPayload;
  updateFormSubmissionAttachment: FormSubmissionAttachmentPayload;
  updateFormVersion: FormVersionPayload;
  /** Update a Salus Patient Profile. */
  updateSalusPatientProfile: SalusPatientProfilePayload;
  /** Update a Salus Patient Session. */
  updateSalusPatientSession: SalusPatientSessionPayload;
  updateSironaEmployeeProfile: SironaEmployeeProfilePayload;
  updateSironaEmployeeProfileGrant: SironaEmployeeProfileGrantPayload;
  updateSironaPermission: SironaPermissionPayload;
  updateSironaRole: SironaRolePayload;
  updateSmenovkaEmployeeProfile: SmenovkaEmployeeProfilePayload;
  updateSmenovkaEmployeeProfileGrant: SmenovkaEmployeeProfileGrantPayload;
  updateSmenovkaPermission: SmenovkaPermissionPayload;
  updateSmenovkaRole: SmenovkaRolePayload;
  updateZapkaEmployeeProfile: ZapkaEmployeeProfilePayload;
  updateZapkaEmployeeProfileGrant: ZapkaEmployeeProfileGrantPayload;
  updateZapkaPermission: ZapkaPermissionPayload;
  updateZapkaRole: ZapkaRolePayload;
  upsertFormsFromJson: UpsertFormsFromJsonPayload[];
  upsertSironaPermissionsFromJson: UpsertSironaPermissionsFromJsonPayload[];
  upsertSironaRolesFromJson: UpsertSironaRolesFromJsonPayload[];
  /** Use the Salus Verification Token. */
  useSalusVerificationToken: SalusVerificationTokenPayload;
  /** Mark a Salus Patient Profile email as verified. */
  verifySalusPatientProfileEmail: SalusPatientProfilePayload;
  createPatientFamilyMember: PatientFamilyMemberPayload;
  /**
   * Creates an Patient image size set from original image (uploaded image by patient).
   *
   * Resizes original image to 3 dimensions.
   *
   * Payload contains `THUMB` version of the image.
   */
  createPatientImage: PatientImagePayload;
  deletePatientFamilyMember: PatientFamilyMemberPayload;
  /**
   * Removes Patient image size set.
   *
   * Payload contains `THUMB` version of the image.
   */
  deletePatientImage: PatientImagePayload;
  /**
   * Updates an Patient image size set from original image (uploaded image by patient).
   *
   * Resizes original image to 3 dimensions.
   *
   * Payload contains `THUMB` version of the image.
   */
  updatePatientImage: PatientImagePayload;
  __typename: "Mutation";
}

export interface Organization {
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "Organization";
}

export interface OrganizationHierarchy {
  costCenter: CostCenter | null;
  costCenterId: Scalars["ID"] | null;
  employees: OrganizationHierarchyEmployeeConnection;
  facility: Facility | null;
  facilityId: Scalars["ID"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  organization: Organization | null;
  organizationId: Scalars["ID"] | null;
  organizationSourceId: Scalars["Int"] | null;
  parentId: Scalars["ID"] | null;
  __typename: "OrganizationHierarchy";
}

export interface OrganizationHierarchyEmployee {
  contract: EmployeeWorkContract | null;
  contractNumber: Scalars["String"];
  /** Returns the employee card of the employee. */
  employeeCard: EmployeeFacilityCard;
  employeeCardId: Scalars["ID"];
  employmentKind: EmploymentKind | null;
  employmentKindId: Scalars["ID"] | null;
  facility: Facility;
  facilityId: Scalars["ID"];
  id: Scalars["ID"];
  ignoreOutOfRegistrations: Scalars["Boolean"];
  isPlannable: Scalars["Boolean"];
  isReportable: Scalars["Boolean"];
  organizationHierarchy: OrganizationHierarchy;
  organizationHierarchyId: Scalars["ID"];
  relationType: Scalars["String"] | null;
  shiftKind: ShiftKind | null;
  shiftKindId: Scalars["ID"] | null;
  systemizationPosition: SystemizationPosition | null;
  systemizationPositionId: Scalars["ID"] | null;
  validFrom: Scalars["NaiveDate"] | null;
  validTo: Scalars["NaiveDate"] | null;
  __typename: "OrganizationHierarchyEmployee";
}

export interface OrganizationHierarchyEmployeeConnection {
  /** A list of edges. */
  edges: OrganizationHierarchyEmployeeEdge[];
  /** A list of nodes. */
  nodes: OrganizationHierarchyEmployee[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "OrganizationHierarchyEmployeeConnection";
}

export type OrganizationHierarchyEmployeeConnectionSortByField = "FULL_NAME" | "ID";

/** An edge in a connection. */
export interface OrganizationHierarchyEmployeeEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: OrganizationHierarchyEmployee;
  __typename: "OrganizationHierarchyEmployeeEdge";
}

/** Information about pagination in a connection */
export interface PageInfo {
  /** When paginating forwards, the cursor to continue. */
  endCursor: Scalars["String"] | null;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Scalars["String"] | null;
  __typename: "PageInfo";
}

export interface Patient {
  /** Primary postal address of the patient. */
  address: PatientPostAddress | null;
  akordId: Scalars["Int"] | null;
  amosId: Scalars["Int"] | null;
  /** Patients AMOS appointments. */
  appointments: SlotConnection | null;
  /** Email address of the patient. */
  emailAddress: Scalars["String"] | null;
  /** Identity card number (Číslo občanského průkazu). */
  idCardNumber: Scalars["String"] | null;
  /** Education degree of the patient. */
  namePrefix: Scalars["String"] | null;
  /** Education degree of the patient. */
  nameSuffix: Scalars["String"] | null;
  /** Phone number of the patient. */
  phoneNumber: Scalars["String"] | null;
  /** Encoded {namePrefix} {firstName} {lastName} {nameSuffix} */
  veryFullName: Scalars["String"];
  formSubmissions: FormSubmissionConnection;
  /** Check if the patient has a Salus profile */
  hasSalusProfile: Scalars["Boolean"];
  id: Scalars["ID"];
  salusProfile: SalusPatientProfile | null;
  /** Age of the patient */
  age: Scalars["Int"] | null;
  birthDate: Scalars["DateTime"] | null;
  birthLastName: Scalars["String"];
  bloodType: Scalars["String"] | null;
  deathDate: Scalars["DateTime"] | null;
  disability: PatientDisability;
  /** Health insurance company number. */
  insuranceCompanyNumber: Scalars["Int"] | null;
  /** Health insurance number. */
  insuranceNumber: Scalars["String"];
  /** Rh factor of the blood. */
  rhFactor: Scalars["String"] | null;
  /** Patient's sex. */
  sex: PatientSex;
  /** Birth registration number (Rodné číslo). */
  birthRegistrationNumber: Scalars["String"];
  /** Combined as FullName - (BirthRegistrationNumber) */
  displayName: Scalars["String"];
  familyMembers: PatientFamilyMember[];
  /** First name of the patient. */
  firstName: Scalars["String"];
  /** Combined as LastName and FirstName */
  fullName: Scalars["String"];
  /** Returns `true` if patient has an image */
  hasImage: Scalars["Boolean"];
  /** Returs patient image */
  image: PatientImageGql | null;
  insuranceNumberId: Scalars["String"] | null;
  /** Last name of the patient. */
  lastName: Scalars["String"];
  mpiId: Scalars["ID"];
  __typename: "Patient";
}

export interface PatientConnection {
  /** A list of edges. */
  edges: PatientEdge[];
  /** A list of nodes. */
  nodes: Patient[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "PatientConnection";
}

export type PatientConnectionSortByField = "FULL_NAME" | "ID";

export interface PatientDisability {
  blind: Scalars["Boolean"];
  deaf: Scalars["Boolean"];
  immobile: Scalars["Boolean"];
  __typename: "PatientDisability";
}

/** An edge in a connection. */
export interface PatientEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Patient;
  __typename: "PatientEdge";
}

export interface PatientFamilyMember {
  id: Scalars["ID"];
  memberPatient: Patient;
  /** Child / member patient id. */
  memberPatientId: Scalars["ID"];
  patient: Patient;
  /** Parent patient id. */
  patientId: Scalars["ID"];
  __typename: "PatientFamilyMember";
}

export interface PatientFamilyMemberPayload {
  patientFamilyMember: PatientFamilyMember;
  __typename: "PatientFamilyMemberPayload";
}

export interface PatientImageGql {
  id: Scalars["ID"];
  /** Patient image JPEG binary encoded in Base64. */
  imageBase64: Scalars["String"];
  /** Height of image in px. */
  imageHeight: Scalars["Int"];
  /** Width of image in px. */
  imageWidth: Scalars["Int"];
  /** Size of the image. */
  size: PatientImageSize;
  __typename: "PatientImageGql";
}

export interface PatientImagePayload {
  patientImage: PatientImageGql;
  __typename: "PatientImagePayload";
}

export type PatientImageSize = "LARGE" | "MEDIUM" | "THUMB";

export interface PatientPostAddress {
  buildingNumber: Scalars["String"] | null;
  city: Scalars["String"] | null;
  cityDistrict: Scalars["String"] | null;
  country: Scalars["String"] | null;
  district: Scalars["String"] | null;
  full: Scalars["String"];
  region: Scalars["String"] | null;
  registrationBuildingNumber: Scalars["String"] | null;
  street: Scalars["String"] | null;
  zipCode: Scalars["String"] | null;
  __typename: "PatientPostAddress";
}

export type PatientSex = "FEMALE" | "MALE" | "UNSPECIFIED";

export interface Query {
  /** Get a AMOS building by ID. */
  building: Building | null;
  /** Get AMOS buildings connection. */
  buildings: BuildingConnection;
  /** Get a AMOS doctor by ID. */
  doctor: Doctor | null;
  /** Get AMOS doctors connection. */
  doctors: DoctorConnection;
  /** Get a AMOS Examination by ID. */
  examination: Examination | null;
  /** Get AMOS Examinations connection. */
  examinations: ExaminationConnection;
  /** Get a AMOS Location by ID. */
  location: Location | null;
  /** Get AMOS Locations list. */
  locations: Location[];
  /** Get a AMOS Room by ID. */
  room: Room | null;
  /** Get AMOS Rooms connection. */
  rooms: RoomConnection;
  /** Get a AMOS Slot by ID. */
  slot: Slot | null;
  /** Get AMOS Slots connection. */
  slots: SlotConnection;
  /** Get a AMOS Slot by ID. */
  workplace: Workplace | null;
  /** Get AMOS Slots connection. */
  workplaces: WorkplaceConnection;
  cmsAkesoNewsPost: CmsAkesoNewsPost | null;
  cmsAkesoNewsPosts_connection: CmsAkesoNewsPostEntityResponseCollection | null;
  cmsAkesoNewsPosts: (CmsAkesoNewsPost | null)[];
  cmsIntranetBenefit: CmsIntranetBenefit | null;
  cmsIntranetBenefits_connection: CmsIntranetBenefitEntityResponseCollection | null;
  cmsIntranetBenefits: (CmsIntranetBenefit | null)[];
  cmsIntranetEducationCategory: CmsIntranetEducationCategory | null;
  cmsIntranetEducationCategories_connection: CmsIntranetEducationCategoryEntityResponseCollection | null;
  cmsIntranetEducationCategories: (CmsIntranetEducationCategory | null)[];
  cmsIntranetEducationInstruction: CmsIntranetEducationInstruction | null;
  cmsIntranetEducationInstructions_connection: CmsIntranetEducationInstructionEntityResponseCollection | null;
  cmsIntranetEducationInstructions: (CmsIntranetEducationInstruction | null)[];
  cmsIntranetEmployeeContact: CmsIntranetEmployeeContact | null;
  cmsIntranetEmployeeContacts_connection: CmsIntranetEmployeeContactEntityResponseCollection | null;
  cmsIntranetEmployeeContacts: (CmsIntranetEmployeeContact | null)[];
  cmsIntranetEvent: CmsIntranetEvent | null;
  cmsIntranetEvents_connection: CmsIntranetEventEntityResponseCollection | null;
  cmsIntranetEvents: (CmsIntranetEvent | null)[];
  cmsIntranetEventReport: CmsIntranetEventReport | null;
  cmsIntranetEventReports_connection: CmsIntranetEventReportEntityResponseCollection | null;
  cmsIntranetEventReports: (CmsIntranetEventReport | null)[];
  cmsIntranetFaq: CmsIntranetFaq | null;
  cmsIntranetFaqs_connection: CmsIntranetFaqEntityResponseCollection | null;
  cmsIntranetFaqs: (CmsIntranetFaq | null)[];
  cmsIntranetLink: CmsIntranetLink | null;
  cmsIntranetLinks_connection: CmsIntranetLinkEntityResponseCollection | null;
  cmsIntranetLinks: (CmsIntranetLink | null)[];
  cmsIntranetLocation: CmsIntranetLocation | null;
  cmsIntranetLocations_connection: CmsIntranetLocationEntityResponseCollection | null;
  cmsIntranetLocations: (CmsIntranetLocation | null)[];
  cmsIntranetMagazineNea: CmsIntranetMagazineNea | null;
  cmsIntranetMagazineNeas_connection: CmsIntranetMagazineNeaEntityResponseCollection | null;
  cmsIntranetMagazineNeas: (CmsIntranetMagazineNea | null)[];
  cmsIntranetNewsItem: CmsIntranetNewsItem | null;
  cmsIntranetNews_connection: CmsIntranetNewsItemEntityResponseCollection | null;
  cmsIntranetNews: (CmsIntranetNewsItem | null)[];
  cmsIntranetRole: CmsIntranetRole | null;
  cmsIntranetRoles_connection: CmsIntranetRoleEntityResponseCollection | null;
  cmsIntranetRoles: (CmsIntranetRole | null)[];
  cmsItBlogAbout: CmsItBlogAbout | null;
  cmsItBlogAbouts_connection: CmsItBlogAboutEntityResponseCollection | null;
  cmsItBlogAbouts: (CmsItBlogAbout | null)[];
  cmsItBlogBanner: CmsItBlogBanner | null;
  cmsItBlogBanners_connection: CmsItBlogBannerEntityResponseCollection | null;
  cmsItBlogBanners: (CmsItBlogBanner | null)[];
  cmsItBlogPost: CmsItBlogPost | null;
  cmsItBlogPosts_connection: CmsItBlogPostEntityResponseCollection | null;
  cmsItBlogPosts: (CmsItBlogPost | null)[];
  cmsItBlogTag: CmsItBlogTag | null;
  cmsItBlogTags_connection: CmsItBlogTagEntityResponseCollection | null;
  cmsItBlogTags: (CmsItBlogTag | null)[];
  cmsSalusEducationPost: CmsSalusEducationPost | null;
  cmsSalusEducationPosts_connection: CmsSalusEducationPostEntityResponseCollection | null;
  cmsSalusEducationPosts: (CmsSalusEducationPost | null)[];
  cmsSalusEducationTag: CmsSalusEducationTag | null;
  cmsSalusEducationTags_connection: CmsSalusEducationTagEntityResponseCollection | null;
  cmsSalusEducationTags: (CmsSalusEducationTag | null)[];
  cmsSalusFaq: CmsSalusFaq | null;
  cmsSalusFaqs_connection: CmsSalusFaqEntityResponseCollection | null;
  cmsSalusFaqs: (CmsSalusFaq | null)[];
  cmsSalusVzdelavaniVerifiedBy: CmsSalusVzdelavaniVerifiedBy | null;
  cmsSalusVzdelavaniVerifiedBies_connection: CmsSalusVzdelavaniVerifiedByEntityResponseCollection | null;
  cmsSalusVzdelavaniVerifiedBies: (CmsSalusVzdelavaniVerifiedBy | null)[];
  costCenter: CostCenter | null;
  costCenters: CostCenter[];
  /** Get a Employee by ID or loginName or akordId */
  employee: Employee | null;
  /** Kinds of employee education. */
  employeeEducationKinds: EmployeeEducationKind[];
  /** Get a EmployeeUser by ID or domainLogin */
  employeeUser: EmployeeUser | null;
  /** Get EmployeeUsers connection */
  employeeUsers: EmployeeUserConnection;
  /** Returns the employee work contract by ID. */
  employeeWorkContract: EmployeeWorkContract | null;
  /** Employees connection */
  employees: EmployeeConnection;
  employmentKind: EmploymentKind | null;
  employmentKinds: EmploymentKind[];
  facilities: Facility[];
  facility: Facility | null;
  organization: Organization | null;
  /** Returns the organization hierarchy tree. */
  organizationHierarchy: OrganizationHierarchy[];
  organizationHierarchyEmployee: OrganizationHierarchyEmployee | null;
  /** Returns connection of employees in the organization hierarchy. */
  organizationHierarchyEmployees: OrganizationHierarchyEmployeeConnection;
  /** Returns the organization hierarchy item by ID. */
  organizationHierarchyItem: OrganizationHierarchy | null;
  /** List of all organizations. */
  organizations: Organization[];
  shiftKind: ShiftKind | null;
  shiftKinds: ShiftKind[];
  /** Get a Systemization by ID. */
  systemization: Systemization | null;
  systemizationPosition: SystemizationPosition | null;
  systemizationPositions: SystemizationPosition[];
  /** List of all employee systemization options. */
  systemizations: Systemization[];
  workContractKind: WorkContractKind | null;
  workContractKinds: WorkContractKind[];
  employeeForm: EmployeeForm | null;
  form: Form | null;
  formFillSession: FormFillSession | null;
  formResultBind: FormResultBind | null;
  formResultKind: FormResultKind | null;
  formResultKinds: FormResultKind[];
  formSubmission: FormSubmission | null;
  formSubmissionAttachment: FormSubmissionAttachment | null;
  formVersion: FormVersion | null;
  formVersions: FormVersion[];
  forms: FormConnection;
  /**
   * Returns the Patient Profile for the given ID, email, or patient ID.
   * Only one of the parameters should be provided. Arguments precedence is ID, email, patientId.
   */
  salusPatientProfile: SalusPatientProfile | null;
  /** Returns a connection of Patient Profiles. */
  salusPatientProfiles: SalusPatientProfileConnection;
  salusPatientSession: SalusPatientSession | null;
  /** Returns the employee profile for the given employee ID or ID of profile. */
  sironaEmployeeProfile: SironaEmployeeProfile | null;
  /** Return Permission of Sirona by ID of the permission. */
  sironaPermission: SironaPermission | null;
  /** Returns all permissions of Sirona. */
  sironaPermissions: SironaPermission[];
  /** Sirona role by ID. */
  sironaRole: SironaRole | null;
  /** List of all Sirona roles. */
  sironaRoles: SironaRole[];
  /** Returns the employee profile for the given employee ID or ID of profile. */
  smenovkaEmployeeProfile: SmenovkaEmployeeProfile | null;
  /** Return Permissions of Smenovka by ID of the permission. */
  smenovkaPermission: SmenovkaPermission | null;
  /** Returns all permissions of Smenovka. */
  smenovkaPermissions: SmenovkaPermission[];
  /** Smenovka role by ID. */
  smenovkaRole: SmenovkaRole | null;
  /** List of all Smenovka roles. */
  smenovkaRoles: SmenovkaRole[];
  tabsyEmployeeProfile: TabsyEmployeeProfile | null;
  /** Returns the employee profile for the given employee ID or ID of profile. */
  zapkaEmployeeProfile: ZapkaEmployeeProfile | null;
  /** Return Permissions of Zapka by ID of the permission. */
  zapkaPermission: ZapkaPermission | null;
  /** Returns all permissions of Zapka. */
  zapkaPermissions: ZapkaPermission[];
  /** Zapka role by ID. */
  zapkaRole: ZapkaRole | null;
  /** List of all Zapka roles. */
  zapkaRoles: ZapkaRole[];
  dietAccount: DietAccount | null;
  dietAccountTranaction: DietAccountTransaction | null;
  dietAccountTransactionType: DietAccountTransactionType | null;
  dietAccountTransactionTypes: DietAccountTransactionType[];
  dietAccountTransactions: DietAccountTransactionConnection;
  dietAccounts: DietAccountConnection;
  dietConsumer: DietConsumer | null;
  dietConsumers: DietConsumerConnection;
  dietFacilities: DietFacility[];
  dietFacility: DietFacility | null;
  dietFoodType: DietFoodType | null;
  dietFoodTypes: DietFoodType[];
  dietMenu: DietMenu | null;
  dietMenus: DietMenuConnection;
  dietOrder: DietOrder | null;
  dietOrders: DietOrderConnection;
  dietType: DietType | null;
  dietTypes: DietTypeConnection;
  dietWorker: DietWorker | null;
  dietWorkers: DietWorker[];
  patientByAkordId: Patient | null;
  patient: Patient | null;
  patientByInsuranceNumber: Patient | null;
  patientFamilyMembers: PatientFamilyMember[];
  patients: PatientConnection;
  __typename: "Query";
}

export interface Room {
  building: Building | null;
  buildingId: Scalars["ID"] | null;
  capacity: Scalars["Int"];
  description: Scalars["String"] | null;
  floor: Scalars["Int"];
  id: Scalars["ID"];
  number: Scalars["String"];
  roomType: Scalars["Int"] | null;
  shortcut: Scalars["String"] | null;
  __typename: "Room";
}

export interface RoomConnection {
  /** A list of edges. */
  edges: RoomEdge[];
  /** A list of nodes. */
  nodes: Room[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "RoomConnection";
}

export type RoomConnectionSortByField = "NUMBER";

/** An edge in a connection. */
export interface RoomEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Room;
  __typename: "RoomEdge";
}

export interface SalusPatientProfile {
  email: Scalars["String"];
  emailVerified: Scalars["DateTime"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  patient: Patient;
  patientId: Scalars["ID"];
  __typename: "SalusPatientProfile";
}

export interface SalusPatientProfileConnection {
  /** A list of edges. */
  edges: SalusPatientProfileEdge[];
  /** A list of nodes. */
  nodes: SalusPatientProfile[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "SalusPatientProfileConnection";
}

export type SalusPatientProfileConnectionSortByField = "NAME";

/** An edge in a connection. */
export interface SalusPatientProfileEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: SalusPatientProfile;
  __typename: "SalusPatientProfileEdge";
}

export interface SalusPatientProfilePayload {
  salusPatientProfile: SalusPatientProfile;
  __typename: "SalusPatientProfilePayload";
}

export interface SalusPatientSession {
  createdAt: Scalars["DateTime"];
  expiresAt: Scalars["DateTime"];
  id: Scalars["ID"];
  patientProfileId: Scalars["ID"];
  sessionToken: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  __typename: "SalusPatientSession";
}

export interface SalusPatientSessionPayload {
  salusPatientSession: SalusPatientSession;
  __typename: "SalusPatientSessionPayload";
}

export interface SalusVerificationToken {
  expires: Scalars["DateTime"];
  identifier: Scalars["String"];
  token: Scalars["String"];
  __typename: "SalusVerificationToken";
}

export interface SalusVerificationTokenPayload {
  salusVerificationToken: SalusVerificationToken;
  __typename: "SalusVerificationTokenPayload";
}

export interface ScheduledSurgery {
  /** Code of surgery diagnosis. */
  diagnosisCode: Scalars["String"] | null;
  /** Description of surgery diagnosis. */
  diagnosisDescription: Scalars["String"] | null;
  /** Scheduled surgery ID */
  id: Scalars["ID"];
  /** Date of surgery schedule. */
  surgeryDate: Scalars["DateTime"];
  __typename: "ScheduledSurgery";
}

export interface ScheduledSurgeryConnection {
  /** A list of edges. */
  edges: ScheduledSurgeryEdge[];
  /** A list of nodes. */
  nodes: ScheduledSurgery[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "ScheduledSurgeryConnection";
}

export type ScheduledSurgeryConnectionSortByField = "SURGERY_DATE";

/** An edge in a connection. */
export interface ScheduledSurgeryEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: ScheduledSurgery;
  __typename: "ScheduledSurgeryEdge";
}

export interface ShiftKind {
  category: Scalars["String"] | null;
  code: Scalars["String"];
  days: Scalars["Int"];
  facilityId: Scalars["ID"];
  hours: Scalars["String"];
  id: Scalars["ID"];
  parentId: Scalars["ID"] | null;
  shiftKindSourceId: Scalars["Int"];
  __typename: "ShiftKind";
}

/** Employee Profile in Sirona. */
export interface SironaEmployeeProfile {
  deactivatedAt: Scalars["DateTime"] | null;
  defaultFacility: Facility;
  defaultFacilityId: Scalars["ID"];
  email: Scalars["String"];
  employeeId: Scalars["ID"];
  grants: SironaEmployeeProfileGrant[];
  id: Scalars["ID"];
  /** `true` if the profile is active. */
  isActive: Scalars["Boolean"];
  __typename: "SironaEmployeeProfile";
}

export interface SironaEmployeeProfileGrant {
  employeeProfileId: Scalars["ID"];
  grant: Scalars["String"];
  id: Scalars["ID"];
  profile: SironaEmployeeProfile;
  __typename: "SironaEmployeeProfileGrant";
}

export interface SironaEmployeeProfileGrantPayload {
  sironaEmployeeProfileGrant: SironaEmployeeProfileGrant;
  __typename: "SironaEmployeeProfileGrantPayload";
}

export interface SironaEmployeeProfilePayload {
  sironaEmployeeProfile: SironaEmployeeProfile;
  __typename: "SironaEmployeeProfilePayload";
}

export interface SironaPermission {
  code: Scalars["String"];
  description: Scalars["String"] | null;
  /** Available facilities for this permission. */
  facilities: Facility[];
  id: Scalars["ID"];
  name: Scalars["String"];
  /** Available roles for this permission. */
  roles: SironaRole[];
  __typename: "SironaPermission";
}

export interface SironaPermissionPayload {
  sironaPermission: SironaPermission;
  __typename: "SironaPermissionPayload";
}

export interface SironaRole {
  code: Scalars["String"];
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "SironaRole";
}

export interface SironaRolePayload {
  sironaRole: SironaRole;
  __typename: "SironaRolePayload";
}

export interface Slot {
  arrivalTime: Scalars["DateTime"] | null;
  callTime: Scalars["DateTime"] | null;
  dateFrom: Scalars["DateTime"];
  dateOfChange: Scalars["DateTime"] | null;
  dateTo: Scalars["DateTime"];
  departureTime: Scalars["DateTime"] | null;
  description: Scalars["String"] | null;
  doctor: Doctor | null;
  doctorId: Scalars["ID"] | null;
  duration: Scalars["Int"];
  examination: Examination | null;
  examinationId: Scalars["ID"] | null;
  gender: Scalars["Int"];
  id: Scalars["ID"];
  location: Location | null;
  locationId: Scalars["ID"] | null;
  patient: Patient | null;
  patientType: Scalars["Int"];
  previousSlot: Slot | null;
  previousSlotId: Scalars["ID"] | null;
  priority: Scalars["Int"];
  reservationUntil: Scalars["DateTime"] | null;
  room: Room | null;
  roomId: Scalars["ID"] | null;
  ruleId: Scalars["Int"] | null;
  slotColor: Scalars["String"] | null;
  slotType: Scalars["Boolean"];
  statim: Scalars["Boolean"] | null;
  status: Scalars["Int"] | null;
  sync: Scalars["Int"] | null;
  ticket: Scalars["Int"] | null;
  ticketTime: Scalars["DateTime"] | null;
  userId: Scalars["Int"] | null;
  variability: Scalars["Int"];
  workplace: Workplace | null;
  workplaceId: Scalars["ID"] | null;
  __typename: "Slot";
}

export interface SlotConnection {
  /** A list of edges. */
  edges: SlotEdge[];
  /** A list of nodes. */
  nodes: Slot[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "SlotConnection";
}

export type SlotConnectionSortByField = "DATE_FROM";

/** An edge in a connection. */
export interface SlotEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Slot;
  __typename: "SlotEdge";
}

/** Employee Profile in Smenovka. */
export interface SmenovkaEmployeeProfile {
  deactivatedAt: Scalars["DateTime"] | null;
  email: Scalars["String"];
  employeeId: Scalars["ID"];
  grants: SmenovkaEmployeeProfileGrant[];
  id: Scalars["ID"];
  /** `true` if the profile is active. */
  isActive: Scalars["Boolean"];
  __typename: "SmenovkaEmployeeProfile";
}

export interface SmenovkaEmployeeProfileGrant {
  employeeProfileId: Scalars["ID"];
  grant: Scalars["String"];
  id: Scalars["ID"];
  profile: SmenovkaEmployeeProfile;
  __typename: "SmenovkaEmployeeProfileGrant";
}

export interface SmenovkaEmployeeProfileGrantPayload {
  smenovkaEmployeeProfileGrant: SmenovkaEmployeeProfileGrant;
  __typename: "SmenovkaEmployeeProfileGrantPayload";
}

export interface SmenovkaEmployeeProfilePayload {
  smenovkaEmployeeProfile: SmenovkaEmployeeProfile;
  __typename: "SmenovkaEmployeeProfilePayload";
}

export interface SmenovkaPermission {
  code: Scalars["String"];
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  /** Available roles for this feature. */
  roles: SmenovkaRole[];
  __typename: "SmenovkaPermission";
}

export interface SmenovkaPermissionPayload {
  smenovkaPermission: SmenovkaPermission;
  __typename: "SmenovkaPermissionPayload";
}

export interface SmenovkaRole {
  code: Scalars["String"];
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "SmenovkaRole";
}

export interface SmenovkaRolePayload {
  smenovkaRole: SmenovkaRole;
  __typename: "SmenovkaRolePayload";
}

/** Specifies the direction for sorting. */
export type SortDirection = "ASC" | "DESC";

export interface Systemization {
  facility: Facility;
  facilityId: Scalars["ID"];
  grouping: Scalars["Int"];
  groupingType: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "Systemization";
}

export interface SystemizationPosition {
  category: SystemizationPositionCategory;
  facility: Facility;
  facilityId: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "SystemizationPosition";
}

export type SystemizationPositionCategory =
  | "ADMINISTRATIVE"
  | "DOCTORS"
  | "NZP"
  | "OTHER"
  | "RADIOLOGY_ASSISTANT"
  | "SZP";

export interface TabsyEmployeeProfile {
  employeeId: Scalars["ID"];
  id: Scalars["ID"];
  __typename: "TabsyEmployeeProfile";
}

export interface TabsyEmployeeProfilePayload {
  tabsyEmployeeProfile: TabsyEmployeeProfile;
  __typename: "TabsyEmployeeProfilePayload";
}

export interface UpsertFormsFromJsonPayload {
  form: Form;
  formVersion: FormVersion | null;
  wasFormInserted: Scalars["Boolean"];
  wasFormUpdated: Scalars["Boolean"];
  wasFormVersionInserted: Scalars["Boolean"];
  __typename: "UpsertFormsFromJsonPayload";
}

export interface UpsertSironaPermissionsFromJsonPayload {
  sironaPermission: SironaPermission;
  wasInserted: Scalars["Boolean"];
  wasUpdated: Scalars["Boolean"];
  __typename: "UpsertSironaPermissionsFromJsonPayload";
}

export interface UpsertSironaRolesFromJsonPayload {
  sironaRole: SironaRole;
  wasInserted: Scalars["Boolean"];
  wasUpdated: Scalars["Boolean"];
  __typename: "UpsertSironaRolesFromJsonPayload";
}

export interface WorkContractKind {
  id: Scalars["ID"];
  name: Scalars["String"];
  order: Scalars["Int"];
  /** Type of the contract. */
  type: WorkContractKindType;
  __typename: "WorkContractKind";
}

export type WorkContractKindType = "DPC" | "DPP" | "HPP" | "ICO" | "OTHER";

export interface Workplace {
  description: Scalars["String"] | null;
  expertise: Scalars["String"] | null;
  icp: Scalars["String"] | null;
  id: Scalars["ID"];
  instruction: Scalars["String"] | null;
  location: Location | null;
  locationId: Scalars["ID"];
  name: Scalars["String"];
  preGeneratedDays: Scalars["Int"] | null;
  preOrderMode: Scalars["Int"] | null;
  shortcut: Scalars["String"] | null;
  slotColor: Scalars["String"] | null;
  timeFrom: Scalars["NaiveTime"] | null;
  timeTo: Scalars["NaiveTime"] | null;
  __typename: "Workplace";
}

export interface WorkplaceConnection {
  /** A list of edges. */
  edges: WorkplaceEdge[];
  /** A list of nodes. */
  nodes: Workplace[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars["Int"];
  __typename: "WorkplaceConnection";
}

export type WorkplaceConnectionSortByField = "NAME";

/** An edge in a connection. */
export interface WorkplaceEdge {
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Workplace;
  __typename: "WorkplaceEdge";
}

/** Employee Profile in Zapka. */
export interface ZapkaEmployeeProfile {
  deactivatedAt: Scalars["DateTime"] | null;
  email: Scalars["String"];
  employeeId: Scalars["ID"];
  grants: ZapkaEmployeeProfileGrant[];
  id: Scalars["ID"];
  /** `true` if the profile is active. */
  isActive: Scalars["Boolean"];
  __typename: "ZapkaEmployeeProfile";
}

export interface ZapkaEmployeeProfileGrant {
  employeeProfileId: Scalars["ID"];
  grant: Scalars["String"];
  id: Scalars["ID"];
  profile: ZapkaEmployeeProfile;
  __typename: "ZapkaEmployeeProfileGrant";
}

export interface ZapkaEmployeeProfileGrantPayload {
  zapkaEmployeeProfileGrant: ZapkaEmployeeProfileGrant;
  __typename: "ZapkaEmployeeProfileGrantPayload";
}

export interface ZapkaEmployeeProfilePayload {
  zapkaEmployeeProfile: ZapkaEmployeeProfile;
  __typename: "ZapkaEmployeeProfilePayload";
}

export interface ZapkaPermission {
  code: Scalars["String"];
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  /** Available roles for this feature. */
  roles: ZapkaRole[];
  __typename: "ZapkaPermission";
}

export interface ZapkaPermissionPayload {
  zapkaPermission: ZapkaPermission;
  __typename: "ZapkaPermissionPayload";
}

export interface ZapkaRole {
  code: Scalars["String"];
  description: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
  __typename: "ZapkaRole";
}

export interface ZapkaRolePayload {
  zapkaRole: ZapkaRole;
  __typename: "ZapkaRolePayload";
}

/** Building of a hospital, clinic, etc. */
export interface BuildingGenqlSelection {
  description?: boolean | number;
  id?: boolean | number;
  location?: LocationGenqlSelection;
  locationId?: boolean | number;
  name?: boolean | number;
  shortcut?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface BuildingConnectionGenqlSelection {
  /** A list of edges. */
  edges?: BuildingEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: BuildingGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface BuildingConnectionSortBy {
  direction: SortDirection;
  field: BuildingConnectionSortByField;
}

/** An edge in a connection. */
export interface BuildingEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: BuildingGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsAkesoNewsPostGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  teaserText?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  locale?: boolean | number;
  localizations_connection?: CmsAkesoNewsPostRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsAkesoNewsPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  localizations?: CmsAkesoNewsPostGenqlSelection & {
    __args?: {
      filters?: CmsAkesoNewsPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsAkesoNewsPostEntityResponseCollectionGenqlSelection {
  nodes?: CmsAkesoNewsPostGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsAkesoNewsPostFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  teaserText?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  locale?: CmsStringFilterInput | null;
  localizations?: CmsAkesoNewsPostFiltersInput | null;
  and?: (CmsAkesoNewsPostFiltersInput | null)[] | null;
  or?: (CmsAkesoNewsPostFiltersInput | null)[] | null;
  not?: CmsAkesoNewsPostFiltersInput | null;
}

export interface CmsAkesoNewsPostInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  teaserText?: Scalars["String"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsAkesoNewsPostRelationResponseCollectionGenqlSelection {
  nodes?: CmsAkesoNewsPostGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsBooleanFilterInput {
  and?: (Scalars["Boolean"] | null)[] | null;
  or?: (Scalars["Boolean"] | null)[] | null;
  not?: CmsBooleanFilterInput | null;
  eq?: Scalars["Boolean"] | null;
  eqi?: Scalars["Boolean"] | null;
  ne?: Scalars["Boolean"] | null;
  nei?: Scalars["Boolean"] | null;
  startsWith?: Scalars["Boolean"] | null;
  endsWith?: Scalars["Boolean"] | null;
  contains?: Scalars["Boolean"] | null;
  notContains?: Scalars["Boolean"] | null;
  containsi?: Scalars["Boolean"] | null;
  notContainsi?: Scalars["Boolean"] | null;
  gt?: Scalars["Boolean"] | null;
  gte?: Scalars["Boolean"] | null;
  lt?: Scalars["Boolean"] | null;
  lte?: Scalars["Boolean"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["Boolean"] | null)[] | null;
  notIn?: (Scalars["Boolean"] | null)[] | null;
  between?: (Scalars["Boolean"] | null)[] | null;
}

export interface CmsComponentLinksExterniLinkaGenqlSelection {
  id?: boolean | number;
  label?: boolean | number;
  href?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsComponentLinksExterniLinkaFiltersInput {
  label?: CmsStringFilterInput | null;
  href?: CmsStringFilterInput | null;
  and?: (CmsComponentLinksExterniLinkaFiltersInput | null)[] | null;
  or?: (CmsComponentLinksExterniLinkaFiltersInput | null)[] | null;
  not?: CmsComponentLinksExterniLinkaFiltersInput | null;
}

export interface CmsComponentLinksExterniLinkaInput {
  id?: Scalars["ID"] | null;
  label?: Scalars["String"] | null;
  href?: Scalars["String"] | null;
}

export interface CmsDateFilterInput {
  and?: (Scalars["CmsDate"] | null)[] | null;
  or?: (Scalars["CmsDate"] | null)[] | null;
  not?: CmsDateFilterInput | null;
  eq?: Scalars["CmsDate"] | null;
  eqi?: Scalars["CmsDate"] | null;
  ne?: Scalars["CmsDate"] | null;
  nei?: Scalars["CmsDate"] | null;
  startsWith?: Scalars["CmsDate"] | null;
  endsWith?: Scalars["CmsDate"] | null;
  contains?: Scalars["CmsDate"] | null;
  notContains?: Scalars["CmsDate"] | null;
  containsi?: Scalars["CmsDate"] | null;
  notContainsi?: Scalars["CmsDate"] | null;
  gt?: Scalars["CmsDate"] | null;
  gte?: Scalars["CmsDate"] | null;
  lt?: Scalars["CmsDate"] | null;
  lte?: Scalars["CmsDate"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["CmsDate"] | null)[] | null;
  notIn?: (Scalars["CmsDate"] | null)[] | null;
  between?: (Scalars["CmsDate"] | null)[] | null;
}

export interface CmsDateTimeFilterInput {
  and?: (Scalars["CmsDateTime"] | null)[] | null;
  or?: (Scalars["CmsDateTime"] | null)[] | null;
  not?: CmsDateTimeFilterInput | null;
  eq?: Scalars["CmsDateTime"] | null;
  eqi?: Scalars["CmsDateTime"] | null;
  ne?: Scalars["CmsDateTime"] | null;
  nei?: Scalars["CmsDateTime"] | null;
  startsWith?: Scalars["CmsDateTime"] | null;
  endsWith?: Scalars["CmsDateTime"] | null;
  contains?: Scalars["CmsDateTime"] | null;
  notContains?: Scalars["CmsDateTime"] | null;
  containsi?: Scalars["CmsDateTime"] | null;
  notContainsi?: Scalars["CmsDateTime"] | null;
  gt?: Scalars["CmsDateTime"] | null;
  gte?: Scalars["CmsDateTime"] | null;
  lt?: Scalars["CmsDateTime"] | null;
  lte?: Scalars["CmsDateTime"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["CmsDateTime"] | null)[] | null;
  notIn?: (Scalars["CmsDateTime"] | null)[] | null;
  between?: (Scalars["CmsDateTime"] | null)[] | null;
}

export interface CmsDeleteMutationResponseGenqlSelection {
  documentId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsFloatFilterInput {
  and?: (Scalars["Float"] | null)[] | null;
  or?: (Scalars["Float"] | null)[] | null;
  not?: CmsFloatFilterInput | null;
  eq?: Scalars["Float"] | null;
  eqi?: Scalars["Float"] | null;
  ne?: Scalars["Float"] | null;
  nei?: Scalars["Float"] | null;
  startsWith?: Scalars["Float"] | null;
  endsWith?: Scalars["Float"] | null;
  contains?: Scalars["Float"] | null;
  notContains?: Scalars["Float"] | null;
  containsi?: Scalars["Float"] | null;
  notContainsi?: Scalars["Float"] | null;
  gt?: Scalars["Float"] | null;
  gte?: Scalars["Float"] | null;
  lt?: Scalars["Float"] | null;
  lte?: Scalars["Float"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["Float"] | null)[] | null;
  notIn?: (Scalars["Float"] | null)[] | null;
  between?: (Scalars["Float"] | null)[] | null;
}

export interface CmsGenericMorphGenqlSelection {
  on_CmsComponentLinksExterniLinka?: CmsComponentLinksExterniLinkaGenqlSelection;
  on_CmsUploadFile?: CmsUploadFileGenqlSelection;
  on_CmsAkesoNewsPost?: CmsAkesoNewsPostGenqlSelection;
  on_CmsIntranetBenefit?: CmsIntranetBenefitGenqlSelection;
  on_CmsIntranetEducationCategory?: CmsIntranetEducationCategoryGenqlSelection;
  on_CmsIntranetEducationInstruction?: CmsIntranetEducationInstructionGenqlSelection;
  on_CmsIntranetEmployeeContact?: CmsIntranetEmployeeContactGenqlSelection;
  on_CmsIntranetEvent?: CmsIntranetEventGenqlSelection;
  on_CmsIntranetEventReport?: CmsIntranetEventReportGenqlSelection;
  on_CmsIntranetFaq?: CmsIntranetFaqGenqlSelection;
  on_CmsIntranetLink?: CmsIntranetLinkGenqlSelection;
  on_CmsIntranetLocation?: CmsIntranetLocationGenqlSelection;
  on_CmsIntranetMagazineNea?: CmsIntranetMagazineNeaGenqlSelection;
  on_CmsIntranetNewsItem?: CmsIntranetNewsItemGenqlSelection;
  on_CmsIntranetRole?: CmsIntranetRoleGenqlSelection;
  on_CmsItBlogAbout?: CmsItBlogAboutGenqlSelection;
  on_CmsItBlogBanner?: CmsItBlogBannerGenqlSelection;
  on_CmsItBlogPost?: CmsItBlogPostGenqlSelection;
  on_CmsItBlogTag?: CmsItBlogTagGenqlSelection;
  on_CmsSalusEducationPost?: CmsSalusEducationPostGenqlSelection;
  on_CmsSalusEducationTag?: CmsSalusEducationTagGenqlSelection;
  on_CmsSalusFaq?: CmsSalusFaqGenqlSelection;
  on_CmsSalusVzdelavaniVerifiedBy?: CmsSalusVzdelavaniVerifiedByGenqlSelection;
  __typename?: boolean | number;
}

export interface CmsIDFilterInput {
  and?: (Scalars["ID"] | null)[] | null;
  or?: (Scalars["ID"] | null)[] | null;
  not?: CmsIDFilterInput | null;
  eq?: Scalars["ID"] | null;
  eqi?: Scalars["ID"] | null;
  ne?: Scalars["ID"] | null;
  nei?: Scalars["ID"] | null;
  startsWith?: Scalars["ID"] | null;
  endsWith?: Scalars["ID"] | null;
  contains?: Scalars["ID"] | null;
  notContains?: Scalars["ID"] | null;
  containsi?: Scalars["ID"] | null;
  notContainsi?: Scalars["ID"] | null;
  gt?: Scalars["ID"] | null;
  gte?: Scalars["ID"] | null;
  lt?: Scalars["ID"] | null;
  lte?: Scalars["ID"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["ID"] | null)[] | null;
  notIn?: (Scalars["ID"] | null)[] | null;
  between?: (Scalars["ID"] | null)[] | null;
}

export interface CmsIntFilterInput {
  and?: (Scalars["Int"] | null)[] | null;
  or?: (Scalars["Int"] | null)[] | null;
  not?: CmsIntFilterInput | null;
  eq?: Scalars["Int"] | null;
  eqi?: Scalars["Int"] | null;
  ne?: Scalars["Int"] | null;
  nei?: Scalars["Int"] | null;
  startsWith?: Scalars["Int"] | null;
  endsWith?: Scalars["Int"] | null;
  contains?: Scalars["Int"] | null;
  notContains?: Scalars["Int"] | null;
  containsi?: Scalars["Int"] | null;
  notContainsi?: Scalars["Int"] | null;
  gt?: Scalars["Int"] | null;
  gte?: Scalars["Int"] | null;
  lt?: Scalars["Int"] | null;
  lte?: Scalars["Int"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["Int"] | null)[] | null;
  notIn?: (Scalars["Int"] | null)[] | null;
  between?: (Scalars["Int"] | null)[] | null;
}

export interface CmsIntranetBenefitGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  teaserText?: boolean | number;
  teaserImage?: CmsUploadFileGenqlSelection;
  body?: boolean | number;
  author?: boolean | number;
  approverEmails?: boolean | number;
  locations_connection?: CmsIntranetLocationRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments_connection?: CmsUploadFileRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments?: CmsUploadFileGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  externalLinks?: CmsComponentLinksExterniLinkaGenqlSelection & {
    __args?: {
      filters?: CmsComponentLinksExterniLinkaFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  validFrom?: boolean | number;
  validTo?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetBenefitEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetBenefitGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetBenefitFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  teaserText?: CmsStringFilterInput | null;
  body?: CmsJSONFilterInput | null;
  author?: CmsStringFilterInput | null;
  approverEmails?: CmsStringFilterInput | null;
  locations?: CmsIntranetLocationFiltersInput | null;
  externalLinks?: CmsComponentLinksExterniLinkaFiltersInput | null;
  validFrom?: CmsDateTimeFilterInput | null;
  validTo?: CmsDateTimeFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetBenefitFiltersInput | null)[] | null;
  or?: (CmsIntranetBenefitFiltersInput | null)[] | null;
  not?: CmsIntranetBenefitFiltersInput | null;
}

export interface CmsIntranetBenefitInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  teaserText?: Scalars["String"] | null;
  teaserImage?: Scalars["ID"] | null;
  body?: Scalars["CmsJSON"] | null;
  author?: Scalars["String"] | null;
  approverEmails?: Scalars["String"] | null;
  locations?: (Scalars["ID"] | null)[] | null;
  attachedDocuments?: (Scalars["ID"] | null)[] | null;
  externalLinks?: (CmsComponentLinksExterniLinkaInput | null)[] | null;
  validFrom?: Scalars["CmsDateTime"] | null;
  validTo?: Scalars["CmsDateTime"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetEducationCategoryGenqlSelection {
  documentId?: boolean | number;
  name?: boolean | number;
  slug?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEducationCategoryEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetEducationCategoryGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEducationCategoryFiltersInput {
  documentId?: CmsIDFilterInput | null;
  name?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetEducationCategoryFiltersInput | null)[] | null;
  or?: (CmsIntranetEducationCategoryFiltersInput | null)[] | null;
  not?: CmsIntranetEducationCategoryFiltersInput | null;
}

export interface CmsIntranetEducationCategoryInput {
  name?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetEducationCategoryRelationResponseCollectionGenqlSelection {
  nodes?: CmsIntranetEducationCategoryGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEducationInstructionGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  teaserText?: boolean | number;
  teaserImage?: CmsUploadFileGenqlSelection;
  body?: boolean | number;
  author?: boolean | number;
  locations_connection?: CmsIntranetLocationRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  roles_connection?: CmsIntranetRoleRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetRoleFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  roles?: CmsIntranetRoleGenqlSelection & {
    __args?: {
      filters?: CmsIntranetRoleFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  categories_connection?: CmsIntranetEducationCategoryRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEducationCategoryFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  categories?: CmsIntranetEducationCategoryGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEducationCategoryFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments_connection?: CmsUploadFileRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments?: CmsUploadFileGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  externalLinks?: CmsComponentLinksExterniLinkaGenqlSelection & {
    __args?: {
      filters?: CmsComponentLinksExterniLinkaFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEducationInstructionEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetEducationInstructionGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEducationInstructionFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  teaserText?: CmsStringFilterInput | null;
  body?: CmsJSONFilterInput | null;
  author?: CmsStringFilterInput | null;
  locations?: CmsIntranetLocationFiltersInput | null;
  roles?: CmsIntranetRoleFiltersInput | null;
  categories?: CmsIntranetEducationCategoryFiltersInput | null;
  externalLinks?: CmsComponentLinksExterniLinkaFiltersInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetEducationInstructionFiltersInput | null)[] | null;
  or?: (CmsIntranetEducationInstructionFiltersInput | null)[] | null;
  not?: CmsIntranetEducationInstructionFiltersInput | null;
}

export interface CmsIntranetEducationInstructionInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  teaserText?: Scalars["String"] | null;
  teaserImage?: Scalars["ID"] | null;
  body?: Scalars["CmsJSON"] | null;
  author?: Scalars["String"] | null;
  locations?: (Scalars["ID"] | null)[] | null;
  roles?: (Scalars["ID"] | null)[] | null;
  categories?: (Scalars["ID"] | null)[] | null;
  attachedDocuments?: (Scalars["ID"] | null)[] | null;
  externalLinks?: (CmsComponentLinksExterniLinkaInput | null)[] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetEmployeeContactGenqlSelection {
  documentId?: boolean | number;
  firstName?: boolean | number;
  lastName?: boolean | number;
  email?: boolean | number;
  phoneNumberInternal?: boolean | number;
  phoneNumberWorkMobile?: boolean | number;
  phoneNumberPrivateMobile?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEmployeeContactEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetEmployeeContactGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEmployeeContactFiltersInput {
  documentId?: CmsIDFilterInput | null;
  firstName?: CmsStringFilterInput | null;
  lastName?: CmsStringFilterInput | null;
  email?: CmsStringFilterInput | null;
  phoneNumberInternal?: CmsStringFilterInput | null;
  phoneNumberWorkMobile?: CmsStringFilterInput | null;
  phoneNumberPrivateMobile?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetEmployeeContactFiltersInput | null)[] | null;
  or?: (CmsIntranetEmployeeContactFiltersInput | null)[] | null;
  not?: CmsIntranetEmployeeContactFiltersInput | null;
}

export interface CmsIntranetEmployeeContactInput {
  firstName?: Scalars["String"] | null;
  lastName?: Scalars["String"] | null;
  email?: Scalars["String"] | null;
  phoneNumberInternal?: Scalars["String"] | null;
  phoneNumberWorkMobile?: Scalars["String"] | null;
  phoneNumberPrivateMobile?: Scalars["String"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetEventGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  startDate?: boolean | number;
  endDate?: boolean | number;
  body?: boolean | number;
  locations_connection?: CmsIntranetLocationRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments_connection?: CmsUploadFileRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments?: CmsUploadFileGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  externalLinks?: CmsComponentLinksExterniLinkaGenqlSelection & {
    __args?: {
      filters?: CmsComponentLinksExterniLinkaFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  validFrom?: boolean | number;
  validTo?: boolean | number;
  reports_connection?: CmsIntranetEventReportRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEventReportFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  reports?: CmsIntranetEventReportGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEventReportFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEventEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetEventGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEventFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  startDate?: CmsDateTimeFilterInput | null;
  endDate?: CmsDateTimeFilterInput | null;
  body?: CmsJSONFilterInput | null;
  locations?: CmsIntranetLocationFiltersInput | null;
  externalLinks?: CmsComponentLinksExterniLinkaFiltersInput | null;
  validFrom?: CmsDateTimeFilterInput | null;
  validTo?: CmsDateTimeFilterInput | null;
  reports?: CmsIntranetEventReportFiltersInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetEventFiltersInput | null)[] | null;
  or?: (CmsIntranetEventFiltersInput | null)[] | null;
  not?: CmsIntranetEventFiltersInput | null;
}

export interface CmsIntranetEventInput {
  title?: Scalars["String"] | null;
  startDate?: Scalars["CmsDateTime"] | null;
  endDate?: Scalars["CmsDateTime"] | null;
  body?: Scalars["CmsJSON"] | null;
  locations?: (Scalars["ID"] | null)[] | null;
  attachedDocuments?: (Scalars["ID"] | null)[] | null;
  externalLinks?: (CmsComponentLinksExterniLinkaInput | null)[] | null;
  validFrom?: Scalars["CmsDateTime"] | null;
  validTo?: Scalars["CmsDateTime"] | null;
  reports?: (Scalars["ID"] | null)[] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetEventReportGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  body?: boolean | number;
  mediaGallery_connection?: CmsUploadFileRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  mediaGallery?: CmsUploadFileGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations_connection?: CmsIntranetLocationRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments_connection?: CmsUploadFileRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments?: CmsUploadFileGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  externalLinks?: CmsComponentLinksExterniLinkaGenqlSelection & {
    __args?: {
      filters?: CmsComponentLinksExterniLinkaFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  event?: CmsIntranetEventGenqlSelection;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEventReportEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetEventReportGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetEventReportFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  body?: CmsJSONFilterInput | null;
  locations?: CmsIntranetLocationFiltersInput | null;
  externalLinks?: CmsComponentLinksExterniLinkaFiltersInput | null;
  event?: CmsIntranetEventFiltersInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetEventReportFiltersInput | null)[] | null;
  or?: (CmsIntranetEventReportFiltersInput | null)[] | null;
  not?: CmsIntranetEventReportFiltersInput | null;
}

export interface CmsIntranetEventReportInput {
  title?: Scalars["String"] | null;
  body?: Scalars["CmsJSON"] | null;
  mediaGallery?: (Scalars["ID"] | null)[] | null;
  locations?: (Scalars["ID"] | null)[] | null;
  attachedDocuments?: (Scalars["ID"] | null)[] | null;
  externalLinks?: (CmsComponentLinksExterniLinkaInput | null)[] | null;
  event?: Scalars["ID"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetEventReportRelationResponseCollectionGenqlSelection {
  nodes?: CmsIntranetEventReportGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetFaqGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  body?: boolean | number;
  locations_connection?: CmsIntranetLocationRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments_connection?: CmsUploadFileRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  attachedDocuments?: CmsUploadFileGenqlSelection & {
    __args?: {
      filters?: CmsUploadFileFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  externalLinks?: CmsComponentLinksExterniLinkaGenqlSelection & {
    __args?: {
      filters?: CmsComponentLinksExterniLinkaFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  validFrom?: boolean | number;
  validTo?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetFaqEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetFaqGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetFaqFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  body?: CmsJSONFilterInput | null;
  locations?: CmsIntranetLocationFiltersInput | null;
  externalLinks?: CmsComponentLinksExterniLinkaFiltersInput | null;
  validFrom?: CmsDateTimeFilterInput | null;
  validTo?: CmsDateTimeFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetFaqFiltersInput | null)[] | null;
  or?: (CmsIntranetFaqFiltersInput | null)[] | null;
  not?: CmsIntranetFaqFiltersInput | null;
}

export interface CmsIntranetFaqInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  body?: Scalars["CmsJSON"] | null;
  locations?: (Scalars["ID"] | null)[] | null;
  attachedDocuments?: (Scalars["ID"] | null)[] | null;
  externalLinks?: (CmsComponentLinksExterniLinkaInput | null)[] | null;
  validFrom?: Scalars["CmsDateTime"] | null;
  validTo?: Scalars["CmsDateTime"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetLinkGenqlSelection {
  documentId?: boolean | number;
  label?: boolean | number;
  href?: boolean | number;
  type?: boolean | number;
  teaserText?: boolean | number;
  locations_connection?: CmsIntranetLocationRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetLinkEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetLinkGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetLinkFiltersInput {
  documentId?: CmsIDFilterInput | null;
  label?: CmsStringFilterInput | null;
  href?: CmsStringFilterInput | null;
  type?: CmsStringFilterInput | null;
  teaserText?: CmsStringFilterInput | null;
  locations?: CmsIntranetLocationFiltersInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetLinkFiltersInput | null)[] | null;
  or?: (CmsIntranetLinkFiltersInput | null)[] | null;
  not?: CmsIntranetLinkFiltersInput | null;
}

export interface CmsIntranetLinkInput {
  label?: Scalars["String"] | null;
  href?: Scalars["String"] | null;
  type?: ENUM_CMS_INTRANETLINK_TYPE | null;
  teaserText?: Scalars["String"] | null;
  locations?: (Scalars["ID"] | null)[] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetLocationGenqlSelection {
  documentId?: boolean | number;
  name?: boolean | number;
  slug?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetLocationEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetLocationGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetLocationFiltersInput {
  documentId?: CmsIDFilterInput | null;
  name?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetLocationFiltersInput | null)[] | null;
  or?: (CmsIntranetLocationFiltersInput | null)[] | null;
  not?: CmsIntranetLocationFiltersInput | null;
}

export interface CmsIntranetLocationInput {
  name?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetLocationRelationResponseCollectionGenqlSelection {
  nodes?: CmsIntranetLocationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetMagazineNeaGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  teaserImage?: CmsUploadFileGenqlSelection;
  releaseDate?: boolean | number;
  href?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetMagazineNeaEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetMagazineNeaGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetMagazineNeaFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  releaseDate?: CmsDateFilterInput | null;
  href?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetMagazineNeaFiltersInput | null)[] | null;
  or?: (CmsIntranetMagazineNeaFiltersInput | null)[] | null;
  not?: CmsIntranetMagazineNeaFiltersInput | null;
}

export interface CmsIntranetMagazineNeaInput {
  title?: Scalars["String"] | null;
  teaserImage?: Scalars["ID"] | null;
  releaseDate?: Scalars["CmsDate"] | null;
  href?: Scalars["String"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetNewsItemGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  teaserText?: boolean | number;
  teaserImage?: CmsUploadFileGenqlSelection;
  body?: boolean | number;
  author?: boolean | number;
  locations_connection?: CmsIntranetLocationRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  locations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  roles_connection?: CmsIntranetRoleRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetRoleFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  roles?: CmsIntranetRoleGenqlSelection & {
    __args?: {
      filters?: CmsIntranetRoleFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  validFrom?: boolean | number;
  validTo?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetNewsItemEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetNewsItemGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetNewsItemFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  teaserText?: CmsStringFilterInput | null;
  body?: CmsJSONFilterInput | null;
  author?: CmsStringFilterInput | null;
  locations?: CmsIntranetLocationFiltersInput | null;
  roles?: CmsIntranetRoleFiltersInput | null;
  validFrom?: CmsDateTimeFilterInput | null;
  validTo?: CmsDateTimeFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetNewsItemFiltersInput | null)[] | null;
  or?: (CmsIntranetNewsItemFiltersInput | null)[] | null;
  not?: CmsIntranetNewsItemFiltersInput | null;
}

export interface CmsIntranetNewsItemInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  teaserText?: Scalars["String"] | null;
  teaserImage?: Scalars["ID"] | null;
  body?: Scalars["CmsJSON"] | null;
  author?: Scalars["String"] | null;
  locations?: (Scalars["ID"] | null)[] | null;
  roles?: (Scalars["ID"] | null)[] | null;
  validFrom?: Scalars["CmsDateTime"] | null;
  validTo?: Scalars["CmsDateTime"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetRoleGenqlSelection {
  documentId?: boolean | number;
  name?: boolean | number;
  slug?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetRoleEntityResponseCollectionGenqlSelection {
  nodes?: CmsIntranetRoleGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsIntranetRoleFiltersInput {
  documentId?: CmsIDFilterInput | null;
  name?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsIntranetRoleFiltersInput | null)[] | null;
  or?: (CmsIntranetRoleFiltersInput | null)[] | null;
  not?: CmsIntranetRoleFiltersInput | null;
}

export interface CmsIntranetRoleInput {
  name?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsIntranetRoleRelationResponseCollectionGenqlSelection {
  nodes?: CmsIntranetRoleGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogAboutGenqlSelection {
  documentId?: boolean | number;
  about?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogAboutEntityResponseCollectionGenqlSelection {
  nodes?: CmsItBlogAboutGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogAboutFiltersInput {
  documentId?: CmsIDFilterInput | null;
  about?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsItBlogAboutFiltersInput | null)[] | null;
  or?: (CmsItBlogAboutFiltersInput | null)[] | null;
  not?: CmsItBlogAboutFiltersInput | null;
}

export interface CmsItBlogAboutInput {
  about?: Scalars["String"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsItBlogBannerGenqlSelection {
  documentId?: boolean | number;
  image?: CmsUploadFileGenqlSelection;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogBannerEntityResponseCollectionGenqlSelection {
  nodes?: CmsItBlogBannerGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogBannerFiltersInput {
  documentId?: CmsIDFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsItBlogBannerFiltersInput | null)[] | null;
  or?: (CmsItBlogBannerFiltersInput | null)[] | null;
  not?: CmsItBlogBannerFiltersInput | null;
}

export interface CmsItBlogBannerInput {
  image?: Scalars["ID"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsItBlogPostGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  teaserImage?: CmsUploadFileGenqlSelection;
  author?: boolean | number;
  date?: boolean | number;
  avatar?: CmsUploadFileGenqlSelection;
  body?: boolean | number;
  thumbsUp?: boolean | number;
  thumbsDown?: boolean | number;
  categoryTag_connection?: CmsItBlogTagRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsItBlogTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  categoryTag?: CmsItBlogTagGenqlSelection & {
    __args?: {
      filters?: CmsItBlogTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogPostEntityResponseCollectionGenqlSelection {
  nodes?: CmsItBlogPostGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogPostFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  author?: CmsStringFilterInput | null;
  date?: CmsDateFilterInput | null;
  body?: CmsStringFilterInput | null;
  thumbsUp?: CmsIntFilterInput | null;
  thumbsDown?: CmsIntFilterInput | null;
  categoryTag?: CmsItBlogTagFiltersInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsItBlogPostFiltersInput | null)[] | null;
  or?: (CmsItBlogPostFiltersInput | null)[] | null;
  not?: CmsItBlogPostFiltersInput | null;
}

export interface CmsItBlogPostInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  teaserImage?: Scalars["ID"] | null;
  author?: Scalars["String"] | null;
  date?: Scalars["CmsDate"] | null;
  avatar?: Scalars["ID"] | null;
  body?: Scalars["String"] | null;
  thumbsUp?: Scalars["Int"] | null;
  thumbsDown?: Scalars["Int"] | null;
  categoryTag?: (Scalars["ID"] | null)[] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsItBlogPostRelationResponseCollectionGenqlSelection {
  nodes?: CmsItBlogPostGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogTagGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  assign_categoryTag_connection?: CmsItBlogPostRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsItBlogPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  assign_categoryTag?: CmsItBlogPostGenqlSelection & {
    __args?: {
      filters?: CmsItBlogPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogTagEntityResponseCollectionGenqlSelection {
  nodes?: CmsItBlogTagGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsItBlogTagFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  assign_categoryTag?: CmsItBlogPostFiltersInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsItBlogTagFiltersInput | null)[] | null;
  or?: (CmsItBlogTagFiltersInput | null)[] | null;
  not?: CmsItBlogTagFiltersInput | null;
}

export interface CmsItBlogTagInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  assign_categoryTag?: (Scalars["ID"] | null)[] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsItBlogTagRelationResponseCollectionGenqlSelection {
  nodes?: CmsItBlogTagGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsJSONFilterInput {
  and?: (Scalars["CmsJSON"] | null)[] | null;
  or?: (Scalars["CmsJSON"] | null)[] | null;
  not?: CmsJSONFilterInput | null;
  eq?: Scalars["CmsJSON"] | null;
  eqi?: Scalars["CmsJSON"] | null;
  ne?: Scalars["CmsJSON"] | null;
  nei?: Scalars["CmsJSON"] | null;
  startsWith?: Scalars["CmsJSON"] | null;
  endsWith?: Scalars["CmsJSON"] | null;
  contains?: Scalars["CmsJSON"] | null;
  notContains?: Scalars["CmsJSON"] | null;
  containsi?: Scalars["CmsJSON"] | null;
  notContainsi?: Scalars["CmsJSON"] | null;
  gt?: Scalars["CmsJSON"] | null;
  gte?: Scalars["CmsJSON"] | null;
  lt?: Scalars["CmsJSON"] | null;
  lte?: Scalars["CmsJSON"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["CmsJSON"] | null)[] | null;
  notIn?: (Scalars["CmsJSON"] | null)[] | null;
  between?: (Scalars["CmsJSON"] | null)[] | null;
}

export interface CmsPaginationGenqlSelection {
  total?: boolean | number;
  page?: boolean | number;
  pageSize?: boolean | number;
  pageCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsPaginationArg {
  page?: Scalars["Int"] | null;
  pageSize?: Scalars["Int"] | null;
  start?: Scalars["Int"] | null;
  limit?: Scalars["Int"] | null;
}

export interface CmsSalusEducationPostGenqlSelection {
  documentId?: boolean | number;
  title?: boolean | number;
  slug?: boolean | number;
  teaserText?: boolean | number;
  teaserImage?: CmsUploadFileGenqlSelection;
  body?: boolean | number;
  tags_connection?: CmsSalusEducationTagRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  tags?: CmsSalusEducationTagGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  verifiedBy?: CmsSalusVzdelavaniVerifiedByGenqlSelection;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  locale?: boolean | number;
  localizations_connection?: CmsSalusEducationPostRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  localizations?: CmsSalusEducationPostGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusEducationPostEntityResponseCollectionGenqlSelection {
  nodes?: CmsSalusEducationPostGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusEducationPostFiltersInput {
  documentId?: CmsIDFilterInput | null;
  title?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  teaserText?: CmsStringFilterInput | null;
  body?: CmsJSONFilterInput | null;
  tags?: CmsSalusEducationTagFiltersInput | null;
  verifiedBy?: CmsSalusVzdelavaniVerifiedByFiltersInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  locale?: CmsStringFilterInput | null;
  localizations?: CmsSalusEducationPostFiltersInput | null;
  and?: (CmsSalusEducationPostFiltersInput | null)[] | null;
  or?: (CmsSalusEducationPostFiltersInput | null)[] | null;
  not?: CmsSalusEducationPostFiltersInput | null;
}

export interface CmsSalusEducationPostInput {
  title?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  teaserText?: Scalars["String"] | null;
  teaserImage?: Scalars["ID"] | null;
  body?: Scalars["CmsJSON"] | null;
  tags?: (Scalars["ID"] | null)[] | null;
  verifiedBy?: Scalars["ID"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsSalusEducationPostRelationResponseCollectionGenqlSelection {
  nodes?: CmsSalusEducationPostGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusEducationTagGenqlSelection {
  documentId?: boolean | number;
  name?: boolean | number;
  slug?: boolean | number;
  educationPosts_connection?: CmsSalusEducationPostRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  educationPosts?: CmsSalusEducationPostGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  educationPageOrder?: boolean | number;
  isCategory?: boolean | number;
  weight?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  locale?: boolean | number;
  localizations_connection?: CmsSalusEducationTagRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  localizations?: CmsSalusEducationTagGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusEducationTagEntityResponseCollectionGenqlSelection {
  nodes?: CmsSalusEducationTagGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusEducationTagFiltersInput {
  documentId?: CmsIDFilterInput | null;
  name?: CmsStringFilterInput | null;
  slug?: CmsStringFilterInput | null;
  educationPosts?: CmsSalusEducationPostFiltersInput | null;
  educationPageOrder?: CmsIntFilterInput | null;
  isCategory?: CmsBooleanFilterInput | null;
  weight?: CmsIntFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  locale?: CmsStringFilterInput | null;
  localizations?: CmsSalusEducationTagFiltersInput | null;
  and?: (CmsSalusEducationTagFiltersInput | null)[] | null;
  or?: (CmsSalusEducationTagFiltersInput | null)[] | null;
  not?: CmsSalusEducationTagFiltersInput | null;
}

export interface CmsSalusEducationTagInput {
  name?: Scalars["String"] | null;
  slug?: Scalars["String"] | null;
  educationPosts?: (Scalars["ID"] | null)[] | null;
  educationPageOrder?: Scalars["Int"] | null;
  isCategory?: Scalars["Boolean"] | null;
  weight?: Scalars["Int"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsSalusEducationTagRelationResponseCollectionGenqlSelection {
  nodes?: CmsSalusEducationTagGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusFaqGenqlSelection {
  documentId?: boolean | number;
  question?: boolean | number;
  answer?: boolean | number;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  locale?: boolean | number;
  localizations_connection?: CmsSalusFaqRelationResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusFaqFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  localizations?: CmsSalusFaqGenqlSelection & {
    __args?: {
      filters?: CmsSalusFaqFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
    };
  };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusFaqEntityResponseCollectionGenqlSelection {
  nodes?: CmsSalusFaqGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusFaqFiltersInput {
  documentId?: CmsIDFilterInput | null;
  question?: CmsStringFilterInput | null;
  answer?: CmsJSONFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  locale?: CmsStringFilterInput | null;
  localizations?: CmsSalusFaqFiltersInput | null;
  and?: (CmsSalusFaqFiltersInput | null)[] | null;
  or?: (CmsSalusFaqFiltersInput | null)[] | null;
  not?: CmsSalusFaqFiltersInput | null;
}

export interface CmsSalusFaqInput {
  question?: Scalars["String"] | null;
  answer?: Scalars["CmsJSON"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsSalusFaqRelationResponseCollectionGenqlSelection {
  nodes?: CmsSalusFaqGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusVzdelavaniVerifiedByGenqlSelection {
  documentId?: boolean | number;
  name?: boolean | number;
  namePrefix?: boolean | number;
  nameSuffix?: boolean | number;
  image?: CmsUploadFileGenqlSelection;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusVzdelavaniVerifiedByEntityResponseCollectionGenqlSelection {
  nodes?: CmsSalusVzdelavaniVerifiedByGenqlSelection;
  pageInfo?: CmsPaginationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsSalusVzdelavaniVerifiedByFiltersInput {
  documentId?: CmsIDFilterInput | null;
  name?: CmsStringFilterInput | null;
  namePrefix?: CmsStringFilterInput | null;
  nameSuffix?: CmsStringFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsSalusVzdelavaniVerifiedByFiltersInput | null)[] | null;
  or?: (CmsSalusVzdelavaniVerifiedByFiltersInput | null)[] | null;
  not?: CmsSalusVzdelavaniVerifiedByFiltersInput | null;
}

export interface CmsSalusVzdelavaniVerifiedByInput {
  name?: Scalars["String"] | null;
  namePrefix?: Scalars["String"] | null;
  nameSuffix?: Scalars["String"] | null;
  image?: Scalars["ID"] | null;
  publishedAt?: Scalars["CmsDateTime"] | null;
}

export interface CmsStringFilterInput {
  and?: (Scalars["String"] | null)[] | null;
  or?: (Scalars["String"] | null)[] | null;
  not?: CmsStringFilterInput | null;
  eq?: Scalars["String"] | null;
  eqi?: Scalars["String"] | null;
  ne?: Scalars["String"] | null;
  nei?: Scalars["String"] | null;
  startsWith?: Scalars["String"] | null;
  endsWith?: Scalars["String"] | null;
  contains?: Scalars["String"] | null;
  notContains?: Scalars["String"] | null;
  containsi?: Scalars["String"] | null;
  notContainsi?: Scalars["String"] | null;
  gt?: Scalars["String"] | null;
  gte?: Scalars["String"] | null;
  lt?: Scalars["String"] | null;
  lte?: Scalars["String"] | null;
  null?: Scalars["Boolean"] | null;
  notNull?: Scalars["Boolean"] | null;
  in?: (Scalars["String"] | null)[] | null;
  notIn?: (Scalars["String"] | null)[] | null;
  between?: (Scalars["String"] | null)[] | null;
}

export interface CmsUploadFileGenqlSelection {
  documentId?: boolean | number;
  name?: boolean | number;
  alternativeText?: boolean | number;
  caption?: boolean | number;
  width?: boolean | number;
  height?: boolean | number;
  formats?: boolean | number;
  hash?: boolean | number;
  ext?: boolean | number;
  mime?: boolean | number;
  size?: boolean | number;
  url?: boolean | number;
  previewUrl?: boolean | number;
  provider?: boolean | number;
  provider_metadata?: boolean | number;
  related?: CmsGenericMorphGenqlSelection;
  createdAt?: boolean | number;
  updatedAt?: boolean | number;
  publishedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CmsUploadFileFiltersInput {
  documentId?: CmsIDFilterInput | null;
  name?: CmsStringFilterInput | null;
  alternativeText?: CmsStringFilterInput | null;
  caption?: CmsStringFilterInput | null;
  width?: CmsIntFilterInput | null;
  height?: CmsIntFilterInput | null;
  formats?: CmsJSONFilterInput | null;
  hash?: CmsStringFilterInput | null;
  ext?: CmsStringFilterInput | null;
  mime?: CmsStringFilterInput | null;
  size?: CmsFloatFilterInput | null;
  url?: CmsStringFilterInput | null;
  previewUrl?: CmsStringFilterInput | null;
  provider?: CmsStringFilterInput | null;
  provider_metadata?: CmsJSONFilterInput | null;
  createdAt?: CmsDateTimeFilterInput | null;
  updatedAt?: CmsDateTimeFilterInput | null;
  publishedAt?: CmsDateTimeFilterInput | null;
  and?: (CmsUploadFileFiltersInput | null)[] | null;
  or?: (CmsUploadFileFiltersInput | null)[] | null;
  not?: CmsUploadFileFiltersInput | null;
}

export interface CmsUploadFileRelationResponseCollectionGenqlSelection {
  nodes?: CmsUploadFileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CompleteFormSubmissionInput {
  id: Scalars["ID"];
}

export interface CostCenterGenqlSelection {
  code?: boolean | number;
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface CreateEmployeeFormInput {
  employeeId: Scalars["ID"];
  formId: Scalars["ID"];
}

export interface CreateFormFillSessionInput {
  departmentAkordId?: Scalars["Int"] | null;
  documentationAkordId?: Scalars["Int"] | null;
  formSubmissionId: Scalars["ID"];
  stationAkordId?: Scalars["Int"] | null;
}

export interface CreateFormInput {
  code: Scalars["String"];
  consumer: FormConsumer;
  description?: Scalars["String"] | null;
  kind: FormKind;
  name: Scalars["String"];
  title: Scalars["String"];
}

export interface CreateFormResultBindInput {
  akordVislBlobId?: Scalars["Int"] | null;
  formSubmissionId: Scalars["ID"];
  resultKindId: Scalars["ID"];
}

export interface CreateFormResultKindInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  name: Scalars["String"];
}

export interface CreateFormSubmissionAttachmentInput {
  dataBase64: Scalars["String"];
  fileName: Scalars["String"];
  formSubmissionId: Scalars["ID"];
  mimeType: Scalars["String"];
}

export interface CreateFormSubmissionInput {
  dataJson?: Scalars["FormSubmissionData"] | null;
  formId: Scalars["ID"];
  formVersionId: Scalars["ID"];
  isComplete?: Scalars["Boolean"] | null;
  patientId: Scalars["ID"];
}

export interface CreateFormVersionInput {
  description?: Scalars["String"] | null;
  formId: Scalars["ID"];
  number: Scalars["String"];
  validFrom?: Scalars["DateTime"] | null;
  validTo?: Scalars["DateTime"] | null;
}

export interface CreatePatientFamilyMemberInput {
  memberPatientId: Scalars["ID"];
  patientId: Scalars["ID"];
}

export interface CreatePatientImageInput {
  /** Uploaded, original, image data, serialized to Base64 */
  imageBase64: Scalars["String"];
  patientId: Scalars["ID"];
}

export interface CreateSalusPatientProfileInput {
  email: Scalars["String"];
  emailVerified?: Scalars["DateTime"] | null;
  name: Scalars["String"];
  patientId: Scalars["ID"];
}

export interface CreateSalusPatientSessionInput {
  expiresAt: Scalars["DateTime"];
  patientProfileId: Scalars["ID"];
  sessionToken: Scalars["String"];
}

export interface CreateSalusVerificationTokenInput {
  expires: Scalars["DateTime"];
  identifier: Scalars["String"];
  token: Scalars["String"];
}

export interface CreateSironaEmployeeProfileGrantInput {
  employeeProfileId: Scalars["ID"];
  grant: Scalars["String"];
}

export interface CreateSironaEmployeeProfileInput {
  defaultFacilityId: Scalars["ID"];
  email: Scalars["String"];
  employeeId: Scalars["ID"];
}

export interface CreateSironaPermissionInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  facilities?: Scalars["ID"][] | null;
  name: Scalars["String"];
  roles?: Scalars["ID"][] | null;
}

export interface CreateSironaRoleInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  name: Scalars["String"];
}

export interface CreateSmenovkaEmployeeProfileGrantInput {
  employeeProfileId: Scalars["ID"];
  grant: Scalars["String"];
}

export interface CreateSmenovkaEmployeeProfileInput {
  email: Scalars["String"];
  employeeId: Scalars["ID"];
}

export interface CreateSmenovkaPermissionInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  name: Scalars["String"];
}

export interface CreateSmenovkaRoleInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  name: Scalars["String"];
}

export interface CreateTabsyEmployeeProfileInput {
  employeeId: Scalars["ID"];
}

export interface CreateZapkaEmployeeProfileGrantInput {
  employeeProfileId: Scalars["ID"];
  grant: Scalars["String"];
}

export interface CreateZapkaEmployeeProfileInput {
  email: Scalars["String"];
  employeeId: Scalars["ID"];
}

export interface CreateZapkaPermissionInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  name: Scalars["String"];
}

export interface CreateZapkaRoleInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  name: Scalars["String"];
}

export interface DeactivateFormVersionInput {
  id: Scalars["ID"];
  validTo?: Scalars["DateTime"] | null;
}

export interface DeactivateSironaEmployeeProfileInput {
  id: Scalars["ID"];
}

export interface DeactivateSmenovkaEmployeeProfileInput {
  id: Scalars["ID"];
}

export interface DeactivateZapkaEmployeeProfileInput {
  id: Scalars["ID"];
}

export interface DeleteEmployeeFormInput {
  id: Scalars["ID"];
}

export interface DeleteFormResultBindInput {
  id: Scalars["ID"];
}

export interface DeleteFormResultKindInput {
  id: Scalars["ID"];
}

export interface DeleteFormSubmissionAttachmentInput {
  id: Scalars["ID"];
}

export interface DeletePatientFamilyMemberInput {
  memberPatientId: Scalars["ID"];
  patientId: Scalars["ID"];
}

export interface DeletePatientImageInput {
  patientId: Scalars["ID"];
}

export interface DeleteSalusPatientProfileInput {
  id: Scalars["ID"];
}

export interface DeleteSalusPatientSessionByIdInput {
  id: Scalars["ID"];
}

export interface DeleteSalusPatientSessionBySessionTokenInput {
  sessionToken: Scalars["String"];
}

export interface DeleteSalusVerificationTokenInput {
  identifier: Scalars["String"];
  token: Scalars["String"];
}

export interface DeleteSironaEmployeeProfileGrantInput {
  id: Scalars["ID"];
}

export interface DeleteSironaPermissionInput {
  id: Scalars["ID"];
}

export interface DeleteSironaRoleInput {
  id: Scalars["ID"];
}

export interface DeleteSmenovkaEmployeeProfileGrantInput {
  id: Scalars["ID"];
}

export interface DeleteSmenovkaPermissionInput {
  id: Scalars["ID"];
}

export interface DeleteSmenovkaRoleInput {
  id: Scalars["ID"];
}

export interface DeleteTabsyEmployeeProfileInput {
  id: Scalars["ID"];
}

export interface DeleteZapkaEmployeeProfileGrantInput {
  id: Scalars["ID"];
}

export interface DeleteZapkaPermissionInput {
  id: Scalars["ID"];
}

export interface DeleteZapkaRoleInput {
  id: Scalars["ID"];
}

export interface DietAccountGenqlSelection {
  allowedDebit?: boolean | number;
  balance?: boolean | number;
  consumer?: DietConsumerGenqlSelection;
  consumerId?: boolean | number;
  disabledFlag?: boolean | number;
  id?: boolean | number;
  lastMove?: boolean | number;
  validTo?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietAccountConnectionGenqlSelection {
  /** A list of edges. */
  edges?: DietAccountEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: DietAccountGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Diet Type Connection Filter */
export interface DietAccountConnectionFilterInput {
  isValid?: Scalars["Boolean"] | null;
}

export interface DietAccountConnectionSortBy {
  direction: SortDirection;
  field: DietAccountConnectionSortByField;
}

/** An edge in a connection. */
export interface DietAccountEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: DietAccountGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietAccountTransactionGenqlSelection {
  /** Transaction account */
  account?: DietAccountGenqlSelection;
  accountId?: boolean | number;
  /** Amount (price) of the transaction */
  amount?: boolean | number;
  dietOrder?: DietOrderGenqlSelection;
  dietOrderId?: boolean | number;
  id?: boolean | number;
  originalTrans?: DietAccountTransactionGenqlSelection;
  originalTransactionId?: boolean | number;
  status?: boolean | number;
  transactionDate?: boolean | number;
  /** Type of transaction */
  transactionType?: DietAccountTransactionTypeGenqlSelection;
  transactionTypeId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietAccountTransactionConnectionGenqlSelection {
  /** A list of edges. */
  edges?: DietAccountTransactionEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: DietAccountTransactionGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Diet Type Connection Filter */
export interface DietAccountTransactionConnectionFilterInput {
  accountId?: Scalars["ID"] | null;
  dietOrderId?: Scalars["ID"] | null;
  status?: Scalars["Int"] | null;
  transactionDateFrom?: Scalars["DateTime"] | null;
  transactionDateTo?: Scalars["DateTime"] | null;
  transactionTypeId?: Scalars["ID"] | null;
}

export interface DietAccountTransactionConnectionSortBy {
  direction: SortDirection;
  field: DietAccountTransactionConnectionSortByField;
}

/** An edge in a connection. */
export interface DietAccountTransactionEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: DietAccountTransactionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietAccountTransactionTypeGenqlSelection {
  disabledFlag?: boolean | number;
  fullName?: boolean | number;
  id?: boolean | number;
  shortName?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietConsumerGenqlSelection {
  fullName?: boolean | number;
  id?: boolean | number;
  worker?: DietWorkerGenqlSelection;
  workerId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietConsumerConnectionGenqlSelection {
  /** A list of edges. */
  edges?: DietConsumerEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: DietConsumerGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietConsumerConnectionSortBy {
  direction: SortDirection;
  field: DietConsumerConnectionSortByField;
}

/** An edge in a connection. */
export interface DietConsumerEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: DietConsumerGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietFacilityGenqlSelection {
  facilityCode?: boolean | number;
  facilityName?: boolean | number;
  id?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietFoodTypeGenqlSelection {
  disabledFlag?: boolean | number;
  fullName?: boolean | number;
  id?: boolean | number;
  shortName?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietMenuGenqlSelection {
  allergens?: boolean | number;
  dietFacility?: DietFacilityGenqlSelection;
  dietFacilityId?: boolean | number;
  dietFoodType?: DietFoodTypeGenqlSelection;
  dietFoodTypeId?: boolean | number;
  dietType?: DietTypeGenqlSelection;
  dietTypeId?: boolean | number;
  foodName?: boolean | number;
  id?: boolean | number;
  menuDate?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietMenuConnectionGenqlSelection {
  /** A list of edges. */
  edges?: DietMenuEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: DietMenuGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Patient Connection Filter */
export interface DietMenuConnectionFilterInput {
  dateFrom?: Scalars["DateTime"] | null;
  dateTo?: Scalars["DateTime"] | null;
  dietFacilityId?: Scalars["ID"] | null;
  dietTypeId?: Scalars["ID"] | null;
  foodTypeId?: Scalars["ID"] | null;
  forEmployees?: Scalars["Boolean"] | null;
  withAllergens?: Scalars["String"] | null;
  withName?: Scalars["String"] | null;
  withoutAllergens?: Scalars["String"] | null;
  withoutName?: Scalars["String"] | null;
}

export interface DietMenuConnectionSortBy {
  direction: SortDirection;
  field: DietMenuConnectionSortByField;
}

/** An edge in a connection. */
export interface DietMenuEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: DietMenuGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietOrderGenqlSelection {
  createdDate?: boolean | number;
  deliveredDate?: boolean | number;
  dietConsumer?: DietConsumerGenqlSelection;
  dietConsumerId?: boolean | number;
  dietMenu?: DietMenuGenqlSelection;
  dietMenuId?: boolean | number;
  dietOriginalOrder?: DietOrderGenqlSelection;
  id?: boolean | number;
  orderAmount?: boolean | number;
  orderDate?: boolean | number;
  orderStatus?: boolean | number;
  originalOrderId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietOrderConnectionGenqlSelection {
  /** A list of edges. */
  edges?: DietOrderEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: DietOrderGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Diet Type Connection Filter */
export interface DietOrderConnectionFilterInput {
  alreadyDelivered?: Scalars["Boolean"] | null;
  createdFrom?: Scalars["DateTime"] | null;
  createdTo?: Scalars["DateTime"] | null;
  dietConsumerId?: Scalars["ID"] | null;
  orderStatus?: Scalars["Int"] | null;
}

export interface DietOrderConnectionSortBy {
  direction: SortDirection;
  field: DietOrderConnectionSortByField;
}

/** An edge in a connection. */
export interface DietOrderEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: DietOrderGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietTypeGenqlSelection {
  code?: boolean | number;
  disabled?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  order?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietTypeConnectionGenqlSelection {
  /** A list of edges. */
  edges?: DietTypeEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: DietTypeGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Diet Type Connection Filter */
export interface DietTypeConnectionFilterInput {
  /** If `true`, include inactive `DietType`s. */
  includeInactive?: Scalars["Boolean"] | null;
  /**
   * Filter DietType by search string.
   * The search string is tokenized by whitespace.
   */
  search?: Scalars["String"] | null;
}

export interface DietTypeConnectionSortBy {
  direction: SortDirection;
  field: DietTypeConnectionSortByField;
}

/** An edge in a connection. */
export interface DietTypeEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: DietTypeGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DietWorkerGenqlSelection {
  dietFacilityId?: boolean | number;
  disabledFlag?: boolean | number;
  firstName?: boolean | number;
  id?: boolean | number;
  lastName?: boolean | number;
  personalNumber?: boolean | number;
  titleAfter?: boolean | number;
  titleBefore?: boolean | number;
  userAkordId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DoctorGenqlSelection {
  active?: boolean | number;
  advice?: boolean | number;
  description?: boolean | number;
  fictive?: boolean | number;
  firstName?: boolean | number;
  fullName?: boolean | number;
  id?: boolean | number;
  instruction?: boolean | number;
  lastName?: boolean | number;
  namePrefix?: boolean | number;
  nameSuffix?: boolean | number;
  telephone?: boolean | number;
  veryFullName?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DoctorConnectionGenqlSelection {
  /** A list of edges. */
  edges?: DoctorEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: DoctorGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface DoctorConnectionSortBy {
  direction: SortDirection;
  field: DoctorConnectionSortByField;
}

/** An edge in a connection. */
export interface DoctorEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: DoctorGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Doctor connection filter. */
export interface DoctortConnectionFilterInput {
  /** By default only active Doctors are listed. `true` to include inactive doctors. */
  includeInactive?: Scalars["Boolean"] | null;
}

export interface EmployeeGenqlSelection {
  /** First name of the employee. */
  firstName?: boolean | number;
  /** ID of the employee. */
  id?: boolean | number;
  /** Last name of the employee. */
  lastName?: boolean | number;
  /**
   * @deprecated Use implementation in EmployeeFacilityCard instead.
   * Connection of AMOS slots scheduled for this employee.
   */
  scheduledSlots?: SlotConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
    };
  };
  /**
   * Employee's education records.
   *
   * By default returns only valid education records included.
   * If you want to include invalid records, set `include_invalid` to `true`.
   */
  education?: EmployeeEducationGenqlSelection & {
    __args?: {
      /** Select education records for a specific facility. */
      facilityId?: Scalars["ID"] | null;
      /** `true` for all records. */
      includeInvalid?: Scalars["Boolean"] | null;
    };
  };
  /** List of email addresses separated by comma. */
  emailAddresses?: boolean | number;
  /** Employee assigned facilities list. */
  facilities?: FacilityGenqlSelection;
  /** Employee's cards for facilities. */
  facilityCards?: EmployeeFacilityCardGenqlSelection & {
    __args?: {
      /** ID of an facility to filter by. */
      facilityId?: Scalars["ID"] | null;
    };
  };
  /** Encoded {LastName} {FirstName}. */
  fullName?: boolean | number;
  /**
   * Employee image as base64 encoded string of JPG image.
   *
   * In frontend, you can use this string as `src` attribute of `img` tag with value
   * `src="data:image/png;base64,<value_of_field>"`.
   */
  image?: EmployeeImageGenqlSelection & { __args?: { size?: EmployeeImageSize | null } };
  /** `true` if the employee is active. */
  isActive?: boolean | number;
  /** Prefix of the employee's name. Degree, title, etc. */
  namePrefix?: boolean | number;
  /** Suffix of the employee's name. Degree, title, etc. */
  nameSuffix?: boolean | number;
  /** List of phone numbers separated by comma. */
  phoneNumbers?: boolean | number;
  /** Users for the employee. */
  users?: EmployeeUserGenqlSelection;
  /** Encoded {NamePrefix} {LastName} {FirstName} {NameSuffix}. */
  veryFullName?: boolean | number;
  /** List of forms assigned to the employee. */
  assignedForms?: EmployeeFormGenqlSelection;
  /** Count of forms assigned to the employee. */
  assignedFormsCount?: boolean | number;
  /** Checks if the employee has a Sirona profile. */
  hasSironaProfile?: boolean | number;
  /** Checks if the employee has a Smenovka profile. */
  hasSmenovkaProfile?: boolean | number;
  /** Checks if the employee has a Tabsy profile. */
  hasTabsyProfile?: boolean | number;
  /** Checks if the employee has a Zapka profile. */
  hasZapkaProfile?: boolean | number;
  /** Sirona profile of the employee. */
  sironaProfile?: SironaEmployeeProfileGenqlSelection;
  /** Smenovka profile of the employee. */
  smenovkaProfile?: SmenovkaEmployeeProfileGenqlSelection;
  /** Tabsy profile of the employee. */
  tabsyProfile?: TabsyEmployeeProfileGenqlSelection;
  /** Zapka profile of the employee. */
  zapkaProfile?: ZapkaEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeAbsenceGenqlSelection {
  absenceType?: boolean | number;
  contractNumber?: boolean | number;
  day?: boolean | number;
  employeeCardId?: boolean | number;
  facilityId?: boolean | number;
  hours?: boolean | number;
  month?: boolean | number;
  retrieved?: boolean | number;
  year?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeConnectionGenqlSelection {
  /** A list of edges. */
  edges?: EmployeeEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: EmployeeGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Employee Connection Filter */
export interface EmployeeConnectionFilterInput {
  /**
   * Filter Employees by search string.
   * The search string is tokenized by whitespace.
   */
  search?: Scalars["String"] | null;
}

export interface EmployeeConnectionSortBy {
  direction: SortDirection;
  field: EmployeeConnectionSortByField;
}

/** An edge in a connection. */
export interface EmployeeEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: EmployeeGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeEducationGenqlSelection {
  employee?: EmployeeGenqlSelection;
  employeeId?: boolean | number;
  graducationDate?: boolean | number;
  id?: boolean | number;
  /** Education kind. */
  kind?: EmployeeEducationKindGenqlSelection;
  /** Education kind ID. */
  kindId?: boolean | number;
  name?: boolean | number;
  note?: boolean | number;
  validTo?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeEducationKindGenqlSelection {
  code?: boolean | number;
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  target?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeFacilityCardGenqlSelection {
  /** Employee first name. */
  firstName?: boolean | number;
  id?: boolean | number;
  /** Employee last name. */
  lastName?: boolean | number;
  /** Connection of AMOS slots scheduled for this employee. */
  scheduledSlots?: SlotConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
    };
  };
  /**
   * List of authorized absences of the employee in the facility.
   *
   * If `year` and `month` are provided, only absences for the given year and month are returned.
   *
   * Default `year` is the current year.
   */
  authorizedAbsences?: EmployeeAbsenceGenqlSelection & {
    __args?: { month?: Scalars["Int"] | null; year?: Scalars["Int"] | null };
  };
  /** Birth registration number of the employee. */
  birthRegistrationNumber?: boolean | number;
  /** Returns all contracts of the employee in the facility. */
  contracts?: EmployeeWorkContractGenqlSelection & { __args?: { includeInactive?: Scalars["Boolean"] | null } };
  /** Login to the domain for the Facility. */
  domainLogin?: boolean | number;
  /** Email address of the employee. */
  emailAddress?: boolean | number;
  /** Returns the employee of the employee card. */
  employee?: EmployeeGenqlSelection;
  /** ID of the employee. */
  employeeId?: boolean | number;
  /** Number of the employee in the facility. */
  employeeNumber?: boolean | number;
  /** Returns the facility of the employee card. */
  facility?: FacilityGenqlSelection;
  /** ID of the facility. */
  facilityId?: boolean | number;
  /** Employee has main employment in the facility. */
  hasEmploymentMain?: boolean | number;
  /** Employee has partial employment in the facility. */
  hasEmploymentPartial?: boolean | number;
  /** Insurance number of the employee. */
  insuranceNumber?: boolean | number;
  /** Is the card active. */
  isActive?: boolean | number;
  /** Returns all organization hierarchies of the employee in the facility. */
  organizationHierarchies?: OrganizationHierarchyEmployeeGenqlSelection & {
    __args?: { includeInactive?: Scalars["Boolean"] | null };
  };
  /** Phone number of the employee. */
  phoneNumber?: boolean | number;
  akordWorkerId?: boolean | number;
  dietAccountId?: boolean | number;
  dietConsumerId?: boolean | number;
  dietFacilityId?: boolean | number;
  /** List of diet menus for this employee and facility. */
  dietMenus?: DietMenuGenqlSelection & {
    __args?: {
      /** Date from. By default is `today`. */
      dateFrom?: Scalars["DateTime"] | null;
      /** Date to. By default is `date_from` + 5 days. */
      dateTo?: Scalars["DateTime"] | null;
    };
  };
  /** List of diet orders for this employee and facility. */
  dietOrders?: DietOrderGenqlSelection & {
    __args?: { dateFrom?: Scalars["DateTime"] | null; dateTo?: Scalars["DateTime"] | null };
  };
  scheduledSurgeries?: ScheduledSurgeryConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: ScheduledSurgeryConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: ScheduledSurgeryConnectionSortBy | null;
    };
  };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeFormGenqlSelection {
  employee?: EmployeeGenqlSelection;
  employeeId?: boolean | number;
  form?: FormGenqlSelection;
  formId?: boolean | number;
  id?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeFormPayloadGenqlSelection {
  employeeForm?: EmployeeFormGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeImageGenqlSelection {
  employeeId?: boolean | number;
  id?: boolean | number;
  imageBase64?: boolean | number;
  imageHeight?: boolean | number;
  imageWidth?: boolean | number;
  size?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeUserGenqlSelection {
  domainLogin?: boolean | number;
  employee?: EmployeeGenqlSelection;
  employeeId?: boolean | number;
  id?: boolean | number;
  akordId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeUserConnectionGenqlSelection {
  /** A list of edges. */
  edges?: EmployeeUserEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: EmployeeUserGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Employee Connection Filter */
export interface EmployeeUserConnectionFilterInput {
  /**
   * Filter Employees by search string.
   * The search string is tokenized by whitespace.
   */
  search?: Scalars["String"] | null;
}

export interface EmployeeUserConnectionSortBy {
  direction: SortDirection;
  field: EmployeeUserConnectionSortByField;
}

/** An edge in a connection. */
export interface EmployeeUserEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: EmployeeUserGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface EmployeeWorkContractGenqlSelection {
  contractNumber?: boolean | number;
  employeeCard?: EmployeeFacilityCardGenqlSelection;
  employeeCardId?: boolean | number;
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  id?: boolean | number;
  isActive?: boolean | number;
  validFrom?: boolean | number;
  validTo?: boolean | number;
  workContractKind?: WorkContractKindGenqlSelection;
  workContractKindId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/**
 * Employment kinds.
 *
 * This is a list of employment kinds that are used to describe the employment of a employee.
 */
export interface EmploymentKindGenqlSelection {
  description?: boolean | number;
  employmentKindSourceId?: boolean | number;
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  id?: boolean | number;
  /** The time scope of the employment kind. */
  scope?: boolean | number;
  /** Hours per one shift. */
  shiftHours?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ExaminationGenqlSelection {
  baseExamination?: ExaminationGenqlSelection;
  baseExaminationId?: boolean | number;
  /** Duration of the Examination in minutes. */
  duration?: boolean | number;
  fictive?: boolean | number;
  filterInvisible?: boolean | number;
  forceSequence?: boolean | number;
  id?: boolean | number;
  instructionPatient?: boolean | number;
  instructionPersonnel?: boolean | number;
  name?: boolean | number;
  receptionInvisible?: boolean | number;
  slotColor?: boolean | number;
  statim?: boolean | number;
  workplace?: WorkplaceGenqlSelection;
  workplaceId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ExaminationConnectionGenqlSelection {
  /** A list of edges. */
  edges?: ExaminationEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: ExaminationGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ExaminationConnectionSortBy {
  direction: SortDirection;
  field: ExaminationConnectionSortByField;
}

/** An edge in a connection. */
export interface ExaminationEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: ExaminationGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FacilityGenqlSelection {
  code?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormGenqlSelection {
  code?: boolean | number;
  consumer?: boolean | number;
  description?: boolean | number;
  id?: boolean | number;
  kind?: boolean | number;
  name?: boolean | number;
  title?: boolean | number;
  /** Returns current version of the form. */
  version?: FormVersionGenqlSelection;
  versions?: FormVersionGenqlSelection & { __args?: { includeInvalid?: Scalars["Boolean"] | null } };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormConnectionGenqlSelection {
  /** A list of edges. */
  edges?: FormEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: FormGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Form Connection Filter */
export interface FormConnectionFilterInput {
  /**
   * Filter Forms by search string.
   * The search string is tokenized by whitespace.
   */
  search?: Scalars["String"] | null;
}

export interface FormConnectionSortBy {
  direction: SortDirection;
  field: FormConnectionSortByField;
}

/** An edge in a connection. */
export interface FormEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: FormGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormFillSessionGenqlSelection {
  departmentAkordId?: boolean | number;
  documentationAkordId?: boolean | number;
  formSubmission?: FormSubmissionGenqlSelection;
  formSubmissionId?: boolean | number;
  id?: boolean | number;
  stationAkordId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormFillSessionPayloadGenqlSelection {
  formFillSession?: FormFillSessionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormPayloadGenqlSelection {
  form?: FormGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormResultBindGenqlSelection {
  akordVislBlobId?: boolean | number;
  formSubmissionId?: boolean | number;
  id?: boolean | number;
  resultKindId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormResultBindPayloadGqlGenqlSelection {
  formResultBind?: FormResultBindGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormResultKindGenqlSelection {
  code?: boolean | number;
  description?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormResultKindPayloadGqlGenqlSelection {
  formResultKind?: FormResultKindGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormSubmissionGenqlSelection {
  attachments?: FormSubmissionAttachmentGenqlSelection;
  attachmentsCount?: boolean | number;
  completedAt?: boolean | number;
  createdAt?: boolean | number;
  dataJson?: boolean | number;
  fillSessions?: FormFillSessionGenqlSelection;
  formId?: boolean | number;
  formVersionId?: boolean | number;
  id?: boolean | number;
  isCompleted?: boolean | number;
  patientId?: boolean | number;
  updatedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormSubmissionAttachmentGenqlSelection {
  dataBase64?: { __args: { asDataUrl?: Scalars["Boolean"] | null } } | boolean | number;
  fileName?: boolean | number;
  formSubmission?: FormSubmissionGenqlSelection;
  formSubmissionId?: boolean | number;
  id?: boolean | number;
  mimeType?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormSubmissionAttachmentPayloadGenqlSelection {
  formSubmissionAttachment?: FormSubmissionAttachmentGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormSubmissionConnectionGenqlSelection {
  /** A list of edges. */
  edges?: FormSubmissionEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: FormSubmissionGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormSubmissionConnectionSortBy {
  direction: SortDirection;
  field: FormSubmissionConnectionSortByField;
}

/** An edge in a connection. */
export interface FormSubmissionEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: FormSubmissionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormSubmissionPayloadGenqlSelection {
  formSubmission?: FormSubmissionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormVersionGenqlSelection {
  description?: boolean | number;
  form?: FormGenqlSelection;
  formId?: boolean | number;
  id?: boolean | number;
  number?: boolean | number;
  validFrom?: boolean | number;
  validTo?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface FormVersionPayloadGenqlSelection {
  formVersion?: FormVersionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface LocationGenqlSelection {
  ccCallingPrefix?: boolean | number;
  commGroup?: boolean | number;
  databaseMailProfile?: boolean | number;
  description?: boolean | number;
  einkUrl?: boolean | number;
  email?: boolean | number;
  emailBody?: boolean | number;
  id?: boolean | number;
  logo?: boolean | number;
  name?: boolean | number;
  nameAlternative?: boolean | number;
  shortcut?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface MutationGenqlSelection {
  createCmsAkesoNewsPost?: CmsAkesoNewsPostGenqlSelection & {
    __args: {
      status?: CmsPublicationStatus | null;
      data: CmsAkesoNewsPostInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  updateCmsAkesoNewsPost?: CmsAkesoNewsPostGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      data: CmsAkesoNewsPostInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  deleteCmsAkesoNewsPost?: CmsDeleteMutationResponseGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  createCmsIntranetBenefit?: CmsIntranetBenefitGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetBenefitInput };
  };
  updateCmsIntranetBenefit?: CmsIntranetBenefitGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetBenefitInput };
  };
  deleteCmsIntranetBenefit?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetEducationCategory?: CmsIntranetEducationCategoryGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetEducationCategoryInput };
  };
  updateCmsIntranetEducationCategory?: CmsIntranetEducationCategoryGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      data: CmsIntranetEducationCategoryInput;
    };
  };
  deleteCmsIntranetEducationCategory?: CmsDeleteMutationResponseGenqlSelection & {
    __args: { documentId: Scalars["ID"] };
  };
  createCmsIntranetEducationInstruction?: CmsIntranetEducationInstructionGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetEducationInstructionInput };
  };
  updateCmsIntranetEducationInstruction?: CmsIntranetEducationInstructionGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      data: CmsIntranetEducationInstructionInput;
    };
  };
  deleteCmsIntranetEducationInstruction?: CmsDeleteMutationResponseGenqlSelection & {
    __args: { documentId: Scalars["ID"] };
  };
  createCmsIntranetEmployeeContact?: CmsIntranetEmployeeContactGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetEmployeeContactInput };
  };
  updateCmsIntranetEmployeeContact?: CmsIntranetEmployeeContactGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetEmployeeContactInput };
  };
  deleteCmsIntranetEmployeeContact?: CmsDeleteMutationResponseGenqlSelection & {
    __args: { documentId: Scalars["ID"] };
  };
  createCmsIntranetEvent?: CmsIntranetEventGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetEventInput };
  };
  updateCmsIntranetEvent?: CmsIntranetEventGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetEventInput };
  };
  deleteCmsIntranetEvent?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetEventReport?: CmsIntranetEventReportGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetEventReportInput };
  };
  updateCmsIntranetEventReport?: CmsIntranetEventReportGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetEventReportInput };
  };
  deleteCmsIntranetEventReport?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetFaq?: CmsIntranetFaqGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetFaqInput };
  };
  updateCmsIntranetFaq?: CmsIntranetFaqGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetFaqInput };
  };
  deleteCmsIntranetFaq?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetLink?: CmsIntranetLinkGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetLinkInput };
  };
  updateCmsIntranetLink?: CmsIntranetLinkGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetLinkInput };
  };
  deleteCmsIntranetLink?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetLocation?: CmsIntranetLocationGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetLocationInput };
  };
  updateCmsIntranetLocation?: CmsIntranetLocationGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetLocationInput };
  };
  deleteCmsIntranetLocation?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetMagazineNea?: CmsIntranetMagazineNeaGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetMagazineNeaInput };
  };
  updateCmsIntranetMagazineNea?: CmsIntranetMagazineNeaGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetMagazineNeaInput };
  };
  deleteCmsIntranetMagazineNea?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetNewsItem?: CmsIntranetNewsItemGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetNewsItemInput };
  };
  updateCmsIntranetNewsItem?: CmsIntranetNewsItemGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetNewsItemInput };
  };
  deleteCmsIntranetNewsItem?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsIntranetRole?: CmsIntranetRoleGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsIntranetRoleInput };
  };
  updateCmsIntranetRole?: CmsIntranetRoleGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsIntranetRoleInput };
  };
  deleteCmsIntranetRole?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsItBlogAbout?: CmsItBlogAboutGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsItBlogAboutInput };
  };
  updateCmsItBlogAbout?: CmsItBlogAboutGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsItBlogAboutInput };
  };
  deleteCmsItBlogAbout?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsItBlogBanner?: CmsItBlogBannerGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsItBlogBannerInput };
  };
  updateCmsItBlogBanner?: CmsItBlogBannerGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsItBlogBannerInput };
  };
  deleteCmsItBlogBanner?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsItBlogPost?: CmsItBlogPostGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsItBlogPostInput };
  };
  updateCmsItBlogPost?: CmsItBlogPostGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsItBlogPostInput };
  };
  deleteCmsItBlogPost?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsItBlogTag?: CmsItBlogTagGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsItBlogTagInput };
  };
  updateCmsItBlogTag?: CmsItBlogTagGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null; data: CmsItBlogTagInput };
  };
  deleteCmsItBlogTag?: CmsDeleteMutationResponseGenqlSelection & { __args: { documentId: Scalars["ID"] } };
  createCmsSalusEducationPost?: CmsSalusEducationPostGenqlSelection & {
    __args: {
      status?: CmsPublicationStatus | null;
      data: CmsSalusEducationPostInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  updateCmsSalusEducationPost?: CmsSalusEducationPostGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      data: CmsSalusEducationPostInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  deleteCmsSalusEducationPost?: CmsDeleteMutationResponseGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  createCmsSalusEducationTag?: CmsSalusEducationTagGenqlSelection & {
    __args: {
      status?: CmsPublicationStatus | null;
      data: CmsSalusEducationTagInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  updateCmsSalusEducationTag?: CmsSalusEducationTagGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      data: CmsSalusEducationTagInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  deleteCmsSalusEducationTag?: CmsDeleteMutationResponseGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  createCmsSalusFaq?: CmsSalusFaqGenqlSelection & {
    __args: {
      status?: CmsPublicationStatus | null;
      data: CmsSalusFaqInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  updateCmsSalusFaq?: CmsSalusFaqGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      data: CmsSalusFaqInput;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  deleteCmsSalusFaq?: CmsDeleteMutationResponseGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  createCmsSalusVzdelavaniVerifiedBy?: CmsSalusVzdelavaniVerifiedByGenqlSelection & {
    __args: { status?: CmsPublicationStatus | null; data: CmsSalusVzdelavaniVerifiedByInput };
  };
  updateCmsSalusVzdelavaniVerifiedBy?: CmsSalusVzdelavaniVerifiedByGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      data: CmsSalusVzdelavaniVerifiedByInput;
    };
  };
  deleteCmsSalusVzdelavaniVerifiedBy?: CmsDeleteMutationResponseGenqlSelection & {
    __args: { documentId: Scalars["ID"] };
  };
  completeFormSubmission?: FormSubmissionPayloadGenqlSelection & { __args: { input: CompleteFormSubmissionInput } };
  createEmployeeForm?: EmployeeFormPayloadGenqlSelection & { __args: { input: CreateEmployeeFormInput } };
  /** Create a new form. */
  createForm?: FormPayloadGenqlSelection & { __args: { input: CreateFormInput } };
  createFormFillSession?: FormFillSessionPayloadGenqlSelection & { __args: { input: CreateFormFillSessionInput } };
  createFormResultBind?: FormResultBindPayloadGqlGenqlSelection & { __args: { input: CreateFormResultBindInput } };
  createFormResultKind?: FormResultKindPayloadGqlGenqlSelection & { __args: { input: CreateFormResultKindInput } };
  createFormSubmission?: FormSubmissionPayloadGenqlSelection & { __args: { input: CreateFormSubmissionInput } };
  createFormSubmissionAttachment?: FormSubmissionAttachmentPayloadGenqlSelection & {
    __args: { input: CreateFormSubmissionAttachmentInput };
  };
  createFormVersion?: FormVersionPayloadGenqlSelection & { __args: { input: CreateFormVersionInput } };
  /** Create a new Salus Patient Profile. */
  createSalusPatientProfile?: SalusPatientProfilePayloadGenqlSelection & {
    __args: { input: CreateSalusPatientProfileInput };
  };
  /** Create a new Salus Patient Session. */
  createSalusPatientSession?: SalusPatientSessionPayloadGenqlSelection & {
    __args: { input: CreateSalusPatientSessionInput };
  };
  /** Create a new Salus Verification Token. */
  createSalusVerificationToken?: SalusVerificationTokenPayloadGenqlSelection & {
    __args: { input: CreateSalusVerificationTokenInput };
  };
  createSironaEmployeeProfile?: SironaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: CreateSironaEmployeeProfileInput };
  };
  createSironaEmployeeProfileGrant?: SironaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: CreateSironaEmployeeProfileGrantInput };
  };
  createSironaPermission?: SironaPermissionPayloadGenqlSelection & { __args: { input: CreateSironaPermissionInput } };
  createSironaRole?: SironaRolePayloadGenqlSelection & { __args: { input: CreateSironaRoleInput } };
  createSmenovkaEmployeeProfile?: SmenovkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: CreateSmenovkaEmployeeProfileInput };
  };
  createSmenovkaEmployeeProfileGrant?: SmenovkaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: CreateSmenovkaEmployeeProfileGrantInput };
  };
  createSmenovkaPermission?: SmenovkaPermissionPayloadGenqlSelection & {
    __args: { input: CreateSmenovkaPermissionInput };
  };
  createSmenovkaRole?: SmenovkaRolePayloadGenqlSelection & { __args: { input: CreateSmenovkaRoleInput } };
  createTabsyEmployeeProfile?: TabsyEmployeeProfilePayloadGenqlSelection & {
    __args: { input: CreateTabsyEmployeeProfileInput };
  };
  createZapkaEmployeeProfile?: ZapkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: CreateZapkaEmployeeProfileInput };
  };
  createZapkaEmployeeProfileGrant?: ZapkaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: CreateZapkaEmployeeProfileGrantInput };
  };
  createZapkaPermission?: ZapkaPermissionPayloadGenqlSelection & { __args: { input: CreateZapkaPermissionInput } };
  createZapkaRole?: ZapkaRolePayloadGenqlSelection & { __args: { input: CreateZapkaRoleInput } };
  deactivateFormVersion?: FormVersionPayloadGenqlSelection & { __args: { input: DeactivateFormVersionInput } };
  deactivateSironaEmployeeProfile?: SironaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: DeactivateSironaEmployeeProfileInput };
  };
  deactivateSmenovkaEmployeeProfile?: SmenovkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: DeactivateSmenovkaEmployeeProfileInput };
  };
  deactivateZapkaEmployeeProfile?: ZapkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: DeactivateZapkaEmployeeProfileInput };
  };
  deleteEmployeeForm?: EmployeeFormPayloadGenqlSelection & { __args: { input: DeleteEmployeeFormInput } };
  deleteFormFillSession?: FormFillSessionPayloadGenqlSelection & { __args: { input: UpdateFormFillSessionInput } };
  deleteFormResultBind?: FormResultBindPayloadGqlGenqlSelection & { __args: { input: DeleteFormResultBindInput } };
  deleteFormResultKind?: FormResultKindPayloadGqlGenqlSelection & { __args: { input: DeleteFormResultKindInput } };
  deleteFormSubmissionAttachment?: FormSubmissionAttachmentPayloadGenqlSelection & {
    __args: { input: DeleteFormSubmissionAttachmentInput };
  };
  /** Delete a Salus Patient Profile. */
  deleteSalusPatientProfile?: SalusPatientProfilePayloadGenqlSelection & {
    __args: { input: DeleteSalusPatientProfileInput };
  };
  /** Delete a Salus Patient Session by session ID. */
  deleteSalusPatientSession?: SalusPatientSessionPayloadGenqlSelection & {
    __args: { input: DeleteSalusPatientSessionByIdInput };
  };
  /** Delete a Salus Patient Session by session token. */
  deleteSalusPatientSessionBySessionToken?: SalusPatientSessionPayloadGenqlSelection & {
    __args: { input: DeleteSalusPatientSessionBySessionTokenInput };
  };
  /** Delete the Salus Verification Token. */
  deleteSalusVerificationToken?: SalusVerificationTokenPayloadGenqlSelection & {
    __args: { input: DeleteSalusVerificationTokenInput };
  };
  deleteSironaEmployeeProfileGrant?: SironaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: DeleteSironaEmployeeProfileGrantInput };
  };
  deleteSironaPermission?: SironaPermissionPayloadGenqlSelection & { __args: { input: DeleteSironaPermissionInput } };
  deleteSironaRole?: SironaRolePayloadGenqlSelection & { __args: { input: DeleteSironaRoleInput } };
  deleteSmenovkaEmployeeProfileGrant?: SmenovkaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: DeleteSmenovkaEmployeeProfileGrantInput };
  };
  deleteSmenovkaPermission?: SmenovkaPermissionPayloadGenqlSelection & {
    __args: { input: DeleteSmenovkaPermissionInput };
  };
  deleteSmenovkaRole?: SmenovkaRolePayloadGenqlSelection & { __args: { input: DeleteSmenovkaRoleInput } };
  deleteTabsyEmployeeProfile?: TabsyEmployeeProfilePayloadGenqlSelection & {
    __args: { input: DeleteTabsyEmployeeProfileInput };
  };
  deleteZapkaEmployeeProfileGrant?: ZapkaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: DeleteZapkaEmployeeProfileGrantInput };
  };
  deleteZapkaPermission?: ZapkaPermissionPayloadGenqlSelection & { __args: { input: DeleteZapkaPermissionInput } };
  deleteZapkaRole?: ZapkaRolePayloadGenqlSelection & { __args: { input: DeleteZapkaRoleInput } };
  reactivateFormVersion?: FormVersionPayloadGenqlSelection & { __args: { input: ReactivateFormVersionInput } };
  reactivateSironaEmployeeProfile?: SironaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: ReactivateSironaEmployeeProfileInput };
  };
  reactivateSmenovkaEmployeeProfile?: SmenovkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: ReactivateSmenovkaEmployeeProfileInput };
  };
  reactivateZapkaEmployeeProfile?: ZapkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: ReactivateZapkaEmployeeProfileInput };
  };
  /** Update a form. */
  updateForm?: FormPayloadGenqlSelection & { __args: { input: UpdateFormInput } };
  updateFormFillSession?: FormFillSessionPayloadGenqlSelection & { __args: { input: UpdateFormFillSessionInput } };
  updateFormResultBind?: FormResultBindPayloadGqlGenqlSelection & { __args: { input: UpdateFormResultBindInput } };
  updateFormResultKind?: FormResultKindPayloadGqlGenqlSelection & { __args: { input: UpdateFormResultKindInput } };
  updateFormSubmission?: FormSubmissionPayloadGenqlSelection & { __args: { input: UpdateFormSubmissionInput } };
  updateFormSubmissionAttachment?: FormSubmissionAttachmentPayloadGenqlSelection & {
    __args: { input: UpdateFormSubmissionAttachmentInput };
  };
  updateFormVersion?: FormVersionPayloadGenqlSelection & { __args: { input: UpdateFormVersionInput } };
  /** Update a Salus Patient Profile. */
  updateSalusPatientProfile?: SalusPatientProfilePayloadGenqlSelection & {
    __args: { input: UpdateSalusPatientProfileInput };
  };
  /** Update a Salus Patient Session. */
  updateSalusPatientSession?: SalusPatientSessionPayloadGenqlSelection & {
    __args: { input: UpdateSalusPatientSessionInput };
  };
  updateSironaEmployeeProfile?: SironaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: UpdateSironaEmployeeProfileInput };
  };
  updateSironaEmployeeProfileGrant?: SironaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: UpdateSironaEmployeeProfileGrantInput };
  };
  updateSironaPermission?: SironaPermissionPayloadGenqlSelection & { __args: { input: UpdateSironaPermissionInput } };
  updateSironaRole?: SironaRolePayloadGenqlSelection & { __args: { input: UpdateSironaRoleInput } };
  updateSmenovkaEmployeeProfile?: SmenovkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: UpdateSmenovkaEmployeeProfileInput };
  };
  updateSmenovkaEmployeeProfileGrant?: SmenovkaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: UpdateSmenovkaEmployeeProfileGrantInput };
  };
  updateSmenovkaPermission?: SmenovkaPermissionPayloadGenqlSelection & {
    __args: { input: UpdateSmenovkaPermissionInput };
  };
  updateSmenovkaRole?: SmenovkaRolePayloadGenqlSelection & { __args: { input: UpdateSmenovkaRoleInput } };
  updateZapkaEmployeeProfile?: ZapkaEmployeeProfilePayloadGenqlSelection & {
    __args: { input: UpdateZapkaEmployeeProfileInput };
  };
  updateZapkaEmployeeProfileGrant?: ZapkaEmployeeProfileGrantPayloadGenqlSelection & {
    __args: { input: UpdateZapkaEmployeeProfileGrantInput };
  };
  updateZapkaPermission?: ZapkaPermissionPayloadGenqlSelection & { __args: { input: UpdateZapkaPermissionInput } };
  updateZapkaRole?: ZapkaRolePayloadGenqlSelection & { __args: { input: UpdateZapkaRoleInput } };
  upsertFormsFromJson?: UpsertFormsFromJsonPayloadGenqlSelection & { __args: { input: UpsertFormsFromJsonInput } };
  upsertSironaPermissionsFromJson?: UpsertSironaPermissionsFromJsonPayloadGenqlSelection & {
    __args: { input: UpsertSironaPermissionsFromJsonInput };
  };
  upsertSironaRolesFromJson?: UpsertSironaRolesFromJsonPayloadGenqlSelection & {
    __args: { input: UpsertSironaRolesFromJsonInput };
  };
  /** Use the Salus Verification Token. */
  useSalusVerificationToken?: SalusVerificationTokenPayloadGenqlSelection & {
    __args: { input: UseSalusVerificationTokenInput };
  };
  /** Mark a Salus Patient Profile email as verified. */
  verifySalusPatientProfileEmail?: SalusPatientProfilePayloadGenqlSelection & {
    __args: { input: VerifySalusPatientProfileEmailInput };
  };
  createPatientFamilyMember?: PatientFamilyMemberPayloadGenqlSelection & {
    __args: { input: CreatePatientFamilyMemberInput };
  };
  /**
   * Creates an Patient image size set from original image (uploaded image by patient).
   *
   * Resizes original image to 3 dimensions.
   *
   * Payload contains `THUMB` version of the image.
   */
  createPatientImage?: PatientImagePayloadGenqlSelection & { __args: { input: CreatePatientImageInput } };
  deletePatientFamilyMember?: PatientFamilyMemberPayloadGenqlSelection & {
    __args: { input: DeletePatientFamilyMemberInput };
  };
  /**
   * Removes Patient image size set.
   *
   * Payload contains `THUMB` version of the image.
   */
  deletePatientImage?: PatientImagePayloadGenqlSelection & { __args: { input: DeletePatientImageInput } };
  /**
   * Updates an Patient image size set from original image (uploaded image by patient).
   *
   * Resizes original image to 3 dimensions.
   *
   * Payload contains `THUMB` version of the image.
   */
  updatePatientImage?: PatientImagePayloadGenqlSelection & { __args: { input: DeletePatientImageInput } };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface OrganizationGenqlSelection {
  code?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface OrganizationHierarchyGenqlSelection {
  costCenter?: CostCenterGenqlSelection;
  costCenterId?: boolean | number;
  employees?: OrganizationHierarchyEmployeeConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: OrganizationHierarchyEmployeeConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: OrganizationHierarchyEmployeeConnectionSortBy | null;
    };
  };
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  organization?: OrganizationGenqlSelection;
  organizationId?: boolean | number;
  organizationSourceId?: boolean | number;
  parentId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface OrganizationHierarchyEmployeeGenqlSelection {
  contract?: EmployeeWorkContractGenqlSelection & { __args?: { includeInactive?: Scalars["Boolean"] | null } };
  contractNumber?: boolean | number;
  /** Returns the employee card of the employee. */
  employeeCard?: EmployeeFacilityCardGenqlSelection;
  employeeCardId?: boolean | number;
  employmentKind?: EmploymentKindGenqlSelection;
  employmentKindId?: boolean | number;
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  id?: boolean | number;
  ignoreOutOfRegistrations?: boolean | number;
  isPlannable?: boolean | number;
  isReportable?: boolean | number;
  organizationHierarchy?: OrganizationHierarchyGenqlSelection;
  organizationHierarchyId?: boolean | number;
  relationType?: boolean | number;
  shiftKind?: ShiftKindGenqlSelection;
  shiftKindId?: boolean | number;
  systemizationPosition?: SystemizationPositionGenqlSelection;
  systemizationPositionId?: boolean | number;
  validFrom?: boolean | number;
  validTo?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface OrganizationHierarchyEmployeeConnectionGenqlSelection {
  /** A list of edges. */
  edges?: OrganizationHierarchyEmployeeEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: OrganizationHierarchyEmployeeGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface OrganizationHierarchyEmployeeConnectionFilterInput {
  /**
   * Filter Organization Hierarchy Employees by search string.
   * The search string is tokenized by whitespace.
   */
  search?: Scalars["String"] | null;
  systemizationPositionCategory?: SystemizationPositionCategory | null;
}

export interface OrganizationHierarchyEmployeeConnectionSortBy {
  direction: SortDirection;
  field: OrganizationHierarchyEmployeeConnectionSortByField;
}

/** An edge in a connection. */
export interface OrganizationHierarchyEmployeeEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: OrganizationHierarchyEmployeeGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Information about pagination in a connection */
export interface PageInfoGenqlSelection {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: boolean | number;
  /** When paginating forwards, are there more items? */
  hasNextPage?: boolean | number;
  /** When paginating backwards, are there more items? */
  hasPreviousPage?: boolean | number;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface PatientGenqlSelection {
  /** Primary postal address of the patient. */
  address?: PatientPostAddressGenqlSelection;
  akordId?: boolean | number;
  amosId?: boolean | number;
  /** Patients AMOS appointments. */
  appointments?: SlotConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
    };
  };
  /** Email address of the patient. */
  emailAddress?: boolean | number;
  /** Identity card number (Číslo občanského průkazu). */
  idCardNumber?: boolean | number;
  /** Education degree of the patient. */
  namePrefix?: boolean | number;
  /** Education degree of the patient. */
  nameSuffix?: boolean | number;
  /** Phone number of the patient. */
  phoneNumber?: boolean | number;
  /** Encoded {namePrefix} {firstName} {lastName} {nameSuffix} */
  veryFullName?: boolean | number;
  formSubmissions?: FormSubmissionConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: FormSubmissionConnectionSortBy | null;
    };
  };
  /** Check if the patient has a Salus profile */
  hasSalusProfile?: boolean | number;
  id?: boolean | number;
  salusProfile?: SalusPatientProfileGenqlSelection;
  /** Age of the patient */
  age?: boolean | number;
  birthDate?: boolean | number;
  birthLastName?: boolean | number;
  bloodType?: boolean | number;
  deathDate?: boolean | number;
  disability?: PatientDisabilityGenqlSelection;
  /** Health insurance company number. */
  insuranceCompanyNumber?: boolean | number;
  /** Health insurance number. */
  insuranceNumber?: boolean | number;
  /** Rh factor of the blood. */
  rhFactor?: boolean | number;
  /** Patient's sex. */
  sex?: boolean | number;
  /** Birth registration number (Rodné číslo). */
  birthRegistrationNumber?: boolean | number;
  /** Combined as FullName - (BirthRegistrationNumber) */
  displayName?: boolean | number;
  familyMembers?: PatientFamilyMemberGenqlSelection;
  /** First name of the patient. */
  firstName?: boolean | number;
  /** Combined as LastName and FirstName */
  fullName?: boolean | number;
  /** Returns `true` if patient has an image */
  hasImage?: boolean | number;
  /** Returs patient image */
  image?: PatientImageGqlGenqlSelection & { __args?: { size?: PatientImageSize | null } };
  insuranceNumberId?: boolean | number;
  /** Last name of the patient. */
  lastName?: boolean | number;
  mpiId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface PatientConnectionGenqlSelection {
  /** A list of edges. */
  edges?: PatientEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: PatientGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Patient Connection Filter */
export interface PatientConnectionFilterInput {
  /**
   * Filter Patients by search string.
   * The search string is tokenized by whitespace.
   */
  search?: Scalars["String"] | null;
}

export interface PatientConnectionSortBy {
  direction: SortDirection;
  field: PatientConnectionSortByField;
}

export interface PatientDisabilityGenqlSelection {
  blind?: boolean | number;
  deaf?: boolean | number;
  immobile?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** An edge in a connection. */
export interface PatientEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: PatientGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface PatientFamilyMemberGenqlSelection {
  id?: boolean | number;
  memberPatient?: PatientGenqlSelection;
  /** Child / member patient id. */
  memberPatientId?: boolean | number;
  patient?: PatientGenqlSelection;
  /** Parent patient id. */
  patientId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface PatientFamilyMemberPayloadGenqlSelection {
  patientFamilyMember?: PatientFamilyMemberGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface PatientImageGqlGenqlSelection {
  id?: boolean | number;
  /** Patient image JPEG binary encoded in Base64. */
  imageBase64?: boolean | number;
  /** Height of image in px. */
  imageHeight?: boolean | number;
  /** Width of image in px. */
  imageWidth?: boolean | number;
  /** Size of the image. */
  size?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface PatientImagePayloadGenqlSelection {
  patientImage?: PatientImageGqlGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface PatientPostAddressGenqlSelection {
  buildingNumber?: boolean | number;
  city?: boolean | number;
  cityDistrict?: boolean | number;
  country?: boolean | number;
  district?: boolean | number;
  full?: boolean | number;
  region?: boolean | number;
  registrationBuildingNumber?: boolean | number;
  street?: boolean | number;
  zipCode?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface QueryGenqlSelection {
  /** Get a AMOS building by ID. */
  building?: BuildingGenqlSelection & {
    __args: {
      /** Building ID */
      id: Scalars["ID"];
    };
  };
  /** Get AMOS buildings connection. */
  buildings?: BuildingConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: BuildingConnectionSortBy | null;
    };
  };
  /** Get a AMOS doctor by ID. */
  doctor?: DoctorGenqlSelection & { __args: { id: Scalars["ID"] } };
  /** Get AMOS doctors connection. */
  doctors?: DoctorConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: DoctortConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: DoctorConnectionSortBy | null;
    };
  };
  /** Get a AMOS Examination by ID. */
  examination?: ExaminationGenqlSelection & {
    __args: {
      /** Examination ID */
      id: Scalars["ID"];
    };
  };
  /** Get AMOS Examinations connection. */
  examinations?: ExaminationConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: ExaminationConnectionSortBy | null;
    };
  };
  /** Get a AMOS Location by ID. */
  location?: LocationGenqlSelection & {
    __args: {
      /** Location ID */
      id: Scalars["ID"];
    };
  };
  /** Get AMOS Locations list. */
  locations?: LocationGenqlSelection;
  /** Get a AMOS Room by ID. */
  room?: RoomGenqlSelection & {
    __args: {
      /** Slot ID */
      id: Scalars["ID"];
    };
  };
  /** Get AMOS Rooms connection. */
  rooms?: RoomConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: RoomConnectionSortBy | null;
    };
  };
  /** Get a AMOS Slot by ID. */
  slot?: SlotGenqlSelection & {
    __args: {
      /** Slot ID */
      id: Scalars["ID"];
    };
  };
  /** Get AMOS Slots connection. */
  slots?: SlotConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: SlotConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: SlotConnectionSortBy | null;
    };
  };
  /** Get a AMOS Slot by ID. */
  workplace?: WorkplaceGenqlSelection & {
    __args: {
      /** Workplace ID */
      id: Scalars["ID"];
    };
  };
  /** Get AMOS Slots connection. */
  workplaces?: WorkplaceConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: WorkplaceConnectionSortBy | null;
    };
  };
  cmsAkesoNewsPost?: CmsAkesoNewsPostGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsAkesoNewsPosts_connection?: CmsAkesoNewsPostEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsAkesoNewsPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsAkesoNewsPosts?: CmsAkesoNewsPostGenqlSelection & {
    __args?: {
      filters?: CmsAkesoNewsPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsIntranetBenefit?: CmsIntranetBenefitGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetBenefits_connection?: CmsIntranetBenefitEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetBenefitFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetBenefits?: CmsIntranetBenefitGenqlSelection & {
    __args?: {
      filters?: CmsIntranetBenefitFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEducationCategory?: CmsIntranetEducationCategoryGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetEducationCategories_connection?: CmsIntranetEducationCategoryEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEducationCategoryFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEducationCategories?: CmsIntranetEducationCategoryGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEducationCategoryFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEducationInstruction?: CmsIntranetEducationInstructionGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetEducationInstructions_connection?: CmsIntranetEducationInstructionEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEducationInstructionFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEducationInstructions?: CmsIntranetEducationInstructionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEducationInstructionFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEmployeeContact?: CmsIntranetEmployeeContactGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetEmployeeContacts_connection?: CmsIntranetEmployeeContactEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEmployeeContactFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEmployeeContacts?: CmsIntranetEmployeeContactGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEmployeeContactFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEvent?: CmsIntranetEventGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetEvents_connection?: CmsIntranetEventEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEventFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEvents?: CmsIntranetEventGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEventFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEventReport?: CmsIntranetEventReportGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetEventReports_connection?: CmsIntranetEventReportEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEventReportFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetEventReports?: CmsIntranetEventReportGenqlSelection & {
    __args?: {
      filters?: CmsIntranetEventReportFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetFaq?: CmsIntranetFaqGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetFaqs_connection?: CmsIntranetFaqEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetFaqFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetFaqs?: CmsIntranetFaqGenqlSelection & {
    __args?: {
      filters?: CmsIntranetFaqFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetLink?: CmsIntranetLinkGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetLinks_connection?: CmsIntranetLinkEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLinkFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetLinks?: CmsIntranetLinkGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLinkFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetLocation?: CmsIntranetLocationGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetLocations_connection?: CmsIntranetLocationEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetLocations?: CmsIntranetLocationGenqlSelection & {
    __args?: {
      filters?: CmsIntranetLocationFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetMagazineNea?: CmsIntranetMagazineNeaGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetMagazineNeas_connection?: CmsIntranetMagazineNeaEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetMagazineNeaFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetMagazineNeas?: CmsIntranetMagazineNeaGenqlSelection & {
    __args?: {
      filters?: CmsIntranetMagazineNeaFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetNewsItem?: CmsIntranetNewsItemGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetNews_connection?: CmsIntranetNewsItemEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetNewsItemFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetNews?: CmsIntranetNewsItemGenqlSelection & {
    __args?: {
      filters?: CmsIntranetNewsItemFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetRole?: CmsIntranetRoleGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsIntranetRoles_connection?: CmsIntranetRoleEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsIntranetRoleFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsIntranetRoles?: CmsIntranetRoleGenqlSelection & {
    __args?: {
      filters?: CmsIntranetRoleFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogAbout?: CmsItBlogAboutGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsItBlogAbouts_connection?: CmsItBlogAboutEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsItBlogAboutFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogAbouts?: CmsItBlogAboutGenqlSelection & {
    __args?: {
      filters?: CmsItBlogAboutFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogBanner?: CmsItBlogBannerGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsItBlogBanners_connection?: CmsItBlogBannerEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsItBlogBannerFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogBanners?: CmsItBlogBannerGenqlSelection & {
    __args?: {
      filters?: CmsItBlogBannerFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogPost?: CmsItBlogPostGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsItBlogPosts_connection?: CmsItBlogPostEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsItBlogPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogPosts?: CmsItBlogPostGenqlSelection & {
    __args?: {
      filters?: CmsItBlogPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogTag?: CmsItBlogTagGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsItBlogTags_connection?: CmsItBlogTagEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsItBlogTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsItBlogTags?: CmsItBlogTagGenqlSelection & {
    __args?: {
      filters?: CmsItBlogTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsSalusEducationPost?: CmsSalusEducationPostGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusEducationPosts_connection?: CmsSalusEducationPostEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusEducationPosts?: CmsSalusEducationPostGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationPostFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusEducationTag?: CmsSalusEducationTagGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusEducationTags_connection?: CmsSalusEducationTagEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusEducationTags?: CmsSalusEducationTagGenqlSelection & {
    __args?: {
      filters?: CmsSalusEducationTagFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusFaq?: CmsSalusFaqGenqlSelection & {
    __args: {
      documentId: Scalars["ID"];
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusFaqs_connection?: CmsSalusFaqEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusFaqFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusFaqs?: CmsSalusFaqGenqlSelection & {
    __args?: {
      filters?: CmsSalusFaqFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
      /** The locale to use for the query */
      locale?: Scalars["CmsI18NLocaleCode"] | null;
    };
  };
  cmsSalusVzdelavaniVerifiedBy?: CmsSalusVzdelavaniVerifiedByGenqlSelection & {
    __args: { documentId: Scalars["ID"]; status?: CmsPublicationStatus | null };
  };
  cmsSalusVzdelavaniVerifiedBies_connection?: CmsSalusVzdelavaniVerifiedByEntityResponseCollectionGenqlSelection & {
    __args?: {
      filters?: CmsSalusVzdelavaniVerifiedByFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  cmsSalusVzdelavaniVerifiedBies?: CmsSalusVzdelavaniVerifiedByGenqlSelection & {
    __args?: {
      filters?: CmsSalusVzdelavaniVerifiedByFiltersInput | null;
      pagination?: CmsPaginationArg | null;
      sort?: (Scalars["String"] | null)[] | null;
      status?: CmsPublicationStatus | null;
    };
  };
  costCenter?: CostCenterGenqlSelection & { __args: { id: Scalars["ID"] } };
  costCenters?: CostCenterGenqlSelection & { __args?: { facilityId?: Scalars["ID"] | null } };
  /** Get a Employee by ID or loginName or akordId */
  employee?: EmployeeGenqlSelection & {
    __args?: {
      /** Employee domainLogin name */
      domainLogin?: Scalars["String"] | null;
      /** Employee ID */
      id?: Scalars["ID"] | null;
    };
  };
  /** Kinds of employee education. */
  employeeEducationKinds?: EmployeeEducationKindGenqlSelection & { __args?: { facilityId?: Scalars["ID"] | null } };
  /** Get a EmployeeUser by ID or domainLogin */
  employeeUser?: EmployeeUserGenqlSelection & {
    __args?: {
      /** Employee domainLogin */
      domainLogin?: Scalars["String"] | null;
      /** EmployeeUser ID */
      id?: Scalars["ID"] | null;
    };
  };
  /** Get EmployeeUsers connection */
  employeeUsers?: EmployeeUserConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: EmployeeUserConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: EmployeeUserConnectionSortBy | null;
    };
  };
  /** Returns the employee work contract by ID. */
  employeeWorkContract?: EmployeeWorkContractGenqlSelection & { __args: { id: Scalars["ID"] } };
  /** Employees connection */
  employees?: EmployeeConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: EmployeeConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: EmployeeConnectionSortBy | null;
    };
  };
  employmentKind?: EmploymentKindGenqlSelection & { __args: { id: Scalars["ID"] } };
  employmentKinds?: EmploymentKindGenqlSelection & { __args?: { facilityId?: Scalars["ID"] | null } };
  facilities?: FacilityGenqlSelection;
  facility?: FacilityGenqlSelection & {
    __args: {
      /** Facility ID */
      id: Scalars["ID"];
    };
  };
  organization?: OrganizationGenqlSelection & { __args: { id: Scalars["ID"] } };
  /** Returns the organization hierarchy tree. */
  organizationHierarchy?: OrganizationHierarchyGenqlSelection & { __args?: { facilityId?: Scalars["ID"] | null } };
  organizationHierarchyEmployee?: OrganizationHierarchyEmployeeGenqlSelection & { __args: { id: Scalars["ID"] } };
  /** Returns connection of employees in the organization hierarchy. */
  organizationHierarchyEmployees?: OrganizationHierarchyEmployeeConnectionGenqlSelection & {
    __args: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: OrganizationHierarchyEmployeeConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      organizationHierarchyId: Scalars["ID"];
      sortBy?: OrganizationHierarchyEmployeeConnectionSortBy | null;
    };
  };
  /** Returns the organization hierarchy item by ID. */
  organizationHierarchyItem?: OrganizationHierarchyGenqlSelection & { __args: { id: Scalars["ID"] } };
  /** List of all organizations. */
  organizations?: OrganizationGenqlSelection;
  shiftKind?: ShiftKindGenqlSelection & { __args: { id: Scalars["ID"] } };
  shiftKinds?: ShiftKindGenqlSelection & { __args?: { facilityId?: Scalars["ID"] | null } };
  /** Get a Systemization by ID. */
  systemization?: SystemizationGenqlSelection & { __args: { id: Scalars["ID"] } };
  systemizationPosition?: SystemizationPositionGenqlSelection & { __args: { id: Scalars["ID"] } };
  systemizationPositions?: SystemizationPositionGenqlSelection & {
    __args?: { category?: SystemizationPositionCategory | null; facilityId?: Scalars["ID"] | null };
  };
  /** List of all employee systemization options. */
  systemizations?: SystemizationGenqlSelection & { __args?: { facilityId?: Scalars["ID"] | null } };
  workContractKind?: WorkContractKindGenqlSelection & { __args: { id: Scalars["ID"] } };
  workContractKinds?: WorkContractKindGenqlSelection;
  employeeForm?: EmployeeFormGenqlSelection & { __args: { id: Scalars["ID"] } };
  form?: FormGenqlSelection & { __args: { id: Scalars["ID"] } };
  formFillSession?: FormFillSessionGenqlSelection & { __args: { id: Scalars["ID"] } };
  formResultBind?: FormResultBindGenqlSelection & { __args: { id: Scalars["ID"] } };
  formResultKind?: FormResultKindGenqlSelection & { __args: { id: Scalars["ID"] } };
  formResultKinds?: FormResultKindGenqlSelection;
  formSubmission?: FormSubmissionGenqlSelection & { __args: { id: Scalars["ID"] } };
  formSubmissionAttachment?: FormSubmissionAttachmentGenqlSelection & { __args: { id: Scalars["ID"] } };
  formVersion?: FormVersionGenqlSelection & { __args: { id: Scalars["ID"] } };
  formVersions?: FormVersionGenqlSelection & {
    __args: { formId: Scalars["ID"]; includeInvalid?: Scalars["Boolean"] | null };
  };
  forms?: FormConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: FormConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: FormConnectionSortBy | null;
    };
  };
  /**
   * Returns the Patient Profile for the given ID, email, or patient ID.
   * Only one of the parameters should be provided. Arguments precedence is ID, email, patientId.
   */
  salusPatientProfile?: SalusPatientProfileGenqlSelection & {
    __args?: { email?: Scalars["String"] | null; id?: Scalars["ID"] | null; patientId?: Scalars["ID"] | null };
  };
  /** Returns a connection of Patient Profiles. */
  salusPatientProfiles?: SalusPatientProfileConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: SalusPatientProfileConnectionSortBy | null;
    };
  };
  salusPatientSession?: SalusPatientSessionGenqlSelection & {
    __args?: { id?: Scalars["ID"] | null; sessionToken?: Scalars["String"] | null };
  };
  /** Returns the employee profile for the given employee ID or ID of profile. */
  sironaEmployeeProfile?: SironaEmployeeProfileGenqlSelection & {
    __args?: {
      /** ID of the employee. */
      employeeId?: Scalars["ID"] | null;
      /** ID of the employee profile. */
      id?: Scalars["ID"] | null;
    };
  };
  /** Return Permission of Sirona by ID of the permission. */
  sironaPermission?: SironaPermissionGenqlSelection & {
    __args: {
      /** ID of the permission. */
      id: Scalars["ID"];
    };
  };
  /** Returns all permissions of Sirona. */
  sironaPermissions?: SironaPermissionGenqlSelection;
  /** Sirona role by ID. */
  sironaRole?: SironaRoleGenqlSelection & { __args?: { code?: Scalars["String"] | null; id?: Scalars["ID"] | null } };
  /** List of all Sirona roles. */
  sironaRoles?: SironaRoleGenqlSelection;
  /** Returns the employee profile for the given employee ID or ID of profile. */
  smenovkaEmployeeProfile?: SmenovkaEmployeeProfileGenqlSelection & {
    __args?: {
      /** ID of the employee. */
      employeeId?: Scalars["ID"] | null;
      /** ID of the employee profile. */
      id?: Scalars["ID"] | null;
    };
  };
  /** Return Permissions of Smenovka by ID of the permission. */
  smenovkaPermission?: SmenovkaPermissionGenqlSelection & {
    __args: {
      /** ID of the permission. */
      id: Scalars["ID"];
    };
  };
  /** Returns all permissions of Smenovka. */
  smenovkaPermissions?: SmenovkaPermissionGenqlSelection;
  /** Smenovka role by ID. */
  smenovkaRole?: SmenovkaRoleGenqlSelection & {
    __args?: { code?: Scalars["String"] | null; id?: Scalars["ID"] | null };
  };
  /** List of all Smenovka roles. */
  smenovkaRoles?: SmenovkaRoleGenqlSelection;
  tabsyEmployeeProfile?: TabsyEmployeeProfileGenqlSelection & { __args: { id: Scalars["ID"] } };
  /** Returns the employee profile for the given employee ID or ID of profile. */
  zapkaEmployeeProfile?: ZapkaEmployeeProfileGenqlSelection & {
    __args?: {
      /** ID of the employee. */
      employeeId?: Scalars["ID"] | null;
      /** ID of the employee profile. */
      id?: Scalars["ID"] | null;
    };
  };
  /** Return Permissions of Zapka by ID of the permission. */
  zapkaPermission?: ZapkaPermissionGenqlSelection & {
    __args: {
      /** ID of the permission. */
      id: Scalars["ID"];
    };
  };
  /** Returns all permissions of Zapka. */
  zapkaPermissions?: ZapkaPermissionGenqlSelection;
  /** Zapka role by ID. */
  zapkaRole?: ZapkaRoleGenqlSelection & { __args?: { code?: Scalars["String"] | null; id?: Scalars["ID"] | null } };
  /** List of all Zapka roles. */
  zapkaRoles?: ZapkaRoleGenqlSelection;
  dietAccount?: DietAccountGenqlSelection & {
    __args: {
      /** DietAccount ID */
      id: Scalars["ID"];
    };
  };
  dietAccountTranaction?: DietAccountTransactionGenqlSelection & {
    __args: {
      /** Diet account trans ID */
      id: Scalars["ID"];
    };
  };
  dietAccountTransactionType?: DietAccountTransactionTypeGenqlSelection & {
    __args: {
      /** Diet account trans type ID */
      id: Scalars["ID"];
    };
  };
  dietAccountTransactionTypes?: DietAccountTransactionTypeGenqlSelection;
  dietAccountTransactions?: DietAccountTransactionConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: DietAccountTransactionConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: DietAccountTransactionConnectionSortBy | null;
    };
  };
  dietAccounts?: DietAccountConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: DietAccountConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: DietAccountConnectionSortBy | null;
    };
  };
  dietConsumer?: DietConsumerGenqlSelection & {
    __args: {
      /** Diet consumer ID */
      id: Scalars["ID"];
    };
  };
  dietConsumers?: DietConsumerConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: DietConsumerConnectionSortBy | null;
    };
  };
  dietFacilities?: DietFacilityGenqlSelection;
  dietFacility?: DietFacilityGenqlSelection & {
    __args: {
      /** Diet Facility ID */
      id: Scalars["ID"];
    };
  };
  dietFoodType?: DietFoodTypeGenqlSelection & {
    __args: {
      /** Diet FoodType ID */
      id: Scalars["ID"];
    };
  };
  dietFoodTypes?: DietFoodTypeGenqlSelection & {
    __args?: {
      fullName?: Scalars["String"] | null;
      isValid?: Scalars["Boolean"] | null;
      shortName?: Scalars["String"] | null;
    };
  };
  dietMenu?: DietMenuGenqlSelection & {
    __args: {
      /** Diet menu ID */
      id: Scalars["String"];
    };
  };
  dietMenus?: DietMenuConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: DietMenuConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: DietMenuConnectionSortBy | null;
    };
  };
  dietOrder?: DietOrderGenqlSelection & {
    __args: {
      /** Diet order ID */
      id: Scalars["ID"];
    };
  };
  dietOrders?: DietOrderConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: DietOrderConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: DietOrderConnectionSortBy | null;
    };
  };
  dietType?: DietTypeGenqlSelection & {
    __args: {
      /** Diet Type ID */
      id: Scalars["ID"];
    };
  };
  dietTypes?: DietTypeConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: DietTypeConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: DietTypeConnectionSortBy | null;
    };
  };
  dietWorker?: DietWorkerGenqlSelection & {
    __args: {
      /** Diet worker ID */
      id: Scalars["ID"];
    };
  };
  dietWorkers?: DietWorkerGenqlSelection & {
    __args?: {
      dietFacilityId?: Scalars["ID"] | null;
      firstName?: Scalars["String"] | null;
      lastName?: Scalars["String"] | null;
      personalNumber?: Scalars["String"] | null;
    };
  };
  patientByAkordId?: PatientGenqlSelection & { __args: { akordId: Scalars["Int"] } };
  patient?: PatientGenqlSelection & {
    __args: {
      /** Patient ID */
      id: Scalars["ID"];
    };
  };
  patientByInsuranceNumber?: PatientGenqlSelection & { __args?: { insuranceNumberId?: Scalars["String"] | null } };
  patientFamilyMembers?: PatientFamilyMemberGenqlSelection & {
    __args: {
      /** Patient ID */
      patientId: Scalars["ID"];
    };
  };
  patients?: PatientConnectionGenqlSelection & {
    __args?: {
      after?: Scalars["String"] | null;
      before?: Scalars["String"] | null;
      filter?: PatientConnectionFilterInput | null;
      first?: Scalars["Int"] | null;
      last?: Scalars["Int"] | null;
      sortBy?: PatientConnectionSortBy | null;
    };
  };
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ReactivateFormVersionInput {
  id: Scalars["ID"];
}

export interface ReactivateSironaEmployeeProfileInput {
  id: Scalars["ID"];
}

export interface ReactivateSmenovkaEmployeeProfileInput {
  id: Scalars["ID"];
}

export interface ReactivateZapkaEmployeeProfileInput {
  id: Scalars["ID"];
}

export interface RoomGenqlSelection {
  building?: BuildingGenqlSelection;
  buildingId?: boolean | number;
  capacity?: boolean | number;
  description?: boolean | number;
  floor?: boolean | number;
  id?: boolean | number;
  number?: boolean | number;
  roomType?: boolean | number;
  shortcut?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface RoomConnectionGenqlSelection {
  /** A list of edges. */
  edges?: RoomEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: RoomGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface RoomConnectionSortBy {
  direction: SortDirection;
  field: RoomConnectionSortByField;
}

/** An edge in a connection. */
export interface RoomEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: RoomGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusPatientProfileGenqlSelection {
  email?: boolean | number;
  emailVerified?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  patient?: PatientGenqlSelection;
  patientId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusPatientProfileConnectionGenqlSelection {
  /** A list of edges. */
  edges?: SalusPatientProfileEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: SalusPatientProfileGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusPatientProfileConnectionSortBy {
  direction: SortDirection;
  field: SalusPatientProfileConnectionSortByField;
}

/** An edge in a connection. */
export interface SalusPatientProfileEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: SalusPatientProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusPatientProfilePayloadGenqlSelection {
  salusPatientProfile?: SalusPatientProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusPatientSessionGenqlSelection {
  createdAt?: boolean | number;
  expiresAt?: boolean | number;
  id?: boolean | number;
  patientProfileId?: boolean | number;
  sessionToken?: boolean | number;
  updatedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusPatientSessionPayloadGenqlSelection {
  salusPatientSession?: SalusPatientSessionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusVerificationTokenGenqlSelection {
  expires?: boolean | number;
  identifier?: boolean | number;
  token?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SalusVerificationTokenPayloadGenqlSelection {
  salusVerificationToken?: SalusVerificationTokenGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ScheduledSurgeryGenqlSelection {
  /** Code of surgery diagnosis. */
  diagnosisCode?: boolean | number;
  /** Description of surgery diagnosis. */
  diagnosisDescription?: boolean | number;
  /** Scheduled surgery ID */
  id?: boolean | number;
  /** Date of surgery schedule. */
  surgeryDate?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ScheduledSurgeryConnectionGenqlSelection {
  /** A list of edges. */
  edges?: ScheduledSurgeryEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: ScheduledSurgeryGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ScheduledSurgeryConnectionFilterInput {
  dateFrom?: Scalars["DateTime"] | null;
}

export interface ScheduledSurgeryConnectionSortBy {
  direction: SortDirection;
  field: ScheduledSurgeryConnectionSortByField;
}

/** An edge in a connection. */
export interface ScheduledSurgeryEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: ScheduledSurgeryGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ShiftKindGenqlSelection {
  category?: boolean | number;
  code?: boolean | number;
  days?: boolean | number;
  facilityId?: boolean | number;
  hours?: boolean | number;
  id?: boolean | number;
  parentId?: boolean | number;
  shiftKindSourceId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Employee Profile in Sirona. */
export interface SironaEmployeeProfileGenqlSelection {
  deactivatedAt?: boolean | number;
  defaultFacility?: FacilityGenqlSelection;
  defaultFacilityId?: boolean | number;
  email?: boolean | number;
  employeeId?: boolean | number;
  grants?: SironaEmployeeProfileGrantGenqlSelection;
  id?: boolean | number;
  /** `true` if the profile is active. */
  isActive?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SironaEmployeeProfileGrantGenqlSelection {
  employeeProfileId?: boolean | number;
  grant?: boolean | number;
  id?: boolean | number;
  profile?: SironaEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SironaEmployeeProfileGrantPayloadGenqlSelection {
  sironaEmployeeProfileGrant?: SironaEmployeeProfileGrantGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SironaEmployeeProfilePayloadGenqlSelection {
  sironaEmployeeProfile?: SironaEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SironaPermissionGenqlSelection {
  code?: boolean | number;
  description?: boolean | number;
  /** Available facilities for this permission. */
  facilities?: FacilityGenqlSelection;
  id?: boolean | number;
  name?: boolean | number;
  /** Available roles for this permission. */
  roles?: SironaRoleGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SironaPermissionPayloadGenqlSelection {
  sironaPermission?: SironaPermissionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SironaRoleGenqlSelection {
  code?: boolean | number;
  description?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SironaRolePayloadGenqlSelection {
  sironaRole?: SironaRoleGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SlotGenqlSelection {
  arrivalTime?: boolean | number;
  callTime?: boolean | number;
  dateFrom?: boolean | number;
  dateOfChange?: boolean | number;
  dateTo?: boolean | number;
  departureTime?: boolean | number;
  description?: boolean | number;
  doctor?: DoctorGenqlSelection;
  doctorId?: boolean | number;
  duration?: boolean | number;
  examination?: ExaminationGenqlSelection;
  examinationId?: boolean | number;
  gender?: boolean | number;
  id?: boolean | number;
  location?: LocationGenqlSelection;
  locationId?: boolean | number;
  patient?: PatientGenqlSelection;
  patientType?: boolean | number;
  previousSlot?: SlotGenqlSelection;
  previousSlotId?: boolean | number;
  priority?: boolean | number;
  reservationUntil?: boolean | number;
  room?: RoomGenqlSelection;
  roomId?: boolean | number;
  ruleId?: boolean | number;
  slotColor?: boolean | number;
  slotType?: boolean | number;
  statim?: boolean | number;
  status?: boolean | number;
  sync?: boolean | number;
  ticket?: boolean | number;
  ticketTime?: boolean | number;
  userId?: boolean | number;
  variability?: boolean | number;
  workplace?: WorkplaceGenqlSelection;
  workplaceId?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SlotConnectionGenqlSelection {
  /** A list of edges. */
  edges?: SlotEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: SlotGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Slot connection filter. */
export interface SlotConnectionFilterInput {
  /** Filter by patient GQL ID. */
  patientId?: Scalars["ID"] | null;
}

export interface SlotConnectionSortBy {
  direction: SortDirection;
  field: SlotConnectionSortByField;
}

/** An edge in a connection. */
export interface SlotEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: SlotGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Employee Profile in Smenovka. */
export interface SmenovkaEmployeeProfileGenqlSelection {
  deactivatedAt?: boolean | number;
  email?: boolean | number;
  employeeId?: boolean | number;
  grants?: SmenovkaEmployeeProfileGrantGenqlSelection;
  id?: boolean | number;
  /** `true` if the profile is active. */
  isActive?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SmenovkaEmployeeProfileGrantGenqlSelection {
  employeeProfileId?: boolean | number;
  grant?: boolean | number;
  id?: boolean | number;
  profile?: SmenovkaEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SmenovkaEmployeeProfileGrantPayloadGenqlSelection {
  smenovkaEmployeeProfileGrant?: SmenovkaEmployeeProfileGrantGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SmenovkaEmployeeProfilePayloadGenqlSelection {
  smenovkaEmployeeProfile?: SmenovkaEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SmenovkaPermissionGenqlSelection {
  code?: boolean | number;
  description?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  /** Available roles for this feature. */
  roles?: SmenovkaRoleGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SmenovkaPermissionPayloadGenqlSelection {
  smenovkaPermission?: SmenovkaPermissionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SmenovkaRoleGenqlSelection {
  code?: boolean | number;
  description?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SmenovkaRolePayloadGenqlSelection {
  smenovkaRole?: SmenovkaRoleGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SystemizationGenqlSelection {
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  grouping?: boolean | number;
  groupingType?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SystemizationPositionGenqlSelection {
  category?: boolean | number;
  facility?: FacilityGenqlSelection;
  facilityId?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface TabsyEmployeeProfileGenqlSelection {
  employeeId?: boolean | number;
  id?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface TabsyEmployeeProfilePayloadGenqlSelection {
  tabsyEmployeeProfile?: TabsyEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface UpdateFormFillSessionInput {
  departmentAkordId?: Scalars["Int"] | null;
  documentationAkordId?: Scalars["Int"] | null;
  id: Scalars["ID"];
  stationAkordId?: Scalars["Int"] | null;
}

export interface UpdateFormInput {
  code: Scalars["String"];
  consumer: FormConsumer;
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  kind: FormKind;
  name: Scalars["String"];
  title: Scalars["String"];
}

export interface UpdateFormResultBindInput {
  akordVislBlobId?: Scalars["Int"] | null;
  formSubmissionId: Scalars["ID"];
  id: Scalars["ID"];
  resultKindId: Scalars["ID"];
}

export interface UpdateFormResultKindInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface UpdateFormSubmissionAttachmentInput {
  dataBase64: Scalars["String"];
  fileName: Scalars["String"];
  id: Scalars["ID"];
  mimeType: Scalars["String"];
}

export interface UpdateFormSubmissionInput {
  dataJson?: Scalars["FormSubmissionData"] | null;
  id: Scalars["ID"];
  isComplete?: Scalars["Boolean"] | null;
}

export interface UpdateFormVersionInput {
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  validFrom?: Scalars["DateTime"] | null;
  validTo?: Scalars["DateTime"] | null;
}

export interface UpdateSalusPatientProfileInput {
  email: Scalars["String"];
  emailVerified?: Scalars["DateTime"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface UpdateSalusPatientSessionInput {
  expiresAt?: Scalars["DateTime"] | null;
  id: Scalars["ID"];
  patientProfileId?: Scalars["ID"] | null;
  sessionToken?: Scalars["String"] | null;
}

export interface UpdateSironaEmployeeProfileGrantInput {
  grant: Scalars["String"];
  id: Scalars["ID"];
}

export interface UpdateSironaEmployeeProfileInput {
  defaultFacilityId: Scalars["ID"];
  email: Scalars["String"];
  id: Scalars["ID"];
}

export interface UpdateSironaPermissionInput {
  code?: Scalars["String"] | null;
  description?: Scalars["String"] | null;
  facilities?: Scalars["ID"][] | null;
  id: Scalars["ID"];
  name?: Scalars["String"] | null;
  roles?: Scalars["ID"][] | null;
}

export interface UpdateSironaRoleInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface UpdateSmenovkaEmployeeProfileGrantInput {
  grant: Scalars["String"];
  id: Scalars["ID"];
}

export interface UpdateSmenovkaEmployeeProfileInput {
  email: Scalars["String"];
  id: Scalars["ID"];
}

export interface UpdateSmenovkaPermissionInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface UpdateSmenovkaRoleInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface UpdateZapkaEmployeeProfileGrantInput {
  grant: Scalars["String"];
  id: Scalars["ID"];
}

export interface UpdateZapkaEmployeeProfileInput {
  email: Scalars["String"];
  id: Scalars["ID"];
}

export interface UpdateZapkaPermissionInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface UpdateZapkaRoleInput {
  code: Scalars["String"];
  description?: Scalars["String"] | null;
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface UpsertFormsFromJsonInput {
  json: Scalars["UpsertFormsFromJsonData"];
}

export interface UpsertFormsFromJsonPayloadGenqlSelection {
  form?: FormGenqlSelection;
  formVersion?: FormVersionGenqlSelection;
  wasFormInserted?: boolean | number;
  wasFormUpdated?: boolean | number;
  wasFormVersionInserted?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface UpsertSironaPermissionsFromJsonInput {
  json: Scalars["UpsertSironaPermissionsFromJsonData"];
}

export interface UpsertSironaPermissionsFromJsonPayloadGenqlSelection {
  sironaPermission?: SironaPermissionGenqlSelection;
  wasInserted?: boolean | number;
  wasUpdated?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface UpsertSironaRolesFromJsonInput {
  json: Scalars["UpsertSironaRolesFromJsonData"];
}

export interface UpsertSironaRolesFromJsonPayloadGenqlSelection {
  sironaRole?: SironaRoleGenqlSelection;
  wasInserted?: boolean | number;
  wasUpdated?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface UseSalusVerificationTokenInput {
  identifier: Scalars["String"];
  token: Scalars["String"];
}

export interface VerifySalusPatientProfileEmailInput {
  id: Scalars["ID"];
}

export interface WorkContractKindGenqlSelection {
  id?: boolean | number;
  name?: boolean | number;
  order?: boolean | number;
  /** Type of the contract. */
  type?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface WorkplaceGenqlSelection {
  description?: boolean | number;
  expertise?: boolean | number;
  icp?: boolean | number;
  id?: boolean | number;
  instruction?: boolean | number;
  location?: LocationGenqlSelection;
  locationId?: boolean | number;
  name?: boolean | number;
  preGeneratedDays?: boolean | number;
  preOrderMode?: boolean | number;
  shortcut?: boolean | number;
  slotColor?: boolean | number;
  timeFrom?: boolean | number;
  timeTo?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface WorkplaceConnectionGenqlSelection {
  /** A list of edges. */
  edges?: WorkplaceEdgeGenqlSelection;
  /** A list of nodes. */
  nodes?: WorkplaceGenqlSelection;
  /** Information to aid in pagination. */
  pageInfo?: PageInfoGenqlSelection;
  /** Total result set count */
  totalCount?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface WorkplaceConnectionSortBy {
  direction: SortDirection;
  field: WorkplaceConnectionSortByField;
}

/** An edge in a connection. */
export interface WorkplaceEdgeGenqlSelection {
  /** A cursor for use in pagination */
  cursor?: boolean | number;
  /** The item at the end of the edge */
  node?: WorkplaceGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Employee Profile in Zapka. */
export interface ZapkaEmployeeProfileGenqlSelection {
  deactivatedAt?: boolean | number;
  email?: boolean | number;
  employeeId?: boolean | number;
  grants?: ZapkaEmployeeProfileGrantGenqlSelection;
  id?: boolean | number;
  /** `true` if the profile is active. */
  isActive?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ZapkaEmployeeProfileGrantGenqlSelection {
  employeeProfileId?: boolean | number;
  grant?: boolean | number;
  id?: boolean | number;
  profile?: ZapkaEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ZapkaEmployeeProfileGrantPayloadGenqlSelection {
  zapkaEmployeeProfileGrant?: ZapkaEmployeeProfileGrantGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ZapkaEmployeeProfilePayloadGenqlSelection {
  zapkaEmployeeProfile?: ZapkaEmployeeProfileGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ZapkaPermissionGenqlSelection {
  code?: boolean | number;
  description?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  /** Available roles for this feature. */
  roles?: ZapkaRoleGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ZapkaPermissionPayloadGenqlSelection {
  zapkaPermission?: ZapkaPermissionGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ZapkaRoleGenqlSelection {
  code?: boolean | number;
  description?: boolean | number;
  id?: boolean | number;
  name?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ZapkaRolePayloadGenqlSelection {
  zapkaRole?: ZapkaRoleGenqlSelection;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

const Building_possibleTypes: string[] = ["Building"];
export const isBuilding = (obj?: { __typename?: any } | null): obj is Building => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBuilding"');
  return Building_possibleTypes.includes(obj.__typename);
};

const BuildingConnection_possibleTypes: string[] = ["BuildingConnection"];
export const isBuildingConnection = (obj?: { __typename?: any } | null): obj is BuildingConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBuildingConnection"');
  return BuildingConnection_possibleTypes.includes(obj.__typename);
};

const BuildingEdge_possibleTypes: string[] = ["BuildingEdge"];
export const isBuildingEdge = (obj?: { __typename?: any } | null): obj is BuildingEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBuildingEdge"');
  return BuildingEdge_possibleTypes.includes(obj.__typename);
};

const CmsAkesoNewsPost_possibleTypes: string[] = ["CmsAkesoNewsPost"];
export const isCmsAkesoNewsPost = (obj?: { __typename?: any } | null): obj is CmsAkesoNewsPost => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsAkesoNewsPost"');
  return CmsAkesoNewsPost_possibleTypes.includes(obj.__typename);
};

const CmsAkesoNewsPostEntityResponseCollection_possibleTypes: string[] = ["CmsAkesoNewsPostEntityResponseCollection"];
export const isCmsAkesoNewsPostEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsAkesoNewsPostEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsAkesoNewsPostEntityResponseCollection"');
  return CmsAkesoNewsPostEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsAkesoNewsPostRelationResponseCollection_possibleTypes: string[] = [
  "CmsAkesoNewsPostRelationResponseCollection",
];
export const isCmsAkesoNewsPostRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsAkesoNewsPostRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsAkesoNewsPostRelationResponseCollection"');
  return CmsAkesoNewsPostRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsComponentLinksExterniLinka_possibleTypes: string[] = ["CmsComponentLinksExterniLinka"];
export const isCmsComponentLinksExterniLinka = (
  obj?: { __typename?: any } | null,
): obj is CmsComponentLinksExterniLinka => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsComponentLinksExterniLinka"');
  return CmsComponentLinksExterniLinka_possibleTypes.includes(obj.__typename);
};

const CmsDeleteMutationResponse_possibleTypes: string[] = ["CmsDeleteMutationResponse"];
export const isCmsDeleteMutationResponse = (obj?: { __typename?: any } | null): obj is CmsDeleteMutationResponse => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsDeleteMutationResponse"');
  return CmsDeleteMutationResponse_possibleTypes.includes(obj.__typename);
};

const CmsGenericMorph_possibleTypes: string[] = [
  "CmsComponentLinksExterniLinka",
  "CmsUploadFile",
  "CmsAkesoNewsPost",
  "CmsIntranetBenefit",
  "CmsIntranetEducationCategory",
  "CmsIntranetEducationInstruction",
  "CmsIntranetEmployeeContact",
  "CmsIntranetEvent",
  "CmsIntranetEventReport",
  "CmsIntranetFaq",
  "CmsIntranetLink",
  "CmsIntranetLocation",
  "CmsIntranetMagazineNea",
  "CmsIntranetNewsItem",
  "CmsIntranetRole",
  "CmsItBlogAbout",
  "CmsItBlogBanner",
  "CmsItBlogPost",
  "CmsItBlogTag",
  "CmsSalusEducationPost",
  "CmsSalusEducationTag",
  "CmsSalusFaq",
  "CmsSalusVzdelavaniVerifiedBy",
];
export const isCmsGenericMorph = (obj?: { __typename?: any } | null): obj is CmsGenericMorph => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsGenericMorph"');
  return CmsGenericMorph_possibleTypes.includes(obj.__typename);
};

const CmsIntranetBenefit_possibleTypes: string[] = ["CmsIntranetBenefit"];
export const isCmsIntranetBenefit = (obj?: { __typename?: any } | null): obj is CmsIntranetBenefit => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetBenefit"');
  return CmsIntranetBenefit_possibleTypes.includes(obj.__typename);
};

const CmsIntranetBenefitEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetBenefitEntityResponseCollection",
];
export const isCmsIntranetBenefitEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetBenefitEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetBenefitEntityResponseCollection"');
  return CmsIntranetBenefitEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEducationCategory_possibleTypes: string[] = ["CmsIntranetEducationCategory"];
export const isCmsIntranetEducationCategory = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEducationCategory => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetEducationCategory"');
  return CmsIntranetEducationCategory_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEducationCategoryEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetEducationCategoryEntityResponseCollection",
];
export const isCmsIntranetEducationCategoryEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEducationCategoryEntityResponseCollection => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isCmsIntranetEducationCategoryEntityResponseCollection"');
  return CmsIntranetEducationCategoryEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEducationCategoryRelationResponseCollection_possibleTypes: string[] = [
  "CmsIntranetEducationCategoryRelationResponseCollection",
];
export const isCmsIntranetEducationCategoryRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEducationCategoryRelationResponseCollection => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isCmsIntranetEducationCategoryRelationResponseCollection"');
  return CmsIntranetEducationCategoryRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEducationInstruction_possibleTypes: string[] = ["CmsIntranetEducationInstruction"];
export const isCmsIntranetEducationInstruction = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEducationInstruction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetEducationInstruction"');
  return CmsIntranetEducationInstruction_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEducationInstructionEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetEducationInstructionEntityResponseCollection",
];
export const isCmsIntranetEducationInstructionEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEducationInstructionEntityResponseCollection => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isCmsIntranetEducationInstructionEntityResponseCollection"');
  return CmsIntranetEducationInstructionEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEmployeeContact_possibleTypes: string[] = ["CmsIntranetEmployeeContact"];
export const isCmsIntranetEmployeeContact = (obj?: { __typename?: any } | null): obj is CmsIntranetEmployeeContact => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetEmployeeContact"');
  return CmsIntranetEmployeeContact_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEmployeeContactEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetEmployeeContactEntityResponseCollection",
];
export const isCmsIntranetEmployeeContactEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEmployeeContactEntityResponseCollection => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isCmsIntranetEmployeeContactEntityResponseCollection"');
  return CmsIntranetEmployeeContactEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEvent_possibleTypes: string[] = ["CmsIntranetEvent"];
export const isCmsIntranetEvent = (obj?: { __typename?: any } | null): obj is CmsIntranetEvent => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetEvent"');
  return CmsIntranetEvent_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEventEntityResponseCollection_possibleTypes: string[] = ["CmsIntranetEventEntityResponseCollection"];
export const isCmsIntranetEventEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEventEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetEventEntityResponseCollection"');
  return CmsIntranetEventEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEventReport_possibleTypes: string[] = ["CmsIntranetEventReport"];
export const isCmsIntranetEventReport = (obj?: { __typename?: any } | null): obj is CmsIntranetEventReport => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetEventReport"');
  return CmsIntranetEventReport_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEventReportEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetEventReportEntityResponseCollection",
];
export const isCmsIntranetEventReportEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEventReportEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetEventReportEntityResponseCollection"');
  return CmsIntranetEventReportEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetEventReportRelationResponseCollection_possibleTypes: string[] = [
  "CmsIntranetEventReportRelationResponseCollection",
];
export const isCmsIntranetEventReportRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetEventReportRelationResponseCollection => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isCmsIntranetEventReportRelationResponseCollection"');
  return CmsIntranetEventReportRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetFaq_possibleTypes: string[] = ["CmsIntranetFaq"];
export const isCmsIntranetFaq = (obj?: { __typename?: any } | null): obj is CmsIntranetFaq => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetFaq"');
  return CmsIntranetFaq_possibleTypes.includes(obj.__typename);
};

const CmsIntranetFaqEntityResponseCollection_possibleTypes: string[] = ["CmsIntranetFaqEntityResponseCollection"];
export const isCmsIntranetFaqEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetFaqEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetFaqEntityResponseCollection"');
  return CmsIntranetFaqEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetLink_possibleTypes: string[] = ["CmsIntranetLink"];
export const isCmsIntranetLink = (obj?: { __typename?: any } | null): obj is CmsIntranetLink => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetLink"');
  return CmsIntranetLink_possibleTypes.includes(obj.__typename);
};

const CmsIntranetLinkEntityResponseCollection_possibleTypes: string[] = ["CmsIntranetLinkEntityResponseCollection"];
export const isCmsIntranetLinkEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetLinkEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetLinkEntityResponseCollection"');
  return CmsIntranetLinkEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetLocation_possibleTypes: string[] = ["CmsIntranetLocation"];
export const isCmsIntranetLocation = (obj?: { __typename?: any } | null): obj is CmsIntranetLocation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetLocation"');
  return CmsIntranetLocation_possibleTypes.includes(obj.__typename);
};

const CmsIntranetLocationEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetLocationEntityResponseCollection",
];
export const isCmsIntranetLocationEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetLocationEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetLocationEntityResponseCollection"');
  return CmsIntranetLocationEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetLocationRelationResponseCollection_possibleTypes: string[] = [
  "CmsIntranetLocationRelationResponseCollection",
];
export const isCmsIntranetLocationRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetLocationRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetLocationRelationResponseCollection"');
  return CmsIntranetLocationRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetMagazineNea_possibleTypes: string[] = ["CmsIntranetMagazineNea"];
export const isCmsIntranetMagazineNea = (obj?: { __typename?: any } | null): obj is CmsIntranetMagazineNea => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetMagazineNea"');
  return CmsIntranetMagazineNea_possibleTypes.includes(obj.__typename);
};

const CmsIntranetMagazineNeaEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetMagazineNeaEntityResponseCollection",
];
export const isCmsIntranetMagazineNeaEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetMagazineNeaEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetMagazineNeaEntityResponseCollection"');
  return CmsIntranetMagazineNeaEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetNewsItem_possibleTypes: string[] = ["CmsIntranetNewsItem"];
export const isCmsIntranetNewsItem = (obj?: { __typename?: any } | null): obj is CmsIntranetNewsItem => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetNewsItem"');
  return CmsIntranetNewsItem_possibleTypes.includes(obj.__typename);
};

const CmsIntranetNewsItemEntityResponseCollection_possibleTypes: string[] = [
  "CmsIntranetNewsItemEntityResponseCollection",
];
export const isCmsIntranetNewsItemEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetNewsItemEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetNewsItemEntityResponseCollection"');
  return CmsIntranetNewsItemEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetRole_possibleTypes: string[] = ["CmsIntranetRole"];
export const isCmsIntranetRole = (obj?: { __typename?: any } | null): obj is CmsIntranetRole => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetRole"');
  return CmsIntranetRole_possibleTypes.includes(obj.__typename);
};

const CmsIntranetRoleEntityResponseCollection_possibleTypes: string[] = ["CmsIntranetRoleEntityResponseCollection"];
export const isCmsIntranetRoleEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetRoleEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetRoleEntityResponseCollection"');
  return CmsIntranetRoleEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsIntranetRoleRelationResponseCollection_possibleTypes: string[] = ["CmsIntranetRoleRelationResponseCollection"];
export const isCmsIntranetRoleRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsIntranetRoleRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsIntranetRoleRelationResponseCollection"');
  return CmsIntranetRoleRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsItBlogAbout_possibleTypes: string[] = ["CmsItBlogAbout"];
export const isCmsItBlogAbout = (obj?: { __typename?: any } | null): obj is CmsItBlogAbout => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogAbout"');
  return CmsItBlogAbout_possibleTypes.includes(obj.__typename);
};

const CmsItBlogAboutEntityResponseCollection_possibleTypes: string[] = ["CmsItBlogAboutEntityResponseCollection"];
export const isCmsItBlogAboutEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsItBlogAboutEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogAboutEntityResponseCollection"');
  return CmsItBlogAboutEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsItBlogBanner_possibleTypes: string[] = ["CmsItBlogBanner"];
export const isCmsItBlogBanner = (obj?: { __typename?: any } | null): obj is CmsItBlogBanner => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogBanner"');
  return CmsItBlogBanner_possibleTypes.includes(obj.__typename);
};

const CmsItBlogBannerEntityResponseCollection_possibleTypes: string[] = ["CmsItBlogBannerEntityResponseCollection"];
export const isCmsItBlogBannerEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsItBlogBannerEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogBannerEntityResponseCollection"');
  return CmsItBlogBannerEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsItBlogPost_possibleTypes: string[] = ["CmsItBlogPost"];
export const isCmsItBlogPost = (obj?: { __typename?: any } | null): obj is CmsItBlogPost => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogPost"');
  return CmsItBlogPost_possibleTypes.includes(obj.__typename);
};

const CmsItBlogPostEntityResponseCollection_possibleTypes: string[] = ["CmsItBlogPostEntityResponseCollection"];
export const isCmsItBlogPostEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsItBlogPostEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogPostEntityResponseCollection"');
  return CmsItBlogPostEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsItBlogPostRelationResponseCollection_possibleTypes: string[] = ["CmsItBlogPostRelationResponseCollection"];
export const isCmsItBlogPostRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsItBlogPostRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogPostRelationResponseCollection"');
  return CmsItBlogPostRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsItBlogTag_possibleTypes: string[] = ["CmsItBlogTag"];
export const isCmsItBlogTag = (obj?: { __typename?: any } | null): obj is CmsItBlogTag => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogTag"');
  return CmsItBlogTag_possibleTypes.includes(obj.__typename);
};

const CmsItBlogTagEntityResponseCollection_possibleTypes: string[] = ["CmsItBlogTagEntityResponseCollection"];
export const isCmsItBlogTagEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsItBlogTagEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogTagEntityResponseCollection"');
  return CmsItBlogTagEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsItBlogTagRelationResponseCollection_possibleTypes: string[] = ["CmsItBlogTagRelationResponseCollection"];
export const isCmsItBlogTagRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsItBlogTagRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsItBlogTagRelationResponseCollection"');
  return CmsItBlogTagRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsPagination_possibleTypes: string[] = ["CmsPagination"];
export const isCmsPagination = (obj?: { __typename?: any } | null): obj is CmsPagination => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsPagination"');
  return CmsPagination_possibleTypes.includes(obj.__typename);
};

const CmsSalusEducationPost_possibleTypes: string[] = ["CmsSalusEducationPost"];
export const isCmsSalusEducationPost = (obj?: { __typename?: any } | null): obj is CmsSalusEducationPost => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusEducationPost"');
  return CmsSalusEducationPost_possibleTypes.includes(obj.__typename);
};

const CmsSalusEducationPostEntityResponseCollection_possibleTypes: string[] = [
  "CmsSalusEducationPostEntityResponseCollection",
];
export const isCmsSalusEducationPostEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusEducationPostEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusEducationPostEntityResponseCollection"');
  return CmsSalusEducationPostEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsSalusEducationPostRelationResponseCollection_possibleTypes: string[] = [
  "CmsSalusEducationPostRelationResponseCollection",
];
export const isCmsSalusEducationPostRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusEducationPostRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusEducationPostRelationResponseCollection"');
  return CmsSalusEducationPostRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsSalusEducationTag_possibleTypes: string[] = ["CmsSalusEducationTag"];
export const isCmsSalusEducationTag = (obj?: { __typename?: any } | null): obj is CmsSalusEducationTag => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusEducationTag"');
  return CmsSalusEducationTag_possibleTypes.includes(obj.__typename);
};

const CmsSalusEducationTagEntityResponseCollection_possibleTypes: string[] = [
  "CmsSalusEducationTagEntityResponseCollection",
];
export const isCmsSalusEducationTagEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusEducationTagEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusEducationTagEntityResponseCollection"');
  return CmsSalusEducationTagEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsSalusEducationTagRelationResponseCollection_possibleTypes: string[] = [
  "CmsSalusEducationTagRelationResponseCollection",
];
export const isCmsSalusEducationTagRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusEducationTagRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusEducationTagRelationResponseCollection"');
  return CmsSalusEducationTagRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsSalusFaq_possibleTypes: string[] = ["CmsSalusFaq"];
export const isCmsSalusFaq = (obj?: { __typename?: any } | null): obj is CmsSalusFaq => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusFaq"');
  return CmsSalusFaq_possibleTypes.includes(obj.__typename);
};

const CmsSalusFaqEntityResponseCollection_possibleTypes: string[] = ["CmsSalusFaqEntityResponseCollection"];
export const isCmsSalusFaqEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusFaqEntityResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusFaqEntityResponseCollection"');
  return CmsSalusFaqEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsSalusFaqRelationResponseCollection_possibleTypes: string[] = ["CmsSalusFaqRelationResponseCollection"];
export const isCmsSalusFaqRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusFaqRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusFaqRelationResponseCollection"');
  return CmsSalusFaqRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsSalusVzdelavaniVerifiedBy_possibleTypes: string[] = ["CmsSalusVzdelavaniVerifiedBy"];
export const isCmsSalusVzdelavaniVerifiedBy = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusVzdelavaniVerifiedBy => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsSalusVzdelavaniVerifiedBy"');
  return CmsSalusVzdelavaniVerifiedBy_possibleTypes.includes(obj.__typename);
};

const CmsSalusVzdelavaniVerifiedByEntityResponseCollection_possibleTypes: string[] = [
  "CmsSalusVzdelavaniVerifiedByEntityResponseCollection",
];
export const isCmsSalusVzdelavaniVerifiedByEntityResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsSalusVzdelavaniVerifiedByEntityResponseCollection => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isCmsSalusVzdelavaniVerifiedByEntityResponseCollection"');
  return CmsSalusVzdelavaniVerifiedByEntityResponseCollection_possibleTypes.includes(obj.__typename);
};

const CmsUploadFile_possibleTypes: string[] = ["CmsUploadFile"];
export const isCmsUploadFile = (obj?: { __typename?: any } | null): obj is CmsUploadFile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsUploadFile"');
  return CmsUploadFile_possibleTypes.includes(obj.__typename);
};

const CmsUploadFileRelationResponseCollection_possibleTypes: string[] = ["CmsUploadFileRelationResponseCollection"];
export const isCmsUploadFileRelationResponseCollection = (
  obj?: { __typename?: any } | null,
): obj is CmsUploadFileRelationResponseCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCmsUploadFileRelationResponseCollection"');
  return CmsUploadFileRelationResponseCollection_possibleTypes.includes(obj.__typename);
};

const CostCenter_possibleTypes: string[] = ["CostCenter"];
export const isCostCenter = (obj?: { __typename?: any } | null): obj is CostCenter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCostCenter"');
  return CostCenter_possibleTypes.includes(obj.__typename);
};

const DietAccount_possibleTypes: string[] = ["DietAccount"];
export const isDietAccount = (obj?: { __typename?: any } | null): obj is DietAccount => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietAccount"');
  return DietAccount_possibleTypes.includes(obj.__typename);
};

const DietAccountConnection_possibleTypes: string[] = ["DietAccountConnection"];
export const isDietAccountConnection = (obj?: { __typename?: any } | null): obj is DietAccountConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietAccountConnection"');
  return DietAccountConnection_possibleTypes.includes(obj.__typename);
};

const DietAccountEdge_possibleTypes: string[] = ["DietAccountEdge"];
export const isDietAccountEdge = (obj?: { __typename?: any } | null): obj is DietAccountEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietAccountEdge"');
  return DietAccountEdge_possibleTypes.includes(obj.__typename);
};

const DietAccountTransaction_possibleTypes: string[] = ["DietAccountTransaction"];
export const isDietAccountTransaction = (obj?: { __typename?: any } | null): obj is DietAccountTransaction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietAccountTransaction"');
  return DietAccountTransaction_possibleTypes.includes(obj.__typename);
};

const DietAccountTransactionConnection_possibleTypes: string[] = ["DietAccountTransactionConnection"];
export const isDietAccountTransactionConnection = (
  obj?: { __typename?: any } | null,
): obj is DietAccountTransactionConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietAccountTransactionConnection"');
  return DietAccountTransactionConnection_possibleTypes.includes(obj.__typename);
};

const DietAccountTransactionEdge_possibleTypes: string[] = ["DietAccountTransactionEdge"];
export const isDietAccountTransactionEdge = (obj?: { __typename?: any } | null): obj is DietAccountTransactionEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietAccountTransactionEdge"');
  return DietAccountTransactionEdge_possibleTypes.includes(obj.__typename);
};

const DietAccountTransactionType_possibleTypes: string[] = ["DietAccountTransactionType"];
export const isDietAccountTransactionType = (obj?: { __typename?: any } | null): obj is DietAccountTransactionType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietAccountTransactionType"');
  return DietAccountTransactionType_possibleTypes.includes(obj.__typename);
};

const DietConsumer_possibleTypes: string[] = ["DietConsumer"];
export const isDietConsumer = (obj?: { __typename?: any } | null): obj is DietConsumer => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietConsumer"');
  return DietConsumer_possibleTypes.includes(obj.__typename);
};

const DietConsumerConnection_possibleTypes: string[] = ["DietConsumerConnection"];
export const isDietConsumerConnection = (obj?: { __typename?: any } | null): obj is DietConsumerConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietConsumerConnection"');
  return DietConsumerConnection_possibleTypes.includes(obj.__typename);
};

const DietConsumerEdge_possibleTypes: string[] = ["DietConsumerEdge"];
export const isDietConsumerEdge = (obj?: { __typename?: any } | null): obj is DietConsumerEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietConsumerEdge"');
  return DietConsumerEdge_possibleTypes.includes(obj.__typename);
};

const DietFacility_possibleTypes: string[] = ["DietFacility"];
export const isDietFacility = (obj?: { __typename?: any } | null): obj is DietFacility => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietFacility"');
  return DietFacility_possibleTypes.includes(obj.__typename);
};

const DietFoodType_possibleTypes: string[] = ["DietFoodType"];
export const isDietFoodType = (obj?: { __typename?: any } | null): obj is DietFoodType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietFoodType"');
  return DietFoodType_possibleTypes.includes(obj.__typename);
};

const DietMenu_possibleTypes: string[] = ["DietMenu"];
export const isDietMenu = (obj?: { __typename?: any } | null): obj is DietMenu => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietMenu"');
  return DietMenu_possibleTypes.includes(obj.__typename);
};

const DietMenuConnection_possibleTypes: string[] = ["DietMenuConnection"];
export const isDietMenuConnection = (obj?: { __typename?: any } | null): obj is DietMenuConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietMenuConnection"');
  return DietMenuConnection_possibleTypes.includes(obj.__typename);
};

const DietMenuEdge_possibleTypes: string[] = ["DietMenuEdge"];
export const isDietMenuEdge = (obj?: { __typename?: any } | null): obj is DietMenuEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietMenuEdge"');
  return DietMenuEdge_possibleTypes.includes(obj.__typename);
};

const DietOrder_possibleTypes: string[] = ["DietOrder"];
export const isDietOrder = (obj?: { __typename?: any } | null): obj is DietOrder => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietOrder"');
  return DietOrder_possibleTypes.includes(obj.__typename);
};

const DietOrderConnection_possibleTypes: string[] = ["DietOrderConnection"];
export const isDietOrderConnection = (obj?: { __typename?: any } | null): obj is DietOrderConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietOrderConnection"');
  return DietOrderConnection_possibleTypes.includes(obj.__typename);
};

const DietOrderEdge_possibleTypes: string[] = ["DietOrderEdge"];
export const isDietOrderEdge = (obj?: { __typename?: any } | null): obj is DietOrderEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietOrderEdge"');
  return DietOrderEdge_possibleTypes.includes(obj.__typename);
};

const DietType_possibleTypes: string[] = ["DietType"];
export const isDietType = (obj?: { __typename?: any } | null): obj is DietType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietType"');
  return DietType_possibleTypes.includes(obj.__typename);
};

const DietTypeConnection_possibleTypes: string[] = ["DietTypeConnection"];
export const isDietTypeConnection = (obj?: { __typename?: any } | null): obj is DietTypeConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietTypeConnection"');
  return DietTypeConnection_possibleTypes.includes(obj.__typename);
};

const DietTypeEdge_possibleTypes: string[] = ["DietTypeEdge"];
export const isDietTypeEdge = (obj?: { __typename?: any } | null): obj is DietTypeEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietTypeEdge"');
  return DietTypeEdge_possibleTypes.includes(obj.__typename);
};

const DietWorker_possibleTypes: string[] = ["DietWorker"];
export const isDietWorker = (obj?: { __typename?: any } | null): obj is DietWorker => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDietWorker"');
  return DietWorker_possibleTypes.includes(obj.__typename);
};

const Doctor_possibleTypes: string[] = ["Doctor"];
export const isDoctor = (obj?: { __typename?: any } | null): obj is Doctor => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDoctor"');
  return Doctor_possibleTypes.includes(obj.__typename);
};

const DoctorConnection_possibleTypes: string[] = ["DoctorConnection"];
export const isDoctorConnection = (obj?: { __typename?: any } | null): obj is DoctorConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDoctorConnection"');
  return DoctorConnection_possibleTypes.includes(obj.__typename);
};

const DoctorEdge_possibleTypes: string[] = ["DoctorEdge"];
export const isDoctorEdge = (obj?: { __typename?: any } | null): obj is DoctorEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDoctorEdge"');
  return DoctorEdge_possibleTypes.includes(obj.__typename);
};

const Employee_possibleTypes: string[] = ["Employee"];
export const isEmployee = (obj?: { __typename?: any } | null): obj is Employee => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployee"');
  return Employee_possibleTypes.includes(obj.__typename);
};

const EmployeeAbsence_possibleTypes: string[] = ["EmployeeAbsence"];
export const isEmployeeAbsence = (obj?: { __typename?: any } | null): obj is EmployeeAbsence => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeAbsence"');
  return EmployeeAbsence_possibleTypes.includes(obj.__typename);
};

const EmployeeConnection_possibleTypes: string[] = ["EmployeeConnection"];
export const isEmployeeConnection = (obj?: { __typename?: any } | null): obj is EmployeeConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeConnection"');
  return EmployeeConnection_possibleTypes.includes(obj.__typename);
};

const EmployeeEdge_possibleTypes: string[] = ["EmployeeEdge"];
export const isEmployeeEdge = (obj?: { __typename?: any } | null): obj is EmployeeEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeEdge"');
  return EmployeeEdge_possibleTypes.includes(obj.__typename);
};

const EmployeeEducation_possibleTypes: string[] = ["EmployeeEducation"];
export const isEmployeeEducation = (obj?: { __typename?: any } | null): obj is EmployeeEducation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeEducation"');
  return EmployeeEducation_possibleTypes.includes(obj.__typename);
};

const EmployeeEducationKind_possibleTypes: string[] = ["EmployeeEducationKind"];
export const isEmployeeEducationKind = (obj?: { __typename?: any } | null): obj is EmployeeEducationKind => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeEducationKind"');
  return EmployeeEducationKind_possibleTypes.includes(obj.__typename);
};

const EmployeeFacilityCard_possibleTypes: string[] = ["EmployeeFacilityCard"];
export const isEmployeeFacilityCard = (obj?: { __typename?: any } | null): obj is EmployeeFacilityCard => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeFacilityCard"');
  return EmployeeFacilityCard_possibleTypes.includes(obj.__typename);
};

const EmployeeForm_possibleTypes: string[] = ["EmployeeForm"];
export const isEmployeeForm = (obj?: { __typename?: any } | null): obj is EmployeeForm => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeForm"');
  return EmployeeForm_possibleTypes.includes(obj.__typename);
};

const EmployeeFormPayload_possibleTypes: string[] = ["EmployeeFormPayload"];
export const isEmployeeFormPayload = (obj?: { __typename?: any } | null): obj is EmployeeFormPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeFormPayload"');
  return EmployeeFormPayload_possibleTypes.includes(obj.__typename);
};

const EmployeeImage_possibleTypes: string[] = ["EmployeeImage"];
export const isEmployeeImage = (obj?: { __typename?: any } | null): obj is EmployeeImage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeImage"');
  return EmployeeImage_possibleTypes.includes(obj.__typename);
};

const EmployeeUser_possibleTypes: string[] = ["EmployeeUser"];
export const isEmployeeUser = (obj?: { __typename?: any } | null): obj is EmployeeUser => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeUser"');
  return EmployeeUser_possibleTypes.includes(obj.__typename);
};

const EmployeeUserConnection_possibleTypes: string[] = ["EmployeeUserConnection"];
export const isEmployeeUserConnection = (obj?: { __typename?: any } | null): obj is EmployeeUserConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeUserConnection"');
  return EmployeeUserConnection_possibleTypes.includes(obj.__typename);
};

const EmployeeUserEdge_possibleTypes: string[] = ["EmployeeUserEdge"];
export const isEmployeeUserEdge = (obj?: { __typename?: any } | null): obj is EmployeeUserEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeUserEdge"');
  return EmployeeUserEdge_possibleTypes.includes(obj.__typename);
};

const EmployeeWorkContract_possibleTypes: string[] = ["EmployeeWorkContract"];
export const isEmployeeWorkContract = (obj?: { __typename?: any } | null): obj is EmployeeWorkContract => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmployeeWorkContract"');
  return EmployeeWorkContract_possibleTypes.includes(obj.__typename);
};

const EmploymentKind_possibleTypes: string[] = ["EmploymentKind"];
export const isEmploymentKind = (obj?: { __typename?: any } | null): obj is EmploymentKind => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEmploymentKind"');
  return EmploymentKind_possibleTypes.includes(obj.__typename);
};

const Examination_possibleTypes: string[] = ["Examination"];
export const isExamination = (obj?: { __typename?: any } | null): obj is Examination => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isExamination"');
  return Examination_possibleTypes.includes(obj.__typename);
};

const ExaminationConnection_possibleTypes: string[] = ["ExaminationConnection"];
export const isExaminationConnection = (obj?: { __typename?: any } | null): obj is ExaminationConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isExaminationConnection"');
  return ExaminationConnection_possibleTypes.includes(obj.__typename);
};

const ExaminationEdge_possibleTypes: string[] = ["ExaminationEdge"];
export const isExaminationEdge = (obj?: { __typename?: any } | null): obj is ExaminationEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isExaminationEdge"');
  return ExaminationEdge_possibleTypes.includes(obj.__typename);
};

const Facility_possibleTypes: string[] = ["Facility"];
export const isFacility = (obj?: { __typename?: any } | null): obj is Facility => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFacility"');
  return Facility_possibleTypes.includes(obj.__typename);
};

const Form_possibleTypes: string[] = ["Form"];
export const isForm = (obj?: { __typename?: any } | null): obj is Form => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isForm"');
  return Form_possibleTypes.includes(obj.__typename);
};

const FormConnection_possibleTypes: string[] = ["FormConnection"];
export const isFormConnection = (obj?: { __typename?: any } | null): obj is FormConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormConnection"');
  return FormConnection_possibleTypes.includes(obj.__typename);
};

const FormEdge_possibleTypes: string[] = ["FormEdge"];
export const isFormEdge = (obj?: { __typename?: any } | null): obj is FormEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormEdge"');
  return FormEdge_possibleTypes.includes(obj.__typename);
};

const FormFillSession_possibleTypes: string[] = ["FormFillSession"];
export const isFormFillSession = (obj?: { __typename?: any } | null): obj is FormFillSession => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormFillSession"');
  return FormFillSession_possibleTypes.includes(obj.__typename);
};

const FormFillSessionPayload_possibleTypes: string[] = ["FormFillSessionPayload"];
export const isFormFillSessionPayload = (obj?: { __typename?: any } | null): obj is FormFillSessionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormFillSessionPayload"');
  return FormFillSessionPayload_possibleTypes.includes(obj.__typename);
};

const FormPayload_possibleTypes: string[] = ["FormPayload"];
export const isFormPayload = (obj?: { __typename?: any } | null): obj is FormPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormPayload"');
  return FormPayload_possibleTypes.includes(obj.__typename);
};

const FormResultBind_possibleTypes: string[] = ["FormResultBind"];
export const isFormResultBind = (obj?: { __typename?: any } | null): obj is FormResultBind => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormResultBind"');
  return FormResultBind_possibleTypes.includes(obj.__typename);
};

const FormResultBindPayloadGql_possibleTypes: string[] = ["FormResultBindPayloadGql"];
export const isFormResultBindPayloadGql = (obj?: { __typename?: any } | null): obj is FormResultBindPayloadGql => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormResultBindPayloadGql"');
  return FormResultBindPayloadGql_possibleTypes.includes(obj.__typename);
};

const FormResultKind_possibleTypes: string[] = ["FormResultKind"];
export const isFormResultKind = (obj?: { __typename?: any } | null): obj is FormResultKind => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormResultKind"');
  return FormResultKind_possibleTypes.includes(obj.__typename);
};

const FormResultKindPayloadGql_possibleTypes: string[] = ["FormResultKindPayloadGql"];
export const isFormResultKindPayloadGql = (obj?: { __typename?: any } | null): obj is FormResultKindPayloadGql => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormResultKindPayloadGql"');
  return FormResultKindPayloadGql_possibleTypes.includes(obj.__typename);
};

const FormSubmission_possibleTypes: string[] = ["FormSubmission"];
export const isFormSubmission = (obj?: { __typename?: any } | null): obj is FormSubmission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormSubmission"');
  return FormSubmission_possibleTypes.includes(obj.__typename);
};

const FormSubmissionAttachment_possibleTypes: string[] = ["FormSubmissionAttachment"];
export const isFormSubmissionAttachment = (obj?: { __typename?: any } | null): obj is FormSubmissionAttachment => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormSubmissionAttachment"');
  return FormSubmissionAttachment_possibleTypes.includes(obj.__typename);
};

const FormSubmissionAttachmentPayload_possibleTypes: string[] = ["FormSubmissionAttachmentPayload"];
export const isFormSubmissionAttachmentPayload = (
  obj?: { __typename?: any } | null,
): obj is FormSubmissionAttachmentPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormSubmissionAttachmentPayload"');
  return FormSubmissionAttachmentPayload_possibleTypes.includes(obj.__typename);
};

const FormSubmissionConnection_possibleTypes: string[] = ["FormSubmissionConnection"];
export const isFormSubmissionConnection = (obj?: { __typename?: any } | null): obj is FormSubmissionConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormSubmissionConnection"');
  return FormSubmissionConnection_possibleTypes.includes(obj.__typename);
};

const FormSubmissionEdge_possibleTypes: string[] = ["FormSubmissionEdge"];
export const isFormSubmissionEdge = (obj?: { __typename?: any } | null): obj is FormSubmissionEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormSubmissionEdge"');
  return FormSubmissionEdge_possibleTypes.includes(obj.__typename);
};

const FormSubmissionPayload_possibleTypes: string[] = ["FormSubmissionPayload"];
export const isFormSubmissionPayload = (obj?: { __typename?: any } | null): obj is FormSubmissionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormSubmissionPayload"');
  return FormSubmissionPayload_possibleTypes.includes(obj.__typename);
};

const FormVersion_possibleTypes: string[] = ["FormVersion"];
export const isFormVersion = (obj?: { __typename?: any } | null): obj is FormVersion => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormVersion"');
  return FormVersion_possibleTypes.includes(obj.__typename);
};

const FormVersionPayload_possibleTypes: string[] = ["FormVersionPayload"];
export const isFormVersionPayload = (obj?: { __typename?: any } | null): obj is FormVersionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormVersionPayload"');
  return FormVersionPayload_possibleTypes.includes(obj.__typename);
};

const Location_possibleTypes: string[] = ["Location"];
export const isLocation = (obj?: { __typename?: any } | null): obj is Location => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLocation"');
  return Location_possibleTypes.includes(obj.__typename);
};

const Mutation_possibleTypes: string[] = ["Mutation"];
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"');
  return Mutation_possibleTypes.includes(obj.__typename);
};

const Organization_possibleTypes: string[] = ["Organization"];
export const isOrganization = (obj?: { __typename?: any } | null): obj is Organization => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOrganization"');
  return Organization_possibleTypes.includes(obj.__typename);
};

const OrganizationHierarchy_possibleTypes: string[] = ["OrganizationHierarchy"];
export const isOrganizationHierarchy = (obj?: { __typename?: any } | null): obj is OrganizationHierarchy => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationHierarchy"');
  return OrganizationHierarchy_possibleTypes.includes(obj.__typename);
};

const OrganizationHierarchyEmployee_possibleTypes: string[] = ["OrganizationHierarchyEmployee"];
export const isOrganizationHierarchyEmployee = (
  obj?: { __typename?: any } | null,
): obj is OrganizationHierarchyEmployee => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationHierarchyEmployee"');
  return OrganizationHierarchyEmployee_possibleTypes.includes(obj.__typename);
};

const OrganizationHierarchyEmployeeConnection_possibleTypes: string[] = ["OrganizationHierarchyEmployeeConnection"];
export const isOrganizationHierarchyEmployeeConnection = (
  obj?: { __typename?: any } | null,
): obj is OrganizationHierarchyEmployeeConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationHierarchyEmployeeConnection"');
  return OrganizationHierarchyEmployeeConnection_possibleTypes.includes(obj.__typename);
};

const OrganizationHierarchyEmployeeEdge_possibleTypes: string[] = ["OrganizationHierarchyEmployeeEdge"];
export const isOrganizationHierarchyEmployeeEdge = (
  obj?: { __typename?: any } | null,
): obj is OrganizationHierarchyEmployeeEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationHierarchyEmployeeEdge"');
  return OrganizationHierarchyEmployeeEdge_possibleTypes.includes(obj.__typename);
};

const PageInfo_possibleTypes: string[] = ["PageInfo"];
export const isPageInfo = (obj?: { __typename?: any } | null): obj is PageInfo => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPageInfo"');
  return PageInfo_possibleTypes.includes(obj.__typename);
};

const Patient_possibleTypes: string[] = ["Patient"];
export const isPatient = (obj?: { __typename?: any } | null): obj is Patient => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatient"');
  return Patient_possibleTypes.includes(obj.__typename);
};

const PatientConnection_possibleTypes: string[] = ["PatientConnection"];
export const isPatientConnection = (obj?: { __typename?: any } | null): obj is PatientConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientConnection"');
  return PatientConnection_possibleTypes.includes(obj.__typename);
};

const PatientDisability_possibleTypes: string[] = ["PatientDisability"];
export const isPatientDisability = (obj?: { __typename?: any } | null): obj is PatientDisability => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientDisability"');
  return PatientDisability_possibleTypes.includes(obj.__typename);
};

const PatientEdge_possibleTypes: string[] = ["PatientEdge"];
export const isPatientEdge = (obj?: { __typename?: any } | null): obj is PatientEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientEdge"');
  return PatientEdge_possibleTypes.includes(obj.__typename);
};

const PatientFamilyMember_possibleTypes: string[] = ["PatientFamilyMember"];
export const isPatientFamilyMember = (obj?: { __typename?: any } | null): obj is PatientFamilyMember => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientFamilyMember"');
  return PatientFamilyMember_possibleTypes.includes(obj.__typename);
};

const PatientFamilyMemberPayload_possibleTypes: string[] = ["PatientFamilyMemberPayload"];
export const isPatientFamilyMemberPayload = (obj?: { __typename?: any } | null): obj is PatientFamilyMemberPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientFamilyMemberPayload"');
  return PatientFamilyMemberPayload_possibleTypes.includes(obj.__typename);
};

const PatientImageGql_possibleTypes: string[] = ["PatientImageGql"];
export const isPatientImageGql = (obj?: { __typename?: any } | null): obj is PatientImageGql => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientImageGql"');
  return PatientImageGql_possibleTypes.includes(obj.__typename);
};

const PatientImagePayload_possibleTypes: string[] = ["PatientImagePayload"];
export const isPatientImagePayload = (obj?: { __typename?: any } | null): obj is PatientImagePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientImagePayload"');
  return PatientImagePayload_possibleTypes.includes(obj.__typename);
};

const PatientPostAddress_possibleTypes: string[] = ["PatientPostAddress"];
export const isPatientPostAddress = (obj?: { __typename?: any } | null): obj is PatientPostAddress => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPatientPostAddress"');
  return PatientPostAddress_possibleTypes.includes(obj.__typename);
};

const Query_possibleTypes: string[] = ["Query"];
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"');
  return Query_possibleTypes.includes(obj.__typename);
};

const Room_possibleTypes: string[] = ["Room"];
export const isRoom = (obj?: { __typename?: any } | null): obj is Room => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRoom"');
  return Room_possibleTypes.includes(obj.__typename);
};

const RoomConnection_possibleTypes: string[] = ["RoomConnection"];
export const isRoomConnection = (obj?: { __typename?: any } | null): obj is RoomConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRoomConnection"');
  return RoomConnection_possibleTypes.includes(obj.__typename);
};

const RoomEdge_possibleTypes: string[] = ["RoomEdge"];
export const isRoomEdge = (obj?: { __typename?: any } | null): obj is RoomEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRoomEdge"');
  return RoomEdge_possibleTypes.includes(obj.__typename);
};

const SalusPatientProfile_possibleTypes: string[] = ["SalusPatientProfile"];
export const isSalusPatientProfile = (obj?: { __typename?: any } | null): obj is SalusPatientProfile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusPatientProfile"');
  return SalusPatientProfile_possibleTypes.includes(obj.__typename);
};

const SalusPatientProfileConnection_possibleTypes: string[] = ["SalusPatientProfileConnection"];
export const isSalusPatientProfileConnection = (
  obj?: { __typename?: any } | null,
): obj is SalusPatientProfileConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusPatientProfileConnection"');
  return SalusPatientProfileConnection_possibleTypes.includes(obj.__typename);
};

const SalusPatientProfileEdge_possibleTypes: string[] = ["SalusPatientProfileEdge"];
export const isSalusPatientProfileEdge = (obj?: { __typename?: any } | null): obj is SalusPatientProfileEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusPatientProfileEdge"');
  return SalusPatientProfileEdge_possibleTypes.includes(obj.__typename);
};

const SalusPatientProfilePayload_possibleTypes: string[] = ["SalusPatientProfilePayload"];
export const isSalusPatientProfilePayload = (obj?: { __typename?: any } | null): obj is SalusPatientProfilePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusPatientProfilePayload"');
  return SalusPatientProfilePayload_possibleTypes.includes(obj.__typename);
};

const SalusPatientSession_possibleTypes: string[] = ["SalusPatientSession"];
export const isSalusPatientSession = (obj?: { __typename?: any } | null): obj is SalusPatientSession => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusPatientSession"');
  return SalusPatientSession_possibleTypes.includes(obj.__typename);
};

const SalusPatientSessionPayload_possibleTypes: string[] = ["SalusPatientSessionPayload"];
export const isSalusPatientSessionPayload = (obj?: { __typename?: any } | null): obj is SalusPatientSessionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusPatientSessionPayload"');
  return SalusPatientSessionPayload_possibleTypes.includes(obj.__typename);
};

const SalusVerificationToken_possibleTypes: string[] = ["SalusVerificationToken"];
export const isSalusVerificationToken = (obj?: { __typename?: any } | null): obj is SalusVerificationToken => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusVerificationToken"');
  return SalusVerificationToken_possibleTypes.includes(obj.__typename);
};

const SalusVerificationTokenPayload_possibleTypes: string[] = ["SalusVerificationTokenPayload"];
export const isSalusVerificationTokenPayload = (
  obj?: { __typename?: any } | null,
): obj is SalusVerificationTokenPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSalusVerificationTokenPayload"');
  return SalusVerificationTokenPayload_possibleTypes.includes(obj.__typename);
};

const ScheduledSurgery_possibleTypes: string[] = ["ScheduledSurgery"];
export const isScheduledSurgery = (obj?: { __typename?: any } | null): obj is ScheduledSurgery => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isScheduledSurgery"');
  return ScheduledSurgery_possibleTypes.includes(obj.__typename);
};

const ScheduledSurgeryConnection_possibleTypes: string[] = ["ScheduledSurgeryConnection"];
export const isScheduledSurgeryConnection = (obj?: { __typename?: any } | null): obj is ScheduledSurgeryConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isScheduledSurgeryConnection"');
  return ScheduledSurgeryConnection_possibleTypes.includes(obj.__typename);
};

const ScheduledSurgeryEdge_possibleTypes: string[] = ["ScheduledSurgeryEdge"];
export const isScheduledSurgeryEdge = (obj?: { __typename?: any } | null): obj is ScheduledSurgeryEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isScheduledSurgeryEdge"');
  return ScheduledSurgeryEdge_possibleTypes.includes(obj.__typename);
};

const ShiftKind_possibleTypes: string[] = ["ShiftKind"];
export const isShiftKind = (obj?: { __typename?: any } | null): obj is ShiftKind => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isShiftKind"');
  return ShiftKind_possibleTypes.includes(obj.__typename);
};

const SironaEmployeeProfile_possibleTypes: string[] = ["SironaEmployeeProfile"];
export const isSironaEmployeeProfile = (obj?: { __typename?: any } | null): obj is SironaEmployeeProfile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaEmployeeProfile"');
  return SironaEmployeeProfile_possibleTypes.includes(obj.__typename);
};

const SironaEmployeeProfileGrant_possibleTypes: string[] = ["SironaEmployeeProfileGrant"];
export const isSironaEmployeeProfileGrant = (obj?: { __typename?: any } | null): obj is SironaEmployeeProfileGrant => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaEmployeeProfileGrant"');
  return SironaEmployeeProfileGrant_possibleTypes.includes(obj.__typename);
};

const SironaEmployeeProfileGrantPayload_possibleTypes: string[] = ["SironaEmployeeProfileGrantPayload"];
export const isSironaEmployeeProfileGrantPayload = (
  obj?: { __typename?: any } | null,
): obj is SironaEmployeeProfileGrantPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaEmployeeProfileGrantPayload"');
  return SironaEmployeeProfileGrantPayload_possibleTypes.includes(obj.__typename);
};

const SironaEmployeeProfilePayload_possibleTypes: string[] = ["SironaEmployeeProfilePayload"];
export const isSironaEmployeeProfilePayload = (
  obj?: { __typename?: any } | null,
): obj is SironaEmployeeProfilePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaEmployeeProfilePayload"');
  return SironaEmployeeProfilePayload_possibleTypes.includes(obj.__typename);
};

const SironaPermission_possibleTypes: string[] = ["SironaPermission"];
export const isSironaPermission = (obj?: { __typename?: any } | null): obj is SironaPermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaPermission"');
  return SironaPermission_possibleTypes.includes(obj.__typename);
};

const SironaPermissionPayload_possibleTypes: string[] = ["SironaPermissionPayload"];
export const isSironaPermissionPayload = (obj?: { __typename?: any } | null): obj is SironaPermissionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaPermissionPayload"');
  return SironaPermissionPayload_possibleTypes.includes(obj.__typename);
};

const SironaRole_possibleTypes: string[] = ["SironaRole"];
export const isSironaRole = (obj?: { __typename?: any } | null): obj is SironaRole => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaRole"');
  return SironaRole_possibleTypes.includes(obj.__typename);
};

const SironaRolePayload_possibleTypes: string[] = ["SironaRolePayload"];
export const isSironaRolePayload = (obj?: { __typename?: any } | null): obj is SironaRolePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSironaRolePayload"');
  return SironaRolePayload_possibleTypes.includes(obj.__typename);
};

const Slot_possibleTypes: string[] = ["Slot"];
export const isSlot = (obj?: { __typename?: any } | null): obj is Slot => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSlot"');
  return Slot_possibleTypes.includes(obj.__typename);
};

const SlotConnection_possibleTypes: string[] = ["SlotConnection"];
export const isSlotConnection = (obj?: { __typename?: any } | null): obj is SlotConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSlotConnection"');
  return SlotConnection_possibleTypes.includes(obj.__typename);
};

const SlotEdge_possibleTypes: string[] = ["SlotEdge"];
export const isSlotEdge = (obj?: { __typename?: any } | null): obj is SlotEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSlotEdge"');
  return SlotEdge_possibleTypes.includes(obj.__typename);
};

const SmenovkaEmployeeProfile_possibleTypes: string[] = ["SmenovkaEmployeeProfile"];
export const isSmenovkaEmployeeProfile = (obj?: { __typename?: any } | null): obj is SmenovkaEmployeeProfile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaEmployeeProfile"');
  return SmenovkaEmployeeProfile_possibleTypes.includes(obj.__typename);
};

const SmenovkaEmployeeProfileGrant_possibleTypes: string[] = ["SmenovkaEmployeeProfileGrant"];
export const isSmenovkaEmployeeProfileGrant = (
  obj?: { __typename?: any } | null,
): obj is SmenovkaEmployeeProfileGrant => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaEmployeeProfileGrant"');
  return SmenovkaEmployeeProfileGrant_possibleTypes.includes(obj.__typename);
};

const SmenovkaEmployeeProfileGrantPayload_possibleTypes: string[] = ["SmenovkaEmployeeProfileGrantPayload"];
export const isSmenovkaEmployeeProfileGrantPayload = (
  obj?: { __typename?: any } | null,
): obj is SmenovkaEmployeeProfileGrantPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaEmployeeProfileGrantPayload"');
  return SmenovkaEmployeeProfileGrantPayload_possibleTypes.includes(obj.__typename);
};

const SmenovkaEmployeeProfilePayload_possibleTypes: string[] = ["SmenovkaEmployeeProfilePayload"];
export const isSmenovkaEmployeeProfilePayload = (
  obj?: { __typename?: any } | null,
): obj is SmenovkaEmployeeProfilePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaEmployeeProfilePayload"');
  return SmenovkaEmployeeProfilePayload_possibleTypes.includes(obj.__typename);
};

const SmenovkaPermission_possibleTypes: string[] = ["SmenovkaPermission"];
export const isSmenovkaPermission = (obj?: { __typename?: any } | null): obj is SmenovkaPermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaPermission"');
  return SmenovkaPermission_possibleTypes.includes(obj.__typename);
};

const SmenovkaPermissionPayload_possibleTypes: string[] = ["SmenovkaPermissionPayload"];
export const isSmenovkaPermissionPayload = (obj?: { __typename?: any } | null): obj is SmenovkaPermissionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaPermissionPayload"');
  return SmenovkaPermissionPayload_possibleTypes.includes(obj.__typename);
};

const SmenovkaRole_possibleTypes: string[] = ["SmenovkaRole"];
export const isSmenovkaRole = (obj?: { __typename?: any } | null): obj is SmenovkaRole => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaRole"');
  return SmenovkaRole_possibleTypes.includes(obj.__typename);
};

const SmenovkaRolePayload_possibleTypes: string[] = ["SmenovkaRolePayload"];
export const isSmenovkaRolePayload = (obj?: { __typename?: any } | null): obj is SmenovkaRolePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSmenovkaRolePayload"');
  return SmenovkaRolePayload_possibleTypes.includes(obj.__typename);
};

const Systemization_possibleTypes: string[] = ["Systemization"];
export const isSystemization = (obj?: { __typename?: any } | null): obj is Systemization => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSystemization"');
  return Systemization_possibleTypes.includes(obj.__typename);
};

const SystemizationPosition_possibleTypes: string[] = ["SystemizationPosition"];
export const isSystemizationPosition = (obj?: { __typename?: any } | null): obj is SystemizationPosition => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSystemizationPosition"');
  return SystemizationPosition_possibleTypes.includes(obj.__typename);
};

const TabsyEmployeeProfile_possibleTypes: string[] = ["TabsyEmployeeProfile"];
export const isTabsyEmployeeProfile = (obj?: { __typename?: any } | null): obj is TabsyEmployeeProfile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTabsyEmployeeProfile"');
  return TabsyEmployeeProfile_possibleTypes.includes(obj.__typename);
};

const TabsyEmployeeProfilePayload_possibleTypes: string[] = ["TabsyEmployeeProfilePayload"];
export const isTabsyEmployeeProfilePayload = (
  obj?: { __typename?: any } | null,
): obj is TabsyEmployeeProfilePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTabsyEmployeeProfilePayload"');
  return TabsyEmployeeProfilePayload_possibleTypes.includes(obj.__typename);
};

const UpsertFormsFromJsonPayload_possibleTypes: string[] = ["UpsertFormsFromJsonPayload"];
export const isUpsertFormsFromJsonPayload = (obj?: { __typename?: any } | null): obj is UpsertFormsFromJsonPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUpsertFormsFromJsonPayload"');
  return UpsertFormsFromJsonPayload_possibleTypes.includes(obj.__typename);
};

const UpsertSironaPermissionsFromJsonPayload_possibleTypes: string[] = ["UpsertSironaPermissionsFromJsonPayload"];
export const isUpsertSironaPermissionsFromJsonPayload = (
  obj?: { __typename?: any } | null,
): obj is UpsertSironaPermissionsFromJsonPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUpsertSironaPermissionsFromJsonPayload"');
  return UpsertSironaPermissionsFromJsonPayload_possibleTypes.includes(obj.__typename);
};

const UpsertSironaRolesFromJsonPayload_possibleTypes: string[] = ["UpsertSironaRolesFromJsonPayload"];
export const isUpsertSironaRolesFromJsonPayload = (
  obj?: { __typename?: any } | null,
): obj is UpsertSironaRolesFromJsonPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUpsertSironaRolesFromJsonPayload"');
  return UpsertSironaRolesFromJsonPayload_possibleTypes.includes(obj.__typename);
};

const WorkContractKind_possibleTypes: string[] = ["WorkContractKind"];
export const isWorkContractKind = (obj?: { __typename?: any } | null): obj is WorkContractKind => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWorkContractKind"');
  return WorkContractKind_possibleTypes.includes(obj.__typename);
};

const Workplace_possibleTypes: string[] = ["Workplace"];
export const isWorkplace = (obj?: { __typename?: any } | null): obj is Workplace => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWorkplace"');
  return Workplace_possibleTypes.includes(obj.__typename);
};

const WorkplaceConnection_possibleTypes: string[] = ["WorkplaceConnection"];
export const isWorkplaceConnection = (obj?: { __typename?: any } | null): obj is WorkplaceConnection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWorkplaceConnection"');
  return WorkplaceConnection_possibleTypes.includes(obj.__typename);
};

const WorkplaceEdge_possibleTypes: string[] = ["WorkplaceEdge"];
export const isWorkplaceEdge = (obj?: { __typename?: any } | null): obj is WorkplaceEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWorkplaceEdge"');
  return WorkplaceEdge_possibleTypes.includes(obj.__typename);
};

const ZapkaEmployeeProfile_possibleTypes: string[] = ["ZapkaEmployeeProfile"];
export const isZapkaEmployeeProfile = (obj?: { __typename?: any } | null): obj is ZapkaEmployeeProfile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaEmployeeProfile"');
  return ZapkaEmployeeProfile_possibleTypes.includes(obj.__typename);
};

const ZapkaEmployeeProfileGrant_possibleTypes: string[] = ["ZapkaEmployeeProfileGrant"];
export const isZapkaEmployeeProfileGrant = (obj?: { __typename?: any } | null): obj is ZapkaEmployeeProfileGrant => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaEmployeeProfileGrant"');
  return ZapkaEmployeeProfileGrant_possibleTypes.includes(obj.__typename);
};

const ZapkaEmployeeProfileGrantPayload_possibleTypes: string[] = ["ZapkaEmployeeProfileGrantPayload"];
export const isZapkaEmployeeProfileGrantPayload = (
  obj?: { __typename?: any } | null,
): obj is ZapkaEmployeeProfileGrantPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaEmployeeProfileGrantPayload"');
  return ZapkaEmployeeProfileGrantPayload_possibleTypes.includes(obj.__typename);
};

const ZapkaEmployeeProfilePayload_possibleTypes: string[] = ["ZapkaEmployeeProfilePayload"];
export const isZapkaEmployeeProfilePayload = (
  obj?: { __typename?: any } | null,
): obj is ZapkaEmployeeProfilePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaEmployeeProfilePayload"');
  return ZapkaEmployeeProfilePayload_possibleTypes.includes(obj.__typename);
};

const ZapkaPermission_possibleTypes: string[] = ["ZapkaPermission"];
export const isZapkaPermission = (obj?: { __typename?: any } | null): obj is ZapkaPermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaPermission"');
  return ZapkaPermission_possibleTypes.includes(obj.__typename);
};

const ZapkaPermissionPayload_possibleTypes: string[] = ["ZapkaPermissionPayload"];
export const isZapkaPermissionPayload = (obj?: { __typename?: any } | null): obj is ZapkaPermissionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaPermissionPayload"');
  return ZapkaPermissionPayload_possibleTypes.includes(obj.__typename);
};

const ZapkaRole_possibleTypes: string[] = ["ZapkaRole"];
export const isZapkaRole = (obj?: { __typename?: any } | null): obj is ZapkaRole => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaRole"');
  return ZapkaRole_possibleTypes.includes(obj.__typename);
};

const ZapkaRolePayload_possibleTypes: string[] = ["ZapkaRolePayload"];
export const isZapkaRolePayload = (obj?: { __typename?: any } | null): obj is ZapkaRolePayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isZapkaRolePayload"');
  return ZapkaRolePayload_possibleTypes.includes(obj.__typename);
};

export const enumAbsenceTypeGql = {
  D: "D" as const,
  H: "H" as const,
  I: "I" as const,
  L: "L" as const,
  N: "N" as const,
  O: "O" as const,
  OTHER: "OTHER" as const,
  V: "V" as const,
};

export const enumBuildingConnectionSortByField = {
  NAME: "NAME" as const,
};

export const enumCmsPublicationStatus = {
  DRAFT: "DRAFT" as const,
  PUBLISHED: "PUBLISHED" as const,
};

export const enumDietAccountConnectionSortByField = {
  ID: "ID" as const,
};

export const enumDietAccountTransactionConnectionSortByField = {
  ID: "ID" as const,
  TRANSACTION_DATE: "TRANSACTION_DATE" as const,
};

export const enumDietConsumerConnectionSortByField = {
  ID: "ID" as const,
};

export const enumDietMenuConnectionSortByField = {
  ID: "ID" as const,
};

export const enumDietOrderConnectionSortByField = {
  ID: "ID" as const,
  ORDER_DATE: "ORDER_DATE" as const,
};

export const enumDietTypeConnectionSortByField = {
  CODE: "CODE" as const,
  ID: "ID" as const,
  NAME: "NAME" as const,
};

export const enumDoctorConnectionSortByField = {
  NAME: "NAME" as const,
};

export const enumEmployeeConnectionSortByField = {
  FULL_NAME: "FULL_NAME" as const,
  ID: "ID" as const,
};

export const enumEmployeeEducationKindTarget = {
  CERTIFICATES: "CERTIFICATES" as const,
  FUNCTIONAL_LICENSE: "FUNCTIONAL_LICENSE" as const,
  LICENSES: "LICENSES" as const,
  SPECIALISATION_DOCTORS: "SPECIALISATION_DOCTORS" as const,
  SPECIALISATION_NLZP: "SPECIALISATION_NLZP" as const,
  STRAIN: "STRAIN" as const,
};

export const enumEmployeeImageSize = {
  LARGE: "LARGE" as const,
  MEDIUM: "MEDIUM" as const,
  THUMB: "THUMB" as const,
};

export const enumEmployeeUserConnectionSortByField = {
  DOMAIN_NAME: "DOMAIN_NAME" as const,
  FULL_NAME: "FULL_NAME" as const,
  ID: "ID" as const,
};

export const enumEnumCmsIntranetlinkType = {
  aplikace: "aplikace" as const,
  interni: "interni" as const,
  externi: "externi" as const,
};

export const enumExaminationConnectionSortByField = {
  NAME: "NAME" as const,
};

export const enumFormConnectionSortByField = {
  CODE: "CODE" as const,
  ID: "ID" as const,
  NAME: "NAME" as const,
  TITLE: "TITLE" as const,
};

export const enumFormConsumer = {
  PATIENT: "PATIENT" as const,
  STAFF: "STAFF" as const,
};

export const enumFormKind = {
  CONSENT: "CONSENT" as const,
  QUESTIONNAIRE: "QUESTIONNAIRE" as const,
};

export const enumFormSubmissionConnectionSortByField = {
  COMPLETED_AT: "COMPLETED_AT" as const,
  CREATED_AT: "CREATED_AT" as const,
  ID: "ID" as const,
};

export const enumOrganizationHierarchyEmployeeConnectionSortByField = {
  FULL_NAME: "FULL_NAME" as const,
  ID: "ID" as const,
};

export const enumPatientConnectionSortByField = {
  FULL_NAME: "FULL_NAME" as const,
  ID: "ID" as const,
};

export const enumPatientImageSize = {
  LARGE: "LARGE" as const,
  MEDIUM: "MEDIUM" as const,
  THUMB: "THUMB" as const,
};

export const enumPatientSex = {
  FEMALE: "FEMALE" as const,
  MALE: "MALE" as const,
  UNSPECIFIED: "UNSPECIFIED" as const,
};

export const enumRoomConnectionSortByField = {
  NUMBER: "NUMBER" as const,
};

export const enumSalusPatientProfileConnectionSortByField = {
  NAME: "NAME" as const,
};

export const enumScheduledSurgeryConnectionSortByField = {
  SURGERY_DATE: "SURGERY_DATE" as const,
};

export const enumSlotConnectionSortByField = {
  DATE_FROM: "DATE_FROM" as const,
};

export const enumSortDirection = {
  ASC: "ASC" as const,
  DESC: "DESC" as const,
};

export const enumSystemizationPositionCategory = {
  ADMINISTRATIVE: "ADMINISTRATIVE" as const,
  DOCTORS: "DOCTORS" as const,
  NZP: "NZP" as const,
  OTHER: "OTHER" as const,
  RADIOLOGY_ASSISTANT: "RADIOLOGY_ASSISTANT" as const,
  SZP: "SZP" as const,
};

export const enumWorkContractKindType = {
  DPC: "DPC" as const,
  DPP: "DPP" as const,
  HPP: "HPP" as const,
  ICO: "ICO" as const,
  OTHER: "OTHER" as const,
};

export const enumWorkplaceConnectionSortByField = {
  NAME: "NAME" as const,
};

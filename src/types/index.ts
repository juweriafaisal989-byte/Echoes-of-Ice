export type Region = 'Arctic' | 'Antarctic';

export type ApprovalStatus = 'draft' | 'in-review' | 'approved' | 'published' | 'rejected';

export interface Researcher {
  id: string;
  name: string;
  designation: string;
  institution: string;
  specialization: string;
  biography: string;
  photoSeed: string;
  expeditionIds: string[];
  publicationIds: string[];
  datasetIds: string[];
  researchAreas: string[];
}

export interface LocationSite {
  id: string;
  name: string;
  type: 'Research Station' | 'Expedition Site' | 'Observation Site' | 'Geographic Feature';
  region: Region;
  lat: number;
  lng: number;
  description: string;
  expeditionId?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  publicationDate: string;
  doi: string;
  researchArea: string;
  region: Region;
  expeditionId?: string;
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  datasetType: string;
  researchArea: string;
  source: string;
  expeditionId?: string;
  fileFormat: string;
  fileSizeMb: number;
  license: string;
  date: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'Photo' | 'Video' | 'Audio' | 'Infographic';
  region: Region;
  expeditionId?: string;
  locationId?: string;
  year: number;
  colorSeed: string;
  caption: string;
}

export interface Expedition {
  id: string;
  title: string;
  description: string;
  region: Region;
  startDate: string;
  endDate: string;
  status: 'Planned' | 'Active' | 'Completed';
  researchObjectives: string[];
  researcherIds: string[];
  institution: string;
  locationId: string;
  findings: string[];
  publicationIds: string[];
  datasetIds: string[];
  mediaIds: string[];
  researchArea: string;
}

export interface OutreachContent {
  id: string;
  title: string;
  contentType:
    | 'Website Article'
    | 'Social Media Post'
    | 'Student-Friendly Explanation'
    | 'Newsletter'
    | '60-Second Video Script';
  sourceExpeditionId: string;
  status: ApprovalStatus;
  body: string;
  createdAt: string;
  author: string;
}

export interface ChatSource {
  label: string;
  type: 'Expedition' | 'Publication' | 'Dataset' | 'Report';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
}

export interface SearchResult {
  id: string;
  type: 'Expedition' | 'Publication' | 'Dataset' | 'Media' | 'Researcher' | 'Location';
  title: string;
  subtitle: string;
  path: string;
}

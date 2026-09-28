import type {
  Expedition,
  Publication,
  Dataset,
  MediaItem,
  Researcher,
  LocationSite,
  OutreachContent,
} from '../types';

// ---------------------------------------------------------------------------
// All data on this page is DEMO DATA generated for the PolarVerse hackathon
// prototype. Nothing here represents real expeditions, publications, or
// people. See README.md for how to connect a real data source.
// ---------------------------------------------------------------------------

const institutions = [
  'National Centre for Polar and Ocean Research',
  'Indian Institute of Tropical Meteorology',
  'Norwegian Polar Institute',
  'British Antarctic Survey',
  'Alfred Wegener Institute',
  'Australian Antarctic Division',
];

const researchAreas = [
  'Sea Ice Dynamics',
  'Glaciology',
  'Polar Microbiology',
  'Atmospheric Science',
  'Physical Oceanography',
  'Paleoclimatology',
  'Polar Ecology',
  'Remote Sensing',
];

export const researchers: Researcher[] = [
  {
    id: 'r1',
    name: 'Dr. Ananya Rao',
    designation: 'Principal Scientist',
    institution: institutions[0],
    specialization: 'Sea Ice Dynamics',
    biography:
      'Dr. Rao has led six polar field seasons studying how coastal sea ice responds to ocean warming. Her work links satellite observations with in-situ ice-core sampling.',
    photoSeed: 'ananya-rao',
    expeditionIds: ['e1', 'e5'],
    publicationIds: ['p1', 'p4'],
    datasetIds: ['d1'],
    researchAreas: ['Sea Ice Dynamics', 'Remote Sensing'],
  },
  {
    id: 'r2',
    name: 'Dr. Sana Thomas',
    designation: 'Senior Glaciologist',
    institution: institutions[3],
    specialization: 'Glaciology',
    biography:
      'Dr. Thomas studies ice-sheet mass balance across Antarctica and Greenland, combining airborne radar surveys with ground-penetrating instruments.',
    photoSeed: 'sana-thomas',
    expeditionIds: ['e1', 'e3'],
    publicationIds: ['p2'],
    datasetIds: ['d2'],
    researchAreas: ['Glaciology'],
  },
  {
    id: 'r3',
    name: 'Dr. Karan Mehta',
    designation: 'Research Fellow',
    institution: institutions[1],
    specialization: 'Polar Microbiology',
    biography:
      'Dr. Mehta investigates microbial communities living in coastal Antarctic sediments and their role in carbon cycling.',
    photoSeed: 'karan-mehta',
    expeditionIds: ['e1'],
    publicationIds: ['p3'],
    datasetIds: [],
    researchAreas: ['Polar Microbiology', 'Polar Ecology'],
  },
  {
    id: 'r4',
    name: 'Dr. Ingrid Solberg',
    designation: 'Professor of Oceanography',
    institution: institutions[2],
    specialization: 'Physical Oceanography',
    biography:
      'Professor Solberg leads long-term mooring programs across the Fram Strait, tracking heat transport into the Arctic basin.',
    photoSeed: 'ingrid-solberg',
    expeditionIds: ['e2'],
    publicationIds: ['p5', 'p6'],
    datasetIds: ['d3'],
    researchAreas: ['Physical Oceanography'],
  },
  {
    id: 'r5',
    name: 'Dr. Liu Wei',
    designation: 'Atmospheric Scientist',
    institution: institutions[4],
    specialization: 'Atmospheric Science',
    biography:
      'Dr. Liu studies aerosol transport and cloud formation over the Southern Ocean using balloon-borne instruments.',
    photoSeed: 'liu-wei',
    expeditionIds: ['e4'],
    publicationIds: ['p7'],
    datasetIds: ['d4'],
    researchAreas: ['Atmospheric Science'],
  },
  {
    id: 'r6',
    name: 'Dr. Priya Nair',
    designation: 'Research Scientist',
    institution: institutions[0],
    specialization: 'Paleoclimatology',
    biography:
      'Dr. Nair reconstructs past climate variability from ice cores drilled across the East Antarctic plateau.',
    photoSeed: 'priya-nair',
    expeditionIds: ['e3'],
    publicationIds: ['p8'],
    datasetIds: [],
    researchAreas: ['Paleoclimatology'],
  },
  {
    id: 'r7',
    name: 'Dr. Erik Lindqvist',
    designation: 'Marine Ecologist',
    institution: institutions[5],
    specialization: 'Polar Ecology',
    biography:
      'Dr. Lindqvist studies krill population dynamics and their sensitivity to sea-ice seasonality in the Southern Ocean.',
    photoSeed: 'erik-lindqvist',
    expeditionIds: ['e4'],
    publicationIds: ['p9'],
    datasetIds: [],
    researchAreas: ['Polar Ecology'],
  },
  {
    id: 'r8',
    name: 'Dr. Meera Iyer',
    designation: 'Remote Sensing Specialist',
    institution: institutions[1],
    specialization: 'Remote Sensing',
    biography:
      'Dr. Iyer builds satellite-derived products for tracking ice-shelf calving events across the Antarctic coastline.',
    photoSeed: 'meera-iyer',
    expeditionIds: ['e5'],
    publicationIds: ['p10'],
    datasetIds: ['d5'],
    researchAreas: ['Remote Sensing'],
  },
  {
    id: 'r9',
    name: 'Dr. Henrik Aas',
    designation: 'Postdoctoral Researcher',
    institution: institutions[2],
    specialization: 'Sea Ice Dynamics',
    biography:
      'Dr. Aas focuses on modelling landfast ice break-up events near Arctic research stations.',
    photoSeed: 'henrik-aas',
    expeditionIds: ['e2'],
    publicationIds: ['p11'],
    datasetIds: [],
    researchAreas: ['Sea Ice Dynamics'],
  },
  {
    id: 'r10',
    name: 'Dr. Fatima Sheikh',
    designation: 'Junior Research Fellow',
    institution: institutions[0],
    specialization: 'Polar Microbiology',
    biography:
      'Dr. Sheikh studies extremophile organisms recovered from subglacial lake samples.',
    photoSeed: 'fatima-sheikh',
    expeditionIds: [],
    publicationIds: ['p12'],
    datasetIds: [],
    researchAreas: ['Polar Microbiology'],
  },
];

export const locations: LocationSite[] = [
  {
    id: 'l1',
    name: 'Bharati Coastal Research Camp',
    type: 'Research Station',
    region: 'Antarctic',
    lat: -69.4,
    lng: 76.2,
    description: 'A seasonal coastal camp used for sea-ice and sediment sampling near the Larsemann Hills.',
    expeditionId: 'e1',
  },
  {
    id: 'l2',
    name: 'Fram Strait Mooring Line',
    type: 'Observation Site',
    region: 'Arctic',
    lat: 79.0,
    lng: 4.0,
    description: 'A chain of subsurface moorings tracking heat and freshwater flux into the Arctic.',
    expeditionId: 'e2',
  },
  {
  id: 'l3',
  name: 'Greenland Ice Sheet Survey Site',
  type: 'Expedition Site',
  region: 'Arctic',
  lat: 72.5,
  lng: -40.0,
  description: 'A field site used for ice-sheet thickness measurements, radar surveys, and firn-core sampling.',
  expeditionId: 'e3',
},
  {
    id: 'l4',
    name: 'Southern Ocean Transect Line',
    type: 'Observation Site',
    region: 'Antarctic',
    lat: -58.0,
    lng: -40.0,
    description: 'A repeated ship-based transect used for atmospheric and ecological sampling.',
    expeditionId: 'e4',
  },
  {
    id: 'l5',
    name: 'Larsemann Hills Ice Shelf Margin',
    type: 'Geographic Feature',
    region: 'Antarctic',
    lat: -69.3,
    lng: 76.5,
    description: 'A retreating ice-shelf margin monitored for calving and surface melt.',
    expeditionId: 'e5',
  },
  {
    id: 'l6',
    name: 'Ny-Ålesund Research Station',
    type: 'Research Station',
    region: 'Arctic',
    lat: 78.9,
    lng: 11.9,
    description: 'A multinational Arctic research settlement supporting atmospheric and glaciological studies.',
  },
  {
    id: 'l7',
    name: 'Amundsen Sea Polynya',
    type: 'Geographic Feature',
    region: 'Antarctic',
    lat: -73.0,
    lng: -102.0,
    description: 'A recurring open-water polynya important for regional heat exchange.',
  },
  {
    id: 'l8',
    name: 'Svalbard Glacier Front',
    type: 'Observation Site',
    region: 'Arctic',
    lat: 78.2,
    lng: 15.6,
    description: 'A tidewater glacier front instrumented with time-lapse cameras.',
  },
  {
    id: 'l9',
    name: 'Ross Ice Shelf Camp',
    type: 'Expedition Site',
    region: 'Antarctic',
    lat: -79.5,
    lng: -170.0,
    description: 'A logistics camp supporting ice-shelf thickness surveys.',
  },
  {
    id: 'l10',
    name: 'McMurdo Dry Valleys',
    type: 'Geographic Feature',
    region: 'Antarctic',
    lat: -77.5,
    lng: 162.5,
    description: 'A polar desert used for long-term ecological and microbiology monitoring.',
  },
  {
    id: 'l11',
    name: 'Zackenberg Research Station',
    type: 'Research Station',
    region: 'Arctic',
    lat: 74.5,
    lng: -20.6,
    description: 'A high-Arctic ecosystem monitoring station in northeast Greenland.',
  },
  {
    id: 'l12',
    name: 'Weddell Sea Ice Camp',
    type: 'Expedition Site',
    region: 'Antarctic',
    lat: -74.0,
    lng: -40.0,
    description: 'A drifting ice camp used for sea-ice thickness and snow-cover surveys.',
  },
  {
    id: 'l13',
    name: 'Devon Island Field Site',
    type: 'Observation Site',
    region: 'Arctic',
    lat: 75.3,
    lng: -89.0,
    description: 'A permafrost and analogue-terrain research site in the Canadian Arctic.',
  },
  {
    id: 'l14',
    name: 'South Orkney Islands Colony Survey',
    type: 'Observation Site',
    region: 'Antarctic',
    lat: -60.6,
    lng: -45.6,
    description: 'A seabird and seal colony census site.',
  },
  {
    id: 'l15',
    name: 'Barents Sea Ice Edge',
    type: 'Geographic Feature',
    region: 'Arctic',
    lat: 78.0,
    lng: 35.0,
    description: 'A seasonally retreating ice edge monitored for productivity blooms.',
  },
];

export const expeditions: Expedition[] = [
  {
    id: 'e1',
    title: 'Antarctic Coastal Observation Expedition 2026',
    description:
      'A coastal field season studying how landfast sea ice, sediment microbial life, and glacial melt interact near the Larsemann Hills. This is the flagship demonstration expedition for PolarVerse.',
    region: 'Antarctic',
    startDate: '2026-01-08',
    endDate: '2026-02-19',
    status: 'Completed',
    researchObjectives: [
      'Measure seasonal landfast ice thickness and break-up timing',
      'Sample coastal sediment microbial communities',
      'Document ice-shelf margin retreat with repeat photography',
    ],
    researcherIds: ['r1', 'r2', 'r3'],
    institution: institutions[0],
    locationId: 'l1',
    findings: [
      'Landfast ice broke up 11 days earlier than the 10-year average',
      'Sediment cores show a measurable shift in microbial diversity near the ice margin',
      'Repeat photography confirms accelerated retreat at two survey points',
    ],
    publicationIds: ['p1', 'p2', 'p3'],
    datasetIds: ['d1', 'd2'],
    mediaIds: Array.from({ length: 15 }, (_, i) => `m${i + 1}`),
    researchArea: 'Sea Ice Dynamics',
  },
  {
    id: 'e2',
    title: 'Arctic Sea Ice Monitoring Expedition 2025',
    description:
      'A ship-based deployment of oceanographic moorings across the Fram Strait to quantify heat transport into the Arctic basin.',
    region: 'Arctic',
    startDate: '2025-08-02',
    endDate: '2025-09-14',
    status: 'Completed',
    researchObjectives: [
      'Redeploy and calibrate the Fram Strait mooring array',
      'Profile water-column temperature and salinity along the transect',
    ],
    researcherIds: ['r4', 'r9'],
    institution: institutions[2],
    locationId: 'l2',
    findings: [
      'Warm Atlantic-origin water observed at a shallower depth than in 2023',
      'Mooring data shows increased variability in cross-strait heat flux',
    ],
    publicationIds: ['p5', 'p6', 'p11'],
    datasetIds: ['d3'],
    mediaIds: ['m16', 'm17', 'm18', 'm19', 'm20'],
    researchArea: 'Physical Oceanography',
  },
  {
    id: 'e3',
    title: 'Greenland Ice Sheet Survey 2024',
    description:
      'An airborne and ground radar survey of ice-sheet thickness and internal layering, paired with a shallow ice-core recovery.',
    region: 'Arctic',
    startDate: '2024-05-10',
    endDate: '2024-06-22',
    status: 'Completed',
    researchObjectives: [
      'Survey ice thickness along three transects',
      'Recover a 40-metre firn core for isotope analysis',
    ],
    researcherIds: ['r2', 'r6'],
    institution: institutions[3],
    locationId: 'l3',
    findings: [
      'Firn density profile indicates increased surface melt refreezing since 2015',
      'Radar layering suggests localized basal melt beneath one transect',
    ],
    publicationIds: ['p2', 'p8'],
    datasetIds: ['d2'],
    mediaIds: ['m21', 'm22', 'm23', 'm24'],
    researchArea: 'Glaciology',
  },
  {
    id: 'e4',
    title: 'Southern Ocean Research Expedition 2023',
    description:
      'A combined atmospheric and ecological survey along a repeat Southern Ocean transect, studying aerosol formation and krill distribution.',
    region: 'Antarctic',
    startDate: '2023-11-20',
    endDate: '2024-01-05',
    status: 'Completed',
    researchObjectives: [
      'Characterize marine aerosol composition along the transect',
      'Survey krill swarm density using acoustic sampling',
    ],
    researcherIds: ['r5', 'r7'],
    institution: institutions[5],
    locationId: 'l4',
    findings: [
      'Aerosol composition strongly linked to phytoplankton bloom timing',
      'Krill density lower than historical average in the southern transect segment',
    ],
    publicationIds: ['p7', 'p9'],
    datasetIds: ['d4'],
    mediaIds: ['m25', 'm26', 'm27', 'm28'],
    researchArea: 'Atmospheric Science',
  },
  {
    id: 'e5',
    title: 'Larsemann Hills Ice Shelf Margin Watch 2022',
    description:
      'A remote-sensing and field validation campaign monitoring calving and surface melt along a retreating ice-shelf margin.',
    region: 'Antarctic',
    startDate: '2022-12-01',
    endDate: '2023-01-18',
    status: 'Completed',
    researchObjectives: [
      'Validate satellite-derived calving-front positions with ground GPS',
      'Install time-lapse cameras for continuous margin monitoring',
    ],
    researcherIds: ['r1', 'r8'],
    institution: institutions[1],
    locationId: 'l5',
    findings: [
      'Satellite-derived margin positions matched GPS survey within 12 metres',
      'Time-lapse record captured two calving events over six weeks',
    ],
    publicationIds: ['p4', 'p10'],
    datasetIds: ['d5'],
    mediaIds: ['m29', 'm30', 'm31'],
    researchArea: 'Remote Sensing',
  },
];

// Additional lighter-weight expeditions extending the roster toward the
// full demo count without hand-authoring every field in depth.
const extraExpeditionSeeds: Array<{
  id: string;
  title: string;
  region: 'Arctic' | 'Antarctic';
  start: string;
  end: string;
  status: Expedition['status'];
  area: string;
  locationId: string;
  institution: string;
  researcherIds: string[];
}> = [
  { id: 'e6', title: 'Zackenberg Ecosystem Monitoring 2025', region: 'Arctic', start: '2025-06-01', end: '2025-08-20', status: 'Completed', area: 'Polar Ecology', locationId: 'l11', institution: institutions[2], researcherIds: ['r7'] },
  { id: 'e7', title: 'Ross Ice Shelf Thickness Survey 2024', region: 'Antarctic', start: '2024-11-05', end: '2025-01-10', status: 'Completed', area: 'Glaciology', locationId: 'l9', institution: institutions[5], researcherIds: ['r2'] },
  { id: 'e8', title: 'McMurdo Dry Valleys Microbiology Study 2024', region: 'Antarctic', start: '2024-10-14', end: '2024-12-02', status: 'Completed', area: 'Polar Microbiology', locationId: 'l10', institution: institutions[0], researcherIds: ['r3', 'r10'] },
  { id: 'e9', title: 'Svalbard Glacier Front Retreat Watch 2023', region: 'Arctic', start: '2023-07-01', end: '2023-08-15', status: 'Completed', area: 'Glaciology', locationId: 'l8', institution: institutions[2], researcherIds: ['r9'] },
  { id: 'e10', title: 'Weddell Sea Ice Camp Deployment 2023', region: 'Antarctic', start: '2023-03-01', end: '2023-04-20', status: 'Completed', area: 'Sea Ice Dynamics', locationId: 'l12', institution: institutions[4], researcherIds: ['r1'] },
  { id: 'e11', title: 'Amundsen Sea Polynya Heat Flux Study 2022', region: 'Antarctic', start: '2022-09-10', end: '2022-11-01', status: 'Completed', area: 'Physical Oceanography', locationId: 'l7', institution: institutions[3], researcherIds: ['r4'] },
  { id: 'e12', title: 'Devon Island Permafrost Transect 2022', region: 'Arctic', start: '2022-06-15', end: '2022-07-30', status: 'Completed', area: 'Polar Ecology', locationId: 'l13', institution: institutions[1], researcherIds: ['r7'] },
  { id: 'e13', title: 'South Orkney Colony Census 2021', region: 'Antarctic', start: '2021-12-01', end: '2022-01-15', status: 'Completed', area: 'Polar Ecology', locationId: 'l14', institution: institutions[5], researcherIds: ['r7'] },
  { id: 'e14', title: 'Barents Sea Ice Edge Bloom Survey 2021', region: 'Arctic', start: '2021-05-01', end: '2021-06-10', status: 'Completed', area: 'Remote Sensing', locationId: 'l15', institution: institutions[2], researcherIds: ['r8'] },
  { id: 'e15', title: 'Ny-Ålesund Atmospheric Baseline Study 2027', region: 'Arctic', start: '2027-02-01', end: '2027-03-20', status: 'Planned', area: 'Atmospheric Science', locationId: 'l6', institution: institutions[2], researcherIds: ['r5'] },
];

extraExpeditionSeeds.forEach((seed, idx) => {
  expeditions.push({
    id: seed.id,
    title: seed.title,
    description: `A ${seed.area.toLowerCase()} field campaign carried out at ${
      locations.find((l) => l.id === seed.locationId)?.name ?? 'a polar field site'
    }, contributing observations to the PolarVerse knowledge base.`,
    region: seed.region,
    startDate: seed.start,
    endDate: seed.end,
    status: seed.status,
    researchObjectives: [
      `Advance understanding of ${seed.area.toLowerCase()} in the ${seed.region.toLowerCase()}`,
      'Collect field samples and instrument data for long-term monitoring',
    ],
    researcherIds: seed.researcherIds,
    institution: seed.institution,
    locationId: seed.locationId,
    findings: [`Preliminary results contribute to the regional ${seed.area.toLowerCase()} record`],
    publicationIds: [],
    datasetIds: [],
    mediaIds: [`m${32 + idx}`],
    researchArea: seed.area,
  });
});

const publicationSeeds: Array<[string, string, string[], string, string, string, string, string?]> = [
  ['p1', 'Early Break-up of Landfast Sea Ice near the Larsemann Hills', ['Ananya Rao', 'Karan Mehta'], 'Journal of Polar Sciences', '2026-03-12', 'Sea Ice Dynamics', 'Antarctic', 'e1'],
  ['p2', 'Firn Density Change and Refreezing Trends in East Antarctica', ['Sana Thomas', 'Priya Nair'], 'The Cryosphere', '2024-09-02', 'Glaciology', 'Antarctic', 'e3'],
  ['p3', 'Microbial Diversity Shifts along a Retreating Ice Margin', ['Karan Mehta'], 'Polar Biology', '2026-04-18', 'Polar Microbiology', 'Antarctic', 'e1'],
  ['p4', 'Validating Satellite-Derived Calving Fronts with GPS Survey', ['Ananya Rao', 'Meera Iyer'], 'Remote Sensing of Environment', '2023-05-22', 'Remote Sensing', 'Antarctic', 'e5'],
  ['p5', 'Atlantic Water Intrusion Depth in the Fram Strait, 2015–2025', ['Ingrid Solberg'], 'Journal of Geophysical Research: Oceans', '2025-11-30', 'Physical Oceanography', 'Arctic', 'e2'],
  ['p6', 'Decadal Variability in Cross-Strait Heat Flux', ['Ingrid Solberg', 'Henrik Aas'], 'Ocean Science', '2025-12-15', 'Physical Oceanography', 'Arctic', 'e2'],
  ['p7', 'Bloom-Linked Aerosol Formation over the Southern Ocean', ['Liu Wei'], 'Atmospheric Chemistry and Physics', '2024-02-08', 'Atmospheric Science', 'Antarctic', 'e4'],
  ['p8', 'A 40-Metre Firn Core Isotope Record from East Antarctica', ['Priya Nair', 'Sana Thomas'], 'Climate of the Past', '2024-10-19', 'Paleoclimatology', 'Antarctic', 'e3'],
  ['p9', 'Krill Density Decline along a Repeat Southern Ocean Transect', ['Erik Lindqvist'], 'Marine Ecology Progress Series', '2024-03-04', 'Polar Ecology', 'Antarctic', 'e4'],
  ['p10', 'Two-Year Time-Lapse Record of Ice-Shelf Calving Events', ['Meera Iyer'], 'Annals of Glaciology', '2023-06-30', 'Remote Sensing', 'Antarctic', 'e5'],
  ['p11', 'Landfast Ice Break-Up Modelling near Arctic Research Stations', ['Henrik Aas'], 'Journal of Polar Sciences', '2025-10-11', 'Sea Ice Dynamics', 'Arctic', 'e2'],
  ['p12', 'Extremophile Communities in Subglacial Lake Sediment', ['Fatima Sheikh'], 'Polar Biology', '2025-01-27', 'Polar Microbiology', 'Antarctic', undefined],
];

for (let i = 13; i <= 25; i++) {
  const area = researchAreas[i % researchAreas.length];
  const region: 'Arctic' | 'Antarctic' = i % 2 === 0 ? 'Arctic' : 'Antarctic';
  publicationSeeds.push([
    `p${i}`,
    `Seasonal Observations in ${area}: Field Season ${2016 + i}`,
    [researchers[i % researchers.length].name],
    ['Journal of Polar Sciences', 'The Cryosphere', 'Polar Biology', 'Ocean Science'][i % 4],
    `${2016 + (i % 9)}-0${(i % 9) + 1}-1${i % 9}`,
    area,
    region,
    undefined,
  ]);
}

export const publications: Publication[] = publicationSeeds.map(
  ([id, title, authors, journal, publicationDate, researchArea, region, expeditionId]) => ({
    id,
    title,
    authors,
    abstract: `This study presents field and analytical results on ${researchArea.toLowerCase()} collected as part of PolarVerse-linked polar research, discussing methodology, key measurements, and implications for future monitoring.`,
    journal,
    publicationDate,
    doi: `10.1234/polarverse.${id}`,
    researchArea,
    region: region as Publication['region'],
    expeditionId,
  })
);

const datasetSeeds: Array<[string, string, string, string, string, string?, string?, number?, string?]> = [
  ['d1', 'Larsemann Hills Landfast Ice Thickness Survey', 'Time Series', 'Sea Ice Dynamics', 'National Centre for Polar and Ocean Research', 'e1', 'CSV', 4.2, 'CC BY 4.0'],
  ['d2', 'Coastal Sediment Microbiome Sequencing Set', 'Genomic', 'Polar Microbiology', 'National Centre for Polar and Ocean Research', 'e1', 'FASTQ', 812.5, 'CC BY-NC 4.0'],
  ['d3', 'Fram Strait Mooring Temperature & Salinity Profiles', 'Oceanographic', 'Physical Oceanography', 'Norwegian Polar Institute', 'e2', 'NetCDF', 156.0, 'CC BY 4.0'],
  ['d4', 'Southern Ocean Aerosol Composition Log', 'Atmospheric', 'Atmospheric Science', 'Australian Antarctic Division', 'e4', 'CSV', 22.1, 'CC BY 4.0'],
  ['d5', 'Ice-Shelf Margin Time-Lapse Position Log', 'Geospatial', 'Remote Sensing', 'Indian Institute of Tropical Meteorology', 'e5', 'GeoJSON', 8.7, 'CC0 1.0'],
];

for (let i = 6; i <= 10; i++) {
  const area = researchAreas[i % researchAreas.length];
  datasetSeeds.push([
    `d${i}`,
    `${area} Field Measurement Archive ${2018 + i}`,
    ['Time Series', 'Geospatial', 'Genomic', 'Oceanographic', 'Atmospheric'][i % 5],
    area,
    institutions[i % institutions.length],
    undefined,
    ['CSV', 'NetCDF', 'GeoJSON'][i % 3],
    Number((5 + i * 3.4).toFixed(1)),
    'CC BY 4.0',
  ]);
}

export const datasets: Dataset[] = datasetSeeds.map(
  ([id, title, datasetType, researchArea, source, expeditionId, fileFormat, fileSizeMb, license]) => ({
    id,
    title,
    description: `A curated ${String(datasetType).toLowerCase()} dataset supporting ${String(
      researchArea
    ).toLowerCase()} research, archived for reuse across the PolarVerse knowledge base.`,
    datasetType: datasetType as string,
    researchArea: researchArea as string,
    source: source as string,
    expeditionId,
    fileFormat: (fileFormat as string) ?? 'CSV',
    fileSizeMb: (fileSizeMb as number) ?? 10,
    license: (license as string) ?? 'CC BY 4.0',
    date: '2024-01-01',
  })
);

const mediaTypes: MediaItem['type'][] = ['Photo', 'Photo', 'Photo', 'Video', 'Infographic', 'Audio'];
const colorSeeds = ['0F2C4C', '163B63', '1E4D7B', '5EC8E0', '0A1F38', '2B6E8C', '3A7CA5', '6FA8C7'];

export const media: MediaItem[] = Array.from({ length: 50 }, (_, i) => {
  const idx = i + 1;
  const expeditionMatch = expeditions.find((e) => e.mediaIds.includes(`m${idx}`));
  const type: MediaItem['type'] =
    idx <= 45 ? mediaTypes[idx % mediaTypes.length] : idx <= 55 && idx > 45 ? 'Video' : 'Photo';
  return {
    id: `m${idx}`,
    title: expeditionMatch
      ? `${expeditionMatch.title.split(' ').slice(0, 3).join(' ')} — Field Record ${idx}`
      : `Polar Field Record ${idx}`,
    type: idx % 12 === 0 ? 'Video' : type,
    region: expeditionMatch?.region ?? (idx % 2 === 0 ? 'Arctic' : 'Antarctic'),
    expeditionId: expeditionMatch?.id,
    locationId: expeditionMatch?.locationId,
    year: expeditionMatch ? Number(expeditionMatch.startDate.slice(0, 4)) : 2020 + (idx % 6),
    colorSeed: colorSeeds[idx % colorSeeds.length],
    caption: expeditionMatch
      ? `Field documentation captured during ${expeditionMatch.title}.`
      : 'Field documentation from PolarVerse partner archives.',
  };
});

export const outreachContent: OutreachContent[] = [
  {
    id: 'o1',
    title: 'Why Antarctic Sea Ice Is Breaking Up Earlier Than Expected',
    contentType: 'Website Article',
    sourceExpeditionId: 'e1',
    status: 'published',
    body: 'AI-generated draft — requires scientific/editorial review.\n\nThis year, researchers camped near the Larsemann Hills watched something unusual: the coastal ice they were studying broke apart nearly two weeks earlier than the decade\'s average. The team, led by Dr. Ananya Rao, combines satellite images with on-the-ground measurements to understand what is driving the change...',
    createdAt: '2026-03-01',
    author: 'Outreach Team',
  },
  {
    id: 'o2',
    title: 'Meet the Microbes Living at the Edge of the Ice',
    contentType: 'Student-Friendly Explanation',
    sourceExpeditionId: 'e1',
    status: 'approved',
    body: 'AI-generated draft — requires scientific/editorial review.\n\nImagine tiny living things so small you would need a microscope to see even one — and there are millions of them living in the mud beneath Antarctic ice. Dr. Karan Mehta studies these microbes to understand how they survive in one of Earth\'s coldest places...',
    createdAt: '2026-03-05',
    author: 'Outreach Team',
  },
  {
    id: 'o3',
    title: 'Expedition Update: Two Calving Events Captured on Camera',
    contentType: 'Social Media Post',
    sourceExpeditionId: 'e5',
    status: 'in-review',
    body: 'AI-generated draft — requires scientific/editorial review.\n\n🧊 Our time-lapse cameras just captured TWO ice-shelf calving events in six weeks! Here\'s what that means for the coastline...',
    createdAt: '2023-01-20',
    author: 'Outreach Team',
  },
  {
    id: 'o4',
    title: 'PolarVerse Quarterly: Fram Strait Heat Flux Findings',
    contentType: 'Newsletter',
    sourceExpeditionId: 'e2',
    status: 'draft',
    body: 'AI-generated draft — requires scientific/editorial review.\n\nThis quarter\'s highlight comes from the Fram Strait, where Professor Ingrid Solberg\'s team recorded warmer Atlantic-origin water at a shallower depth than in previous years...',
    createdAt: '2025-12-01',
    author: 'Outreach Team',
  },
  {
    id: 'o5',
    title: '60 Seconds on Krill: Why Tiny Creatures Matter',
    contentType: '60-Second Video Script',
    sourceExpeditionId: 'e4',
    status: 'rejected',
    body: 'AI-generated draft — requires scientific/editorial review.\n\n[SCENE: Southern Ocean, waves crashing]\nNARRATOR: They\'re barely bigger than your finger. But krill hold up an entire ecosystem...',
    createdAt: '2024-01-10',
    author: 'Outreach Team',
  },
];

for (let i = 6; i <= 15; i++) {
  const exp = expeditions[i % expeditions.length];
  const statuses: OutreachContent['status'][] = ['draft', 'in-review', 'approved', 'published', 'rejected'];
  const types: OutreachContent['contentType'][] = [
    'Website Article',
    'Social Media Post',
    'Student-Friendly Explanation',
    'Newsletter',
    '60-Second Video Script',
  ];
  outreachContent.push({
    id: `o${i}`,
    title: `${exp.title.split(' ').slice(0, 4).join(' ')} — Outreach Draft ${i}`,
    contentType: types[i % types.length],
    sourceExpeditionId: exp.id,
    status: statuses[i % statuses.length],
    body: `AI-generated draft — requires scientific/editorial review.\n\nA public-friendly summary of findings from ${exp.title}, prepared for outreach review.`,
    createdAt: '2025-06-01',
    author: 'Outreach Team',
  });
}

// ---------------------------------------------------------------------------
// Convenience lookups
// ---------------------------------------------------------------------------

export const getExpeditionById = (id: string) => expeditions.find((e) => e.id === id);
export const getResearcherById = (id: string) => researchers.find((r) => r.id === id);
export const getLocationById = (id: string) => locations.find((l) => l.id === id);
export const getPublicationsByExpedition = (id: string) => publications.filter((p) => p.expeditionId === id);
export const getDatasetsByExpedition = (id: string) => datasets.filter((d) => d.expeditionId === id);
export const getMediaByExpedition = (id: string) => media.filter((m) => m.expeditionId === id);
export const getResearchersByExpedition = (id: string) => {
  const expedition = getExpeditionById(id);

  if (!expedition) return [];

  return researchers.filter((r) =>
    expedition.researcherIds.includes(r.id)
  );
};

export const dashboardStats = {
  totalExpeditions: expeditions.length,
  publications: publications.length,
  datasets: datasets.length,
  mediaAssets: media.length,
  researchLocations: locations.length,
};
import imageMetadataDict from '../data/image_metadata.json';
import rawBucketUrls from '../data/bucket_urls.json';

const bucketUrls = rawBucketUrls.map(url => encodeURI(url).replace(/%25/g, '%'));

const localImagesGlob = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,JPG,PNG,JPEG,webp}', { eager: true, query: '?url', import: 'default' });

export const localImageUrls = [
  ...(Object.values(localImagesGlob) as string[]),
  ...bucketUrls
];

const getFolderImages = (folderName: string) => {
  const localTargetImages = (Object.entries(localImagesGlob) as [string, string][])
    .filter(([path]) => path.includes(`/${folderName}/`))
    .map(([, url]) => url);
    
  const encodedFolder = encodeURI(folderName).replace(/&/g, '%26');
  
  // Try matching against unencoded folderName for bucketUrls that haven't been encoded yet, 
  // or the encoded folder name.
  const bucketTargetImages = bucketUrls.filter(url => 
    decodeURI(url).includes(`/${folderName}/`)
  );
  
  return [...localTargetImages, ...bucketTargetImages];
};

const fallbackPlaceholders = [
  encodeURI("https://storage.googleapis.com/krbengineering/Maîtrise Environnementale/Maîtrise Environnementale/BILD5525.JPG"),
  encodeURI("https://storage.googleapis.com/krbengineering/Développement Rural & Urbain/Développement Rural & Urbain/BILD0037.JPG"),
  encodeURI("https://storage.googleapis.com/krbengineering/Développement Rural & Urbain/Développement Rural & Urbain/20150408_122239.jpg"),
  encodeURI("https://storage.googleapis.com/krbengineering/Ingénierie de l'Eau & Hydraulique/Ingénierie de l'Eau & Hydraulique/DSC01264.JPG")
].map(url => url.replace(/%25/g, '%'));

const getSafeFallback = (arr: string[]) => arr.length > 0 ? arr : fallbackPlaceholders;

const imageEntries = Object.entries(localImagesGlob) as [string, string][];

export const workerImages = imageEntries.filter(([originalPath]) => {
  const filename = originalPath.split('/').pop()?.split('?')[0] || '';
  const decodedFilename = decodeURIComponent(filename);
  const meta = (imageMetadataDict as Record<string, any>)[decodedFilename];
  return meta?.hasWorkers === true;
}).map(([, url]) => url);

export const environmentImages = imageEntries.filter(([originalPath]) => {
  const filename = originalPath.split('/').pop()?.split('?')[0] || '';
  const decodedFilename = decodeURIComponent(filename);
  const meta = (imageMetadataDict as Record<string, any>)[decodedFilename];
  return meta?.category === "Maîtrise & Évaluation Environnement" && !meta?.hasWorkers;
}).map(([, url]) => url);

export const cleanImages = localImageUrls.filter(url => url.includes('-clean')).sort();

export const getCleanImage = (match: string) => cleanImages.find(url => url.includes(match)) || '';

const ensureSafeImages = (images: string[]) => {
  const filtered = images.filter(Boolean);
  return filtered.length > 0 ? filtered : getSafeFallback(localImageUrls);
};

export const categoryImages = {
  hydraulique: ensureSafeImages([
    ...getFolderImages("Ingénierie de l'Eau & Hydraulique"),
    getCleanImage('1778112209209'),
    getCleanImage('1778110779689'),
    getCleanImage('1778112165114'),
  ]),
  environnement: ensureSafeImages([
    ...getFolderImages("Maîtrise Environnementale"),
    getCleanImage('1778110884007'),
    getCleanImage('1778112222216'),
  ]),
  ruralSig: ensureSafeImages([
    ...getFolderImages("Développement Rural & Urbain"),
    getCleanImage('1778110799142'),
    getCleanImage('1778112180879'),
  ]),
  energie: ensureSafeImages([
    ...getFolderImages("Mines et Energie"),
    getCleanImage('1778110789403'),
    getCleanImage('1778112194658'),
  ]),
  sociale: ensureSafeImages([
    ...getFolderImages("Ingénierie Sociale"),
    getCleanImage('1778112165114'),
    getCleanImage('1778110779689')
  ])
};

export const getImages = (count: number, preferWorkers = false) => {
  const selected = [];
  let available = preferWorkers ? [...workerImages] : [...localImageUrls];
  if (available.length < count) available = [...available, ...localImageUrls];
  
  const safeSource = getSafeFallback(available);
  for (let i = 0; i < count; i++) {
    selected.push(safeSource[i % safeSource.length]);
  }
  return selected;
};

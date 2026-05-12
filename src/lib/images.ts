import imageMetadataDict from '../data/image_metadata.json';

const localImagesGlob = import.meta.glob([
  '/src/assets/images/Krb images/*.{png,jpg,jpeg,JPG,PNG,JPEG}',
  '/src/assets/images/krb_images/*.{png,jpg,jpeg,JPG,PNG,JPEG}',
  '/src/assets/images/Krbimages/*.{png,jpg,jpeg,JPG,PNG,JPEG}'
], { eager: true, query: '?url', import: 'default' });

export const localImageUrls = Object.values(localImagesGlob) as string[];

export const workerImages = localImageUrls.filter(url => {
  const filename = url.split('/').pop()?.split('?')[0] || '';
  const decodedFilename = decodeURIComponent(filename);
  const meta = (imageMetadataDict as Record<string, any>)[decodedFilename];
  return meta?.hasWorkers === true;
});

export const environmentImages = localImageUrls.filter(url => {
  const filename = url.split('/').pop()?.split('?')[0] || '';
  const decodedFilename = decodeURIComponent(filename);
  const meta = (imageMetadataDict as Record<string, any>)[decodedFilename];
  return meta?.category === "Maîtrise & Évaluation Environnement" && !meta?.hasWorkers;
});

export const cleanImages = localImageUrls.filter(url => url.includes('-clean')).sort();

export const getCleanImage = (match: string) => cleanImages.find(url => url.includes(match)) || '';

export const categoryImages = {
  hydraulique: [
    getCleanImage('1778112209209'),
    getCleanImage('1778110779689'),
    getCleanImage('1778112165114'),
  ].filter(Boolean),
  environnement: [
    getCleanImage('1778110884007'),
    getCleanImage('1778112222216'),
  ].filter(Boolean),
  ruralSig: [
    getCleanImage('1778110799142'),
    getCleanImage('1778112180879'),
  ].filter(Boolean),
  energie: [
    getCleanImage('1778110789403'),
    getCleanImage('1778112194658'),
  ].filter(Boolean),
  sociale: [
    getCleanImage('1778112165114'),
    getCleanImage('1778110779689')
  ].filter(Boolean)
};

export const getImages = (count: number, preferWorkers = false) => {
  const selected = [];
  let available = preferWorkers ? [...workerImages] : [...localImageUrls];
  if (available.length < count) available = [...available, ...localImageUrls];
  for (let i = 0; i < count; i++) {
    if (available.length > 0) {
      selected.push(available[i % available.length]);
    } else {
      selected.push(''); // fallback
    }
  }
  return selected;
};

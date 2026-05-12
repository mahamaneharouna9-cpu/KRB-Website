async function getWiki(query, limit = 5) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=${limit}&piprop=original`;
  const res = await fetch(url);
  const json = await res.json();
  const pages = json?.query?.pages;
  if (!pages) return [];
  return Object.values(pages).map(p => p.original ? p.original.source : null).filter(p => p && (p.endsWith('.jpg') || p.endsWith('.JPG') || p.endsWith('.png')));
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  const rs = {};
  
  rs.Hydraulique = await getWiki("hydroelectric dam Africa", 5);
  await sleep(1000);
  
  rs.Environnement = await getWiki("reforestation trees Africa environment", 5);
  await sleep(1000);
  
  rs.Urbanisme = await getWiki("city planning Africa urban", 5);
  await sleep(1000);
  
  rs.Humain = await getWiki("african community works development", 5);
  await sleep(1000);
  
  rs.Mine = await getWiki("mining extraction industrial Africa", 5);
  await sleep(1000);

  rs.Solar = await getWiki("solar farm panels Africa", 5);
  await sleep(1000);

  rs.Civil = await getWiki("civil engineering construction site", 5);
  await sleep(1000);

  rs.Water = await getWiki("water well village Africa", 5);
  await sleep(1000);

  console.log(JSON.stringify(rs, null, 2));
}
run();

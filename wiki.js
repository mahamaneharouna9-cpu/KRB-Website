async function getWiki(query, limit = 1) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=${limit}&piprop=original`;
  const res = await fetch(url);
  const json = await res.json();
  const pages = json.query.pages;
  return Object.values(pages).map(p => p.original ? p.original.source : null).filter(Boolean);
}

async function run() {
  console.log("Dam:", await getWiki("hydroelectric dam", 3));
  console.log("Environment:", await getWiki("reforestation", 3));
  console.log("Rural:", await getWiki("agriculture africa", 3));
  console.log("Energy:", await getWiki("solar farm", 3));
  console.log("Civil:", await getWiki("construction site", 3));
}
run();

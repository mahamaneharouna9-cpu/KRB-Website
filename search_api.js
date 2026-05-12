async function search(query) {
  const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&page=1&per_page=5`);
  const json = await res.json();
  return json.results.map(r => r.id);
}

async function run() {
  console.log("Dam:", await search("dam water civil"));
  console.log("Environment:", await search("forest environmental"));
  console.log("Urban:", await search("africa city urban planning"));
  console.log("Human:", await search("african community meeting"));
  console.log("Energy:", await search("solar farm africa"));
  console.log("Borehole:", await search("water well africa pump"));
}
run();

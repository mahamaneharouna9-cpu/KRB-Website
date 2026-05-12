async function test() {
  const res = await fetch('https://loremflickr.com/800/600/hydroelectric,dam?lock=1', { redirect: 'manual' });
  console.log(res.status, res.headers.get('location'));
}
test();

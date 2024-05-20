async function fetchCurrency() {
  let response = await fetch(
    `https://latest.currency-api.pages.dev/v1/currencies/usd.json`
  );
  const reader = response.body.getReader();

  let receivedLength = 0;
  let chunks = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }
    chunks.push(value);
    receivedLength += value.length;
  }
  let chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }
  let result = new TextDecoder("utf-8").decode(chunksAll);
  let commits = JSON.parse(result);

  const keysToKeep = ["rub", "gel", "eur", "usd", "gbp"];

  const filteredUsd = Object.keys(commits.usd)
    .filter((key) => keysToKeep.includes(key))
    .reduce((obj, key) => {
      obj[key] = commits.usd[key];
      return obj;
    }, {});

  commits.usd = filteredUsd;
  return commits;
}

export default fetchCurrency;

// Sequential transport parts restore the exact original GLB before parsing.
const BASE = 'https://pub-8d7b1a002dc7461881f41950b1c60105.r2.dev/';
const PARTS = [
  ['museu-robinhood-v1.glb.gz.part01', 200000000],
  ['museu-robinhood-v1.glb.gz.part02', 200000000],
  ['museu-robinhood-v1.glb.gz.part03', 103261821],
];
export async function loadMuseumBuffer(onProgress = () => {}, fetchPart = fetch) {
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('Please update your browser to load the museum.');
  }
  const abort = new AbortController();
  const total = PARTS.reduce((sum, part) => sum + part[1], 0);
  let index = 0, reader = null, partBytes = 0, loaded = 0;
  const compressed = new ReadableStream({
    async pull(controller) {
      try {
        while (index < PARTS.length) {
          if (!reader) {
            const response = await fetchPart(BASE + PARTS[index][0], {signal: abort.signal});
            if (!response.ok || !response.body) throw new Error('Museum download failed: part ' + (index + 1));
            reader = response.body.getReader();
            partBytes = 0;
          }
          const {done, value} = await reader.read();
          if (done) {
            reader.releaseLock();
            reader = null;
            if (partBytes !== PARTS[index][1]) throw new Error('Incomplete museum file: part ' + (index + 1));
            index++;
            continue;
          }
          partBytes += value.byteLength;
          loaded += value.byteLength;
          if (partBytes > PARTS[index][1]) throw new Error('Invalid museum file size.');
          onProgress(loaded / total);
          controller.enqueue(value);
          return;
        }
        controller.close();
      } catch (error) {
        abort.abort();
        controller.error(error);
      }
    },
    cancel(reason) {
      abort.abort();
      return reader?.cancel(reason);
    },
  });
  const result = await new Response(compressed.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  const view = new DataView(result);
  if (result.byteLength !== 1381267648 || view.getUint32(0, true) !== 0x46546c67 || view.getUint32(8, true) !== result.byteLength) {
    throw new Error('Invalid reconstructed museum GLB.');
  }
  return result;
}

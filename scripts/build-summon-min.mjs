import { readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const sourcePath = resolve("summon.js");
const outputPath = resolve("summon.min.js");
const source = readFileSync(sourcePath, "utf8").replace(/\n\/\/# sourceMappingURL=.*$/u, "");
const encoded = Buffer.from(source, "utf8").toString("base64");
const chunkSize = 7600;
const chunks = [];

for (let index = 0; index < encoded.length; index += chunkSize) {
  chunks.push(encoded.slice(index, index + chunkSize));
}

const builtAt = new Date().toISOString();
const output = `/* Built from ${basename(sourcePath)} at ${builtAt}. Do not edit directly. */\n` +
  `(()=>{const c=${JSON.stringify(chunks)}.join("");` +
  `const b=Uint8Array.from(atob(c),m=>m.charCodeAt(0));` +
  `const s=new TextDecoder().decode(b);` +
  `(0,eval)(s);})();\n`;

writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${basename(outputPath)} from ${basename(sourcePath)} (${source.length} chars).`);

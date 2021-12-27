import { readFileSync, createWriteStream, unlinkSync, existsSync } from "fs";

import { cartesian } from "./utils/cartesian";
import TrieParser from "./trie/trie-parser.js";

const dictionaryFilePath = "src/data/dictionary.txt";
const combinationsFilePath = "src/data/combinations.txt";
const outputFilePath = "src/data/output.txt";

const trieDictionaryInstance = new TrieParser(dictionaryFilePath);

trieDictionaryInstance.createTrie();

export function main() {
  try {
    if (existsSync(outputFilePath)) unlinkSync(outputFilePath);
    const output = createWriteStream(outputFilePath, {
      flags: "a",
    });
    const rawData = readFileSync(combinationsFilePath, { encoding: "utf-8" })
      .toString()
      .split(/\r?\n/);

    for (const rawCombination of rawData) {
      const combinations = rawCombination.split(" ");
      const predictionArray: string[][] = combinations.map((combination) => {
        const result = trieDictionaryInstance.getPredictions(combination);
        const targetArray = result?.current.flatMap((item) =>
          Array.isArray(item) ? item : [item]
        );
        return targetArray;
      }) as string[][];
      const possibleProducts = (
        [...cartesian(...(predictionArray as [string[]]))] as string[][]
      ).map((permutation) => permutation.join(" "));

      for (const permutation of possibleProducts) {
        output.write(permutation + "\r");
      }
    }

    output.end();
  } catch (e) {
    console.error(e);
  }
}

main();

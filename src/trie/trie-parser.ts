import { readFileSync } from "fs";

import Trie from "./trie";

import { rootGenerator } from "./helpers";
import { Prediction } from "./interfaces";

class TrieParser {
  trie: Trie;
  filePath: string;

  constructor(filePath: string) {
    this.trie = new Trie();
    this.filePath = filePath;
  }

  createTrie(words?: string[]): void {
    const wordArray = words || this.parseDictionary();
		
		// Creating trie from words array
    wordArray.forEach((word) => {
      this.trie.insert(word);
    });
  }

  parseDictionary(): string[] {
    const filePath = this.filePath;
    const data = readFileSync(filePath, {
      encoding: "utf8",
    });
    const regex = /\r?\n/;
    const array = data.toString().split(regex);

    return array;
  }

  getPredictions(keyString: string): Prediction | undefined {
    if (!keyString) return rootGenerator().predictions;
    return this.trie.getPredictions(keyString);
  }
}

export default TrieParser;
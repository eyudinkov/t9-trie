import { keyMap, rootGenerator } from "./helpers";
import { Root, Prediction } from './interfaces';

class Trie {
  root: Root;

  constructor() {
    this.root = rootGenerator();
  }

  insert(word: string): void {
    if (word.length === 0) throw new Error("A word has to be specified");

    let currentNode = this.root;
    
    Array.from(word).forEach((letter, index) => {
      const digit = keyMap[letter];
      let isLastNode = false;

      if (word.length === index + 1) isLastNode = true;
      if (!digit) throw new Error("Not a valid digit");
      if (!currentNode.children) currentNode.children = {};
      if (!currentNode.children[digit]) currentNode.children[digit] = rootGenerator();

      currentNode = currentNode.children[digit] as Root;

      if (!isLastNode) currentNode.predictions.deep.push(word);
    });

    currentNode.predictions.current.push(word);
  }

  getPredictions(keyString: string): Prediction | undefined {
    const state = rootGenerator().predictions;

    let currentNode = this.root;
    let predictions;

    Array.from(keyString).forEach((nodeKey) => {
      if (!currentNode.children || !currentNode.children[nodeKey]) {
        predictions = state;
        return;
      }
      
      currentNode = currentNode.children[nodeKey] as Root;
      predictions = currentNode.predictions;
    });

    return predictions;
  }
}

export default Trie;

export function cartesian<T>(...words: T[][]): T[][] {
  // iteratively get the cartesian product
  return words.reduce<T[][]>(
    // part - cartesian product of the first few arrays from words
    (part, array) =>
      part.flatMap((cartesianPart) =>
        //cartesianPart is an array-prefix of one of the elements of the cartesian product
        array.map((element) => [...cartesianPart, element])
      ),
    [[]]
  );
}

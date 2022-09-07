export function interleave(values: any[]) {
    const strings = values[0];
    const finalArray = [strings[0]];
    for (let i = 1, { length } = values; i < length; i += 1) {
        finalArray.push(values[i]);
        if (strings[i] != null) {
            finalArray.push(strings[i]);
        }
    }
    return finalArray;
}

export function interleave(vals: any[]) {
    const strings = vals[0];
    const finalArray = [strings[0]];
    for (let i = 1, len = vals.length; i < len; i += 1) {
        finalArray.push(vals[i]);
        if (strings[i] !== undefined) {
            finalArray.push(strings[i]);
        }
    }
    return finalArray;
}

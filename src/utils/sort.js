/* eslint-disable max-statements */
// TODO: refactor this function
let index = 0;

const compareNumbers = (num1, num2) => {
    if (num1 > num2) {
        return 1;
    }
    if (num1 < num2) {
        return -1;
    }
    return 0;
};

const comparison = (rowA, rowB, fields) => {
    const aPrio = rowA[fields[index].fieldIndex].value;
    const bPrio = rowB[fields[index].fieldIndex].value;


    const aNext = rowA[fields[index].fieldIndex].value;
    const bNext = rowB[fields[index].fieldIndex].value;

    if (typeof aPrio === "string") {
        const result = aPrio.localeCompare(bPrio) || bNext - aNext;
        if (result === 0 || isNaN(result)) {
            index += 1;
            if (fields.length === index) {
                return 0;
            }
            return comparison(rowA, rowB, fields);
        }

        return result;
    }

    const result = compareNumbers(aPrio, bPrio) || bNext - aNext;
    if (result === 0) {
        index += 1;
        if (fields.length === index) {
            return 0;
        }
        return comparison(rowA, rowB, fields);
    }
    return result;

};

const sortByMultipleFields = (payload, fields) => {
    payload.sort((rowA, rowB) => {
        index = 0;

        return comparison(rowA.cells, rowB.cells, fields);
    });

    return payload;
};

export default sortByMultipleFields;

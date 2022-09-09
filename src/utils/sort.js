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
    const aPrio = fields[index].direction === 1 ? rowA[fields[index].fieldIndex].value :
        rowB[fields[index].fieldIndex].value;
    const bPrio = fields[index].direction === 1 ? rowB[fields[index].fieldIndex].value :
        rowA[fields[index].fieldIndex].value;

    const result = typeof aPrio === "string" ? aPrio.localeCompare(bPrio) : compareNumbers(aPrio, bPrio);
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
        return comparison(rowA, rowB, fields);
    });

    return payload;
};

export default sortByMultipleFields;

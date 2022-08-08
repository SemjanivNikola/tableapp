const operaton = {
    "<": (a, b) => a < b,
    "≠": (a, b) => a !== b,
    "=": (a, b) => a === b,
    ">": (a, b) => a > b,
    "≤": (a, b) => a <= b,
    "≥": (a, b) => a >= b,
    "between": (a, b) => a >= b[0] && a <= b[1],
    "contains": (a, b) => a.toLowerCase().includes(b.toLowerCase()),
    "does not contain": (a, b) => !a.toLowerCase().includes(b.toLowerCase()),
    "is any of": (a, b) => b.includes(a),
    "is empty": (a) => a === "",
    "is none of": (a, b) => !b.includes(a),
    "is not empty": (a) => a !== "",
    "is not": (a, b) => !b.includes(a),
    "is": (a, b) => a === b,
};

const logicalOperation = {
    "and": (a, b) => a && b,
    "not": (a) => !a,
    "or": (a, b) => a || b,
    "where": (a, b) => a || b,
};

const multipleFiltering = (row, fields) => {
    let lastCondition = null;
    let currentCondition = null;

    for (let i = 0; i < fields.length; i += 1) {
        const { fieldIndex, options } = fields[i];
        const { condition, value, logic } = options;
        const fieldValue = row[fieldIndex].value;

        currentCondition = operaton[condition](fieldValue, value);

        lastCondition = typeof lastCondition === "boolean" ? logicalOperation[logic](currentCondition, lastCondition)
            : currentCondition;

    }
    return lastCondition;

};

const filterByMultipleFields = (payload, fields) => {
    const filtered = payload.filter((row) => {
        if (fields.length > 1) {

            return multipleFiltering(row.cells, fields);
        }

        // Compare row value(a) with value from filter list item(b)
        return operaton[fields[0].options.condition](row.cells[fields[0].fieldIndex].value,
            fields[0].options.value);

    });

    return filtered;
};

export default filterByMultipleFields;

export const sxCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

// Make id of given length - from stackoverflow
export function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
}

export function randomString(len) {
    let str = "";                                // String result
    for (let i = 0; i < len; i++) {              // Loop `len` times
        let rand = Math.floor(Math.random() * 62); // random: 0..61
        const charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48; // Get correct charCode
        str += String.fromCharCode(charCode);      // add Character to str
    }
    return str; // After all loops are done, return the concatenated string
}


// Extracts a number from a given string if one exists.
export function extractNumber(str) {
    // Regular expression to find 'q' followed by any number of digits
    const regex = /q(\d+)/;
    const match = str.match(regex);

    // If a match is found, parse the number and return it
    if (match) {
        return parseInt(match[1], 10); // match[1] is the first captured group, i.e., the digits
    }

    // If no number is found, return null or any default value you prefer
    return null;
}

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
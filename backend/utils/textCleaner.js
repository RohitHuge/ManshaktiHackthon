const cleanText = (text) => {
    if (!text) return '';
    return text
        .replace(/\s+/g, ' ') // Replace multiple spaces/newlines with single space
        .trim();
};

module.exports = { cleanText };

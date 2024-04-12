function getEndingDigits(url) {
    const regex = /\d+$/; // Matches one or more digits at the end of the string
    const match = url.match(regex);
    return match ? match[0] : "";
}

function padNumber(number, length) {
    const numberString = number.toString();
    const zerosToAdd = Math.max(length - numberString.length, 0);
    const zeroPadding = '0'.repeat(zerosToAdd);
    return zeroPadding + numberString;
}

function process(url) {

    const digits = getEndingDigits(url);
    if (digits === "") return;

    const digiLen = digits.length;
    const updatedDigits = padNumber(1 * digits + 1, digiLen);

    const updatedUrl = url.substring(0, url.length - digiLen) + updatedDigits;

    // Redirect to the modified URL
    chrome.tabs.update({ url: updatedUrl });
};

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true })
        .then(tabs => process(tabs[0].url));
});

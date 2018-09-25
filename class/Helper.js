class Helper {
    lpad(text, pad) {
        pad = pad || 8
        return '0'.repeat(pad - text.length) + text
    }
}

module.exports = Helper
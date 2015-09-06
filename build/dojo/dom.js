function get(id, doc) {
    if (typeof id !== 'string') {
        return id;
    }
    return (doc || document).getElementById(id);
}
exports.get = get;
//# sourceMappingURL=dom.js.map
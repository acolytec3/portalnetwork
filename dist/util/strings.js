export const shortId = (nodeId) => {
    return nodeId.slice(0, 5) + '...' + nodeId.slice(nodeId.length - 5);
};

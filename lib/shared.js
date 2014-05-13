
exports.collectionName = function () {
  return this.resource.collection.name;
};

exports.modelName = function () {
  return this.resource.modelName.toLowerCase();
};

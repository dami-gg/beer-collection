export const findItemInCollectionById = (id: string, collection) =>
    collection.find(element => element.id === id);


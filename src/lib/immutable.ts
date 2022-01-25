// Function lodash components (no not mutate)
import _ from "lodash";
import fp from "lodash/fp";

// export function setIn(collection, path, updater) {
//   const data = _.isFunction(updater) ? updater(_.get(collection, path)) : updater;
//   // NOTE: argument order is different for fp methods
//   return fp.set(path, data, collection);
// }
//
// export function safeSetIn(collection, path, updater) {
//   const item = _.isFunction(updater) ? updater(_.get(collection, path)) : updater;
//   const existingItem = _.get(collection, path);
//   const itemId = _.get(item, "id");
//   const existingItemId = _.get(existingItem, "id");
//
//   if (existingItemId === itemId) {
//     return setIn(collection, path, item);
//   }
//
//   return collection;
// }
//
// export function concat(collection, items) {
//   return collection.concat(items);
// }
//
// export function concatIn(collection, path, items) {
//   return setIn(collection, path, concat(_.get(collection, path) || [], items));
// }
//
// export function push(collection, item) {
//   return concat(collection, [item]);
// }
//
// export function pushIfNew(collection, item, key) {
//   const index = key
//     ? _.findIndex(collection, { [key]: _.get(item, key) })
//     : _.indexOf(collection, item);
//   if (index !== -1) {
//     return collection;
//   }
//   return concat(collection, [item]);
// }
//
// export function pushIn(collection, path, item) {
//   return setIn(collection, path, push(_.get(collection, path) || [], item));
// }
//
// export function unshift(collection, item) {
//   return [item].concat(collection);
// }
//
// export function replace(collection, index, item) {
//   return _.map(collection, (existingItem, existingItemIndex) => {
//     if (existingItemIndex === index) {
//       return item;
//     }
//
//     return existingItem;
//   });
// }
//
// export function getInsertIndex(list, index) {
//   const lastIndex = _.size(list);
//
//   if (index >= 0 && index <= lastIndex) {
//     return index;
//   }
//   return lastIndex;
// }
//
// export function insert(collection = [], index, item) {
//   const insertIndex = getInsertIndex(collection, index);
//
//   return [
//     ...collection.slice(0, insertIndex),
//     item,
//     ...collection.slice(insertIndex)
//   ];
// }
//
// export function insertIn(collection, path, index, item) {
//   return setIn(collection, path, insert(_.get(collection, path), index, item));
// }
//
// export function removeAt(collection, indexOrIndexes) {
//   if (Array.isArray(indexOrIndexes)) {
//     return _.reduce(
//       indexOrIndexes,
//       (acc, _, i, arr) => [...acc, ...collection.slice(arr[i] + 1, arr[i + 1])],
//       collection.slice(0, indexOrIndexes[0])
//     );
//   }
//   return [
//     ...collection.slice(0, indexOrIndexes),
//     ...collection.slice(indexOrIndexes + 1)
//   ];
// }
//
// export function remove(collection, itemOrItems, key = "id", fromIndex) {
//   if (Array.isArray(itemOrItems)) {
//     const indexes = _.reduce(
//       collection,
//       (acc, value, i) =>
//         itemOrItems.includes(_.get(value, key)) ? [...acc, i] : acc,
//       []
//     );
//
//     if (indexes.length !== 0) {
//       return removeAt(collection, indexes);
//     }
//   } else {
//     const index = !_.isUndefined(fromIndex)
//       ? fromIndex
//       : _.findIndex(collection, { [key]: itemOrItems[key] });
//
//     if (index !== -1) {
//       return removeAt(collection, index);
//     }
//   }
//
//   return collection;
// }
//
// export function removeIn(collection, path, item, fromIndex, key = "id") {
//   const updated = remove(_.get(collection, path), item, key, fromIndex);
//   return setIn(collection, path, updated);
// }
//
// export function move(collection = [], fromIndex, toIndex) {
//   const c = collection.slice(); // create a copy so mutation is ok
//   c.splice(toIndex, 0, c.splice(fromIndex, 1)[0]);
//   return c;
// }
//
// export function moveIn(collection, path, fromIndex, toIndex) {
//   return setIn(
//     collection,
//     path,
//     move(_.get(collection, path), fromIndex, toIndex)
//   );
// }
//
// // TODO: Simplify to avoid fromIndex and toIndex
// // This function expects toPath to be the final position, including the case where a node
// // is moving lower which would adjust toPath
// export function moveDeep(collection, fromPath, fromIndex, toPath, toIndex) {
//   if (_.isEqual(fromPath, toPath)) {
//     return moveIn(collection, fromPath, fromIndex, toIndex);
//   }
//
//   const newCollection = removeIn(collection, fromPath, "", fromIndex);
//   const item = _.get(collection, [...fromPath, fromIndex]);
//   return insertIn(newCollection, toPath, toIndex, item);
// }
//
// // TODO: Consider more robust merge that can handle nested arrays
// //  where the order of items has changed
// export function mergeIn(collection, path, item) {
//   const merged = _.merge({}, _.get(collection, path), item);
//   return setIn(collection, path, merged);
// }
//
// export function safeMergeIn(collection, path, item) {
//   const existingItem = _.get(collection, path);
//   const itemId = _.get(item, "id");
//   const existingItemId = _.get(existingItem, "id");
//
//   if (existingItemId === itemId) {
//     return mergeIn(collection, path, item);
//   }
//
//   return collection;
// }
//
// function getPredicate(predicate, item) {
//   if (_.isString(predicate)) {
//     return { [predicate]: _.get(item, predicate) };
//   } else if (_.isFunction(predicate)) {
//     return _.partialRight(predicate, item);
//   }
//   return predicate;
// }
//
// /**
//  * Update an item in the collection or add a new item if it doesn't exist
//  * Expects items in the collection to be objects with "id" prop
//  * @param {Array} collection
//  * @param {Object} item
//  * @param {String} predicate to identify matches
//  * @returns {Array} new version of the collection
//  */
// export function pushOrMergeIn(collection, item, predicate = "id") {
//   const existingItemIndex = _.findIndex(
//     collection,
//     getPredicate(predicate, item)
//   );
//
//   if (existingItemIndex >= 0) {
//     return mergeIn(collection, existingItemIndex, item);
//   }
//
//   return [...collection, item];
// }
//
// export function pushOrShallowMergeIn(collection, item, predicate = "id") {
//   const existingItemIndex = _.findIndex(
//     collection,
//     getPredicate(predicate, item)
//   );
//
//   if (existingItemIndex >= 0) {
//     const merged = _.assign({}, _.get(collection, existingItemIndex), item);
//     return setIn(collection, existingItemIndex, merged);
//   }
//
//   return [...collection, item];
// }
//
// export function unshiftOrMergeIn(collection, item, predicate = "id") {
//   const existingItemIndex = _.findIndex(
//     collection,
//     getPredicate(predicate, item)
//   );
//
//   if (existingItemIndex >= 0) {
//     return mergeIn(collection, existingItemIndex, item);
//   }
//
//   return [item, ...collection];
// }
//
// export function pushOrReplace(
//   collection,
//   item,
//   predicate = "id",
//   itemIndex = -1
// ) {
//   const existingItemIndex =
//     itemIndex >= 0
//       ? itemIndex
//       : _.findIndex(collection, getPredicate(predicate, item));
//
//   if (existingItemIndex >= 0) {
//     return replace(collection, existingItemIndex, item);
//   }
//
//   return [...collection, item];
// }
//
// export function concatOrMergeIn(collection = [], items, predicate = "id") {
//   return _.reduce(
//     items,
//     (result, item) => {
//       return pushOrMergeIn(result, item, getPredicate(predicate, item));
//     },
//     collection
//   );
// }
//
// /**
//  * avoids re-renders by using current value or initial state
//  * rather than a new empty object or array
//  * @param newValue
//  * @param currentValue
//  * @param initialValue
//  * @returns {*}
//  */
// export function setIfUpdated(newValue, currentValue, initialValue) {
//   if (!_.isNil(currentValue) && _.isEqual(newValue, currentValue)) {
//     return currentValue;
//   }
//
//   if (!_.isNil(initialValue) && _.isEmpty(newValue)) {
//     return initialValue;
//   }
//
//   return newValue;
// }

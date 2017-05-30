import React from "react";
import { getOriginData, getRatingData } from "./graphs.helpers";

describe("Graphs helpers", () => {
  let mock, result;

  beforeEach(mocks);

  describe("getOriginData", () => {
    it("should produce no data if the collection is empty", () => {
      result = getOriginData([]);

      expect(result).toEqual([]);
    });

    it("should reduce the collection to an array of objects with counts per origin", () => {
      result = getOriginData(mock.collection);

      expect(result).toEqual([{origin: mock.collection[0].origin, count: 1}]);
    });
  });

  xdescribe("getRatingData", () => {
    it("should produce no data if the collection is empty", () => {
      result = getRatingData([]);

      expect(result).toEqual([]);
    });
    
    it("should reduce the collection to an array of objects with counts per rating", () => {
      result = getRatingData(mock.collection);
    });
  });

  function mocks() {
    mock = {
      collection: [{
          origin: 'origin',
          rating: 1
      }]
    };
  }
});

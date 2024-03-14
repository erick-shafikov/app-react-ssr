/* import { getByDotKey } from "../utility/objects";
import { test, expect } from "vitest";

const obj = {
  a: {
    b: {
      c: 1,
    },
    e: 2,
  },
  d: 3,
};

test("Get by dot key function", () => {
  expect(getByDotKey(obj, "a.b.c")).equal(1);
  expect(getByDotKey(obj, "a.e")).equal(2);
  expect(getByDotKey(obj, "d")).equal(3);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrongKey: any = "a.d";
  expect(() => getByDotKey(obj, wrongKey)).toThrow();
});
 */

import { beforeEach, describe, expect, it } from "@jest/globals"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { load, loadString, save, saveString, clear, remove } from "."

const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

describe("AsyncStorage Storage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    await AsyncStorage.setItem("string", "string")
    await AsyncStorage.setItem("object", JSON.stringify(VALUE_OBJECT))
  })

  it("should be defined", () => {
    expect(AsyncStorage).toBeDefined()
  })

  it("should have default keys", async () => {
    await expect(AsyncStorage.getAllKeys()).resolves.toEqual(["string", "object"])
  })

  it("should load data", async () => {
    await expect(load<object>("object")).resolves.toEqual(VALUE_OBJECT)
    await expect(loadString("object")).resolves.toEqual(VALUE_STRING)

    await expect(load<string>("string")).resolves.toEqual("string")
    await expect(loadString("string")).resolves.toEqual("string")
  })

  it("should save strings", async () => {
    await saveString("string", "new string")
    await expect(loadString("string")).resolves.toEqual("new string")
  })

  it("should save objects", async () => {
    await save("object", { y: 2 })
    await expect(load<object>("object")).resolves.toEqual({ y: 2 })
    await save("object", { z: 3, also: true })
    await expect(load<object>("object")).resolves.toEqual({ z: 3, also: true })
  })

  it("should save strings and objects", async () => {
    await saveString("object", "new string")
    await expect(loadString("object")).resolves.toEqual("new string")
  })

  it("should remove data", async () => {
    await remove("object")
    await expect(load<object>("object")).resolves.toBeNull()
    await expect(AsyncStorage.getAllKeys()).resolves.toEqual(["string"])

    await remove("string")
    await expect(load<string>("string")).resolves.toBeNull()
    await expect(AsyncStorage.getAllKeys()).resolves.toEqual([])
  })

  it("should clear all data", async () => {
    await expect(AsyncStorage.getAllKeys()).resolves.toEqual(["string", "object"])
    await clear()
    await expect(AsyncStorage.getAllKeys()).resolves.toEqual([])
  })
})

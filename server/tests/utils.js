export const resetDb = async (db) => {
    await db("orders").del();
    await db("users").del();
    await db("products").del();
}
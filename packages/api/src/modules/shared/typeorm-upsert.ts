// import { getRepository, InsertResult } from "typeorm";
//
// /**
//  * Because typeorm doesn't support upsert yet
//  * https://github.com/typeorm/typeorm/issues/2363
//  *
//  * This is from https://gist.github.com/JeremyBernier/5683ebc8e83990a4d4e3d0abd1a9549d
//  *
//  * Upsert for TypeORM on PostgreSQL
//  * Returns InsertResult object (contains ID)
//  * @param repo Repository
//  * @param {object | object[]} data Data to upsert. Can be object or array
//  * @param {string} primaryKey Name of column that is primary key
//  * @returns {Promise<InsertResult>}
//  */
// export default function upsert(Entity, data, primaryKey: string): Promise<InsertResult> {
//   const repo = getRepository(Entity);
//   const row = Array.isArray(data) ? data[0] : data;
//   const keys = Object.keys(row);
//
//   if (keys.length < 1) {
//     throw new Error("Cannot upsert without any values specified");
//   }
//
//   const updateStr = keys.map(key => `"${key}" = EXCLUDED."${key}"`).join(",");
//
//   return repo
//     .createQueryBuilder()
//     .insert()
//     .values(data)
//     .onConflict(`("${primaryKey}") DO UPDATE SET ${updateStr}`)
//     .execute();
// }

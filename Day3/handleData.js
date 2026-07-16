import IndexedDb from "./indexedDB.js";
const sampleData = {
  id: 102,
  content: "Task 1",
};
let dbReadyResolve;
const tables = [
  { name: "todo", keyOptions: { keyPath: "id" } },
  { name: "inProgress", keyOptions: { keyPath: "id" } },
  { name: "completed", keyOptions: { keyPath: "id" } },
];

// const dbReadyPromise = new Promise((resolve) => {
//   dbReadyResolve = resolve;
// });
let db;
export async function init() {
 db = new IndexedDb("kanban", 1);
  await db.openDB(tables);
}
// init();
export function addData(tableName,data){
    db.addRecord(tableName,data)
    .then((resolve)=>console.log("added successfully"))
    .catch((err)=>console.log("error"));
}
export function deleteData(tableName,id){
    db.deleteRecord(tableName,id)
    .then((resolve)=>console.log("Deleted successfully"))
    .catch((err)=>console.error(err));
}
export function getAllData(tableName){
    // await dbReadyPromise();
    return db.getAll(tableName)
    .then((res)=>{return res})
    .catch((err)=>console.error(err));

}

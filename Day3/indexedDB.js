export default class IndexedDb {
  constructor(dbName,version) {
    this.db = null;
    this.version=version;
    
    this.dbName = dbName;
  }
  openDB(storenames) {
    console.log(this.version);
    return new Promise((resolve, reject) => {
        const request=indexedDB.open(this.dbName,this.version);
        request.onupgradeneeded=(event)=>{
            console.log(event);
            const dbInstance=event.target.result;
            storenames.forEach(store => {
                if(!dbInstance.objectStoreNames.contains(store.name)){
                    console.log(store);
                    dbInstance.createObjectStore(store.name,store.keyOptions);
                }
                
            });
        }
        request.onsuccess=(event)=>{
            this.db=request.result;
            resolve(event.target.result);
        }
        request.onerror=(error)=>{
            reject(error.target);
        }
    //   if(!this.version || this.version<1)
    //       this.version=1
    //   if (this.db) {
    //     if (this.db.objectStoreNames.contains(storename))
    //       return resolve(this.db);
    //     this.db.close();
    //     this.db = null;
    //     this.version=this.version+1;
    //   }
    //   console.log(this.version);
    //   const req = indexedDB.open(this.dbName, this.version);
    //   req.onupgradeneeded = (e) => {
    //     const db = e.target.result;
    //     if (!db.objectStoreNames.contains(storename)) {
    //       db.createObjectStore(storename, keyOptions);
    //       console.log(`${storename} created successfully`);
    //     }
    //   };
    //   req.onsuccess=(event)=>{
    //     this.db=event.target.result;
    //     console.log("success");
    //     console.log(this.db);
    //     resolve(this.db);
    //   };
    //   req.onerror=(event)=>{
    //     reject(event.target.error);

    //   };
    });
  }

  getRecord(storename,key){
    return new Promise((resolve,reject)=>{
      try{
      if(!this.db) throw new Error("db is null");
      const transaction=this.db.transaction([storename]);
      const store=transaction.objectStore(storename);
      const request=store.get(key);
      request.onerror=(error)=>{
        throw new Error(error.target.error);
      }
      request.onsuccess=()=>{
        console.log(request.result);
        resolve(request.result);
      }

    }catch(error){
      console.log(error);
      reject(error);
    }
    })
  }

  addRecord(storename,data){
   return new Promise((resolve,reject)=>{
     try{
      console.log(data);
      console.log(this.db);
      if(!this.db) throw new Error("db is null");
      const transaction=this.db.transaction([storename],"readwrite");
      const store=transaction.objectStore(storename);
      const request=store.add(data);
      request.onerror=(error)=>{
        // console.log(error.target.error);
       throw new Error(error.target.error);
      }
      request.onsuccess=(event)=>{
        console.log(event.result);
        resolve(event.result);
      }
    }catch(error){
      console.error(error.message);
      reject(error);
    }
   })
  }
  deleteRecord(storename,key){
    return new Promise((resolve,reject)=>{
      try{
        console.log("hello deleteRec",this.db);
        if(!this.db) throw new Error("db is null");
        const request=this.db.transaction([storename],"readwrite")
                      .objectStore(storename)
                      .delete(key);
        request.onsuccess=(event)=>{
          console.log("deleted successfully",event);
          resolve(event.result);
        }
        request.onerror=(error)=>{
          console.error(error.target.error);
          reject(error.target.error);

        }

      }catch(error){
        console.error(error.message);
        reject(error);
      }
    })
  }
  updateRecord(storename,key,updateVal){
    return new Promise((resolve,reject)=>{
      try{
        if(!this.db) throw new Error("db is null");
        const store=this.db
        .transaction([storename],"readwrite")
        .objectStore(storename);
        const request=store.get(key);
        request.onerror=(error)=>{
          console.log(error.target.error);
          reject(error.target.error);
        }
        request.onsuccess=(event)=>{
          const data=event.target.result;
          const updatedData={...data,...updateVal};
          const requestUpdate=store.put(updatedData);
          requestUpdate.onerror=(error)=>{
            console.log(error.target.error);
            reject(error.target.error);
          }
          requestUpdate.onsuccess=(event)=>{
            console.log("updated successfully",event);
            resolve(event.target.result);
          }
        }

      }catch(error){
        console.log(error.message);
        reject(error);
      }
    })
  }
  getAll(storename){
    return new Promise((resolve,reject)=>{
      try{
        console.log("hello getall",this.db);
        if(!this.db) throw new Error("db is null");
        const request=this.db.transaction([storename])
                      .objectStore(storename).getAll();
        request.onerror=(error)=>{
          console.error(error.target.error);
          reject(error.target.error);
        }
        request.onsuccess=(event)=>{
          console.log(event.target.result);
          resolve(event.target.result);
        }

      }catch(error){
        console.error(error.message);
        reject(error);
      }
    })

  }
}

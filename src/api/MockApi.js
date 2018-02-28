export class ContactApi {
    static data = [
        { Id: "1000", FirstName: "Susan", LastName: "Wilson", Email: "susan@gmail.com",Phone:"555-2234",Customer:{Id:"1000",Name:"Acme Industries"} },
        { Id: "1001", FirstName: "Bob", LastName: "Peterson", Email: "bob@gmail.com" ,Phone:"555-8954",Customer:{Id:"1002",Name:"Brownfield, Inc."} },
        { Id: "1002", FirstName: "Sam", LastName: "Gordon", Email: "sam@gmail.com",Phone:"555-3254",Customer:{Id:"1001",Name:"Active Manufacturing"}  }
    ]

    static get(id) {
        let data = this.data
        return new Promise((resolve, reject) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Id == id) {
                    return resolve(data[i]);
                }
            }
            reject("Could not find contact: " + id);
        })
    }

    static list(){
        return Promise.resolve(this.data);
    }
}

export class CustomerApi {
    static data = [
        {Id:"1000",Name:"Acme Industries"},
        {Id:"1001",Name:"Active Manufacturing"},
        {Id:"1002",Name:"Brownfield, Inc."}
    ];    

    static get(id) {
        let data = this.data
        return new Promise((resolve, reject) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Id == id) {
                    return resolve(data[i]);
                }
            }
            reject("Could not find customer: " + id);
        })        
    }

    static list(){
        return Promise.resolve(this.data);
    }    
}
const SearchRedux = require("./SearchRedux")
// @ponicode
describe("SearchRedux.performSearch", () => {
    test("0", () => {
        let callFunction = () => {
            SearchRedux.performSearch("Abruzzo", { searchTerm: "DROP TABLE tmp;" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            SearchRedux.performSearch("Abruzzo", { searchTerm: "UNLOCK TABLES;" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            SearchRedux.performSearch("Florida", { searchTerm: "UPDATE Projects SET pname = %s WHERE pid = %s" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            SearchRedux.performSearch("Florida", { searchTerm: "DROP TABLE tmp;" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            SearchRedux.performSearch("Île-de-France", { searchTerm: "UPDATE Projects SET pname = %s WHERE pid = %s" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            SearchRedux.performSearch(undefined, { searchTerm: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})

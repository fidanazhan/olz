
export const configAPI = {
    //For localhost
    // apiURL : "http://localhost:8081/"

    //For development
    apiURL: "http://157.245.202.166:8081/"

    //For production
    // apiURL : "http://157.245.202.166:8081/"
}

export const configEndpoint = {

    signIn: "auth/signin",
    
    // Operator User API
    getListOperatorUsers: "api/user/operators",
    getSpecificOperatorUser: "api/user/operator",
    createOperatorUser: "api/user/operator/create",
    updateOperatorUser: "api/user/operator/update",

    // Owner User API
    getListOwnerUsers: "api/user/owners",
    getSpecificOwnerUser: "api/user/owner",
    createOwnerUser: "api/user/owner/create",
    updateOwnerUser: "api/user/owner/update",

    // Station API
    getListStations: "api/stations",
    getSpecificStation: "api/station",
    createStation: "api/station/create",
    updateStation: "api/station/update",

    // Pump API
    getListPumpsBasedOnStationId: "api/pumps",
    getSpecificPump: "api/pump",
    createPump: "api/pump/create",
    updatePump: "api/pump/update",

    // Nozzle API
    getSpecificNozzle: "api/nozzle",
    createNozzle: "api/nozzle/create",
    updateNozzle: "api/nozzle/update",

    // Tank API
    getListTanksBasedOnStationId: "api/tanks",
    getSpecificTank: "api/tank",
    createTank: "api/tank/create",
    updateTank: "api/tank/update",

    // Product API
    getListProductBasedOnOwnerId: "api/products",
    getSpecificProduct: "api/product",
    createProduct: "api/product/create",
    updateProduct: "api/product/update",

    // Operator API
    getListOperators: "api/operators",
    getSpecificOperator: "api/operator",
    createOperator: "api/operator/create",
    updateOperator: "api/operator/update",

    // Owner API
    getListOwners: "api/owners",
    getSpecificOwner: "api/owner",
    createOwner: "api/owner/create",
    updateOwner: "api/owner/update",

    // TemporaryTableHeader API
    getSpecificTempTableHeader: "api/tempTableHeader",
    updateTempTableHeader: "api/tempTableHeader/update",

    // TemporaryTableDetail API
    getListTempTableDetailBasedOnHeaderId: "api/tempListTableDetail",
    getSpecificTempTableDetail: "api/tempTableDetail",
    updateTempTableDetail: "api/tempTableDetail/update"



}
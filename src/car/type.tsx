export type carObjectType = {
    id : string
    createdAt : string
    lastUpdatedAt : string
    carRegistrationNumber : string
    carBrand : string
    carModel : string
    note     : string
};

export type minorResReadCar = {
    records : carObjectType[]
    totalPage : number
}

export type resReadCar = {
    success : boolean
    message : string
    data    : 
}
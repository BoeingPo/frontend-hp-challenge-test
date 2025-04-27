export type carObjectType = {
    id : string
    createdAt : string
    lastUpdatedAt : string
    carRegistrationNumber : string
    carBrand : string
    carModel : string
    note?     : string
};

export type paginationType = {
    page : number,
    pageSize : number
}

export type insertCarObjectType = {
    carRegistrationNumber : string
    carBrand : string
    carModel : string
    note?     : string
}

export type updateCarObjectType = {
    carBrand : string
    carModel : string
    note?     : string
}

export type minorResReadCar = {
    records : carObjectType[]
    totalPage : number
}

export type resReadCar = {
    success : boolean
    message : string
    data    : minorResReadCar
}

export type resCreateCar = {
    success : boolean
    message : string
    data    : carObjectType
}
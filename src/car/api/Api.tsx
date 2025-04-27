
import {baseUrl} from "../../../config.ts"
import { carObjectType ,insertCarObjectType, resCreateCar, resReadCar, updateCarObjectType } from "../type.tsx"



export const fetchCarList = async (page : number,pageSize : number) : Promise<resReadCar> => {
    const res = await fetch(`${baseUrl}/car/read-car?currentPage=${page}&pageSize=${pageSize}`)
    const data = await res.json()
    return data
}

export const createCarReqest = async (carObjectType :insertCarObjectType) : Promise<resCreateCar> => {
    console.log(carObjectType)
    
    const res = await fetch(`${baseUrl}/car/create-car`,{
        method:"POST",
        headers :{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carObjectType)
    })

    if(!res.ok){
        throw new Error("Failed to create Car collection")
    }
    
    const data = await res.json();
    return data
}

export const updateCarRequest = async (carObjectType :carObjectType) : Promise<resCreateCar> => {
    
    const body:updateCarObjectType = {
        carBrand : carObjectType.carBrand,
        carModel : carObjectType.carModel,
        note : carObjectType.note
    }
    
    const res = await fetch(`${baseUrl}/car/update-car/${carObjectType.id}`,{
        method:"PATCH",
        headers :{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if(!res.ok){
        throw new Error("Failed to update Car collection")
    }
    
    const data = await res.json();
    return data
}

export const deleteCarRequest = async (carObjectType :carObjectType) : Promise<resCreateCar> => {
    
    const res = await fetch(`${baseUrl}/car/delete-car/${carObjectType.id}`,{
        method:"DELETE",
        headers :{
            'Content-Type': 'application/json'
        }
    })

    if(!res.ok){
        throw new Error("Failed to delete Car collection")
    }
    
    const data = await res.json();
    return data
}


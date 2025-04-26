
import {baseUrl} from "../../../config.ts"
import {  insertCarObjectType, resCreateCar, resReadCar } from "../type.tsx"



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

import {baseUrl} from "../../../config.ts"
import { carObjectType } from "../type.tsx"



export const fetchCarList = async (page : string,pageSize : string) : Promise<carObjectType[]> => {

    const res = await fetch(`${baseUrl}/car/read-car?currentPage=${page}&pageSize=${pageSize}`)
    const data = await res.json()
    return data
}
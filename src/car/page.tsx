import React, { useMemo } from "react";

import { mockData } from "./mockData";
import { TableCarComponent } from "./components/TableComponent";

export const CarView = () => {
    console.log(mockData)



    return(
        <div className="flex flex-col">
            <div className="flex text-6xl">Car collection</div>
            <TableCarComponent dataTable={[]}/>
        </div>
    )
};
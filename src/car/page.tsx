import {  useCallback, useEffect, useState } from "react";

import { TableCarComponent } from "./components/TableComponent";
import { fetchCarList } from "./api/Api";
import {
  carObjectType,
  paginationType,
  resReadCar,
} from "./type";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { SheetComponent } from "./components/SheetComponent";
import { CarContext } from "../context-api/CarProvider";

//enum for pagination
const pageDirectionEnum = {
  forward: "fw",
  fullforward: "ffw",
  backward: "bw",
  fullbackward: "fbw",
};

const pageSizeArray = [5,10,15,20,25];

export const CarView = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [carTableData, setCarTableData] = useState<carObjectType[]>([]);

  const paginationData : paginationType = {
    page : currentPage,
    pageSize : pageSize
  }

  //<------- API ----------->//

  const fetchData = useCallback(async ():Promise<void> => {
    const response: resReadCar = await fetchCarList(currentPage, pageSize);
    setCarTableData(response.data.records);
    setTotalPage(response.data.totalPage);
  },[currentPage,pageSize]);

  //<------- function ------->//
  const changePage = (pageDirection: string): void => {
    if (pageDirection === "fw") {
      setCurrentPage(currentPage + 1);
    } else if (pageDirection === "ffw") {
      setCurrentPage(totalPage);
    } else if (pageDirection === "bw") {
      setCurrentPage(currentPage - 1);
    } else if (pageDirection === "fbw") {
      setCurrentPage(1);
    } else {
      console.error("error pagination");
    }
  };

  //<------- useEffect ------>//
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData,currentPage]);


  useEffect(() => {
    console.log(carTableData);
  }, [carTableData]);

  return (
    <div className="flex flex-col p-5">
      <CarContext.Provider value={{fetchData}}>
      <div className="flex">
        <div className="text-6xl font-semibold p-5 rounded-3xl shadow-2xl bg-white">
        Car collection
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Sheet>
            <SheetTrigger className="font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg">
            + Insert New Car Info
            </SheetTrigger>
            <SheetContent>
                <SheetComponent onSuccess={fetchData}/>
            </SheetContent>
        </Sheet>
      </div>
      <div className="flex min-h-[70vh] max-h-[70vh] overflow-y-auto justify-center">
      <TableCarComponent dataTable={carTableData} paginationInfo={paginationData}/>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="disabled:opacity-15"
          onClick={() => {
            changePage(pageDirectionEnum.fullbackward);
          }}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className="disabled:opacity-15"
          onClick={() => {
            changePage(pageDirectionEnum.backward);
          }}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <div className="flex justify-center items-center mx-5 text-xl bg-gray-50 px-2 rounded-md">
          {currentPage}/{totalPage}
        </div>
        <button
          className="disabled:opacity-15"
          onClick={() => {
            changePage(pageDirectionEnum.forward);
          }}
          disabled={currentPage === totalPage}
        >
          {">"}
        </button>
        <button
          className="disabled:opacity-15"
          onClick={() => {
            changePage(pageDirectionEnum.fullforward);
          }}
          disabled={currentPage === totalPage}
        >
          {">>"}
        </button>
        <select
          value={pageSize}
          onChange={(e) => {setPageSize(Number(e.target.value))}}
          className="border p-2 rounded"
        >
          <option value="">Select a car brand</option>
          {pageSizeArray.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
      </CarContext.Provider>
    </div>
  );
};

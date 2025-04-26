import { useEffect, useState } from "react";

import { mockData } from "./mockData";
import { TableCarComponent } from "./components/TableComponent";
import { createCarReqest, fetchCarList } from "./api/Api";
import {
  carObjectType,
  insertCarObjectType,
  resCreateCar,
  resReadCar,
} from "./type";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { SheetComponent } from "./components/SheetComponent";

//enum for pagination
const pageDirectionEnum = {
  forward: "fw",
  fullforward: "ffw",
  backward: "bw",
  fullbackward: "fbw",
};

export const CarView = () => {
  console.log(mockData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [carTableData, setCarTableData] = useState<carObjectType[]>([]);

  const [createCarObject, setCreateCarObject] = useState<insertCarObjectType>(
    {}
  );

  //<------- API ----------->//

  const fetchData = async ():Promise<void> => {
    const response: resReadCar = await fetchCarList(currentPage, pageSize);
    setCarTableData(response.data.records);
    setTotalPage(response.data.totalPage);
  };

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
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    console.log(carTableData);
  }, [carTableData]);

  return (
    <div className="flex flex-col">
      <div className="flex text-6xl">Car collection</div>
      <div className="flex flex-row justify-end">
        <Sheet>
            <SheetTrigger className="font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg">
            + Insert New Car Info
            </SheetTrigger>
            <SheetContent>
                <SheetComponent/>
            </SheetContent>
        </Sheet>
      </div>
      <TableCarComponent dataTable={carTableData} />
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
        <div className="flex justify-center align-middle mx-5 text-xl">
          {currentPage}
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
      </div>
    </div>
  );
};

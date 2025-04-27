import { SheetHeader } from "@/components/ui/sheet";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { carObjectType, resCreateCar } from "../type";
import { updateCarRequest } from "../api/Api";
import { useContext, useState } from "react";
import { CarContext } from "../../context-api/CarProvider";

const schema = z.object({
  carBrand: z.string().min(1, "Car Brand is required"),
  carModel: z.string().min(1, "Car Model is required"),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type updateDataType = {
  updateData: carObjectType;
};

export const SheetUpdateComponent = ({ updateData }: updateDataType) => {
  const [showSuccessCreated, setShowSuccessCreated] = useState<boolean>(false);
  const [showErrorCreated, setShowErrorCreated] = useState<boolean>(false);

const {fetchData} = useContext(CarContext)!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:{
        carBrand : updateData.carBrand ,
        carModel :  updateData.carModel,
        note : updateData.note
    },
    resolver: zodResolver(schema),
  });

  const updateCar = async (updateObject: carObjectType): Promise<void> => {
    try {
      const response: resCreateCar = await updateCarRequest(updateObject);

      if (response.success) {
        console.log("Success updated");
        setShowSuccessCreated(true);
        reset();
        fetchData();
      }
    } catch (error) {
      console.error(`Request Failed ${error}`);
      setShowErrorCreated(true);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    const updateOject : carObjectType = {
    ...updateData,
    carBrand : data.carBrand,
    carModel : data.carModel,
    note     : data.note
    }

    updateCar(updateOject);
  };

  return (
    <div className="flex flex-col pl-6 gap-5">
      <SheetHeader className="text-3xl font-bold">Update Exist Car</SheetHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-64"
      >
        <div>
          <input
            value={updateData.carRegistrationNumber}
            readOnly
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <input
            {...register("carBrand")}
            onChange={() => {
              setShowSuccessCreated(false);
              setShowErrorCreated(false);
            }}
            placeholder="Car Brand"
            className="border p-2 rounded w-full"
          />
          {errors.carBrand && (
            <p className="text-red-500 text-sm">{errors.carBrand.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("carModel")}
            onChange={() => {
              setShowSuccessCreated(false);
              setShowErrorCreated(false);
            }}
            placeholder="Car Model"
            className="border p-2 rounded w-full"
          />
          {errors.carModel && (
            <p className="text-red-500 text-sm">{errors.carModel.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("note")}
            onChange={() => {
              setShowSuccessCreated(false);
              setShowErrorCreated(false);
            }}
            placeholder="Note"
            className="border p-2 rounded w-full"
          />
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="font-bold py-2 px-4 rounded shadow-md hover:shadow-lg"
        >
          Submit
        </button>
      </form>
      {showSuccessCreated ? (
        <div className="text-green-400">Successfully Insert New Data </div>
      ) : (
        <></>
      )}
      {showErrorCreated ? (
        <div className="text-red-500">Duplicate Car Registration Number</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

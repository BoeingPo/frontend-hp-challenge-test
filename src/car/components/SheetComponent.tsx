import {
  SheetHeader,
} from "@/components/ui/sheet";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCarObjectType, resCreateCar } from "../type";
import { createCarReqest } from "../api/Api";
import { useState } from "react";

const schema = z.object({
  carRegistrationNumber: z
    .string()
    .min(3, "Car Registration Number is required")
    .max(7, "Car Registration Number must not exceed 7 characters"),
  carBrand: z.string().min(1, "Car Brand is required"),
  carModel: z.string().min(1, "Car Model is required"),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type SheetComponentProps = {
  onSuccess: () => void;
};

export const SheetComponent = ({ onSuccess }: SheetComponentProps) => {
  const [showSuccessCreated, setShowSuccessCreated] = useState<boolean>(false);
  const [showErrorCreated, setShowErrorCreated] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const creatCar = async (insertObject: insertCarObjectType): Promise<void> => {
    try {
      const response: resCreateCar = await createCarReqest(insertObject);

      if (response.success) {
        console.log("Success created");
        setShowSuccessCreated(true);
        reset();
        onSuccess();
      }
    } catch (error) {
      console.error(`Request Failed ${error}`);
      setShowErrorCreated(true);
    }
  };

  const onSubmit = (data: FormData) => {
    creatCar(data);
  };

  return (
    <div className="flex flex-col pl-6 gap-5">
      <SheetHeader className="text-3xl font-bold">Insert New Car</SheetHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-64"
      >
        <div>
          <input
            {...register("carRegistrationNumber")}
            onChange={() => {
              setShowSuccessCreated(false);
              setShowErrorCreated(false);
            }}
            placeholder="Car Registration Number"
            className="border p-2 rounded w-full"
          />
          {errors.carRegistrationNumber && (
            <p className="text-red-500 text-sm">
              {errors.carRegistrationNumber.message}
            </p>
          )}
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

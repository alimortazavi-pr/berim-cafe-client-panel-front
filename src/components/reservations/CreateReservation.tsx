import { useState } from "react";

//Types
import { IReservationForm } from "@/common/interfaces/reservations.interface";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { createReservation } from "@/store/reservations/actions";

//Validators
import { createReservationValidator } from "@/validators/reservation.validator";

//Tools
import { Formik } from "formik";
import { toast } from "react-toastify";
import { Button, Input, Loading } from "@nextui-org/react";
import { Reserve } from "iconsax-react";

const CreateReservation = () => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [initialReservationFrom, setInitialReservationFrom] =
    useState<IReservationForm>({
      from: "",
      to: "",
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Functions
  async function formSubmitHandler(values: IReservationForm) {
    setIsLoading(true);
    try {
      await dispatch(createReservation(values));
      toast.success("رزرو با موفقیت ایجاد شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      setInitialReservationFrom({
        from: "",
        to: "",
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <Formik
      onSubmit={formSubmitHandler}
      initialValues={initialReservationFrom}
      validationSchema={createReservationValidator}
      enableReinitialize={true}
    >
      {(formikProps) => (
        <form
          onSubmit={formikProps.handleSubmit}
          className="w-full p-5 bg-white rounded-2xl shadow mb-2"
        >
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1">
              <Input
                label="از ساعت"
                type="time"
                bordered
                width="100%"
                status={
                  formikProps.touched.from && formikProps.errors.from
                    ? "error"
                    : undefined
                }
                color={
                  formikProps.touched.from && formikProps.errors.from
                    ? "error"
                    : undefined
                }
                helperColor={
                  formikProps.touched.from && formikProps.errors.from
                    ? "error"
                    : undefined
                }
                helperText={
                  formikProps.touched.from && formikProps.errors.from
                    ? formikProps.errors.from
                    : undefined
                }
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
                value={formikProps.values.from}
                name="from"
              />
            </div>
            <div className="flex-1">
              <Input
                type="time"
                label="تا ساعت"
                bordered
                width="100%"
                status={
                  formikProps.touched.to && formikProps.errors.to
                    ? "error"
                    : undefined
                }
                color={
                  formikProps.touched.to && formikProps.errors.to
                    ? "error"
                    : undefined
                }
                helperColor={
                  formikProps.touched.to && formikProps.errors.to
                    ? "error"
                    : undefined
                }
                helperText={
                  formikProps.touched.to && formikProps.errors.to
                    ? formikProps.errors.to
                    : undefined
                }
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
                value={formikProps.values.to}
                name="to"
              />
            </div>
          </div>
          <div className="flex justify-end gap-1">
            <Button
              color={"success"}
              className="w-full md:w-6/12 xl:w-3/12"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading color="currentColor" size="sm" />
              ) : (
                <span className="flex items-center gap-1 leading-none">
                  <Reserve size="17" />
                  افزودن
                </span>
              )}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreateReservation;

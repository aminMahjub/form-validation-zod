import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}

type FomrDataErrorHanldingHelper<DataObj> = keyof DataObj;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const formErrorHandles = (
    formData: FomrDataErrorHanldingHelper<{ name: string; age: number }>,
    errorMsg: string,
    errorType: string
  ) => {
    return (
      errors[formData]?.type === errorType && (
        <div className="alert alert-error mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )
    );
  };

  console.log(errors);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form
      action="#"
      method="post"
      className="p-4 grid justify-items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label htmlFor="name" className="text-lg font-bold block">
          Name
        </label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          className="input input-bordered input-accent w-full max-w-x"
        />
        {formErrorHandles('name', 'Please input the name', 'required')}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="text-lg font-bold block">
          Age
        </label>
        <input
          type="numbre"
          id="age"
          {...register("age")}
          className="appearance-none input input-bordered input-accent w-full max-w-x"
        />
      </div>

      <button disabled={!isValid} type="submit" className="btn btn-outline btn-info">
        Submit
      </button>
    </form>
  );
};

export default Form;

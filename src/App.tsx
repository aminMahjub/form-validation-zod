import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { countryCode } from "./country-cdoe";
import { ChangeEvent, useRef } from "react";

const schema = z.object({
  username: z.string().min(1 ,{message: 'This filed is REQUIRED'}).max(10, {message: 'Input should contains at least 10 characters'}).trim(),
  email: z.string().min(1, {message: 'This filed is REQUIRED'}).email('Invalid email address'),
  password: z
    .string().min(1,{message: 'This filed is REQUIRED'})
    .min(8, { message: "Must be 8 or more characters long" })
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Must have one special characters !#$%&()*+,-./:;<=>?@[]\\^_`{|}~ at least"
    ),
  phoneCountryCode: z.string(),
  phoneNumber: z.string().min(1,{message: 'This filed is REQUIRED'}),
  dateBirth: z.string(),
  gender: z.union([z.literal("Male"), z.literal("Femal")]),
  accpetTerm: z.literal(true, {invalid_type_error: "You must accept Terms and Conditions."}),
});

type FormData = z.infer<typeof schema>;

const App = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = (data: FieldValues) =>
    console.log(data);

  return (
    <main className="px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="max-w-2xl m-auto mt-12 px-20 pt-4 pb-10 border-2 border-solid border-cyan-500 rounded-xl"
      >
        <h1 className="text-center text-5xl mt-5 mb-14">Sign Up</h1>

        <div className="mb-5">
          <label htmlFor="username" className="block text-3xl mb-2">
            Username
          </label>
          <input
            type="text"
            {...register("username", {required: true})}
            id="username"
            name="username"
            className="input input-bordered input-info w-full max-w-full rounded-lg"
          />
          {errors.username && (
            <p className="none text-rose-600 mt-2 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-3xl mb-2">
            Email
          </label>
          <input
            className="input input-bordered input-info w-full max-w-full rounded-lg"
            type="email"
            id="email"
            {...register("email")}
            name="email"
            placeholder="email e.g example@gmail.com"
          />
          {errors.email && (
            <p className="none text-rose-600 mt-2 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-3xl mb-2">
            Password
          </label>
          <input
            className="input input-bordered input-info w-full max-w-full rounded-lg"
            type="password"
            id="password"
            {...register("password")}
            name="password"
            placeholder="password"
          />
          {errors.password && (
            <p className="none text-rose-600 mt-2 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="phoneNumber" className="block text-3xl mb-2">
            Phone Number
          </label>
          <div className="flex justify-center items-center gap-1">
            <select
              id="countryCode"
              className="select select-accent rounded-lg text-md"
              {...register('phoneCountryCode')}
            >
              {countryCode.map((code) => {
                return (
                  <option key={code.code} value={code.dial_code}>
                    {code.dial_code}
                  </option>
                );
              })}
            </select>
            <input
              className="appearance-none input input-bordered input-info w-full max-w-full rounded-lg"
              type="text"
              id="phoneNumber"
              {...register("phoneNumber")}
              name="phoneNumber"
              placeholder="e.g +989031243172"
            />
          </div>
          {errors.phoneNumber && (
            <p className="none text-rose-600 mt-2 text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="mb-5 flex justify-between items-center flex-wrap">
          <div className="basis-64">
            <label htmlFor="birhtDate" className="block text-3xl mb-2">
              Birth Date
            </label>
            <input
              {...register("dateBirth")}
              className="input input-bordered input-info w-full max-w-full rounded-lg"
              type="date"
              name="dateBirth"
              id="birhtDate"
              max={new Date().toISOString().slice(0, 10)}
            />
            {errors.dateBirth && (
              <p className="none text-rose-600 mt-2 text-sm">
                {errors.dateBirth.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="userGender" className="block text-3xl mb-2">
              Gender
            </label>
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="userGender"
              value="Male"
              checked
            />
            <span className="mx-2">Male</span>

            <input
              type="radio"
              {...register("gender")}
              name="gender"
              id="userGender"
              value="Female"
            />
            <span className="ml-2">Female</span>
          </div>
        </div>

        <input
          type="checkbox"
          {...register("accpetTerm")}
          name="accpetTerm"
          id="acceptTerms"
        />
        <span className="ml-2">I agree to the Terms and Conditions</span>
        {errors.accpetTerm && (
          <p className="none text-rose-600 mt-2 text-sm">
            {errors.accpetTerm.message}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-outline btn-primary mt-4 w-full rounded-lg"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default App;

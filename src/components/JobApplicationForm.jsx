import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";


// ✅ Schema validation
const schema = yup.object({
  fullName: yup.string().required("ชื่อห้ามว่างค่ะลูก"),
  email: yup.string().email("อีเมลไม่ถูกต้อง").required("อีเมลจำเป็นค่ะ"),
  phone: yup.string().required("เบอร์โทรห้ามว่าง"),
  position: yup.string().required("กรุณาเลือกตำแหน่งที่ต้องการสมัคร"),
  experience: yup.string().required("ใส่ประสบการณ์มานิดนึงลูก"),
  workPermit: yup.boolean(),
  permitNumber: yup.string().when("workPermit", {
    is: true,
    then: (schema) => schema.required("ใส่เลข Work Permit ด้วยค่ะ"),
  }),
  agree: yup.boolean().oneOf([true], "ต้องยอมรับข้อตกลงก่อนค่ะ"),
});

export default function JobApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("ส่งใบสมัครเรียบร้อยแล้วค่ะ 💼✨");
      console.log(data);
      setIsSubmitting(false);
      reset();
    }, 2000);
  };

  const hasWorkPermit = watch("workPermit");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white shadow p-6 rounded space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">📄 ฟอร์มสมัครงาน</h2>

      <div>
        <label>ชื่อ-นามสกุล</label>
        <input {...register("fullName")} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300;" />
        <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
      </div>

      <div>
        <label>อีเมล</label>
        <input {...register("email")} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300;" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      <div>
        <label>เบอร์โทร</label>
        <input {...register("phone")} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300;" />
        <p className="text-red-500 text-sm">{errors.phone?.message}</p>
      </div>

      <div>
        <label>ตำแหน่งที่ต้องการสมัคร</label>
        <select {...register("position")} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300;">
          <option value="">-- เลือกตำแหน่ง --</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Full Stack Developer</option>
        </select>
        <p className="text-red-500 text-sm">{errors.position?.message}</p>
      </div>

      <div>
        <label>ประสบการณ์ทำงาน</label>
        <textarea {...register("experience")} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300;" />
        <p className="text-red-500 text-sm">{errors.experience?.message}</p>
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" {...register("workPermit")} />
        <label>มีใบอนุญาตทำงานในสิงคโปร์</label>
      </div>

      {hasWorkPermit && (
        <div>
          <label>เลข Work Permit</label>
          <input {...register("permitNumber")} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300;" />
          <p className="text-red-500 text-sm">{errors.permitNumber?.message}</p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input type="checkbox" {...register("agree")} />
        <label>ฉันยอมรับข้อตกลงในการสมัครงาน</label>
      </div>
      <p className="text-red-500 text-sm">{errors.agree?.message}</p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "กำลังส่ง..." : "ส่งใบสมัคร"}
      </button>
    </form>
  );
}

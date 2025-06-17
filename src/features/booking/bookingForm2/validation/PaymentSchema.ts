import * as yup from "yup";

export const paymentSchema=yup.object().shape({
  id:yup.string().optional(),
  touristId:yup.string().optional(),
  amount:yup.number().required("El campo es requerido").positive("Debe ser un valor positivo").typeError("Debe ser un numero valido"),
  paymentDate:yup.string().required("El campo es requerido"),
  paymentProofImage:yup.mixed<File>()
  .nullable()
  .when("paymentMethod",{
    is:(method:string)=>method==="bank_transfer",
    then:(schema)=>schema.required("El comprobante es obligatorio")
    .test("fileType","Formato no valido",(value)=>{
      if(!value){
        return false;
      }
      const allowedTypes=["image/jpeg","image/png","image/jpg","image/webp"];
      return allowedTypes.includes(value.type);
    })
    .test("fileSize","El archivo debe ser menor a 2 MB",(value)=>{
      return value ? value.size<=2*1024*1024 : true;
    }),
    otherwise:(schema)=>schema.notRequired()
  })
})

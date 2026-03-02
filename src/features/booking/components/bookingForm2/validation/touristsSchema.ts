import * as yup from "yup";
import { touristItemSchema } from "./touristItemSchema";

export const touristsSchema = yup.object({
  tourists: yup
    .array()
    .of(touristItemSchema)
    .min(1)
    .test("document-unique", "Hay documentos duplicados", (tourists) => {
      if (!tourists) return true;

      const docs = tourists
        .map((t) => (t.documentType === "ci" ? t.ci : t.passportNumber))
        .filter(Boolean);

      return new Set(docs).size === docs.length;
    }),
});

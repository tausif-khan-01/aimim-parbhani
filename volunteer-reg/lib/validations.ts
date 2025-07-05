import * as yup from "yup"
import { TALUKAS, AGE_GROUPS, EDUCATION_LEVELS } from "./constants"

export const volunteerSchema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  taluka: yup.string().required("Please select your Taluka").oneOf(TALUKAS, "Please select a valid Taluka"),
  age_group: yup.string().required("Please select your age group").oneOf(AGE_GROUPS, "Please select a valid age group"),
  education: yup
    .string()
    .required("Please select your education level")
    .oneOf(EDUCATION_LEVELS, "Please select a valid education level"),
  occupation: yup.string().required("Occupation is required").min(2, "Occupation must be at least 2 characters"),
  prabhag: yup.string().required("Prabhag is required").min(2, "Prabhag must be at least 2 characters"),
  strengthen_party: yup
    .string()
    .required("Please describe how you can strengthen the party")
    .min(10, "Please provide at least 10 characters"),
  ready_to_join: yup
    .string()
    .required("Please select if you are ready to join AIMIM Parbhani")
    .oneOf(["yes", "no"], "Please select Yes or No"),
})

export type VolunteerFormData = yup.InferType<typeof volunteerSchema>

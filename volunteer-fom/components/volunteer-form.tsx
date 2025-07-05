"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { TALUKAS, AGE_GROUPS, EDUCATION_LEVELS, WHATSAPP_GROUPS } from "@/lib/constants"

interface VolunteerFormData {
  name: string
  mobile: string
  taluka: string
  age_group: string
  education: string
  occupation: string
  prabhag: string
  strengthen_party: string
  ready_to_join: string
}

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "duplicate">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [selectErrors, setSelectErrors] = useState<{
    taluka?: string
    age_group?: string
    education?: string
    ready_to_join?: string
  }>({})

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<VolunteerFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      mobile: "",
      taluka: "",
      age_group: "",
      education: "",
      occupation: "",
      prabhag: "",
      strengthen_party: "",
      ready_to_join: "",
    },
  })

  const selectedTaluka = watch("taluka")

  const onSubmit = async (data: VolunteerFormData) => {
    // Validate select fields
    const newSelectErrors: typeof selectErrors = {}

    if (!data.taluka) newSelectErrors.taluka = "Please select your Taluka"
    if (!data.age_group) newSelectErrors.age_group = "Please select your age group"
    if (!data.education) newSelectErrors.education = "Please select your education level"
    if (!data.ready_to_join) newSelectErrors.ready_to_join = "Please select if you are ready to join"

    if (Object.keys(newSelectErrors).length > 0) {
      setSelectErrors(newSelectErrors)
      return
    }

    setSelectErrors({})
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      console.log("Submitting form data:", data)

      // Transform data to match database schema
      const transformedData = {
        name: data.name,
        mobile: data.mobile,
        taluka: data.taluka,
        age_group: data.age_group,
        education: data.education,
        occupation: data.occupation,
        prabhag: data.prabhag,
        strengthen_party: data.strengthen_party,
        ready_to_join: data.ready_to_join,
      }

      console.log("Transformed data:", transformedData)

      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)

        try {
          const result = JSON.parse(errorText)
          if (response.status === 409) {
            setSubmitStatus("duplicate")
            setErrorMessage("You have already registered with this mobile number.")
          } else {
            setSubmitStatus("error")
            setErrorMessage(result.error || "Registration failed. Please try again.")
          }
        } catch (parseError) {
          setSubmitStatus("error")
          setErrorMessage("Server error. Please try again later.")
        }
        return
      }

      const result = await response.json()
      console.log("Success result:", result)

      setSubmitStatus("success")
      reset()

      // Redirect to WhatsApp group after 2 seconds
      setTimeout(() => {
        const whatsappGroup = WHATSAPP_GROUPS.find((group) => group.taluka === data.taluka)
        if (whatsappGroup) {
          window.open(whatsappGroup.group_link, "_blank")
        }
      }, 2000)
    } catch (error) {
      console.error("Network error:", error)
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-700">Registration Successful!</h3>
              <p className="text-sm text-gray-600 mt-2">
                Thank you for joining AIMIM Parbhani. You will be redirected to your Taluka WhatsApp group shortly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-700">AIMIM Volunteer Registration</CardTitle>
        <p className="text-gray-600">Join us to strengthen the party in Parbhani district</p>
      </CardHeader>
      <CardContent>
        {(submitStatus === "error" || submitStatus === "duplicate") && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name / नाव *</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
                placeholder="Enter your full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile / WhatsApp Number *</Label>
              <Input
                id="mobile"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
                placeholder="10-digit mobile number"
                className={errors.mobile ? "border-red-500" : ""}
              />
              {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>City / Taluka *</Label>
              <Select
                onValueChange={(value) => {
                  setValue("taluka", value)
                  setSelectErrors((prev) => ({ ...prev, taluka: undefined }))
                }}
              >
                <SelectTrigger className={selectErrors.taluka ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your Taluka" />
                </SelectTrigger>
                <SelectContent>
                  {TALUKAS.map((taluka) => (
                    <SelectItem key={taluka} value={taluka}>
                      {taluka}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectErrors.taluka && <p className="text-sm text-red-500">{selectErrors.taluka}</p>}
            </div>

            <div className="space-y-2">
              <Label>Age Group *</Label>
              <Select
                onValueChange={(value) => {
                  setValue("age_group", value)
                  setSelectErrors((prev) => ({ ...prev, age_group: undefined }))
                }}
              >
                <SelectTrigger className={selectErrors.age_group ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  {AGE_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectErrors.age_group && <p className="text-sm text-red-500">{selectErrors.age_group}</p>}
            </div>

            <div className="space-y-2">
              <Label>Education *</Label>
              <Select
                onValueChange={(value) => {
                  setValue("education", value)
                  setSelectErrors((prev) => ({ ...prev, education: undefined }))
                }}
              >
                <SelectTrigger className={selectErrors.education ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectErrors.education && <p className="text-sm text-red-500">{selectErrors.education}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation *</Label>
              <Input
                id="occupation"
                {...register("occupation", {
                  required: "Occupation is required",
                  minLength: { value: 2, message: "Occupation must be at least 2 characters" },
                })}
                placeholder="Your occupation"
                className={errors.occupation ? "border-red-500" : ""}
              />
              {errors.occupation && <p className="text-sm text-red-500">{errors.occupation.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prabhag">Prabhag / प्रभाग *</Label>
            <Input
              id="prabhag"
              {...register("prabhag", {
                required: "Prabhag is required",
                minLength: { value: 2, message: "Prabhag must be at least 2 characters" },
              })}
              placeholder="Enter your Prabhag"
              className={errors.prabhag ? "border-red-500" : ""}
            />
            {errors.prabhag && <p className="text-sm text-red-500">{errors.prabhag.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="strengthen_party">
              How can you strengthen the party? / आप किस तरह पार्टी को मज़बूत कर सकते हैं? *
            </Label>
            <Textarea
              id="strengthen_party"
              {...register("strengthen_party", {
                required: "Please describe how you can strengthen the party",
                minLength: { value: 10, message: "Please provide at least 10 characters" },
              })}
              placeholder="Describe how you can contribute to strengthening AIMIM..."
              rows={4}
              className={errors.strengthen_party ? "border-red-500" : ""}
            />
            {errors.strengthen_party && <p className="text-sm text-red-500">{errors.strengthen_party.message}</p>}
          </div>

          <div className="space-y-3">
            <Label>Are you ready to join AIMIM Parbhani? *</Label>
            <RadioGroup
              onValueChange={(value) => {
                setValue("ready_to_join", value)
                setSelectErrors((prev) => ({ ...prev, ready_to_join: undefined }))
              }}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
            {selectErrors.ready_to_join && <p className="text-sm text-red-500">{selectErrors.ready_to_join}</p>}
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register as Volunteer"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

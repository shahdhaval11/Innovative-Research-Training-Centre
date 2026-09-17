"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { X, UploadCloud, CheckCircle2 } from "lucide-react";

const PAYMENT_QR_CODE_SRC = "/media/payment-qr-code.svg";
const MAX_SCREENSHOT_SIZE_MB = 5;

const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;

const CURRENT_STATUS_OPTIONS = [
  "Undergraduate Student",
  "Postgraduate Student",
  "Ph.D. Scholar",
  "Faculty / Academician",
  "Researcher",
  "Laboratory Professional",
  "Industry Professional",
  "Other",
] as const;

const QUALIFICATION_OPTIONS = [
  "12th / Higher Secondary",
  "B.Sc.",
  "B.Tech.",
  "B.Pharm.",
  "BMLT / BMLS",
  "M.Sc.",
  "M.Tech.",
  "M.Pharm.",
  "MMLS",
  "Ph.D.",
  "Other",
] as const;

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  "Outside India",
];

type Gender = (typeof GENDER_OPTIONS)[number];
type CurrentStatus = (typeof CURRENT_STATUS_OPTIONS)[number];
type Qualification = (typeof QUALIFICATION_OPTIONS)[number];

type ApplyFormValues = {
  fullName: string;
  dob: string;
  gender: Gender | "";
  mobile: string;
  email: string;
  city: string;
  state: string;
  currentStatus: CurrentStatus | "";
  currentStatusOther: string;
  highestQualification: Qualification | "";
  highestQualificationOther: string;
  subject: string;
  yearOrPassout: string;
  college: string;
  affiliation: string;
  consent: boolean;
};

const INITIAL_VALUES: ApplyFormValues = {
  fullName: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  city: "",
  state: "",
  currentStatus: "",
  currentStatusOther: "",
  highestQualification: "",
  highestQualificationOther: "",
  subject: "",
  yearOrPassout: "",
  college: "",
  affiliation: "",
  consent: false,
};

type FormErrors = Partial<Record<keyof ApplyFormValues, string>>;

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ApplyFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  else if (values.fullName.trim().length < 3) errors.fullName = "Enter a valid full name.";

  if (values.dob && new Date(values.dob) > new Date()) {
    errors.dob = "Date of birth cannot be in the future.";
  }

  if (!values.gender) errors.gender = "Please select a gender.";

  if (!values.mobile.trim()) errors.mobile = "Mobile / WhatsApp number is required.";
  else if (!MOBILE_PATTERN.test(values.mobile.trim()))
    errors.mobile = "Enter a valid 10-digit mobile number.";

  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address.";

  if (!values.city.trim()) errors.city = "City is required.";

  if (!values.state) errors.state = "Please select a state.";

  if (!values.currentStatus) errors.currentStatus = "Please select your current status.";
  else if (values.currentStatus === "Other" && !values.currentStatusOther.trim())
    errors.currentStatusOther = "Please specify your current status.";

  if (!values.highestQualification)
    errors.highestQualification = "Please select your highest qualification.";
  else if (values.highestQualification === "Other" && !values.highestQualificationOther.trim())
    errors.highestQualificationOther = "Please specify your qualification.";

  if (!values.subject.trim()) errors.subject = "Subject / specialization is required.";

  if (!values.college.trim())
    errors.college = "Name of college / university / organization is required.";

  if (!values.consent) errors.consent = "Please confirm the declaration to proceed.";

  return errors;
}

const inputClass =
  "w-full rounded-md border border-secondary-200 bg-white px-3 py-2.5 text-sm text-secondary-800 placeholder:text-secondary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none";
const errorInputClass = "border-red-400 focus:border-red-400 focus:ring-red-400";
const labelClass = "mb-1.5 block text-xs font-semibold text-secondary-600";
const errorTextClass = "mt-1 text-xs text-red-500";

type Step = "details" | "payment";

export default function ApplyNowModal({
  open,
  onClose,
  internshipId,
  programName,
  programMode,
}: {
  open: boolean;
  onClose: () => void;
  internshipId: number;
  programName: string;
  programMode?: string;
}) {
  const [step, setStep] = useState<Step>("details");
  const [values, setValues] = useState<ApplyFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotError, setScreenshotError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    return () => {
      if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    };
  }, [screenshotPreview]);

  if (!open) return null;

  function handleClose() {
    // Start a clean application the next time the modal is opened.
    setStep("details");
    setValues(INITIAL_VALUES);
    setErrors({});
    setScreenshot(null);
    setScreenshotPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setScreenshotError("");
    onClose();
  }

  function setField<K extends keyof ApplyFormValues>(field: K, value: ApplyFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleTextChange(field: keyof ApplyFormValues) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setField(field, e.target.value as never);
  }

  function handleDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStep("payment");
  }

  function handleScreenshotChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setScreenshotError("");

    if (!file) {
      setScreenshot(null);
      setScreenshotPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setScreenshotError("Please upload an image file (JPG, PNG or WEBP).");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SCREENSHOT_SIZE_MB * 1024 * 1024) {
      setScreenshotError(`Screenshot must be smaller than ${MAX_SCREENSHOT_SIZE_MB}MB.`);
      e.target.value = "";
      return;
    }

    setScreenshot(file);
    setScreenshotPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  function removeScreenshot() {
    setScreenshot(null);
    setScreenshotPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleFinalSubmit() {
    if (!screenshot) {
      setScreenshotError("Please upload your payment screenshot to confirm your application.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("internshipId", String(internshipId));
      formData.append("internshipName", programName);
      if (programMode) formData.append("programMode", programMode);
      formData.append("fullName", values.fullName);
      formData.append("dob", values.dob);
      formData.append("gender", values.gender);
      formData.append("mobile", values.mobile);
      formData.append("email", values.email);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("currentStatus", values.currentStatus);
      formData.append("currentStatusOther", values.currentStatusOther);
      formData.append("highestQualification", values.highestQualification);
      formData.append("highestQualificationOther", values.highestQualificationOther);
      formData.append("subject", values.subject);
      formData.append("yearOrPassout", values.yearOrPassout);
      formData.append("college", values.college);
      formData.append("affiliation", values.affiliation);
      formData.append("consent", String(values.consent));
      formData.append("paymentScreenshot", screenshot);

      const response = await fetch("/api/internship/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to submit application.");
      }

      toast.success("Application submitted! Our team will get in touch with you shortly.");
      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={handleClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-secondary-100 px-6 py-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-secondary-800">Apply Now</h2>
            <p className="mt-0.5 text-sm text-secondary-500">
              {programName}
              {programMode ? ` · ${programMode}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-secondary-100 px-6 py-3">
          <div
            className={`flex items-center gap-2 text-xs font-semibold ${
              step === "details" ? "text-primary-600" : "text-secondary-400"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                step === "payment"
                  ? "bg-primary-100 text-primary-600"
                  : "bg-primary-600 text-white"
              }`}
            >
              {step === "payment" ? <CheckCircle2 className="h-4 w-4" /> : "1"}
            </span>
            Application Details
          </div>
          <span className="h-px flex-1 bg-secondary-100" />
          <div
            className={`flex items-center gap-2 text-xs font-semibold ${
              step === "payment" ? "text-primary-600" : "text-secondary-400"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                step === "payment" ? "bg-primary-600 text-white" : "bg-secondary-100"
              }`}
            >
              2
            </span>
            Payment
          </div>
        </div>

        {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="overflow-y-auto px-6 py-5">
          <span className="eyebrow">Section 1</span>
          <h3 className="mt-1 mb-4 font-heading text-sm font-bold text-secondary-800">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="fullName">
                Full Name*
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={values.fullName}
                onChange={handleTextChange("fullName")}
                className={`${inputClass} ${errors.fullName ? errorInputClass : ""}`}
              />
              {errors.fullName && <p className={errorTextClass}>{errors.fullName}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="dob">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={values.dob}
                onChange={handleTextChange("dob")}
                className={`${inputClass} ${errors.dob ? errorInputClass : ""}`}
              />
              {errors.dob && <p className={errorTextClass}>{errors.dob}</p>}
            </div>

            <div>
              <span className={labelClass}>Gender*</span>
              <div className="flex flex-wrap gap-4 pt-1">
                {GENDER_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-secondary-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={values.gender === option}
                      onChange={() => setField("gender", option)}
                      className="h-4 w-4 border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.gender && <p className={errorTextClass}>{errors.gender}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="mobile">
                Mobile / WhatsApp Number*
              </label>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={values.mobile}
                onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, ""))}
                className={`${inputClass} ${errors.mobile ? errorInputClass : ""}`}
              />
              {errors.mobile && <p className={errorTextClass}>{errors.mobile}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email Address*
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleTextChange("email")}
                className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
              />
              {errors.email && <p className={errorTextClass}>{errors.email}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="city">
                City*
              </label>
              <input
                id="city"
                type="text"
                placeholder="Your city"
                value={values.city}
                onChange={handleTextChange("city")}
                className={`${inputClass} ${errors.city ? errorInputClass : ""}`}
              />
              {errors.city && <p className={errorTextClass}>{errors.city}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="state">
                State*
              </label>
              <select
                id="state"
                value={values.state}
                onChange={handleTextChange("state")}
                className={`${inputClass} ${errors.state ? errorInputClass : ""}`}
              >
                <option value="" disabled>
                  Select your state
                </option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <p className={errorTextClass}>{errors.state}</p>}
            </div>
          </div>

          <hr className="my-6 border-secondary-100" />

          <span className="eyebrow">Section 2</span>
          <h3 className="mt-1 mb-4 font-heading text-sm font-bold text-secondary-800">
            Academic / Professional Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="currentStatus">
                Current Status*
              </label>
              <select
                id="currentStatus"
                value={values.currentStatus}
                onChange={handleTextChange("currentStatus")}
                className={`${inputClass} ${errors.currentStatus ? errorInputClass : ""}`}
              >
                <option value="" disabled>
                  Select your current status
                </option>
                {CURRENT_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.currentStatus && <p className={errorTextClass}>{errors.currentStatus}</p>}
              {values.currentStatus === "Other" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Please specify"
                    value={values.currentStatusOther}
                    onChange={handleTextChange("currentStatusOther")}
                    className={`${inputClass} ${errors.currentStatusOther ? errorInputClass : ""}`}
                  />
                  {errors.currentStatusOther && (
                    <p className={errorTextClass}>{errors.currentStatusOther}</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="highestQualification">
                Highest Qualification*
              </label>
              <select
                id="highestQualification"
                value={values.highestQualification}
                onChange={handleTextChange("highestQualification")}
                className={`${inputClass} ${errors.highestQualification ? errorInputClass : ""}`}
              >
                <option value="" disabled>
                  Select your highest qualification
                </option>
                {QUALIFICATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.highestQualification && (
                <p className={errorTextClass}>{errors.highestQualification}</p>
              )}
              {values.highestQualification === "Other" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Please specify"
                    value={values.highestQualificationOther}
                    onChange={handleTextChange("highestQualificationOther")}
                    className={`${inputClass} ${
                      errors.highestQualificationOther ? errorInputClass : ""
                    }`}
                  />
                  {errors.highestQualificationOther && (
                    <p className={errorTextClass}>{errors.highestQualificationOther}</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="subject">
                  Subject / Specialization*
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. Microbiology"
                  value={values.subject}
                  onChange={handleTextChange("subject")}
                  className={`${inputClass} ${errors.subject ? errorInputClass : ""}`}
                />
                {errors.subject && <p className={errorTextClass}>{errors.subject}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="yearOrPassout">
                  Current Year / Semester / Passout Year
                </label>
                <input
                  id="yearOrPassout"
                  type="text"
                  placeholder="e.g. 3rd Year / 2026"
                  value={values.yearOrPassout}
                  onChange={handleTextChange("yearOrPassout")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="college">
                  Name of College / University / Organization*
                </label>
                <input
                  id="college"
                  type="text"
                  placeholder="Institution name"
                  value={values.college}
                  onChange={handleTextChange("college")}
                  className={`${inputClass} ${errors.college ? errorInputClass : ""}`}
                />
                {errors.college && <p className={errorTextClass}>{errors.college}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="affiliation">
                  Affiliation / Department
                </label>
                <input
                  id="affiliation"
                  type="text"
                  placeholder="e.g. Dept. of Biotechnology"
                  value={values.affiliation}
                  onChange={handleTextChange("affiliation")}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-secondary-100 pt-4">
            <label className="flex items-start gap-2 text-sm text-secondary-700">
              <input
                type="checkbox"
                checked={values.consent}
                onChange={(e) => setField("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              I confirm the above information is accurate and I agree to be contacted by NanoNova
              regarding this application.*
            </label>
            {errors.consent && <p className={errorTextClass}>{errors.consent}</p>}
          </div>

          <button type="submit" className="btn-primary mt-5 w-full">
            Continue to Payment
          </button>
        </form>
        )}

        {step === "payment" && (
          <div className="overflow-y-auto px-6 py-5">
            <span className="eyebrow">Section 3</span>
            <h3 className="mt-1 mb-1 font-heading text-sm font-bold text-secondary-800">
              Complete Your Payment
            </h3>
            <p className="mb-5 text-sm text-secondary-500">
              Scan the QR code below using any UPI app to pay the application fee for{" "}
              <span className="font-semibold text-secondary-700">{programName}</span>, then upload
              a screenshot of the successful payment to confirm your application.
            </p>

            <div className="flex flex-col items-center gap-3 rounded-lg border border-secondary-100 bg-secondary-50 px-4 py-6">
              <div className="rounded-md border border-secondary-200 bg-white p-2">
                <Image
                  src={PAYMENT_QR_CODE_SRC}
                  alt="Scan this QR code to pay the application fee"
                  width={220}
                  height={220}
                  className="h-55 w-55"
                />
              </div>
              <p className="text-xs text-secondary-500">Scan &amp; Pay via any UPI app</p>
            </div>

            <div className="mt-6">
              <span className={labelClass}>Upload Payment Screenshot*</span>

              {!screenshotPreview ? (
                <label
                  htmlFor="paymentScreenshot"
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors hover:border-primary-400 hover:bg-primary-50/50 ${
                    screenshotError ? "border-red-400" : "border-secondary-200"
                  }`}
                >
                  <UploadCloud className="h-6 w-6 text-secondary-400" />
                  <span className="text-sm font-medium text-secondary-600">
                    Click to upload payment screenshot
                  </span>
                  <span className="text-xs text-secondary-400">
                    JPG, PNG or WEBP · up to {MAX_SCREENSHOT_SIZE_MB}MB
                  </span>
                </label>
              ) : (
                <div className="flex items-center gap-3 rounded-md border border-secondary-200 p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-secondary-100">
                    <Image
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-secondary-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="truncate">{screenshot?.name}</span>
                    </p>
                    <p className="text-xs text-secondary-400">Screenshot uploaded</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeScreenshot}
                    className="shrink-0 text-xs font-semibold text-secondary-500 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                id="paymentScreenshot"
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                className="hidden"
              />
              {screenshotError && <p className={errorTextClass}>{screenshotError}</p>}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="flex-1 rounded-md border border-secondary-200 py-2.5 text-sm font-semibold text-secondary-600 hover:bg-secondary-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={!screenshot || submitting}
                className="btn-primary flex-2 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

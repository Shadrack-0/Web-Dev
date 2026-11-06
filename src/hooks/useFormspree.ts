import { useState } from "react";

export const FORMSPREE_ENDPOINT_ID = "xwllzdzd";
export const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ENDPOINT_ID}`;

export interface FormspreeState {
  submitting: boolean;
  succeeded: boolean;
  errors: string[];
}

export function useFormspree(formId: string = FORMSPREE_ENDPOINT_ID) {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const submit = async (formData: Record<string, any>): Promise<{ ok: boolean; errors?: string[] }> => {
    setSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSucceeded(true);
        return { ok: true };
      } else {
        const errorMessages = Array.isArray(data.errors)
          ? data.errors.map((e: any) => e.message || `${e.field}: ${e.code}`)
          : [data.error || "Form submission failed. Please try again."];
        setErrors(errorMessages);
        return { ok: false, errors: errorMessages };
      }
    } catch (err: any) {
      const msg = err?.message || "Network error. Please check your internet connection or message us on WhatsApp.";
      setErrors([msg]);
      return { ok: false, errors: [msg] };
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSucceeded(false);
    setErrors([]);
    setSubmitting(false);
  };

  return {
    submitting,
    succeeded,
    errors,
    submit,
    reset,
  };
}

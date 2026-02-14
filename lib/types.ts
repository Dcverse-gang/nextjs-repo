import { AxiosError } from "axios";

export interface ApiError {
  response?: {
    data?: {
      detail?: string;
      error?: string;
      message?: string;
    };
    status?: number;
  };
}

export function isAxiosError(error: unknown): error is AxiosError<{ detail?: string; error?: string; message?: string }> {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as AxiosError).response === "object"
  );
}

export function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (isAxiosError(error)) {
    return error.response?.data?.detail || 
           error.response?.data?.error || 
           error.response?.data?.message || 
           defaultMessage;
  }
  return defaultMessage;
}

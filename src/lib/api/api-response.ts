import { NextResponse } from "next/server";
import { ApiResponse } from "@/shared/types/api.types";

export function apiSuccess<T>(data: T, status: number = 200) {
  const body: ApiResponse<T> = { data, error: null, success: true };
  return NextResponse.json(body, { status });
}

export function apiError(message: string, status: number = 400) {
  const body: ApiResponse<null> = { data: null, error: message, success: false };
  return NextResponse.json(body, { status });
}

import { request } from "@/lib/api";
import { ReportFilters, ReportResponse } from "@/types/report";

export const getReport = (
  filters: ReportFilters = {},
): Promise<ReportResponse> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();

  return request(`/reports${query ? `?${query}` : ""}`);
};

"use client";

import { useEffect } from "react";
import { BarChart3, GraduationCap, Inbox, type LucideIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchDashboardStats } from "@/lib/redux/slices/dashboardSlice";

const KPI_ICONS: Record<string, LucideIcon> = {
  enquiries: Inbox,
  internshipRegistrations: GraduationCap,
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, status, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-secondary-800">Dashboard</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Overview of activity across the website.
        </p>
      </div>

      {status === "loading" && <p className="text-sm text-secondary-500">Loading stats…</p>}

      {status === "failed" && (
        <p className="text-sm text-red-600">{error ?? "Failed to load dashboard stats."}</p>
      )}

      {status === "succeeded" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = KPI_ICONS[stat.key] ?? BarChart3;
            const hasUnseen = Boolean(stat.secondary && stat.secondary.count > 0);
            return (
              <div
                key={stat.key}
                className="rounded-lg border border-secondary-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-secondary-500">{stat.title}</p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="font-heading text-3xl font-extrabold text-secondary-800">
                    {stat.count}
                  </p>
                  {stat.secondary && (
                    <span
                      className={
                        hasUnseen
                          ? "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700"
                          : "rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-semibold text-secondary-500"
                      }
                    >
                      {stat.secondary.count} {stat.secondary.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

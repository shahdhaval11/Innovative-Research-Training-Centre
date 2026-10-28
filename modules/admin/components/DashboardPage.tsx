"use client";

import { useEffect } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Inbox,
  type LucideIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchDashboardStats, fetchRegistrationTrend } from "@/lib/redux/slices/dashboardSlice";
import RegistrationTrendChart from "./RegistrationTrendChart";

const KPI_ICONS: Record<string, LucideIcon> = {
  enquiries: Inbox,
  internships: BookOpen,
  internshipRegistrations: GraduationCap,
  eventRegistrations: CalendarCheck,
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, status, error, trend, trendStatus } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRegistrationTrend());
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
                {stat.breakdown && (
                  <div className="mt-3 flex gap-2 border-t border-secondary-100 pt-3">
                    {stat.breakdown.map((item) => (
                      <span
                        key={item.label}
                        className="rounded-full bg-secondary-100 px-2.5 py-0.5 text-xs font-semibold text-secondary-600"
                      >
                        {item.label}: {item.count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="rounded-lg border border-secondary-100 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-base font-bold text-secondary-800">
            Event &amp; Workshop Registrations
          </h2>
          <p className="mt-0.5 text-sm text-secondary-500">Registrations per day, last 7 days.</p>

          <div className="mt-4">
            {trendStatus === "failed" && (
              <p className="text-sm text-red-600">Failed to load the registration graph.</p>
            )}
            {trendStatus !== "failed" && trend.length === 0 && (
              <p className="text-sm text-secondary-500">Loading graph…</p>
            )}
            {trend.length > 0 && <RegistrationTrendChart data={trend} />}
          </div>
        </div>
      </div>
    </div>
  );
}

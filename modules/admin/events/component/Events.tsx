"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SESSION_KEY } from "@/modules/admin/login/constData/const";
import SidebarAdmin from "@/components/SidebarAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─── Admin User type ──────────────────────────────────────────────────────────
interface AdminUser {
  id: string; name: string; email: string; role: string; avatar: string;
}

// ─── Topbar (local — same as Dashboard) ──────────────────────────────────────
function Topbar({ user, onMenuToggle }: { user: AdminUser; onMenuToggle: () => void }) {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" :
    now.getHours() < 17 ? "Good afternoon" : "Good evening";
  return (
    <header className="bg-[#1e293b] border-b border-slate-700/50 px-6 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="md:hidden text-slate-400 hover:text-white text-xl">☰</button>
        <div>
          <p className="text-white font-bold text-sm">{greeting}, {user.name.split(" ")[0]}! 👋</p>
          <p className="text-slate-500 text-xs">
            {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2">
          <span className="text-slate-500 text-sm">🔍</span>
          <input type="text" placeholder="Search..." className="bg-transparent text-slate-300 text-xs placeholder-slate-600 outline-none w-32" />
        </div>
        <button className="relative w-9 h-9 rounded-xl bg-[#0f172a] border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
        </button>
        <div className="w-9 h-9 rounded-xl bg-[#6366f1] flex items-center justify-center font-black text-white text-sm">
          {user.avatar}
        </div>
      </div>
    </header>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type EventType = "Webinar" | "Workshop" | "Seminar" | "Conference" | "Certificate Course" | "Field Training" | "Other";
type EventStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
type ModalMode = "create" | "edit" | "view";

interface EventRecord {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: EventType;
  status: EventStatus;
  imageName: string;
  imagePreview: string;
  pdfName: string;
  createdAt: string;
  attendees: number;
  venue: string;
  registrationUrl: string;
}

interface FormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: EventType | "";
  venue: string;
  registrationUrl: string;
  imageName: string;
  imagePreview: string;
  pdfName: string;
}


const EVENT_TYPES: EventType[] = [
  "Webinar", "Workshop", "Seminar", "Conference", "Certificate Course", "Field Training", "Other",
];

const STATUS_OPTIONS: EventStatus[] = ["Upcoming", "Ongoing", "Completed", "Cancelled"];

// ─── Style helpers ─────────────────────────────────────────────────────────────
const STATUS_STYLE: Record<EventStatus, string> = {
  Upcoming:  "bg-[#6366f1]/15 text-[#818cf8] border-[#6366f1]/30",
  Ongoing:   "bg-[#10b981]/15 text-[#34d399] border-[#10b981]/30",
  Completed: "bg-slate-700/50 text-slate-400 border-slate-600/30",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

const TYPE_STYLE: Record<EventType, string> = {
  Webinar:            "bg-[#0ea5e9]/15 text-[#38bdf8]",
  Workshop:           "bg-[#8b5cf6]/15 text-[#a78bfa]",
  Seminar:            "bg-[#f59e0b]/15 text-[#fbbf24]",
  Conference:         "bg-[#ec4899]/15 text-[#f472b6]",
  "Certificate Course": "bg-[#6366f1]/15 text-[#818cf8]",
  "Field Training":   "bg-[#10b981]/15 text-[#34d399]",
  Other:              "bg-slate-700/50 text-slate-400",
};

const EMPTY_FORM: FormData = {
  title: "", description: "", startDate: "", endDate: "",
  startTime: "", endTime: "", eventType: "", venue: "",
  registrationUrl: "", imageName: "", imagePreview: "", pdfName: "",
};

// ─── Input component ──────────────────────────────────────────────────────────
function Field({
  label, required, children,
}: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#6366f1] transition-colors";

// ─── Event Modal ──────────────────────────────────────────────────────────────
function EventModal({
  mode, event, onClose, onSave,
}: {
  mode: ModalMode;
  event: EventRecord | null;
  onClose: () => void;
  onSave: (data: Partial<EventRecord>) => void;
}) {
  const isView   = mode === "view";
  const isEdit   = mode === "edit";
  const isCreate = mode === "create";

  const imageRef = useRef<HTMLInputElement>(null);
  const pdfRef   = useRef<HTMLInputElement>(null);

  const [form,   setForm]   = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [imgDrag, setImgDrag] = useState(false);
  const [pdfDrag, setPdfDrag] = useState(false);

  // Prefill form for edit/view
  useEffect(() => {
    if (event && (isEdit || isView)) {
      setForm({
        title:           event.title,
        description:     event.description,
        startDate:       event.startDate,
        endDate:         event.endDate,
        startTime:       event.startTime,
        endTime:         event.endTime,
        eventType:       event.eventType,
        venue:           event.venue,
        registrationUrl: event.registrationUrl,
        imageName:       event.imageName,
        imagePreview:    event.imagePreview,
        pdfName:         event.pdfName,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [event, mode, isEdit, isView]);

  // Escape key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const set = (key: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleImageFile = (file: File | null | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((e) => ({ ...e, imageName: "Please upload a valid image file (JPG, PNG, WEBP)." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, imageName: "Image must be under 5 MB." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({
        ...prev,
        imageName: file.name,
        imagePreview: ev.target?.result as string,
      }));
      setErrors((e) => ({ ...e, imageName: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handlePdfFile = (file: File | null | undefined) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setErrors((e) => ({ ...e, pdfName: "Please upload a valid PDF file." }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((e) => ({ ...e, pdfName: "PDF must be under 10 MB." }));
      return;
    }
    setForm((prev) => ({ ...prev, pdfName: file.name }));
    setErrors((e) => ({ ...e, pdfName: "" }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim())       errs.title       = "Title is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!form.startDate)          errs.startDate   = "Start date is required.";
    if (!form.endDate)            errs.endDate     = "End date is required.";
    if (!form.startTime)          errs.startTime   = "Start time is required.";
    if (!form.endTime)            errs.endTime     = "End time is required.";
    if (!form.eventType)          errs.eventType   = "Event type is required.";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      errs.endDate = "End date cannot be before start date.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      title:           form.title,
      description:     form.description,
      startDate:       form.startDate,
      endDate:         form.endDate,
      startTime:       form.startTime,
      endTime:         form.endTime,
      eventType:       form.eventType as EventType,
      venue:           form.venue,
      registrationUrl: form.registrationUrl,
      imageName:       form.imageName,
      imagePreview:    form.imagePreview,
      pdfName:         form.pdfName,
    });
  };

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const formatTime = (t: string) => {
    if (!t) return "—";
    const [h, m] = t.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  };

  const modalTitle =
    isCreate ? "Create New Event" :
    isEdit   ? "Edit Event"       : "Event Details";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-[#1e293b] border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center text-lg">
              {isCreate ? "➕" : isEdit ? "✏️" : "👁️"}
            </div>
            <div>
              <h2 className="text-white font-black text-lg leading-tight">{modalTitle}</h2>
              {!isCreate && event && (
                <p className="text-slate-500 text-xs">{event.id}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isView && event && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLE[event.status]}`}>
                {event.status}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* ─ View mode: image banner ─ */}
          {isView && form.imagePreview && (
            <div className="relative rounded-xl overflow-hidden h-44 border border-slate-700/50">
              <img src={form.imagePreview} alt={form.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/80 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${TYPE_STYLE[form.eventType as EventType]}`}>
                  {form.eventType}
                </span>
              </div>
            </div>
          )}

          {/* ─ Title ─ */}
          <Field label="Event Title" required>
            {isView ? (
              <p className="text-white font-bold text-lg">{form.title}</p>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="e.g. Research Methodology Masterclass"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={inputCls}
                />
                {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
              </>
            )}
          </Field>

          {/* ─ Description ─ */}
          <Field label="Description" required>
            {isView ? (
              <p className="text-slate-300 text-sm leading-relaxed">{form.description}</p>
            ) : (
              <>
                <textarea
                  rows={4}
                  placeholder="Describe the event objectives, target audience, and key topics covered..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={`${inputCls} resize-none`}
                />
                {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
              </>
            )}
          </Field>

          {/* ─ Date & Time grid ─ */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <Field label="Start Date" required>
              {isView ? (
                <p className="text-slate-200 text-sm font-medium">{formatDate(form.startDate)}</p>
              ) : (
                <>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                  {errors.startDate && <p className="text-red-400 text-xs">{errors.startDate}</p>}
                </>
              )}
            </Field>

            {/* End Date */}
            <Field label="End Date" required>
              {isView ? (
                <p className="text-slate-200 text-sm font-medium">{formatDate(form.endDate)}</p>
              ) : (
                <>
                  <input
                    type="date"
                    value={form.endDate}
                    min={form.startDate}
                    onChange={(e) => set("endDate", e.target.value)}
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                  {errors.endDate && <p className="text-red-400 text-xs">{errors.endDate}</p>}
                </>
              )}
            </Field>

            {/* Start Time */}
            <Field label="Start Time" required>
              {isView ? (
                <p className="text-slate-200 text-sm font-medium">{formatTime(form.startTime)}</p>
              ) : (
                <>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => set("startTime", e.target.value)}
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                  {errors.startTime && <p className="text-red-400 text-xs">{errors.startTime}</p>}
                </>
              )}
            </Field>

            {/* End Time */}
            <Field label="End Time" required>
              {isView ? (
                <p className="text-slate-200 text-sm font-medium">{formatTime(form.endTime)}</p>
              ) : (
                <>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => set("endTime", e.target.value)}
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                  {errors.endTime && <p className="text-red-400 text-xs">{errors.endTime}</p>}
                </>
              )}
            </Field>
          </div>

          {/* ─ Event Type + Venue ─ */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Event Type" required>
              {isView ? (
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full w-fit ${TYPE_STYLE[form.eventType as EventType]}`}>
                  {form.eventType}
                </span>
              ) : (
                <>
                  <select
                    value={form.eventType}
                    onChange={(e) => set("eventType", e.target.value)}
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled className="bg-[#1e293b]">Select event type...</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-[#1e293b]">{t}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="text-red-400 text-xs">{errors.eventType}</p>}
                </>
              )}
            </Field>

            <Field label="Venue / Platform">
              {isView ? (
                <p className="text-slate-200 text-sm font-medium">{form.venue || "—"}</p>
              ) : (
                <input
                  type="text"
                  placeholder="e.g. Online (Zoom) / IRTC Hall, Ahmedabad"
                  value={form.venue}
                  onChange={(e) => set("venue", e.target.value)}
                  className={inputCls}
                />
              )}
            </Field>
          </div>

          {/* ─ Registration URL ─ */}
          <Field label="Registration URL">
            {isView ? (
              form.registrationUrl ? (
                <a
                  href={form.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#818cf8] text-sm underline underline-offset-2 break-all hover:text-[#6366f1] transition-colors"
                >
                  {form.registrationUrl}
                </a>
              ) : (
                <p className="text-slate-500 text-sm italic">No registration URL provided</p>
              )
            ) : (
              <input
                type="url"
                placeholder="https://example.com/register"
                value={form.registrationUrl}
                onChange={(e) => set("registrationUrl", e.target.value)}
                className={inputCls}
              />
            )}
          </Field>

          {/* ─ Image Upload ─ */}
          <Field label="Event Banner Image">
            {isView ? (
              form.imageName ? (
                <div className="flex items-center gap-3 bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3">
                  <span className="text-xl">🖼️</span>
                  <span className="text-slate-300 text-sm">{form.imageName}</span>
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">No image uploaded</p>
              )
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setImgDrag(true); }}
                onDragLeave={() => setImgDrag(false)}
                onDrop={(e) => {
                  e.preventDefault(); setImgDrag(false);
                  handleImageFile(e.dataTransfer.files[0]);
                }}
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  imgDrag
                    ? "border-[#6366f1] bg-[#6366f1]/5"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                {form.imagePreview ? (
                  <div className="relative h-36 rounded-xl overflow-hidden">
                    <img src={form.imagePreview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => { setForm((p) => ({ ...p, imageName: "", imagePreview: "" })); }}
                        className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {form.imageName}
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-2 py-8 cursor-pointer"
                    onClick={() => imageRef.current?.click()}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-2xl">🖼️</div>
                    <p className="text-slate-400 text-sm font-medium">Drop image here or <span className="text-[#818cf8]">browse</span></p>
                    <p className="text-slate-600 text-xs">JPG, PNG, WEBP · Max 5 MB</p>
                  </div>
                )}
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageFile(e.target.files?.[0])}
                />
              </div>
            )}
            {errors.imageName && <p className="text-red-400 text-xs">{errors.imageName}</p>}
          </Field>

          {/* ─ PDF Upload ─ */}
          <Field label="Event Brochure / PDF">
            {isView ? (
              form.pdfName ? (
                <div className="flex items-center justify-between bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📄</span>
                    <span className="text-slate-300 text-sm">{form.pdfName}</span>
                  </div>
                  <button className="text-[#818cf8] text-xs font-bold hover:text-[#6366f1] transition-colors">
                    Download →
                  </button>
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">No PDF uploaded</p>
              )
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
                onDragLeave={() => setPdfDrag(false)}
                onDrop={(e) => {
                  e.preventDefault(); setPdfDrag(false);
                  handlePdfFile(e.dataTransfer.files[0]);
                }}
                className={`border-2 border-dashed rounded-xl transition-all duration-200 ${
                  pdfDrag
                    ? "border-[#6366f1] bg-[#6366f1]/5"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                {form.pdfName ? (
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center text-lg">📄</div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">{form.pdfName}</p>
                        <p className="text-slate-500 text-xs">PDF uploaded</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, pdfName: "" }))}
                      className="text-red-400 hover:text-red-300 text-xs font-bold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-2 py-6 cursor-pointer"
                    onClick={() => pdfRef.current?.click()}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-2xl">📄</div>
                    <p className="text-slate-400 text-sm font-medium">Drop PDF here or <span className="text-[#818cf8]">browse</span></p>
                    <p className="text-slate-600 text-xs">PDF only · Max 10 MB</p>
                  </div>
                )}
                <input
                  ref={pdfRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => handlePdfFile(e.target.files?.[0])}
                />
              </div>
            )}
            {errors.pdfName && <p className="text-red-400 text-xs">{errors.pdfName}</p>}
          </Field>

          {/* ─ View: extra metadata ─ */}
          {isView && event && (
            <div className="grid grid-cols-3 gap-4 bg-[#0f172a] border border-slate-700/50 rounded-xl p-4">
              {[
                { label: "Attendees",  value: String(event.attendees) },
                { label: "Created",   value: formatDate(event.createdAt) },
                { label: "Event ID",  value: event.id },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-slate-500 text-[10px] uppercase tracking-wide">{m.label}</p>
                  <p className="text-white font-bold text-sm mt-1">{m.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {!isView && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700/50 shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-black transition-colors shadow-lg"
            >
              {isCreate ? "Create Event" : "Save Changes"}
            </button>
          </div>
        )}
        {isView && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700/50 shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Delete Confirm Dialog ─────────────────────────────────────────────────────
function DeleteDialog({
  event, onClose, onConfirm,
}: {
  event: EventRecord; onClose: () => void; onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-[#1e293b] border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-md p-7">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-3xl">🗑️</div>
          <div>
            <h3 className="text-white font-black text-xl mb-2">Delete Event?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Are you sure you want to delete <span className="text-white font-bold">"{event.title}"</span>?
              This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-black transition-colors"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Events() {
  const router = useRouter();

  const [user,         setUser]        = useState<AdminUser | null>(null);
  const [collapsed,    setCollapsed]   = useState(false);
  const [mobileMenu,   setMobileMenu]  = useState(false);
  const [events,       setEvents]      = useState<EventRecord[]>([]);
  const [loading,      setLoading]     = useState(false);
  const [modal,        setModal]       = useState<{ mode: ModalMode; event: EventRecord | null } | null>(null);
  const [deleteTarget, setDeleteTarget]= useState<EventRecord | null>(null);
  const [search,       setSearch]      = useState("");
  const [filterType,   setFilterType]  = useState<EventType | "">("");
  const [filterStatus, setFilterStatus]= useState<EventStatus | "">("");
  const [filterSort,   setFilterSort]  = useState<"newest" | "oldest" | "title">("newest");

  // Auth guard + session load
  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) { router.replace("/admin/login"); return; }
    try { setUser(JSON.parse(raw)); } catch { router.replace("/admin/login"); }
  }, [router]);

  // Fetch events from API
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((data) => { if (data.success) setEvents(data.events); })
      .catch(() => toast.error("Failed to load events."))
      .finally(() => setLoading(false));
  }, [user]);

  // Filtered + sorted events
  const filtered = events
    .filter((e) => {
      const q = search.toLowerCase();
      const matchSearch = !q || e.title.toLowerCase().includes(q) || e.eventType.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
      const matchType   = !filterType   || e.eventType === filterType;
      const matchStatus = !filterStatus || e.status    === filterStatus;
      return matchSearch && matchType && matchStatus;
    })
    .sort((a, b) => {
      if (filterSort === "newest") return b.startDate.localeCompare(a.startDate);
      if (filterSort === "oldest") return a.startDate.localeCompare(b.startDate);
      return a.title.localeCompare(b.title);
    });

  const showToast = (message: string, type: "success" | "error" = "success") =>
    type === "success" ? toast.success(message) : toast.error(message);

  const handleSave = async (data: Partial<EventRecord>) => {
    if (modal?.mode === "create") {
      try {
        const res = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!json.success) throw new Error();
        setEvents((prev) => [json.event, ...prev]);
        showToast("Event created successfully!");
      } catch {
        showToast("Failed to create event.", "error");
      }
    } else if (modal?.mode === "edit" && modal.event) {
      try {
        const res = await fetch(`/api/admin/events/${modal.event.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!json.success) throw new Error();
        setEvents((prev) =>
          prev.map((e) => e.id === modal.event!.id ? json.event : e)
        );
        showToast("Event updated successfully!");
      } catch {
        showToast("Failed to update event.", "error");
      }
    }
    setModal(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/events/${deleteTarget.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error();
      setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      showToast("Event deleted.");
    } catch {
      showToast("Failed to delete event.", "error");
    }
    setDeleteTarget(null);
  };

  const formatDateShort = (d: string) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
  const formatTime = (t: string) => {
    if (!t) return "—";
    const [h, m] = t.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  };

  // Summary stats
  const stats = [
    { label: "Total Events",    value: events.length,                                       icon: "📅", color: "bg-[#6366f1]" },
    { label: "Upcoming",        value: events.filter((e) => e.status === "Upcoming").length, icon: "🔜", color: "bg-[#0ea5e9]" },
    { label: "Ongoing",         value: events.filter((e) => e.status === "Ongoing").length,  icon: "🔴", color: "bg-[#10b981]" },
    { label: "Completed",       value: events.filter((e) => e.status === "Completed").length,icon: "✅", color: "bg-slate-500"  },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    localStorage.removeItem(SESSION_KEY);
    router.push("/admin/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <svg className="animate-spin w-8 h-8 text-[#6366f1]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      <div className="flex flex-1 overflow-hidden" style={{ height: "100vh" }}>

        {/* ── Sidebar (desktop) ── */}
        <div className="hidden md:flex flex-col shrink-0">
          <SidebarAdmin
            user={user}
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            onLogout={handleLogout}
          />
        </div>

        {/* ── Mobile sidebar overlay ── */}
        {mobileMenu && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setMobileMenu(false)}>
            <div className="w-60 h-full" onClick={(e) => e.stopPropagation()}>
              <SidebarAdmin
                user={user}
                collapsed={false}
                onToggle={() => setMobileMenu(false)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <Topbar user={user} onMenuToggle={() => setMobileMenu(true)} /> */}

          <main className="flex-1 overflow-y-auto text-white">

      {/* ── Page Header ── */}
      <div className="bg-[#1e293b] border-b border-slate-700/50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <span>Admin</span><span>›</span><span className="text-[#818cf8]">Events</span>
            </div>
            <h1 className="text-white font-black text-2xl">Event Management</h1>
            <p className="text-slate-400 text-sm mt-0.5">Create, manage, and track all academic events and programs.</p>
          </div>
          <button
            onClick={() => setModal({ mode: "create", event: null })}
            className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-lg text-sm shrink-0"
          >
            <span className="text-base">➕</span>
            Create Event
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-white font-black text-2xl leading-none">{s.value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl px-5 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Type filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as EventType | "")}
              className="bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-slate-300 text-xs focus:outline-none focus:border-[#6366f1] transition-colors"
            >
              <option value="">All Types</option>
              {EVENT_TYPES.map((t) => <option key={t} value={t} className="bg-[#1e293b]">{t}</option>)}
            </select>

            {/* Status filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as EventStatus | "")}
              className="bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-slate-300 text-xs focus:outline-none focus:border-[#6366f1] transition-colors"
            >
              <option value="">All Status</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#1e293b]">{s}</option>)}
            </select>

            {/* Sort */}
            <select
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value as typeof filterSort)}
              className="bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-slate-300 text-xs focus:outline-none focus:border-[#6366f1] transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">A → Z</option>
            </select>

            {/* Clear */}
            {(search || filterType || filterStatus) && (
              <button
                onClick={() => { setSearch(""); setFilterType(""); setFilterStatus(""); }}
                className="text-red-400 hover:text-red-300 text-xs font-bold px-3 py-2 rounded-xl border border-red-500/30 hover:bg-red-500/10 transition-all"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Events Table ── */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3">
              <svg className="animate-spin w-6 h-6 text-[#6366f1]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-slate-400 text-sm">Loading events...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-700/30 flex items-center justify-center text-4xl">📭</div>
              <div className="text-center">
                <p className="text-white font-bold text-base">No events found</p>
                <p className="text-slate-500 text-sm mt-1">
                  {search || filterType || filterStatus ? "Try adjusting your filters." : "Create your first event to get started."}
                </p>
              </div>
              {!search && !filterType && !filterStatus && (
                <button
                  onClick={() => setModal({ mode: "create", event: null })}
                  className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  ➕ Create Event
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    {["#", "Event", "Type", "Date & Time", "Venue", "Attendees", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((event, idx) => (
                    <tr
                      key={event.id}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors group"
                    >
                      {/* # */}
                      <td className="px-4 py-3.5 text-slate-500 text-xs">{idx + 1}</td>

                      {/* Event */}
                      <td className="px-4 py-3.5 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          {event.imagePreview ? (
                            <img
                              src={event.imagePreview}
                              alt={event.title}
                              className="w-16 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-12 rounded-lg bg-[#6366f1]/15 border border-[#6366f1]/25 flex items-center justify-center text-lg shrink-0">
                              📅
                            </div>
                          )}
                          <div>
                            <p className="text-white font-bold text-sm leading-tight line-clamp-1">{event.title}</p>
                            <p className="text-slate-500 text-[10px]">{event.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${TYPE_STYLE[event.eventType]}`}>
                          {event.eventType}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="px-4 py-3.5 min-w-[140px]">
                        <p className="text-slate-200 text-xs font-medium">
                          {formatDateShort(event.startDate)}
                          {event.endDate !== event.startDate && ` – ${formatDateShort(event.endDate)}`}
                        </p>
                        <p className="text-slate-500 text-[10px] mt-0.5">
                          {formatTime(event.startTime)} – {formatTime(event.endTime)}
                        </p>
                      </td>

                      {/* Venue */}
                      <td className="px-4 py-3.5 text-slate-400 text-xs max-w-[140px]">
                        <p className="line-clamp-1">{event.venue || "—"}</p>
                      </td>

                      {/* Attendees */}
                      <td className="px-4 py-3.5 text-slate-300 text-xs font-bold text-center">
                        {event.attendees > 0 ? event.attendees : "—"}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLE[event.status]}`}>
                          {event.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {/* View */}
                          <button
                            onClick={() => setModal({ mode: "view", event })}
                            title="View Details"
                            className="w-8 h-8 rounded-lg bg-slate-700/40 hover:bg-[#0ea5e9]/20 border border-transparent hover:border-[#0ea5e9]/30 text-slate-400 hover:text-[#38bdf8] flex items-center justify-center text-sm transition-all"
                          >
                            👁️
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => setModal({ mode: "edit", event })}
                            title="Edit Event"
                            className="w-8 h-8 rounded-lg bg-slate-700/40 hover:bg-[#6366f1]/20 border border-transparent hover:border-[#6366f1]/30 text-slate-400 hover:text-[#818cf8] flex items-center justify-center text-sm transition-all"
                          >
                            ✏️
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteTarget(event)}
                            title="Delete Event"
                            className="w-8 h-8 rounded-lg bg-slate-700/40 hover:bg-red-500/15 border border-transparent hover:border-red-500/30 text-slate-400 hover:text-red-400 flex items-center justify-center text-sm transition-all"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-700/50 flex items-center justify-between">
              <p className="text-slate-500 text-xs">
                Showing <span className="text-slate-300 font-semibold">{filtered.length}</span> of{" "}
                <span className="text-slate-300 font-semibold">{events.length}</span> events
              </p>
              <p className="text-slate-600 text-xs">IRTC Event Management Module</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {modal && (
        <EventModal
          mode={modal.mode}
          event={modal.event}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteDialog
          event={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      <ToastContainer position="bottom-right" theme="dark" />
    </main>
        </div>
      </div>
    </div>
  );
}
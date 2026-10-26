"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import ApplyNowModal from "@/components/common/ApplyNowModal";

export default function EventRegisterButton({
  eventId,
  eventName,
  eventType,
  fees,
  className = "btn-primary w-full",
}: {
  eventId: string;
  eventName: string;
  eventType: string;
  fees: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <UserPlus className="h-4 w-4" />
        Register
      </button>
      <ApplyNowModal
        open={open}
        onClose={() => setOpen(false)}
        title={`Register for ${eventType}`}
        programName={eventName}
        programMode={eventType}
        amount={fees}
        submitUrl="/api/events/register"
        checkUrl="/api/events/register/check"
        registrationFields={{ eventId }}
      />
    </>
  );
}

"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label?: string;
  disabled?: boolean;
};

export const BackButton = ({
  href,
  label,
  disabled
}: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      disabled={disabled}
      asChild
    >
      {label && <Link href={href}>
        {label}
      </Link>}
    </Button>
  );
};
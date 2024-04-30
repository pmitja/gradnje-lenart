"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import Image from "next/image";
import { BackButton } from "@/components/auth/back-button";
import SocialButtons from "./social-buttons";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  buttonDisabled?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  buttonDisabled,
}: CardWrapperProps) => {
  return (
    <Card className="border-0 shadow-none flex flex-col justify-center w-full sm:w-[400px] md:border-[1px] md:shadow-md min-h-[calc(100dvh)] sm:min-h-fit">
      <CardHeader className="text-3xl font-bold space-y-2 text-center">
        {headerLabel}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <SocialButtons />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          disabled={buttonDisabled}
        />
      </CardFooter>
    </Card>
  );
};
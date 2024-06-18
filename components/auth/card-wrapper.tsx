"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import SocialButtons from "./social-buttons";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  buttonDisabled?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
}: CardWrapperProps) => {
  return (
    <Card className="border-0 shadow-none flex flex-col justify-center w-full sm:w-[400px] md:border-[1px] md:shadow-md min-h-[calc(100dvh)] sm:min-h-fit">
      <CardHeader className="text-3xl font-bold space-y-2 text-center">
        {headerLabel}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
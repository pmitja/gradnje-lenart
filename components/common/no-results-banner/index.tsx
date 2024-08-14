'use client';

import XIcon from "@/components/icons/x-icon";
import ButtonWithIcon from "@/components/common/button-with-icon";
import { useAppStore } from "@/store/app";

const NoResultsBanner = () => {
 const { updateProjectFilters } = useAppStore();

  function resetFilters() {
    console.log("resetting filters");
    updateProjectFilters({
      location: "all",
      type: "all",
    });
  }

  return (
    <div className="bg-destructive-50 p-8 rounded-tr-2xl rounded-tl-2xl flex justify-center items-center flex-col gap-5 overflow-hidden">
      <XIcon width={50} height={50} />
      <h3 className="text-md sm:text-lg md:text-xl font-bold text-black text-center">
          Za iskane rezultate ni zadetkov, prosim poizkusite ponovno.
      </h3>
      <ButtonWithIcon
        variant="secondary"
        className="text-xl font-bold px-6 py-3 max-w-fit border-secondary-300"
        onClick={() => resetFilters()}>
        Poenostavi filter
      </ButtonWithIcon>
    </div>
  )
}

export default NoResultsBanner;

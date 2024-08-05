import { getLocationRealEstates } from "@/actions/get-location-real-esatates";
import SectionWithTitleOnLeft from "@/components/layouts/sections/title-left";
import { formatNumber } from "@/lib/helpers";
import { RealEstate } from "@prisma/client";
import Image from "next/image";

const RealEstateCard = ({ realEstate, city, address }: { realEstate: RealEstate, city: string, address: string}) => {
  return (
    <div className="bg-primary-50 shadow-md rounded-xl p-4 flex gap-4 min-w-fit">
      <Image 
        src={`https://utfs.io/f/${realEstate.images[0]}`} 
        alt={realEstate.name} 
        width={200} 
        height={200} 
        className="max-h-[200px] max-w-[200px] aspect-square object-cover w-full h-full rounded-2xl"
      />
      <div className="flex flex-col gap-2 min-w-fit place-content-center">
        <h3 className="text-[38px] leading-[57px] font-bold text-primary-200">{formatNumber(Number(realEstate.priceWithTax))} €</h3>
        <span className="text-secondary-400 text-[28px] leading-8 font-bold">{realEstate.name}</span>
        <span className="text-xs leading-3.5 text-secondary-200">{city}, {address}</span>
      </div>
    </div>
  );
}

const SelectedProject = async ({ params }: { params: { slug: string } }) => {
  const location = await getLocationRealEstates(params.slug.toString());

  if (!location) {
    return null;
  }

  return <div className="h-full">My Post: {params.slug}
  {location.realEstates.length > 0 && <SectionWithTitleOnLeft title={'Nepremičnine'}>
    <div className="flex gap-8">
      {location.realEstates.map((realEstate) => (
        <RealEstateCard key={realEstate.id} realEstate={realEstate} city={location.city} address={location.address} />
      ))}
    </div>
  </SectionWithTitleOnLeft>}
  </div>;
};

export default SelectedProject;

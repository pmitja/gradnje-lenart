import { getLocationRealEstates } from "@/actions/get-location-real-esatates";
import SingleProject from "@/components/layouts/sections/single-project";

const SelectedProject = async ({ params }: { params: { slug: string } }) => {
  const location = await getLocationRealEstates(params.slug.toString());

  if (!location) {
    return null;
  }

  return (
    <div className="h-full">
      <SingleProject location={location} />
    </div>
  );
};

export default SelectedProject;

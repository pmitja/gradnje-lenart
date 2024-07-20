import ButtonWithIcon from '@/components/common/button-with-icon';
import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

const ProjectsSection = async () => {
  const projects = await db.location.findMany({});

  console.log(projects);
  return (
    <section className="flex flex-col gap-3 lg:gap-5">
      <div className="flex flex-col gap-3 lg:gap-5">
        <h3 className="text-secondary-400 text-3xl lg:text-[38px] lg:leading-[57px] font-bold">
          Aktualni projekti
        </h3>
        <p className="text-sm lg:text-base text-secondary-100">
          Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu
          slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo.
        </p>
      </div>
      <div className="flex flex-col gap-10 lg:gap-20">
        {projects.map((project, index) => {
          if (index % 2 === 0) {
            return (
              <ElementOdd
                key={project.id}
                title={project.name}
                link={project.slug}
                images={project.images}
              />
            );
          } else {
            return (
              <ElementEven
                key={project.id}
                title={project.name}
                link={project.slug}
                images={project.images}
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;

const ElementOdd = ({
  title,
  link,
  images,
}: {
  title: string;
  link: string;
  images?: string[];
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-5">
    <Image
      src={
        images && images[0]
          ? `${process.env.UPLOADTHING_BASE_URL}/f/${images[0]}`
          : '/apartment-image.webp'
      }
      alt="Image"
      width={733}
      height={500}
      className="w-full rounded-2xl object-cover min-h-full"
    />
    <div className="flex flex-col gap-2 lg:gap-4">
      <Image
        src={
          images && images[1]
            ? `${process.env.UPLOADTHING_BASE_URL}/f/${images[1]}`
            : '/apartment-image.webp'
        }
        alt="Image"
        width={500}
        height={300}
        className="w-full max-h-[333px] object-cover rounded-2xl hidden lg:block"
      />
      <h4 className="text-primary-400 text-2xl font-bold lg:text-4xl">
        {title}
      </h4>
      <p className="text-secondary-100 text-sm lg:text-base">
        Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu
        slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo.
      </p>
      <Link href={link}>
        <ButtonWithIcon
          variant="primary"
          className="text-xl px-6 py-4 max-w-fit drop-shadow-primary-button">
          Pojdi na projekt
        </ButtonWithIcon>
      </Link>
    </div>
  </div>
);

const ElementEven = ({
  title,
  link,
  images,
}: {
  title: string;
  link: string;
  images?: string[];
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-5">
    <div className="flex flex-col gap-2 lg:gap-4">
      <h4 className="text-primary-400 text-2xl font-bold lg:text-4xl">
        {title}
      </h4>
      <p className="text-secondary-100 text-sm lg:text-base">
        Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu
        slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo.
      </p>
      <Link href={link}>
        <ButtonWithIcon
          variant="primary"
          className="text-xl px-6 py-4 max-w-fit drop-shadow-primary-button">
          Pojdi na projekt
        </ButtonWithIcon>
      </Link>
      <Image
        src={
          images && images[1]
            ? `${process.env.UPLOADTHING_BASE_URL}/f/${images[1]}`
            : '/apartment-image.webp'
        }
        alt="Image"
        width={500}
        height={300}
        className="w-full max-h-[333px] object-cover rounded-2xl hidden lg:block"
      />
    </div>
    <Image
      src={
        images && images[0]
          ? `${process.env.UPLOADTHING_BASE_URL}/f/${images[0]}`
          : '/apartment-image.webp'
      }
      alt="Image"
      width={733}
      height={500}
      className="w-full rounded-2xl object-cover min-h-full"
    />
  </div>
);

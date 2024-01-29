import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon(props: any) {
  const { id, open } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function AccordionCustomIcon() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion
        placeholder={undefined}
        open={open === 1}
        icon={<Icon id={1} open={open} />}
      >
        <AccordionHeader
          placeholder={undefined}
          onClick={() => handleOpen(1)}
          className="h-[100px] flex items-center pl-12 text-3xl"
        >
          <h1>Moje wykształcenie</h1>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-xl px-12">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
            sequi minus. Laudantium dolores minus, aperiam ducimus quos sequi
            modi recusandae expedita maxime perspiciatis necessitatibus fugit
            saepe, voluptatibus aspernatur, ex sint! Facilis perspiciatis
            laudantium explicabo ipsum deserunt nobis totam dolorem alias,
            debitis obcaecati ullam dicta sed optio? Ipsa id pariatur fuga
            dolorum dolorem, cum esse quae tenetur, ipsam nulla ad iste.
            Mollitia consectetur in accusamus, asperiores pariatur blanditiis
            consequuntur eum iusto officiis soluta ab excepturi veritatis!
            Quibusdam commodi neque, totam dignissimos molestias maiores, minima
            nisi reprehenderit voluptates voluptatem, tenetur accusantium quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque
            laboriosam sapiente maxime, maiores, minus nemo accusantium animi
            unde debitis exercitationem ullam voluptates beatae. Quisquam nobis
            autem ipsa? Quia, distinctio.
          </p>
        </AccordionBody>
      </Accordion>

      <Accordion
        placeholder={undefined}
        open={open === 2}
        icon={<Icon id={2} open={open} />}
      >
        <AccordionHeader
          placeholder={undefined}
          onClick={() => handleOpen(2)}
          className="h-[100px] flex items-center pl-12 text-3xl"
        >
          <h1>Moje doświadczenie</h1>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-xl px-12">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
            sequi minus. Laudantium dolores minus, aperiam ducimus quos sequi
            modi recusandae expedita maxime perspiciatis necessitatibus fugit
            saepe, voluptatibus aspernatur, ex sint! Facilis perspiciatis
            laudantium explicabo ipsum deserunt nobis totam dolorem alias,
            debitis obcaecati ullam dicta sed optio? Ipsa id pariatur fuga
            dolorum dolorem, cum esse quae tenetur, ipsam nulla ad iste.
            Mollitia consectetur in accusamus, asperiores pariatur blanditiis
            consequuntur eum iusto officiis soluta ab excepturi veritatis!
            Quibusdam commodi neque, totam dignissimos molestias maiores, minima
            nisi reprehenderit voluptates voluptatem, tenetur accusantium quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque
            laboriosam sapiente maxime, maiores, minus nemo accusantium animi
            unde debitis exercitationem ullam voluptates beatae. Quisquam nobis
            autem ipsa? Quia, distinctio.
          </p>
        </AccordionBody>
      </Accordion>

      <Accordion
        placeholder={undefined}
        open={open === 3}
        icon={<Icon id={3} open={open} />}
      >
        <AccordionHeader
          placeholder={undefined}
          onClick={() => handleOpen(3)}
          className="h-[100px] flex items-center pl-12 text-3xl"
        >
          <h1>Moje kursy/szkolenia/certyfikaty</h1>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-xl px-12">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
            sequi minus. Laudantium dolores minus, aperiam ducimus quos sequi
            modi recusandae expedita maxime perspiciatis necessitatibus fugit
            saepe, voluptatibus aspernatur, ex sint! Facilis perspiciatis
            laudantium explicabo ipsum deserunt nobis totam dolorem alias,
            debitis obcaecati ullam dicta sed optio? Ipsa id pariatur fuga
            dolorum dolorem, cum esse quae tenetur, ipsam nulla ad iste.
            Mollitia consectetur in accusamus, asperiores pariatur blanditiis
            consequuntur eum iusto officiis soluta ab excepturi veritatis!
            Quibusdam commodi neque, totam dignissimos molestias maiores, minima
            nisi reprehenderit voluptates voluptatem, tenetur accusantium quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque
            laboriosam sapiente maxime, maiores, minus nemo accusantium animi
            unde debitis exercitationem ullam voluptates beatae. Quisquam nobis
            autem ipsa? Quia, distinctio.
          </p>
        </AccordionBody>
      </Accordion>

      <Accordion
        placeholder={undefined}
        open={open === 4}
        icon={<Icon id={4} open={open} />}
      >
        <AccordionHeader
          placeholder={undefined}
          onClick={() => handleOpen(4)}
          className="h-[100px] flex items-center pl-12 text-3xl"
        >
          <h1>Moje linki do innych portali</h1>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-xl px-12">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
            sequi minus. Laudantium dolores minus, aperiam ducimus quos sequi
            modi recusandae expedita maxime perspiciatis necessitatibus fugit
            saepe, voluptatibus aspernatur, ex sint! Facilis perspiciatis
            laudantium explicabo ipsum deserunt nobis totam dolorem alias,
            debitis obcaecati ullam dicta sed optio? Ipsa id pariatur fuga
            dolorum dolorem, cum esse quae tenetur, ipsam nulla ad iste.
            Mollitia consectetur in accusamus, asperiores pariatur blanditiis
            consequuntur eum iusto officiis soluta ab excepturi veritatis!
            Quibusdam commodi neque, totam dignissimos molestias maiores, minima
            nisi reprehenderit voluptates voluptatem, tenetur accusantium quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque
            laboriosam sapiente maxime, maiores, minus nemo accusantium animi
            unde debitis exercitationem ullam voluptates beatae. Quisquam nobis
            autem ipsa? Quia, distinctio.
          </p>
        </AccordionBody>
      </Accordion>

      <Accordion
        placeholder={undefined}
        open={open === 5}
        icon={<Icon id={5} open={open} />}
      >
        <AccordionHeader
          placeholder={undefined}
          onClick={() => handleOpen(5)}
          className="h-[100px] flex items-center pl-12 text-3xl"
        >
          <h1>Podstawowe informacje</h1>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-xl px-12">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
            sequi minus. Laudantium dolores minus, aperiam ducimus quos sequi
            modi recusandae expedita maxime perspiciatis necessitatibus fugit
            saepe, voluptatibus aspernatur, ex sint! Facilis perspiciatis
            laudantium explicabo ipsum deserunt nobis totam dolorem alias,
            debitis obcaecati ullam dicta sed optio? Ipsa id pariatur fuga
            dolorum dolorem, cum esse quae tenetur, ipsam nulla ad iste.
            Mollitia consectetur in accusamus, asperiores pariatur blanditiis
            consequuntur eum iusto officiis soluta ab excepturi veritatis!
            Quibusdam commodi neque, totam dignissimos molestias maiores, minima
            nisi reprehenderit voluptates voluptatem, tenetur accusantium quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque
            laboriosam sapiente maxime, maiores, minus nemo accusantium animi
            unde debitis exercitationem ullam voluptates beatae. Quisquam nobis
            autem ipsa? Quia, distinctio.
          </p>
        </AccordionBody>
      </Accordion>
    </>
  );
}

import user_icon from "../../assets/user_icon.jpg";
import { AccordionCustomIcon } from "../../components/Accordion/Accordion";
const ProfilePage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <section className="bg-white border-2 border-gray-300 w-full max-w-[1600px] rounded-3xl px-8 py-4 mt-10 flex">
          <div className="w-[300px] h-[300px]">
            <img
              src={user_icon}
              alt="user icon"
              className="w-full h-full rounded-full border-4 border-gray-300"
            />
          </div>

          <div className="ml-8 flex justify-center flex-col">
            <h1 className="text-6xl font-bold">Kacper Piaskowy</h1>
            <p className="italic text-2xl text-gray-700 mt-2">
              kacperpiaskowy937@gmail.com
            </p>
          </div>
        </section>

        <section className="mt-10 bg-white w-full max-w-[1600px] rounded-3xl">
          <AccordionCustomIcon />
        </section>
      </div>

      <footer className="w-full bg-main-second h-[100px] mt-32 text-white flex justify-center flex-col px-8">
        <h2 className="text-xl">Kacper Piaskowy</h2>
        <h3>All rights reserved</h3>
      </footer>
    </>
  );
};

export default ProfilePage;

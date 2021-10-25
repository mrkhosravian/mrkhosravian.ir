import type { NextPage } from "next";
import Layout from "../components/layout";
import Image from "next/image";
import myPic from "../public/mohammad-reza-khosravian.png";

const Home: NextPage = () => {
  return (
    <Layout>

      <div className="max-w-5xl mx-auto h-screen">
        <div className="flex justify-between h-full items-center">

          <div
            className={"w-[650px] flex flex-col justify-center space-y-5"}>
            <span className={"text-xl"}>Hi, This is</span>
            <div
              className={"flex flex-col space-y font-bold text-5xl text-gradient uppercase tracking-wider"}>
              <span>Mohammad</span>
              <span>Reza</span>
              <span>Khosravian</span>
            </div>
            <span
              className={"text-xl"}>Programmer, Computer and Food lover</span>
          </div>

          <div
            className={"rounded-full overflow-hidden flex avatar-shadows"}>
            <Image src={myPic}
                   alt="Mohammad Reza Khosravian"
            />
          </div>

        </div>
      </div>

    </Layout>
  );
};

export default Home;

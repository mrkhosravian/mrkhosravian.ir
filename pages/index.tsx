import type { NextPage } from "next";
import Layout from "../components/layout";
import Image from "next/image";
import myPic from "../public/mohammad-reza-khosravian.png";
import Card1 from "../components/cards/card1";
import { _calculateAge } from "../lib/helpers";

const Home: NextPage = () => {
  return (
    <Layout>

      <section className="w-full md:max-w-5xl mx-auto h-screen min-h-[700px]">
        <div className="flex flex-col md:flex-row justify-center md:justify-between h-full items-center px-5 md:px-0">

          <div
            className={"md:w-[650px] flex flex-col justify-center space-y-5 order-2 md:order-1"}>
            <span className={"text-lg md:text-xl"}>Hi, This is</span>
            <div
              className={"flex flex-col space-y font-bold text-4xl md:text-5xl text-gradient uppercase tracking-wider"}>
              <span>Mohammad</span>
              <span>Reza</span>
              <span>Khosravian</span>
            </div>
            <span
              className={"text-lg md:text-xl"}>Programmer, Computer and Food lover</span>
          </div>

          <div
            className={"rounded-full overflow-hidden flex avatar-shadows order-1 md:order-2 w-48 md:w-auto mb-20 md:mb-0"}>
            <Image src={myPic}
                   alt="Mohammad Reza Khosravian"
            />
          </div>

        </div>
      </section>

      <section className={"container mx-auto mb-20 px-5"}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span className={"text-gradient text-6xl"}>+5 Years</span>
              <span className={"text-2xl font-thin"}>Experience</span>
            </div>
          </Card1>

          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span className={"text-gradient text-6xl"}>+4</span>
              <span className={"text-2xl font-thin"}>Projects</span>
            </div>
          </Card1>

          <Card1
            className={"md:col-span-2 row-span-2"}>
            <div className="h-full flex flex-col justify-center space-y-5 px-10 text-left">
              <h2 className={"text-4xl text-gradient"}>Biography</h2>
              <p className={"text-2xl leading-relaxed font-light tracking-wide text-gray-900 text-opacity-60"}>
                I&apos;m Mohammad Reza Khosravian. I was born at 1999 june in
                Bushehr Province ( a lovely port in south west of Iran ).
                I spend all my time on working with computers and it never makes
                me tired.
              </p>
            </div>
          </Card1>

          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span className={"text-gradient text-6xl"}>{_calculateAge(new Date('1999-6-8'))} Years</span>
              <span className={"text-2xl font-thin"}>Old</span>
            </div>
          </Card1>

          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span className={"text-gradient text-6xl"}>Speak 2</span>
              <span className={"text-2xl font-thin"}>Languages</span>
            </div>
          </Card1>
        </div>
      </section>

    </Layout>
  );
};

export default Home;

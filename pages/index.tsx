import type { GetStaticProps, NextPage } from "next";
import Layout from "../components/layout";
import Image from "next/image";
import myPic from "../public/mohammad-reza-khosravian.png";
import Card1 from "../components/cards/card1";
import { _calculateAge } from "../lib/helpers";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Meta from "../components/meta/meta";

const Home: NextPage = (props) => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <Layout>

      <Meta title={t("title")} />

      <section className="w-full md:max-w-5xl mx-auto h-screen min-h-[700px]">
        <div
          className="flex flex-col md:flex-row justify-center md:justify-between h-full items-center px-5 md:px-0">

          <div
            className={"md:w-[650px] flex flex-col justify-center order-2 md:order-1"}>
            <span
              className={"text-lg md:text-xl"}>{t("home:Hi, This is")}</span>
            <div
              className={"flex flex-col font-bold text-4xl md:text-5xl text-gradient uppercase tracking-wider mt-1"}>
              <span className={"py-2"}>{t("common:name.first")}</span>
              <span className={"py-2"}>{t("common:name.middle")}</span>
              <span className={"py-2"}>{t("common:name.last")}</span>
            </div>
            <span
              className={"text-lg md:text-xl block mt-5"}>{t("home:Programmer, Computer and Food lover")}</span>
          </div>

          <div
            className={"rounded-full overflow-hidden flex avatar-shadows order-1 md:order-2 w-48 md:w-auto mb-20 md:mb-0"}>
            <Image src={myPic}
                   alt="Mohammad Reza Khosravian"
            />
          </div>

        </div>
      </section>

      <section className={"max-w-5xl mx-auto mb-20 px-5"}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span className={"text-gradient text-6xl"}>+5<span
                className={"text-white opacity-60 text-xl"}>{t("Years")}</span></span>
              <span className={"text-xl font-thin"}>{t("Experience")}</span>
            </div>
          </Card1>

          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span className={"text-gradient text-6xl"}>+4</span>
              <span className={"text-xl font-thin"}>{t("home:Projects")}</span>
            </div>
          </Card1>

          <Card1
            className={"md:col-span-2 row-span-2"}>
            <div
              className="h-full flex flex-col justify-center space-y-5 px-5 text-left rtl:text-right">
              <h2
                className={"text-6xl text-gradient py-5"}>{t("Biography")}</h2>
              <p
                className={"text-xl leading-relaxed font-light tracking-wide opacity-60"}>
                {t("home:bio-text")}
              </p>
            </div>
          </Card1>

          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span
                className={"text-gradient text-6xl"}>{_calculateAge(new Date("1999-6-8"))}<span
                className={"text-white opacity-60 text-xl"}>{t("Years")}</span></span>
              <span className={"text-xl font-thin"}>{t("Old")}</span>
            </div>
          </Card1>

          <Card1
            className={"col-span-1"}>
            <div className="py-10 flex flex-col justify-center items-center">
              <span className={"text-gradient text-6xl"}>2</span>
              <span className={"text-xl font-thin"}>{t("Languages")}</span>
            </div>
          </Card1>
        </div>
      </section>

    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale!, ["common", "home"])
  }
});

export default Home;

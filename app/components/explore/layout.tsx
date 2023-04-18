import Layout from "@/components/layout";
import { ReactNode } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const tabs = [
  {
    name: "Top",
    icon: <Flame className="h-4 w-4 text-gray-600" />,
    href: "/explore",
  },
  {
    name: "새로운",
    icon: <Star className="h-4 w-4 text-gray-600" />,
    href: "/explore/new",
  },
];

export default function ExploreLayout({
  type,
  totalConvos,
  children,
}: {
  type: "새로운" | "top";
  totalConvos: number;
  children: ReactNode;
}) {
  const router = useRouter();
  const description = `${Intl.NumberFormat("en-us").format(
    totalConvos
  )} 건의 ${type} ChatGPT 대화를 발견하십시오.`;

  return (
    <Layout
      meta={{
        title: `Explore ${
          type === "top" ? "Top" : "새로운"
        } Conversations on KoShareGPT`,
        description,
        canonical: `https://kosharegpt.com/explore${
          type === "top" ? "" : "/new"
        }`,
      }}
    >
      <div className="flex flex-col items-center pt-28 bg-gray-50">
        <div className="flex flex-col items-center space-y-8 text-center mx-5 sm:mx-auto">
          <h1 className="font-display tracking-tight font-bold text-4xl text-gray-800 transition-colors sm:text-7xl">
            구경하기
          </h1>
          <p className="max-w-xl text-gray-600 transition-colors sm:text-lg">
            {" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {Intl.NumberFormat("en-us").format(totalConvos)}
            </span>{" "}의
            {type} ChatGPT와의 대화가 공유 되었습니다.
          </p>
        </div>
        {/* Tabs */}
        <AnimateSharedLayout>
          <div className="flex items-center justify-center space-x-2 p-2 mt-5 rounded-lg bg-white border border-gray-100 shadow-md">
            {tabs.map(({ name, icon, href }) => {
              const activeTab = router.asPath.split("?")[0] === href;
              return (
                <Link key={href} href={href} className="relative">
                  <div
                    className={`flex items-center justify-center space-x-3 px-4 py-2 z-10 relative rounded-md ${
                      activeTab ? "" : "hover:bg-gray-50"
                    }`}
                  >
                    {icon}
                    <p className="text-sm font-medium text-gray-600">{name}</p>
                  </div>
                  {activeTab && (
                    <motion.div
                      className="bg-gray-100 absolute w-full h-full top-0 z-0 rounded-md"
                      layoutId="navigation-underline"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </AnimateSharedLayout>
      </div>
      {children}
    </Layout>
  );
}

import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Twitter from "@/components/shared/icons/twitter";
import Layout from "@/components/layout";
import ConvoCard from "@/components/explore/convo-card";
import { ConversationMeta } from "@/lib/types";
import { getConvos } from "@/lib/api";
import { ChevronDown, Search } from "lucide-react";
import Popover from "@/components/shared/popover";
import { useState } from "react";

export default function Home({
  totalConvos,
  topConvos,
}: {
  totalConvos: number;
  topConvos: ConversationMeta[];
}) {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <Layout>
      <div className="flex flex-col items-center py-28 bg-gray-50">
        <Link
          href="https://twitter.com/steventey/status/1599816553490366464"
          target="_blank"
          rel="noreferrer"
          className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 mb-5 transition-all hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            KoShareGPT 소개
          </p>
        </Link>
        <div className="flex flex-col items-center space-y-8 text-center mx-5 sm:mx-auto">
          <h1 className="font-display tracking-tight font-bold text-4xl text-gray-800 transition-colors sm:text-7xl">
            KoShareGPT
          </h1>
          <p className="max-w-lg text-gray-600 transition-colors sm:text-lg">
            한번의 클릭으로 ChatGPT와의 대화를 공유해 보세요!
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {Intl.NumberFormat("en-us").format(totalConvos)}
            </span>{" "}
            건의 대화가 공유 되었습니다.            
          </p>
          <p className="max-w-lg text-gray-600 transition-colors sm:text-lg">
            현재 크롬 익스텐션 등록 심사 중입니다. 그 동안은 아래 링크를 통해 다운로드해서 사용하실 수 있습니다.
            <br />            
          </p>
          <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/craigchoi/kosharegpt/raw/main/extension/Archive.zip"
        >
          <h1 className="mb-2 text-sm">다운로드</h1>
        </Link>
          <div className="flex flex-col sm:flex-row">
            <div className="flex justify-center items-center mb-3 sm:mr-3 sm:mb-0 rounded-lg bg-[#232c67] md:bg-indigo-500 text-white shadow-md">
              <a
                className="hidden md:flex space-x-3 justify-center items-center px-5 py-3 border-r-2 border-white/25 font-medium md:hover:bg-indigo-600 transition-all rounded-l-lg"
                href="/extension"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="Chrome logo"
                  src="/chrome.svg"
                  width={20}
                  height={20}
                />
                <p>크롬 익스텐션 설치</p>
              </a>
              {/* <a
                className="flex md:hidden space-x-3 justify-center items-center px-5 py-3 border-r-2 border-white/25 font-medium md:hover:bg-indigo-600 transition-all rounded-l-lg"
                href="/shortcut"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="iOS Shortcuts logo"
                  src="/shortcut.svg"
                  width={20}
                  height={20}
                  className="border-2 border-white/25 rounded-md"
                />
                <p>바탕화면에 추가</p>
              </a> */}
              <Popover
                content={
                  <div className="grid w-full md:w-[14.5rem] p-2">
                    <a
                      href="/extension"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex space-x-3 items-center px-5 py-3 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md transition-all"
                    >
                      <Image
                        alt="Chrome logo"
                        src="/chrome.svg"
                        width={20}
                        height={20}
                      />
                      <p>크롬 익스텐션 설치</p>
                    </a>
                    {/* <a
                      href="/shortcut"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex space-x-3 items-center px-5 py-3 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md transition-all"
                    >
                      <Image
                        alt="iOS Shortcut logo"
                        src="/shortcut.svg"
                        width={20}
                        height={20}
                      />
                      <p>바탕화면에 추가</p>
                    </a> */}
                  </div>
                }
                align="end"
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
              >
                <button
                  className="px-3 h-12 flex items-center text-white md:hover:bg-indigo-600 transition-all rounded-r-lg"
                  onClick={() => setOpenPopover(!openPopover)}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </Popover>
            </div>
          </div>
        </div>
        <div className="my-16 px-0 sm:px-2 sm:max-w-screen-lg w-full">
          <LiteYouTubeEmbed
            id="lrjC9PTemJw"
            poster="maxresdefault"
            title="Whats new in Material Design for the web (Chrome Dev Summit 2019)"
          />
        </div>
        
        
        <p className="max-w-lg text-gray-600 transition-colors sm:text-lg">
        지난 며칠 동안 채팅 GPT를 꽤 많이 사용해봤는데, 다른 사람들과 대화를 공유할 수 있는 좋은 방법이 없다는 것을 알게 되었습니다. 대화는 보통 몇 개의 화면에 걸쳐 진행되기 때문에 여러 개의 스크린샷을 찍거나 엄청나게 확대해서 찍어야 합니다. 그래서 저는 이 문제를 해결하기 위해 작은 내보내기 버튼을 추가하는 Chrome 확장 프로그램을 만들었습니다. 여기에 작은 내보내기 버튼이 추가되었습니다. 그러면 이 차세대 사이트의 새 페이지가 생성되며, 구문 강조 표시가 약간 다르다는 점을 제외하면 기본 OpenAI와 동일한 스타일이 적용됩니다. 그런 다음 친구들과 공유할 수 있습니다. 지금은 방금 만든 것이기 때문에 아직 공식 Chrome 확장 프로그램은 아닙니다. 하지만 이 저장소를 복제하고 Chrome 확장 프로그램 페이지에서 압축 해제 로드를 누르면 사용할 수 있을 것입니다. 도움이 되었기를 바라며 피드백이 있으면 알려주세요.
        <br />
        </p>
        <div className="w-full bg-gray-100 py-5 sm:py-10 mb-10">
          <div className="flex justify-center space-x-5">
            <Link
              href="https://techcrunch.com/2022/12/08/sharegpt-lets-you-easily-share-your-chatgpt-conversations/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/techcrunch.png"
                alt="TechCrunch logo"
                width={2244}
                height={318}
                className="w-48 sm:w-60 hover:scale-105 transition-all"
              />
            </Link>
            <Link
              href="https://www.youtube.com/watch?v=V_L6vG2EJmk"
              target="_blank"
              rel="noopener noreferrer"
            >
              KoShareGPT 사용법
            </Link>
            <Link
              href="https://www.youtube.com/watch?v=FyMl99NC3nA"
              target="_blank"
              rel="noopener noreferrer"
            >
              ChatGPT 사용법
            </Link>
            <Link
              href="https://kkiuk.tistory.com/336"
              target="_blank"
              rel="noopener noreferrer"
            >
              크롬익스텐션 설치법
            </Link>
          </div>
        </div>
        <div className="py-4 px-2 sm:max-w-screen-lg w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold font-display">
            구경하기
          </h2>
          <ul className="mt-8 grid gap-2">
            {topConvos.map((convo) => (
              <ConvoCard key={convo.id} data={convo} />
            ))}
          </ul>
        </div>
      </div>
      <div className="h-[100px] bg-gray-50 flex flex-col items-center justify-center w-full">
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/craigchoi/kosharegpt"
        >
          <h1 className="mb-2 text-sm">GitHub에서 소스보기</h1>
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://vercel.com?utm_source=sharegpt&utm_campaign=oss"
        >
          <Image
            width="200"
            height="100"
            alt="Vercel Logo"
            src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
          />
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const totalConvos = await prisma.conversation.count();
  const topConvos = await getConvos({ orderBy: "views", take: 10 });
  return {
    props: {
      totalConvos,
      topConvos,
    },
    revalidate: 60,
  };
}

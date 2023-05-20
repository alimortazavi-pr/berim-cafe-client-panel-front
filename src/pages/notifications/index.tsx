import Head from "next/head";

//Components
import NavBar from "@/components/layouts/NavBar";

const Notifications = () => {
  return (
    <div>
      <Head>
        <title>بریم کافه |‌ اطلاع‌رسانی</title>
      </Head>
      <NavBar title="اطلاع‌رسانی" />
      <div className="text-center pt-10 text-zinc-800 font-black text-5xl">
        <span>بزودی ...</span>
      </div>
    </div>
  );
};

export default Notifications;

import { useRouter } from "next/router";
import { AiOutlineRight } from "react-icons/ai";
import Head from "next/head";
export default function Home() {


  const router = useRouter()
  return (

    <div className="overflow-x-hidden  flex flex-col bg-white min-h-screen" >
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="item  w-full flex justify-center py-4">
        <img src="kindu.png" alt="" className="max-w-[200px] md:max-w-[300px]" />
      </div>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="item  w-full flex justify-start md:justify-center py-4">
          <img src="kindu2.png" alt="" className=" w-full md: md:max-w-[700px] h-auto md:h-[400px]" />
        </div>
        <div className="flex flex-col">
          <div className="item  w-full flex justify-start md:justify-center p-4 flex-col">
            <h1 className="font-bold text-3xl">Meet Highrise/Canaan Online Canabis Store</h1>
            <p className="font-thin text-[15px]">For all stoners in highrise and canaan, we got the best weed in town</p>
          </div>
          <div className=" items-start w-full flex justify-center  p-4  gap-2 flex-wrap ">
            <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2 tx:w-[45%]" onClick={(e) => router.push("/shop")}>Shop<AiOutlineRight /></button>
            <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2  tx:w-[45%]" onClick={(e) => router.push("/login")}>Sell <AiOutlineRight /></button>

          </div>
        </div>
      </div>

    </div>

  );



}


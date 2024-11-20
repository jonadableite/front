
import { Profissional } from "@/types/empresa/profissional";
import Link from "next/link";
import Image from "next/image";

export default function ChartCompanie({
  profissionalData,
}: {
  profissionalData: Array<Profissional>;
}) {
  // console.log(profissionalData, "componente");
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-aibitMenu xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
       Profissionais
      </h4>

      <div>
        {profissionalData?.length > 0 &&
          profissionalData?.map((chat: Profissional) => {
            return (
              <Link
                href="/"
                className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
                key={chat.id}
              >
                <div className="relative h-14 w-14 rounded-full">
                  <img
                    className="rounded-full w-12 h-12"
                    src={chat.image}
                    alt="image description"
                  />

                  {/* <img src={chat.image} alt="User" width={57} height={56} /> */}
                  <span
                    className={`absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                      chat.hours === "25,00"
                        ? "bg-success"
                        : `bg-meta-${chat.hours}`
                    } `}
                  ></span>
                </div>

                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black dark:text-white">
                      {chat.name}
                    </h5>
                    <p>
                      <span className="text-sm text-black dark:text-white">
                        {chat.person}
                      </span>
                      <span className="text-xs"> . {chat.createdAt.toLocaleString()} min</span>
                    </p>
                  </div>
                  {chat.active !== false && (
                    <div className={`inline-flex h-6 w-6 items-center justify-center py-1 px-3 p-1 rounded-md  text-sm font-medium text-white
                    ${
                      chat.active == true
                        ? "bg-primary "
                        : "bg-danger "
                    }`}>
                      <span className="text-sm font-medium text-white">
                        {" "}
                       ok
                      </span>

                    </div>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

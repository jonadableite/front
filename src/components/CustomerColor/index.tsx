export default function CustomerColor() {
  return (
    <div
      id="customcolor"
      className="py-3 px-6 border-b border-gray-200 dark:border-gray-700"
    >
      <p className="text-base text-semibold">Primary Color</p>
      <div className="relative my-3">
        <div
          id="custred"
          title="red"
          className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-rose-700 hover:opacity-90 rounded-full cursor-pointer"
        ></div>
        <div
          id="custyellow"
          title="yellow"
          className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-[#EFF2F7] hover:opacity-90 rounded-full cursor-pointer"
        ></div>
        <div
          id="custgreen"
          title="green"
          className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-[#10B981] hover:opacity-90 rounded-full cursor-pointer"
        ></div>
        <div
          id="custblue"
          title="blue"
          className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-meta-4 hover:opacity-90 rounded-full cursor-pointer"
        ></div>
        <div
          id="custpurple"
          title="purple"
          className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-meta-5 hover:opacity-90 rounded-full cursor-pointer"
        ></div>
        <div
          id="custpink"
          title="pink"
          className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-meta-6 hover:opacity-90 rounded-full cursor-pointer"
        ></div>
        <div
          id="custindigo"
          title="reset color"
          className="inline-block cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-counterclockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            ></path>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

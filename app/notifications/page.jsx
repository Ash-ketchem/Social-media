import Header from "@/components/common/Header";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <h3>Not implemented yet</h3>
        <div className="w-64 h-64 rounded-full">
          <Image
            src="/images/duck.jpg"
            className="rounded-full"
            alt="duck"
            width={800}
            height={800}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default page;

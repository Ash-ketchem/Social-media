const CommentItem = ({ data }) => {
  console.log(data, "=> data");
  return (
    <div className="flex flex-col gap-2 items-start justify-center relative  py-2 px-0">
      <div className="flex gap-2 justify-start items-center text-sm">
        <p>{data?.user?.name || "random guy"} </p>
        <p className="hover:underline cursor-pointer text-sm">
          @{data?.user?.username}
        </p>
        <p>2h ago</p>
      </div>
      <div>
        <p className="text-md">{data.body}</p>
      </div>
      <div className=" w-full" />
    </div>
  );
};

export default CommentItem;

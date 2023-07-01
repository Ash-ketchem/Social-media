import CommentItem from "./CommentItem";

const CommentFeed = ({ comments, loggedUserId }) => {
  if (!loggedUserId) {
    return (
      <div className="w-full mt-2 flex justify-center items-center p-2 bg-opacity-70 opacity-60">
        <p>Login to comment</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 p-2 rounded-box flex flex-col gap-2 pb-4">
      <h3 className="text-content opacity-60 semi-bold text-sm tracking-wide leading-snug mb-1">
        comments
      </h3>
      <div className="py-1">
        {comments.length ? (
          comments?.map((comment) => (
            <CommentItem data={comment} key={comment.id} />
          ))
        ) : (
          <p>no comments...</p>
        )}
      </div>
    </div>
  );
};

export default CommentFeed;

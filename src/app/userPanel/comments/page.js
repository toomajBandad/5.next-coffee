import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import commentModel from "@/models/Comment";
import CommentTable from "@/components/templates/p-user/CommentTable";

async function AdminComments() {
  await connectToDB();
  const user = await authUser();
  const comments = await commentModel
    .find({ userID: user._id })
    .populate("productID" , "name");
  return (
    <div>
      <div>
        <CommentTable comments={JSON.parse(JSON.stringify(comments))} />
      </div>
    </div>
  );
}

export default AdminComments;

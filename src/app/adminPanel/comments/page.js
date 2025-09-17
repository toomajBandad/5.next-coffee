import DataTable from "@/components/templates/p-user/DataTable";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import commentModel from "@/models/Comment";

async function AdminComments() {
  await connectToDB();
  const user = await authUser();
  const comments = await commentModel
    .find({ userID: user._id })
    .populate("productID" , "name");
  return (
    <div>
      <div>
        <DataTable comments={JSON.parse(JSON.stringify(comments))} />
      </div>
    </div>
  );
}

export default AdminComments;

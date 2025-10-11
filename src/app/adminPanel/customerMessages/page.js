import MessagesEdit from "@/components/templates/p-admin/MessagesEdit";
import connectToDB from "@/configs/db";
import contactModel from "@/models/Contact";
import React from "react";

async function CustomerMessages() {
  await connectToDB();
  const messages = await contactModel.find({}).lean();
  return (
    <div>
      <MessagesEdit messages={JSON.parse(JSON.stringify(messages))} />
    </div>
  );
}

export default CustomerMessages;

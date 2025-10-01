import Ticket from "@/components/modules/ticket/Ticket";

export default function Tickets({ tickets }) {
  return (
    <div className="py-6">

      {tickets &&
        (tickets.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">No tickets found.</p>
            <p className="text-sm">You're all caught up! 🎉</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
              <Ticket key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ))}
    </div>
  );
}

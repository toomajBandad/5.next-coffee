// components/modules/ticket/Tickets.tsx
import Ticket from "@/components/modules/ticket/Ticket";

export default function Tickets() {
  const recentTickets = [
    { title: "Login issue", user: "alice@example.com", time: "2 hours ago", status: "Open" },
    { title: "Payment failed", user: "bob@example.com", time: "Yesterday", status: "Pending" },
    { title: "Feature request", user: "carol@example.com", time: "3 days ago", status: "Closed" },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Recent Tickets</h2>

      {recentTickets.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No tickets found.</p>
          <p className="text-sm">You're all caught up! 🎉</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentTickets.map((ticket, index) => (
            <Ticket key={index} {...ticket} />
          ))}
        </div>
      )}
    </div>
  );
}

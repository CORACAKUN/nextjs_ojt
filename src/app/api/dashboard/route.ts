import { NextResponse } from "next/server";

const stats = [
  { title: "Users", value: "1200" },
  { title: "Orders", value: "530" },
  { title: "Revenue", value: "$12,400" },
  { title: "Visitors", value: "8700" },
];

const users = [
  { id: 1, name: "John Doe", email: "john@email.com" },
  { id: 2, name: "Jane Smith", email: "jane@email.com" },
  { id: 3, name: "Michael Lee", email: "michael@email.com" },
  { id: 4, name: "Alex Kim", email: "alex@email.com" },
  { id: 5, name: "Sam Rivera", email: "sam@email.com" },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json({
    stats,
    users,
  });
}

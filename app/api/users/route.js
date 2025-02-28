import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

export async function GET() {
  try {
    console.log("Attempting to read file:", filePath);
    const data = await fs.readFile(filePath, "utf-8");
    console.log("File read successfully:", data);
    const users = JSON.parse(data);
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error reading file - Details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ error: "Failed to read users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const newUser = await req.json();
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(JSON.stringify({ error: "Failed to update users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    const { id, ...updatedFields } = await req.json();
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    users[userIndex] = { ...users[userIndex], ...updatedFields };

    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in PUT:", error);
    return new Response(JSON.stringify({ error: "Failed to update users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    const updatedUsers = users.filter((user) => user.id !== id);

    await fs.writeFile(
      filePath,
      JSON.stringify(updatedUsers, null, 2),
      "utf-8"
    );
    return new Response(JSON.stringify(updatedUsers), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in DELETE:", error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

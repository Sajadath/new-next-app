import fs from "fs/promises";
import path from "path";

const tokensFilePath = path.join(process.cwd(), "data", "tokens.json");

const users = {
  username: "sajad",
  password: "147369258",
};

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (username === users.username && password === users.password) {
      const tokens = {
        accessToken: "dummyAccessToken",
        refreshToken: "dummyRefreshToken",
      };
      await fs.writeFile(
        tokensFilePath,
        JSON.stringify(tokens, null, 2),
        "utf-8"
      );

      return new Response(JSON.stringify(tokens), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(JSON.stringify({ error: "Failed to authenticate" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req) {
  try {
    const { refreshToken } = await req.json();
    const tokens = JSON.parse(await fs.readFile(tokensFilePath, "utf-8"));

    if (tokens.refreshToken === refreshToken) {
      await fs.writeFile(tokensFilePath, JSON.stringify({}, null, 2), "utf-8");
      return new Response(
        JSON.stringify({ message: "Logged out successfully" }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in DELETE:", error);
    return new Response(JSON.stringify({ error: "Failed to log out" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

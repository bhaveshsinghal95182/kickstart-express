import "dotenv/config";
import express from "express";
import clerkClient from "@clerk/express";
import {
  clerkAuth,
  protectedRoute,
  optionalAuth,
  customProtection,
} from "./middleware/auth.js";

const app = express();
app.use(express.json());

// Apply Clerk middleware to all routes
app.use(clerkAuth);

// Example: Public route (no authentication required)
app.get("/public", (req, res) => {
  res.json({ message: "This is a public route accessible to everyone" });
});

// Example: Route with optional auth (shows user info if authenticated)
app.get("/optional-auth", optionalAuth, (req, res) => {
  if (req.auth.userId) {
    res.json({
      message: "You are authenticated!",
      userId: req.auth.userId,
    });
  } else {
    res.json({
      message: "You are not authenticated, but that's okay for this route",
    });
  }
});

// Example: Protected route (requires authentication)
app.get("/protected", protectedRoute, async (req, res) => {
  try {
    // Get the user's information from Clerk
    const user = await clerkClient.users.getUser(req.auth.userId);

    res.json({
      message: "This is a protected route",
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Example: Route with custom protection (API-style, returns JSON instead of redirecting)
app.get("/api/user", customProtection, async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);

    res.json({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Example: Route with permission check
app.get("/admin", customProtection, (req, res) => {
  // Check if user has admin permission
  if (!req.auth.has({ permission: "org:admin" })) {
    return res.status(403).json({ error: "Admin permission required" });
  }

  res.json({
    message: "Admin-only content",
    userId: req.auth.userId,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Available routes:");
  console.log("  GET  /public         - Public route");
  console.log("  GET  /optional-auth  - Optional auth route");
  console.log(
    "  GET  /protected      - Protected route (redirects if not auth)"
  );
  console.log("  GET  /api/user       - API route (returns 401 if not auth)");
  console.log("  GET  /admin          - Admin-only route");
  console.log("\nMake sure to set your Clerk keys in .env file!");
});

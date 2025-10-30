import express, { Request, Response } from "express";
import { ensureAdmin } from "../middleware/checkAuth";

const router = express.Router();

// Admin Dashboard - Show all active sessions
router.get("/", ensureAdmin, (req: Request, res: Response) => {
  const sessionStore = req.sessionStore;

  // Get all sessions from the session store
  // @ts-ignore - sessionStore.all() is available in memory store but not in the type definition
  sessionStore.all((err: any, sessions: any) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      return res.status(500).send("Error fetching sessions");
    }

    // Format sessions for display
    const sessionData = [];
    if (sessions) {
      for (const sessionId in sessions) {
        const session = sessions[sessionId];
        if (session.passport && session.passport.user) {
          sessionData.push({
            sessionId: sessionId,
            userId: session.passport.user,
          });
        }
      }
    }

    res.render("admin", {
      sessions: sessionData,
      adminName: req.user?.name || 'Admin'
    });
  });
});

// Revoke a session
router.post("/revoke-session", ensureAdmin, (req: Request, res: Response) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).send("Session ID is required");
  }

  // Destroy the session
  req.sessionStore.destroy(sessionId, (err: any) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error destroying session");
    }

    console.log(`Session ${sessionId} has been revoked`);
    res.redirect("/admin");
  });
});

export default router;

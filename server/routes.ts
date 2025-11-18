import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSessionSchema, 
  sendMessageSchema,
  updateMessageFeedbackSchema 
} from "@shared/schema";
import { getRandomTableData, generateMockResponse } from "./mock-data";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new session
  app.post("/api/sessions", async (req, res) => {
    try {
      const validated = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(validated);
      res.json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all sessions
  app.get("/api/sessions", async (req, res) => {
    try {
      const sessions = await storage.getAllSessions();
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get messages for a specific session
  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const session = await storage.getSession(id);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      const messages = await storage.getSessionMessages(id);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Send a message in a session (user question + AI response)
  app.post("/api/sessions/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const session = await storage.getSession(id);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      const validated = sendMessageSchema.parse(req.body);

      // Create user message
      const userMessage = await storage.createMessage(id, {
        sessionId: id,
        role: "user",
        content: validated.content,
      });

      // Create AI response with mock table data
      const tableData = getRandomTableData();
      const aiResponse = generateMockResponse(validated.content);
      
      const assistantMessage = await storage.createMessage(id, {
        sessionId: id,
        role: "assistant",
        content: aiResponse,
        tableData,
      });

      res.json({ userMessage, assistantMessage });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update message feedback (like/dislike)
  app.patch("/api/messages/:id/feedback", async (req, res) => {
    try {
      const { id } = req.params;
      const validated = updateMessageFeedbackSchema.parse(req.body);
      
      const message = await storage.updateMessageFeedback(id, validated.feedback);
      
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json(message);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

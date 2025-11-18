import type { Session, Message, InsertSession, InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSession(session: InsertSession): Promise<Session>;
  getAllSessions(): Promise<Session[]>;
  getSession(id: string): Promise<Session | undefined>;
  
  createMessage(sessionId: string, message: InsertMessage): Promise<Message>;
  getSessionMessages(sessionId: string): Promise<Message[]>;
  getMessage(id: string): Promise<Message | undefined>;
  updateMessageFeedback(id: string, feedback: "like" | "dislike" | null): Promise<Message | undefined>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, Session>;
  private messages: Map<string, Message>;

  constructor() {
    this.sessions = new Map();
    this.messages = new Map();
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = randomUUID();
    const session: Session = {
      id,
      title: insertSession.title,
      createdAt: new Date(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async getAllSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async createMessage(sessionId: string, insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      id,
      sessionId,
      role: insertMessage.role,
      content: insertMessage.content,
      tableData: insertMessage.tableData,
      feedback: null,
      timestamp: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getSessionMessages(sessionId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((m) => m.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async getMessage(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async updateMessageFeedback(
    id: string,
    feedback: "like" | "dislike" | null
  ): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (message) {
      message.feedback = feedback;
      this.messages.set(id, message);
      return message;
    }
    return undefined;
  }
}

export const storage = new MemStorage();

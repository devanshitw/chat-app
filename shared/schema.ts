import { z } from "zod";

export interface Session {
  id: string;
  title: string;
  createdAt: Date;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface Message {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  tableData?: TableData;
  feedback?: "like" | "dislike" | null;
  timestamp: Date;
}

export const insertSessionSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const insertMessageSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1, "Content is required"),
  tableData: z.object({
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }).optional(),
  feedback: z.enum(["like", "dislike"]).nullable().optional(),
});

export const sendMessageSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export const updateMessageFeedbackSchema = z.object({
  feedback: z.enum(["like", "dislike"]).nullable(),
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type SendMessage = z.infer<typeof sendMessageSchema>;
export type UpdateMessageFeedback = z.infer<typeof updateMessageFeedbackSchema>;

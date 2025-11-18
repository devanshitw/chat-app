import { useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Message } from "@/components/message";
import { ChatInput } from "@/components/chat-input";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Message as MessageType } from "@shared/schema";

export default function Chat() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = params.id;

  const { data: messages, isLoading } = useQuery<MessageType[]>({
    queryKey: ["/api/sessions", sessionId],
    enabled: !!sessionId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      let targetSessionId = sessionId;
      let newSessionCreated = false;
      
      if (!sessionId) {
        const response = await apiRequest("POST", "/api/sessions", {
          title: content.slice(0, 50),
        });
        const newSession = await response.json();
        targetSessionId = newSession.id;
        newSessionCreated = true;
      }
      
      const messageResponse = await apiRequest("POST", `/api/sessions/${targetSessionId}/messages`, { content });
      const result = await messageResponse.json();
      
      return { ...result, targetSessionId, newSessionCreated };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      
      if (data.targetSessionId) {
        queryClient.invalidateQueries({ queryKey: ["/api/sessions", data.targetSessionId] });
        
        if (data.newSessionCreated) {
          setLocation(`/chat/${data.targetSessionId}`);
        }
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!sessionId) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Start a New Chat</h2>
        <p className="text-sm text-muted-foreground max-w-md text-center mb-6">
          Ask a question to begin your conversation. Your messages will be organized in sessions.
        </p>
        <ChatInput
          onSend={(content) => sendMessageMutation.mutate(content)}
          disabled={sendMessageMutation.isPending}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChatInput onSend={() => {}} disabled />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages && messages.length > 0 ? (
          <div>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>
      <ChatInput
        onSend={(content) => sendMessageMutation.mutate(content)}
        disabled={sendMessageMutation.isPending}
      />
    </div>
  );
}

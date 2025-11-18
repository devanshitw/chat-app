import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@shared/schema";

interface MessageFeedbackProps {
  message: Message;
}

export function MessageFeedback({ message }: MessageFeedbackProps) {
  const { toast } = useToast();

  const feedbackMutation = useMutation({
    mutationFn: async (feedback: "like" | "dislike" | null) => {
      return apiRequest("PATCH", `/api/messages/${message.id}/feedback`, { feedback });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions", message.sessionId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update feedback",
        variant: "destructive",
      });
    },
  });

  const handleFeedback = (feedback: "like" | "dislike") => {
    const newFeedback = message.feedback === feedback ? null : feedback;
    feedbackMutation.mutate(newFeedback);
  };

  return (
    <div className="flex items-center gap-1" data-testid={`feedback-${message.id}`}>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${message.feedback === "like" ? "bg-accent" : ""}`}
        onClick={() => handleFeedback("like")}
        disabled={feedbackMutation.isPending}
        aria-label="Like"
        data-testid={`button-like-${message.id}`}
      >
        <ThumbsUp className={`h-4 w-4 ${message.feedback === "like" ? "fill-current" : ""}`} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${message.feedback === "dislike" ? "bg-accent" : ""}`}
        onClick={() => handleFeedback("dislike")}
        disabled={feedbackMutation.isPending}
        aria-label="Dislike"
        data-testid={`button-dislike-${message.id}`}
      >
        <ThumbsDown className={`h-4 w-4 ${message.feedback === "dislike" ? "fill-current" : ""}`} />
      </Button>
    </div>
  );
}

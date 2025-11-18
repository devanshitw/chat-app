import { Plus, MessageSquare, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSidebar() {
  const [location] = useLocation();
  const { toggleSidebar, open } = useSidebar();
  
  const { data: sessions, isLoading } = useQuery<Session[]>({
    queryKey: ["/api/sessions"],
  });

  const currentSessionId = location.split("/chat/")[1];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" data-testid="link-new-chat">
            <Button
              variant="default"
              className="w-full justify-start gap-2"
              data-testid="button-new-chat"
            >
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            data-testid="button-toggle-sidebar"
          >
            {open ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="p-2">
        <ScrollArea className="flex-1">
          <SidebarMenu>
            {isLoading ? (
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <SidebarMenuItem key={i}>
                    <Skeleton className="h-10 w-full" />
                  </SidebarMenuItem>
                ))}
              </>
            ) : sessions && sessions.length > 0 ? (
              sessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentSessionId === session.id}
                  >
                    <Link
                      href={`/chat/${session.id}`}
                      data-testid={`link-session-${session.id}`}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="truncate">{session.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No conversations yet
              </div>
            )}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <Separator />

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">User</p>
            <p className="text-xs text-muted-foreground truncate">user@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

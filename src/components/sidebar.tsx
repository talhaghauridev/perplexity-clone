"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { PanelLeft, Plus, MessageSquare, FolderOpen, Network, Star, Clock, ChevronDown } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const starredItems = ["Coding Learning Platform for As..."]

const recentItems = [
  "AI Agent Services for Business ...",
  "Web Services Portfolio Review",
  "AI Services for SME Business A...",
  "Untitled",
  "LangGraph Human-in-Loop API ...",
  "AI Business Suite Enhancement",
  "NPM Installation Force Error",
  "Matplotlib Data Visualization Ba...",
  "FFmpeg WebAssembly Memory ...",
  "Windows 10 Background Apps M...",
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isOpen ? "w-80" : "w-16",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        {isOpen && <h1 className="text-lg font-semibold text-sidebar-foreground">Claude</h1>}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <div className="p-2 space-y-1">
          {/* New Chat */}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-orange-500 hover:bg-orange-500/10",
              !isOpen && "justify-center px-2",
            )}
          >
            <Plus className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>New chat</span>}
          </Button>

          {/* Chats */}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
              !isOpen && "justify-center px-2",
            )}
          >
            <MessageSquare className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>Chats</span>}
          </Button>

          {/* Projects */}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
              !isOpen && "justify-center px-2",
            )}
          >
            <FolderOpen className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>Projects</span>}
          </Button>

          {/* Artifacts */}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
              !isOpen && "justify-center px-2",
            )}
          >
            <Network className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>Artifacts</span>}
          </Button>
        </div>

        {isOpen && (
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-4 py-4">
              {/* Starred Section */}
              <div>
                <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-sidebar-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>Starred</span>
                </div>
                <div className="space-y-1 mt-2">
                  {starredItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-2 px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      <span className="truncate">{item}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="bg-sidebar-border" />

              {/* Recents Section */}
              <div>
                <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-sidebar-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Recents</span>
                </div>
                <div className="space-y-1 mt-2">
                  {recentItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-2 px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      <span className="truncate">{item}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
            !isOpen && "justify-center px-2",
          )}
        >
          <div className="flex items-center justify-center w-6 h-6 bg-sidebar-primary text-sidebar-primary-foreground rounded text-sm font-medium">
            A
          </div>
          {isOpen && (
            <div className="flex items-center justify-between flex-1">
              <div>
                <div className="text-sm font-medium">Ali</div>
                <div className="text-xs text-sidebar-muted-foreground">Pro plan</div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}

# Design Guidelines: ChatGPT-Style Chat Application

## Design Approach
**Reference-Based Approach:** Drawing inspiration from ChatGPT, Claude, and modern conversational AI interfaces while maintaining originality and adapting to the specific project needs.

**Core Principles:**
- Conversation-first: Interface disappears, chat takes center stage
- Clarity over decoration: Clean typography and generous whitespace
- Familiar patterns: Users should feel immediately comfortable
- Spatial efficiency: Maximize chat area, minimize chrome

## Typography System

**Font Family:** Inter or similar clean sans-serif from Google Fonts
- Primary: Inter (400, 500, 600)
- Monospace: 'Fira Code' for code blocks in messages

**Scale:**
- Chat messages: text-base (16px)
- Session titles: text-sm (14px)
- Input field: text-base (16px)
- Timestamps: text-xs (12px)
- Headers: text-lg (18px)

**Hierarchy:**
- User messages: font-medium
- AI responses: font-normal
- Session names: font-medium
- System messages: text-sm font-normal

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 3, 4, 6, and 8 consistently
- Component padding: p-4 or p-6
- Message spacing: gap-4 or gap-6
- Icon spacing: gap-2 or gap-3
- Section dividers: py-3 or py-4

**Grid Structure:**
```
Desktop: 260px sidebar | Flexible main area
Tablet: 240px sidebar | Flexible main area  
Mobile: Full-width with collapsible sidebar
```

**Container Constraints:**
- Chat messages: max-w-3xl centered
- Sidebar: Fixed width, full height
- Input area: max-w-3xl, sticky bottom

## Component Library

### Navigation & Layout
**Sidebar Panel:**
- Full height, fixed position
- Session list: Scrollable with overflow-y-auto
- Each session: p-3, rounded-lg, hover state
- Active session: distinct treatment
- "New Chat" button: Prominent, top of sidebar, p-3
- Actions (rename/delete): Revealed on hover, icon buttons

**Top Bar (Mobile):**
- Hamburger menu: Opens sidebar overlay
- Current session name: Centered, truncated
- Height: h-14

### Chat Interface
**Message Container:**
- Scrollable area: flex-1, overflow-y-auto
- Messages: Alternating alignment (user right, AI left) OR centered full-width with different backgrounds
- Message bubble: p-4, rounded-2xl
- Avatar: w-8 h-8, rounded-full, mr-3
- Timestamp: mt-1, text-xs

**Input Area:**
- Sticky bottom: sticky bottom-0
- Container: p-4, border-top
- Text area: Multi-line, auto-expand, rounded-xl, p-3
- Send button: Icon button, w-10 h-10, rounded-lg
- Max height: max-h-32 with overflow-y-auto

### UI Elements
**Buttons:**
- Primary (New Chat): px-4 py-2, rounded-lg, font-medium
- Icon buttons: w-8 h-8 or w-10 h-10, rounded-lg
- Hover states: Subtle opacity or background change

**Session Cards:**
- Container: p-3, rounded-lg, cursor-pointer
- Title: Truncate with ellipsis
- Preview: text-sm, truncate, mt-1
- Actions: gap-1, icon buttons w-6 h-6

**Empty States:**
- Centered: flex items-center justify-center, min-h-screen
- Icon: w-16 h-16, mb-4
- Heading: text-xl, font-semibold, mb-2
- Description: text-sm, max-w-md

### Forms & Inputs
**Text Input/Textarea:**
- Padding: px-4 py-3
- Border radius: rounded-xl
- Focus: ring-2 outline-none
- Placeholder: Helpful, conversational tone

**Rename Modal:**
- Overlay: Centered, max-w-md
- Padding: p-6
- Input: Full width, mb-4
- Buttons: gap-3, justify-end

## Interaction Patterns

**Message Sending:**
- Enter key: Send message
- Shift+Enter: New line
- Loading state: Animated dots or skeleton
- Auto-scroll: To latest message

**Session Management:**
- Click session: Load chat
- Hover session: Show actions (rename, delete)
- Click "New Chat": Create session, clear input
- Delete: Confirmation if messages exist

**Responsive Behavior:**
- Desktop (lg:): Sidebar always visible
- Mobile/Tablet: Sidebar slides in/out
- Chat width: Constrained for readability
- Input: Always accessible, sticky

## Accessibility
- Focus indicators: Visible ring-2 on focus
- Keyboard navigation: Tab through sessions, messages
- ARIA labels: All icon buttons
- Semantic HTML: main, aside, article for messages
- Screen reader: Announce new messages

## Visual Rhythm
**Vertical Spacing:**
- Between messages: space-y-4 or space-y-6
- Sidebar sections: space-y-2
- Form elements: space-y-4
- Page sections: py-6 or py-8

**Horizontal Spacing:**
- Sidebar padding: px-3 or px-4
- Message container: px-4 or px-6
- Button groups: gap-2 or gap-3
- Icon-text combos: gap-2

## Special Considerations

**Code Blocks in Messages:**
- Container: rounded-lg, p-4, my-3
- Font: Monospace, text-sm
- Copy button: Absolute top-right
- Syntax highlighting: Minimal, readable

**Markdown Support:**
- Bold: font-semibold
- Italic: italic
- Lists: ml-4, list-disc or list-decimal
- Links: Underlined, hover state

**Loading States:**
- Skeleton messages: Animated pulse
- Typing indicator: Three animated dots
- Spinner: For session loading

**Icons:**
Use Heroicons (outline for most, solid for active states):
- New chat: PlusIcon
- Send: PaperAirplaneIcon  
- Delete: TrashIcon
- Rename: PencilIcon
- Menu: Bars3Icon
- User avatar: UserCircleIcon
- AI avatar: SparklesIcon or custom logo
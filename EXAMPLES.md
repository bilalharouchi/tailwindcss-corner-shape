# 🎨 Corner Shape Plugin - Usage Examples

Real-world examples showing how the plugin automatically upgrades your existing `rounded-*` classes.

**Key Point:** Just write `rounded-*` like you always did - is applied automatically! No extra classes needed.

## 📱 Mobile App UI

### iOS-Style Card

```tsx
function ProfileCard() {
  return (
    <div className="rounded-2xl bg-white shadow-lg p-6">
      <img
        src="/avatar.jpg"
        className="rounded-full w-20 h-20"
        alt="Profile"
      />
      <h2 className="text-xl font-bold mt-4">John Doe</h2>
      <p className="text-gray-600">Product Designer</p>
    </div>
  )
}
```

### Material Button

```tsx
function MaterialButton() {
  return (
    <button className="rounded-lg bg-blue-500 text-white px-6 py-3 shadow-md">
      Get Started
    </button>
  )
}
```

## 🎭 Design Systems

### Neumorphism

```tsx
function NeumorphicCard() {
  return (
    <div className="
      rounded-xl
      bg-gray-100
      shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]
      p-8
    ">
      <h3 className="text-lg font-semibold">Neumorphic Design</h3>
    </div>
  )
}
```

### Glass Morphism

```tsx
function GlassCard() {
  return (
    <div className="
      rounded-2xl
      backdrop-blur-xl
      bg-white/10
      border border-white/20
      shadow-2xl
      p-6
    ">
      <h3 className="text-white text-xl">Glass Effect</h3>
    </div>
  )
}
```

### Depth & Shadows

```tsx
function DepthCard() {
  return (
    <div className="
      rounded-xl
      bg-white
      shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]
      hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4)]
      transition-shadow duration-300
      p-6
    ">
      <p>Modern rounded corners with depth</p>
    </div>
  )
}
```

## 🎯 UI Components

### Modern Button Group

```tsx
function ButtonGroup() {
  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
      <button className="px-4 py-2 bg-white hover:bg-gray-50">
        Day
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white">
        Week
      </button>
      <button className="px-4 py-2 bg-white hover:bg-gray-50">
        Month
      </button>
    </div>
  )
}
```

### Avatar Stack

```tsx
function AvatarStack() {
  return (
    <div className="flex -space-x-2">
      <img
        src="/user1.jpg"
        className="rounded-full w-10 h-10 ring-2 ring-white"
        alt="User 1"
      />
      <img
        src="/user2.jpg"
        className="rounded-full w-10 h-10 ring-2 ring-white"
        alt="User 2"
      />
      <img
        src="/user3.jpg"
        className="rounded-full w-10 h-10 ring-2 ring-white"
        alt="User 3"
      />
    </div>
  )
}
```

### Notification Badge

```tsx
function NotificationBadge() {
  return (
    <div className="relative inline-block">
      <button className="rounded-lg p-3 bg-gray-100">
        <BellIcon className="w-6 h-6" />
      </button>
      <span className="
        absolute -top-1 -right-1
        rounded-full
        bg-red-500 text-white text-xs
        w-5 h-5 flex items-center justify-center
      ">
        3
      </span>
    </div>
  )
}
```

### Input Field

```tsx
function ModernInput() {
  return (
    <input
      type="text"
      placeholder="Enter your email..."
      className="
        rounded-lg
        border border-gray-300
        px-4 py-3
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all
      "
    />
  )
}
```

### Modal Dialog

```tsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="
        rounded-2xl
        bg-white
        shadow-2xl
        max-w-md w-full
        p-6
      ">
        {children}
      </div>
    </div>
  )
}
```

## 💳 Dashboard Components

### Stats Card

```tsx
function StatsCard({ title, value, change }) {
  return (
    <div className="
      rounded-xl
      bg-white border border-gray-200
      p-6 hover:shadow-lg transition-shadow
    ">
      <h4 className="text-sm text-gray-600">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <span className={`
        inline-flex items-center gap-1 mt-2
        rounded-full
        px-2 py-1 text-xs
        ${change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
      `}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </span>
    </div>
  )
}
```

### Sidebar Navigation

```tsx
function SidebarItem({ icon, label, active }) {
  return (
    <button className={`
      w-full flex items-center gap-3 px-4 py-3
      rounded-lg
      transition-colors
      ${active
        ? 'bg-blue-500 text-white'
        : 'hover:bg-gray-100 text-gray-700'
      }
    `}>
      {icon}
      <span>{label}</span>
    </button>
  )
}
```

### Table Row

```tsx
function TableRow({ data }) {
  return (
    <tr className="
      group
      hover:bg-gray-50
    ">
      <td className="px-6 py-4">
        <div className="
          rounded-lg
          bg-blue-100 text-blue-800
          w-10 h-10 flex items-center justify-center
          font-semibold
        ">
          {data.initials}
        </div>
      </td>
      <td className="px-6 py-4">{data.name}</td>
      <td className="px-6 py-4">{data.email}</td>
    </tr>
  )
}
```

## 🏢 Enterprise UI

### Industrial Panel

```tsx
function IndustrialPanel() {
  return (
    <div className="
      rounded-md
      bg-gray-900 border-2 border-gray-700
      p-6
    ">
      <h3 className="text-white font-mono text-sm">SYSTEM STATUS</h3>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded bg-green-500/20 border border-green-500 p-3 text-center">
          <span className="text-green-400 font-mono text-xs">ONLINE</span>
        </div>
      </div>
    </div>
  )
}
```

## 🎨 Creative Effects

### Hover Effects

```tsx
function HoverCard() {
  return (
    <div className="
      rounded-xl
      hover:rounded-2xl
      bg-gradient-to-br from-purple-500 to-pink-500
      p-8 text-white
      transition-all duration-500
      cursor-pointer
      hover:shadow-2xl
    ">
      <h3>Hover me!</h3>
      <p className="text-sm opacity-80">Smooth transitions</p>
    </div>
  )
}
```

### Animated Progress

```tsx
function ProgressBar({ progress }) {
  return (
    <div className="rounded-full bg-gray-200 h-4 overflow-hidden">
      <div
        className="rounded-full bg-blue-500 h-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

### Layered Cards

```tsx
function LayeredCard() {
  return (
    <div className="relative">
      {/* Shadow layers */}
      <div className="absolute inset-0 rounded-xl bg-blue-500 opacity-20 blur-xl" />
      <div className="absolute inset-0 rounded-xl bg-blue-500 opacity-10 blur-2xl" />

      {/* Main card */}
      <div className="
        relative
        rounded-xl
        bg-white shadow-xl
        p-6
      ">
        <h3 className="text-lg font-bold">Layered Effect</h3>
      </div>
    </div>
  )
}
```

## 📱 Responsive Patterns

### Responsive Corners

```tsx
function AdaptiveCard() {
  return (
    <div className="
      rounded-lg
      lg:rounded-2xl
      bg-white shadow-lg
      p-4 lg:p-8
    ">
      <h3>Responsive Corners</h3>
      <p>Small radius on mobile, larger on desktop</p>
    </div>
  )
}
```

### Mobile Navigation

```tsx
function MobileNav() {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      rounded-t-3xl
      bg-white shadow-2xl
      px-6 py-4
    ">
      <div className="flex justify-around">
        {/* Nav items */}
      </div>
    </nav>
  )
}
```

## 🎯 Pro Tips

### Smooth Transitions

```tsx
// Modern corners animate beautifully
<div className="
  rounded-lg
  hover:rounded-2xl
  hover:shadow-2xl
  transition-all duration-300
">
  Smooth animated corners
</div>
```

### Shadow Harmony

```tsx
// Corner-shape makes shadows look more natural
<div className="
  rounded-xl
  shadow-[0_8px_30px_rgb(0,0,0,0.12)]
">
  Shadows follow the modern corner shape
</div>
```

### Zero Effort

```tsx
// Just write rounded-* - corner-shape is automatic!
<div className="rounded-lg">        {/* ✨ Modern corners */}
  <button className="rounded-md">   {/* ✨ Modern corners */}
  <input className="rounded-lg">    {/* ✨ Modern corners */}
</div>
```

---

**Explore more at:** [Full Documentation](./README.md)

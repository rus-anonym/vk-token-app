interface IScope {
  id: string;
  name: string;
  mask: number;
}

const userScopesList: IScope[] = [
    {
        id: "notify",
        name: "Notifications",
        mask: 1,
    },
    {
        id: "friends",
        name: "Friends",
        mask: 2,
    },
    {
        id: "photos",
        name: "Photos",
        mask: 4,
    },
    {
        id: "audio",
        name: "Audio",
        mask: 8,
    },
    {
        id: "video",
        name: "Video",
        mask: 16,
    },
    {
        id: "stories",
        name: "Stories",
        mask: 64,
    },
    {
        id: "pages",
        name: "Pages",
        mask: 128,
    },
    {
        id: "shortLink",
        name: "Short Link",
        mask: 256,
    },
    {
        id: "status",
        name: "Status",
        mask: 1024,
    },
    {
        id: "notes",
        name: "Notes",
        mask: 2048,
    },
    {
        id: "messages",
        name: "Messages",
        mask: 4096,
    },
    {
        id: "wall",
        name: "Wall",
        mask: 8192,
    },
    {
        id: "ads",
        name: "Ads",
        mask: 32768,
    },
    {
        id: "offline",
        name: "Offline",
        mask: 65536,
    },
    {
        id: "docs",
        name: "Docs",
        mask: 131072,
    },
    {
        id: "groups",
        name: "Groups",
        mask: 262144,
    },
    {
        id: "notifications",
        name: "Notifications",
        mask: 524288,
    },
    {
        id: "stats",
        name: "Stats",
        mask: 1048576,
    },
    {
        id: "email",
        name: "Email",
        mask: 4194304,
    },
    {
        id: "market",
        name: "Market",
        mask: 134217728,
    },
];

interface IDirectApp {
  id: number;
  name: string;
  secret: string;
}

const directApps: IDirectApp[] = [
    {
        id: 2274003,
        name: "VK for Android",
        secret: "hHbZxrka2uZ6jB1inYsH",
    },
    {
        id: 3697615,
        name: "VK for Windows",
        secret: "AlVXZFMUqyrnABp8ncuU",
    },
    {
        id: 3502557,
        name: "VK for Windows Phone",
        secret: "PEObAuQi6KloPM4T30DV",
    },
    {
        id: 3140623,
        name: "VK for iPhone",
        secret: "VeWdmVclDCtn6ihuP1nt",
    },
    {
        id: 3682744,
        name: "VK for iPad",
        secret: "mY6CDUswIVdJLCD3j15n",
    },
    {
        id: 6146827,
        name: "VK Messenger",
        secret: "qVxWRF1CwHERuIrKBnqe",
    },
];

export type { IScope, IDirectApp };

export { directApps, userScopesList };

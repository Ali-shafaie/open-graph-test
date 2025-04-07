"use client";

import { useState } from "react";
import { Facebook, Twitter, Linkedin, LinkIcon, Share2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  image?: string;
}

export function SocialShare({
  url,
  title,
  description,
  image,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = image ? encodeURIComponent(image) : "";

  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2] hover:bg-[#0E65D9] text-white",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#1DA1F2] hover:bg-[#0C90E1] text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0A66C2] hover:bg-[#0952A0] text-white",
    },
    {
      name: "Pinterest",
      icon: (
        <Image
          src="/placeholder.svg?height=20&width=20"
          width={20}
          height={20}
          alt="Pinterest"
          className="h-5 w-5"
        />
      ),
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}&media=${encodedImage}`,
      color: "bg-[#E60023] hover:bg-[#D50020] text-white",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast("The product link has been copied to your clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Share product">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this product</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-wrap gap-2">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${link.color}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="grid flex-1 gap-2">
              <div className="flex items-center border rounded-md pl-3 pr-1 py-1">
                <input
                  className="flex-1 border-0 bg-transparent outline-none"
                  value={url}
                  readOnly
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  onClick={copyToClipboard}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
          </div>

          {image && (
            <div className="mt-2 p-2 border rounded-md">
              <p className="text-sm font-medium mb-2">Preview image:</p>
              <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-md">
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Share preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

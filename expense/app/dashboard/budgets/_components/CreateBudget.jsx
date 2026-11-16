"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";

export default function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("🌱");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, isLoaded } = useUser();

  const onCreateBudget = async (event) => {
    event.preventDefault();

    const cleanName = name.trim();
    const parsedAmount = Number(amount);

    if (!isLoaded || !user) {
      toast.error("Sign in before creating a budget.");
      return;
    }
    if (!cleanName) {
      toast.error("Enter a name for this budget.");
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error("Enter an amount greater than zero.");
      return;
    }

    setSaving(true);
    try {
      const result = await db
        .insert(Budgets)
        .values({
          name: cleanName,
          amount: parsedAmount,
          createdBy: user.primaryEmailAddress?.emailAddress || "",
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result.length > 0) {
        await refreshData?.();
        toast.success("Your new budget is ready.");
        setName("");
        setAmount("");
        setEmojiIcon("🌱");
        setOpen(false);
      } else {
        toast.error("The budget could not be created. Please try again.");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("We couldn't create this budget. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-24 w-full flex-col gap-2 border-2 border-dashed bg-slate-50 py-6 text-slate-800 hover:border-slate-900 hover:bg-slate-100"
        >
          <span aria-hidden="true" className="text-3xl">＋</span>
          <span className="font-semibold">Create New Budget</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a budget</DialogTitle>
          <DialogDescription>
            Give your budget a name and set the maximum amount you plan to spend.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onCreateBudget} className="space-y-4">
          <div className="relative">
            <span className="mb-2 block text-sm font-medium text-slate-800">Choose an icon</span>
            <Button
              type="button"
              variant="outline"
              aria-label="Choose budget emoji"
              aria-expanded={openEmojiPicker}
              onClick={() => setOpenEmojiPicker((value) => !value)}
            >
              <span className="text-xl" aria-hidden="true">{emojiIcon}</span>
              <span className="ml-2 text-sm">Change icon</span>
            </Button>
            {openEmojiPicker && (
              <div className="absolute left-0 top-16 z-50 max-w-full">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setEmojiIcon(emoji.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="budget-name" className="mb-1 block text-sm font-medium text-slate-800">
              Budget name
            </label>
            <Input
              id="budget-name"
              name="name"
              placeholder="e.g. Monthly groceries"
              value={name}
              maxLength={80}
              autoComplete="off"
              required
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="budget-amount" className="mb-1 block text-sm font-medium text-slate-800">
              Budget amount
            </label>
            <Input
              id="budget-amount"
              name="amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="e.g. 5000"
              value={amount}
              required
              onChange={(event) => setAmount(event.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">Enter an amount greater than zero.</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving || !name.trim() || !amount}>
              {saving ? "Creating..." : "Create budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

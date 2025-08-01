"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Button } from '../../../../components/ui/button';
import { Input } from "../../../../@/components/ui/input";
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { db } from '../../../../utils/dbConfig';
import { Budgets } from '../../../../utils/schema';

export default function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const { user } = useUser();

  const onCreateBudget = async () => {
    if (!name || !amount) {
      toast.error("Please enter budget name and amount");
      return;
    }

    try {
      const result = await db.insert(Budgets).values({
        name: name,
        amount: Number(amount), // ✅ Ensure amount is a number
        createdBy: user?.primaryEmailAddress?.emailAddress || "Anonymous",
        icon: emojiIcon
      }).returning({ insertedId: Budgets.id });

      if (result) {
        refreshData()
        toast.success("New Budget Created Successfully");
        setName('');
        setAmount('');
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className='bg-slate-100 p-13 w-1xs
           rounded-md items-center flex flex-col 
           border-2 border-dashed cursor-pointer
            hover:bg-slate-200 hover:border-slate-900'>
            <h2 className='text-3xl'>+</h2>
            <h2 className='text-black font-medium'>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className='absolute right-0 top-0 z-50'>
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Name</h2>
                  <Input
                    placeholder="Enter Budget Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="Enter Budget Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onCreateBudget}
                className="w-full mt-5"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

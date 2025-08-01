"use client"
import React, { useEffect } from 'react'
import { Button } from '../../../../../components/ui/button'
import { PenBox } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../../@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { Input } from '../../../../../@/components/ui/input';
import { db } from '../../../../../utils/dbConfig';
import { eq } from 'drizzle-orm';
import { Budgets } from '../../../../../utils/schema';
import { toast } from 'sonner';

function EditBudget({ budgetInfo, refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);

    const { user } = useUser();

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo?.icon);
            setName(budgetInfo?.name);
            setAmount(budgetInfo?.amount);
        }
    }, [budgetInfo])

    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning();

        if (result.length > 0) {
            refreshData();
            toast.success("Budget updated successfully");
        }
        else {
            toast.error("Error updating budget");
        }

    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2"> <PenBox />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
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
                                        defaultValue={budgetInfo?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input
                                        type="number"
                                        placeholder="Enter Budget Amount"
                                        defaultValue={budgetInfo?.amount}
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
                                onClick={() => onUpdateBudget()}
                                className="w-full mt-5"
                            >
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget

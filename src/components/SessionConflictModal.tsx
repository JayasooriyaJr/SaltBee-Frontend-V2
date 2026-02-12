import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface SessionConflictModalProps {
    open: boolean;
    guestName?: string;
    userEmail: string;
    onLink: () => void;
    onKeepGuest: () => void;
    onCancel: () => void;
}

const SessionConflictModal = ({
    open,
    guestName = "Guest",
    userEmail,
    onLink,
    onKeepGuest,
    onCancel
}: SessionConflictModalProps) => {
    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-amber-600">
                        <AlertCircle className="h-5 w-5" />
                        Different Account Detected
                    </DialogTitle>
                    <DialogDescription className="pt-2">
                        <div className="space-y-4">
                            <p>
                                This order was started by <strong>{guestName}</strong>.
                            </p>
                            <div className="bg-muted p-3 rounded-md text-sm">
                                <p className="text-muted-foreground mb-1">You are logging in as:</p>
                                <p className="font-medium text-foreground">{userEmail}</p>
                            </div>
                            <p>
                                Would you like to link this existing order to your account?
                            </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:justify-between gap-2 mt-4">
                    <Button onClick={onLink} className="w-full sm:w-auto bg-primary text-primary-foreground">
                        Yes, Link Order
                    </Button>
                    <Button onClick={onKeepGuest} variant="outline" className="w-full sm:w-auto">
                        No, Keep as Guest
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SessionConflictModal;

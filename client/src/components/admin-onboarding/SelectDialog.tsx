import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

import GradientContainer from "./GradientContainer"

type SelectDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: React.ReactNode
}

const SelectDialog = ({ children, title, isOpen, onOpenChange }: SelectDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none ">
        <GradientContainer>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {title}
            </DialogTitle>
          </DialogHeader>
            {children}
          
        </GradientContainer>

      </DialogContent>
    </Dialog>
  )
}

export default SelectDialog
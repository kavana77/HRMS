import { Button } from "../ui/button"
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
          <div className="flex gap-6 items-center justify-center mt-10">
            <Button className="bg-white px-14 border border-blue-600 text-blue-600 cursor-pointer"
            onClick={()=>onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="px-14 border cursor-pointer border-blue-500">
              Send
            </Button>
          </div>
        </GradientContainer>

      </DialogContent>
    </Dialog>
  )
}

export default SelectDialog
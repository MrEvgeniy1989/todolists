import { cn } from "@/shared/utils/merge-cn"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ComponentPropsWithoutRef, CSSProperties, ReactNode, Ref } from "react"

export const Modal = Dialog.Root

type ModalContentProps = {
  children?: ReactNode
  classNameChildrenWrapper?: string
  classNameContainer?: string
  classNameContent?: string
  classNameTitle?: string
  classNameTitleContainer?: string
  customTitleComponent?: ReactNode
  header?: ReactNode
  isClose?: boolean
  isShowHeader?: boolean
  style?: CSSProperties
  title?: ReactNode
  ref?: Ref<HTMLDivElement>
} & ComponentPropsWithoutRef<typeof Dialog.Content>

export const ModalContent = ({
  children,
  classNameChildrenWrapper,
  classNameContent,
  classNameTitle,
  classNameTitleContainer,
  style,
  title = "",
  header,
  isClose,
  isShowHeader = true,
  classNameContainer,
  ref,
  ...rest
}: ModalContentProps) => {
  const classes = {
    container: cn(
      "backdrop-blur-md h-full w-full fixed top-0 block overflow-y-auto",
      classNameContainer,
    ),
    body: "flex min-h-full w-full pt-[80px] pb-[20px] px-[20px] justify-center items-center",
    close: cn(
      `w-[24px] h-[24px] flex justify-center items-center text-text rounded-xs outline-none duration-300 transition-color
    hover:text-Primary-300 focus:ring-2`,
      !isShowHeader && "absolute top-[-30px] right-[-30px]",
    ),
    content: cn(
      `z-20 w-full max-w-md relative rounded bg-primary-300 text-Light-100 shadow-sm ring-1 ring-Dark-100 
      data-[state=closed]:animate-[dialog-content-hide_200ms] 
      data-[state=open]:animate-[dialog-content-show_200ms]`,
      classNameContent,
    ),

    title: cn("text-xl", classNameTitle),
    titleContainer: cn(
      "relative flex items-center justify-between px-[24px] py-[12px] border-b border-b-Dark-100",
      classNameTitleContainer,
    ),
    childrenWrapper: cn("pt-[30px] pb-[36px] px-[24px]", classNameChildrenWrapper),
  }

  return (
    <Dialog.Portal {...rest}>
      <div className={classes.container}>
        <div className={classes.body}>
          <Dialog.Content
            aria-describedby={undefined}
            className={classes.content}
            forceMount
            ref={ref}
            style={style}
          >
            {isShowHeader ? (
              <div className={classes.titleContainer}>
                <Dialog.Title asChild>
                  {header ? header : <span className={classes.title}>{title}</span>}
                </Dialog.Title>

                {isClose && (
                  <Dialog.Close aria-label={"Close modal"} className={classes.close}>
                    <X aria-hidden />
                    {/*<CloseIcon aria-hidden />*/}
                  </Dialog.Close>
                )}
              </div>
            ) : (
              isClose && (
                <Dialog.Close aria-label={"Close modal"} className={classes.close}>
                  <X aria-hidden />
                </Dialog.Close>
              )
            )}
            <div className={classes.childrenWrapper}>{children}</div>
          </Dialog.Content>
        </div>
      </div>
    </Dialog.Portal>
  )
}

export const ModalTrigger = Dialog.Trigger
export const ModalClose = Dialog.Close

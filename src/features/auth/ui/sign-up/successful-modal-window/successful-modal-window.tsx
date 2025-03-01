import { Modal, ModalContent } from "@/shared/components/ui/modal/modal";

type Props = {
  isSuccessfulModalWindowOpen: boolean;
  setIsSuccessfulModalWindowOpen: (isSuccessfulModalWindowOpen: boolean) => void;
};

export const SuccessfulModalWindow = ({ isSuccessfulModalWindowOpen, setIsSuccessfulModalWindowOpen }: Props) => {
  const handleModalClose = (isOpen: boolean) => {
    setIsSuccessfulModalWindowOpen(isOpen);
  };

  return (
    <Modal onOpenChange={handleModalClose} open={isSuccessfulModalWindowOpen}>
      <ModalContent
        asChild
        classNameChildrenWrapper={"pt-[18px]"}
        classNameContent={"max-w-[366px] w-[90dvw]"}
        classNameTitle={"leading-9 font-bold"}
        isClose
        title={"Success"}
      >
        <div className={"flex flex-col items-start gap-[18px]"}>
          <span className={"mb-[54px]"}>Registration was successful!</span>
          <button className={"w-full px-[24px] py-[6px]"} onClick={() => handleModalClose(false)}>
            Ok
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

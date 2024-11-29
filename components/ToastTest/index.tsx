import { Group, Flex, Image, Text } from "@chakra-ui/react"
import { Button } from "@components/ui/button"
import { DialogContent, DialogRoot } from "@components/ui/dialog"

import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"

import Phone from "@img/phone.svg"

import "./index.css"

interface DialogComponentProps {
  isOpen: boolean
  phoneNumber: string
  onOpen: () => void
  onClose: () => void
  setPhoneNumber: (value: string) => void
  affirmDialog: () => void
}
const Component: React.FC<DialogComponentProps> = ({
  isOpen,
  phoneNumber,
  onOpen,
  onClose,
  setPhoneNumber,
  affirmDialog
}) => {
  return (
    <DialogRoot open={isOpen} placement="center" motionPreset="slide-in-bottom">
      <DialogContent width="20.44rem">
        <Flex
          background="linear-gradient( 180deg, #E7F0FF 0%, rgba(255,255,255,0) 100%)"
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius="0.75rem"
          flexDirection={"column"}
        >
          <Image src={Phone.src} boxSize={"2.53rem"} mt={"1.06rem"}></Image>
          <Text fontWeight="500" fontSize="1.06rem" color="#171717" mt={"0.09rem"}>
            Get in Touch
          </Text>
          <Text font-weight="400" font-size="0.88rem" color="171717" mt={"0.38rem"} textAlign={"center"} px={"1.5rem"}>
            Would you mind if we connect you with our production team? We’ll follow up by phone and email to ensure
            everything’s perfect! Just share your number:
          </Text>
          <Group mt={"0.75rem"} width="16.44rem" height="2.75rem" background=" #F5F5F5" borderRadius="0.5rem">
            <PhoneInput
              className="shipping_address_phone_number"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={value => {
                setPhoneNumber(value as any)
              }}
            />
          </Group>
        </Flex>
        <Flex my={"1rem"} alignItems={"center"} justifyContent={"space-between"} mx={"1.5rem"}>
          <Button
            width="6.88rem"
            height="2.44rem"
            background="rgba(255,255,255,0.5)"
            borderRadius="1.25rem"
            border="0.03rem solid #BFBFBF"
            onClick={onClose}
          >
            <Text font-weight="500" font-size="0.88rem" color="#404040">
              Cancel
            </Text>
          </Button>
          <Button width="6.88rem" height="2.44rem" background="#EE3939" borderRadius="1.25rem" onClick={affirmDialog}>
            <Text font-weight="500" font-size="0.88rem" color="#fff">
              Confirm
            </Text>
          </Button>
        </Flex>
      </DialogContent>
    </DialogRoot>
  )
}

export default Component

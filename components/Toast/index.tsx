import { Portal, Container, Box } from '@chakra-ui/react'

import { ToastProps } from '@definitions/index'

const Toast: React.FC<ToastProps> = ({ children, boxStyle, maskVisible = true, close, maskClosable = true }) => {
  const handleMaskClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (maskClosable) {
      close && close()
    }
  }
  return (
    <Portal>
      <Container p={0} w={'100vw'} h={'100vh'} position={'fixed'} top={0} display={'flex'} zIndex={1400} alignItems={'flex-end'} className="public-toast-container">
        <Box onClick={handleMaskClick} className="public-toast-mask" bgColor={maskVisible ? 'rgba(0, 0, 0, .5)' : 'transparent'} position={'fixed'} top={0} right={0} left={0} bottom={0}></Box>
        <Box className="public-toast-box" bg={'#fff'} position={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%, -50%)'} {...boxStyle}>
          {children}
        </Box>
      </Container>
    </Portal>
  )
}

export default Toast

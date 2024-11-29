import { useRef, useEffect } from "react"
import styled from "@emotion/styled"
import dayjs from "dayjs"
import { Box, For, Grid, GridItem, Image, Show } from "@chakra-ui/react"

import selectedIcon from "@img/album/selectedIcon.svg"
import unselectedIcon from "@img/album/unselectedIcon.svg"

import { HistoryItem } from "@definitions/history"
import { AlbumItemImage } from "@definitions/album"

interface ImageGroupByDataProps {
  imgKey: string
  date: string
  imageList: HistoryItem[] | AlbumItemImage[]
  selectionMode: boolean // 多选态
  selectedImageList: number[]
  handleSelect: (img: number) => void // 图片点击事件
  lastImageId?: number // 标记最后一张图片的id，用于懒加载
  hanldeLastImageInView?: () => void
}

const ImageGroupByData: React.FC<ImageGroupByDataProps> = ({
  imgKey,
  date,
  imageList,
  selectionMode,
  selectedImageList,
  handleSelect,
  lastImageId,
  hanldeLastImageInView
}): React.ReactNode => {
  const lastImageRef = useRef(null)

  console.log(lastImageId, "lastImageId")

  useEffect(() => {
    if (!lastImageId) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log("Last image in last group is in view, load next set of images")
            // observer.disconnect() // 停止监听
            hanldeLastImageInView && hanldeLastImageInView()
          }
        })
      },
      {
        rootMargin: "50px"
      }
    )

    if (lastImageRef.current) {
      observer.observe(lastImageRef.current)
    }

    return () => {
      if (lastImageRef.current) {
        observer.unobserve(lastImageRef.current)
      }
    }
  }, [lastImageId]) // 依赖于isLastGroup，确保只在最后一个组时运行

  return (
    <Box mb={"1rem"}>
      <SubTitle>{dayjs().isSame(date, "day") ? "Today" : dayjs(date).format("MMMM DD, YYYY")}</SubTitle>
      <Grid templateColumns="repeat(4, 1fr)" gap="3">
        <For each={imageList as HistoryItem[]}>
          {(item: HistoryItem, index: number) => (
            <GridItem
              ref={item[imgKey] === lastImageId && lastImageId ? lastImageRef : null} // 只有在最后一个组时，最后一张图片设置ref
              className="image-group-by-date"
              key={item[imgKey] + "" + index}
              position={"relative"}
              onClick={() => {
                handleSelect(item[imgKey])
              }}
            >
              <Show when={selectionMode}>
                <Show
                  when={selectedImageList.includes(item[imgKey])}
                  fallback={
                    <Box position={"absolute"} top={"2pt"} right={"2pt"} w={"12pt"} h={"12pt"}>
                      <Image src={unselectedIcon.src} alt="select-icon" />
                    </Box>
                  }
                >
                  <Box position={"absolute"} top={"2pt"} right={"2pt"} w={"12pt"} h={"12pt"}>
                    <Image src={selectedIcon.src} alt="select-icon" />
                  </Box>
                </Show>
              </Show>
              <Image key={item[imgKey] + " " + index + "img"} src={item.image_url?.split("?")[0]} />
            </GridItem>
          )}
        </For>
      </Grid>
    </Box>
  )
}

const SubTitle = styled.div`
  color: #737373;
  font-weight: 400;
  font-size: 1rem;
  padding-bottom: 0.5rem;
`

export default ImageGroupByData

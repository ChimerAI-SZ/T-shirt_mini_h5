interface PrintedTopRequest {
  loadOriginalImage: string
  loadGarmentImage: string
  loadPrintingImage: string
  printingX: number
  printingY: number
  printingScale: number
  printingRotate: number
  removePrintingBackground: boolean
  userUUID: string
}

export async function getPrintedPreview(params: PrintedTopRequest) {
  //   const response = await fetch("/v1/printed-top", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(params)
  //   })
  //   if (!response.ok) {
  //     throw new Error("Failed to get preview")
  //   }
  //   return response.json()
}

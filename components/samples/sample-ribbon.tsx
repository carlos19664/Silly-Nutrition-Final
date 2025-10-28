import { memo } from "react"

export const SampleRibbon = memo(function SampleRibbon() {
  return (
    <div className="absolute top-4 right-4 z-40">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full shadow-lg font-bold text-sm">
        SAMPLE
      </div>
    </div>
  )
})

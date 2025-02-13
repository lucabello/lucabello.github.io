import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  height?: string
}

export default ((userOpts?: Partial<Options>) => {
  const SpacerCustom: QuartzComponent = () => {
    const appliedHeight = userOpts?.height ?? "1em"
    return <div className="spacer" style={{ height: appliedHeight }}></div> 
  }
  return SpacerCustom
}) satisfies QuartzComponentConstructor

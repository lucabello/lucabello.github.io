import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function HorizontalRule({ displayClass }: QuartzComponentProps) {
  return (
    <div class={classNames(displayClass, "horizontal-rule")}>
      <hr></hr>
    </div>
  )
}

export default (() => HorizontalRule) satisfies QuartzComponentConstructor

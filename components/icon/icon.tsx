import clsx from 'clsx'
import * as React from 'react'
import SVG from 'react-inlinesvg'
import styles from './icon.module.scss'
import { IconProps } from './icon.types'

export const Icon: React.FC<IconProps> = ({
	src,
	className,
	pointer = false,
	fillPath = false,
	fillLine = false,
	fillRect = false,
	fillCircle = false,
	fillStroke = false,
	onClick
}) => {
	return (
		<div className={className}>
			<SVG
				onClick={onClick}
				src={src}
				className={clsx(
					`w-full max-w-full h-full max-h-full p-0 m-0`,
					{ 'cursor-pointer': pointer },
					[fillPath && styles.svgFillPath],
					[fillCircle && styles.svgFillCircle],
					[fillLine && styles.svgFillLine],
					[fillRect && styles.svgFillRectfillRect],
					fillStroke && styles.svg
				)}
			/>
		</div>
	)
}

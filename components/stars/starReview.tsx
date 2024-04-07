'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface StartrReviewProps {
	average: number
}

export const StartrReview: React.FC<StartrReviewProps> = ({ average }) => {
	return (
		<div>
			<div className="flex items-center">
				{[0, 1, 2, 3, 4].map(rating => (
					<StarIcon
						key={rating}
						className={clsx(
							average > rating ? 'text-yellow-400' : 'text-gray-300',
							'h-5 w-5 flex-shrink-0'
						)}
						aria-hidden="true"
					/>
				))}
			</div>
			<p className="sr-only">{average} out of 5 stars</p>
		</div>
	)
}

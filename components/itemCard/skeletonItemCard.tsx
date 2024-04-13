import Skeleton from 'react-loading-skeleton'

export const SkeletonItemCard = () => {
	return (
		<>
			<div className="flex flex-col">
				<Skeleton height={200} />
				<Skeleton />
			</div>
			<div className="flex flex-col">
				<Skeleton height={200} />
				<Skeleton />
			</div>
			<div className="flex flex-col">
				<Skeleton height={200} />
				<Skeleton />
			</div>
			<div className="flex flex-col">
				<Skeleton height={200} />
				<Skeleton />
			</div>
		</>
	)
}

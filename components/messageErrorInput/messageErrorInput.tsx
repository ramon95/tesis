import React from 'react'

interface MessageErrorInputsProps {
	text: string
}

export const MessageErrorInputs: React.FC<MessageErrorInputsProps> = ({
	text
}) => {
	return (
		<div className="flex items-center mt-2 text-red-500">
			<p className="text-xs font-Inter font-semibold">{text}</p>
		</div>
	)
}

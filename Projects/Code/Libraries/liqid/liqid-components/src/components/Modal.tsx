import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { useState } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	closeButton?: ReactNode;
	saveButton?: ReactNode;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
	isOpen,
	children,
	onClose,
	onSave,
	closeButton,
	saveButton,
	className = '',
	...props
}) => {
	const [isClosing, setIsClosing] = useState(false);

	if (!isOpen && !isClosing) return null;

	const handleClose = () => {
		setIsClosing(true);
	};

	const handleAnimationEnd = () => {
		if (isClosing) {
			setIsClosing(false);
			onClose();
		}
	};

	return (
		<div
			className={`system-overlay-50 inset-0 flex items-center justify-center bg-black/20 ${className}`}
			onClick={handleClose}
			{...props}
		>
			<div
				className={`glass rounded-4xl p-4 flex flex-col gap-3 ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.key === 'Escape' && handleClose()}
				onAnimationEnd={handleAnimationEnd}
			>
				{children}

				<div className="flex flex-row gap-2 mt-2">
					{closeButton ?? (
						<button
							type="button"
							className="button glass rounded-full px-4 py-2 grow"
							onClick={handleClose}
						>
							Close
						</button>
					)}
					{onSave &&
						(saveButton ?? (
							<button
								type="button"
								className="button primary rounded-full px-4 py-2 grow"
								onClick={onSave}
							>
								Save
							</button>
						))}
				</div>
			</div>
		</div>
	);
};

export default Modal;

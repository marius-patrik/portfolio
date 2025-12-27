import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface RadioProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
}

const Radio: FC<RadioProps> = ({
	label,
	description,
	error,
	className = '',
	id,
	disabled,
	// Styling props
	m,
	mt,
	mb,
	ml,
	mr,
	mx,
	my,
	p,
	pt,
	pb,
	pl,
	pr,
	px,
	py,
	radius,
	shadow,
	size,
	...props
}) => {
	const stylingClasses = getStylingClasses({
		m,
		mt,
		mb,
		ml,
		mr,
		mx,
		my,
		p,
		pt,
		pb,
		pl,
		pr,
		px,
		py,
		radius: radius || 'full', // Radio is always round usually
		shadow,
	});

	let sizeClass = 'w-4 h-4';
	let labelSize = 'text-sm';
	if (size === 'xs') {
		sizeClass = 'w-3 h-3';
		labelSize = 'text-xs';
	}
	if (size === 'md') {
		sizeClass = 'w-5 h-5';
		labelSize = 'text-base';
	}
	if (size === 'lg') {
		sizeClass = 'w-6 h-6';
		labelSize = 'text-lg';
	}
	if (size === 'xl') {
		sizeClass = 'w-8 h-8';
		labelSize = 'text-xl';
	}

	const inputId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;

	return (
		<div className={`flex items-start gap-2 ${stylingClasses} ${className}`}>
			<div className="relative flex items-center mt-0.5">
				<input
					id={inputId}
					type="radio"
					disabled={disabled}
					className={`
                        appearance-none border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 
                        checked:bg-blue-600 checked:border-blue-600 
                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900
                        disabled:opacity-50 disabled:cursor-not-allowed
                        rounded-full cursor-pointer transition-all
                        ${sizeClass}
                    `}
					{...props}
				/>
				<div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
				{/* CSS peer-checked on sibling? input doesn't contain div. 
                     We need the dot indicator. `appearance-none` removes default.
                     We can use background-image for dot, or use a sibling.
                     But pure CSS checked state on sibling requires input to be before it.
                     Here input is self-closing. We can't put div inside it.
                     We can use `background-image` radial-gradient for the dot.
                     
                     Or: `checked:bg-[image:radial-gradient(white,white)]` ? No.
                     Let's verify standard tailwind radio. `form-radio` plugin handles this.
                     Without plugin:
                     Use `before`/`after` pseudo elements? Input can't have pseudo elements in all browsers reliably (replaced element).
                     
                     Better approach: wrapper label, input hidden, custom div.
                     But we want to keep native behavior accessible.
                     
                     Simple standard approach:
                     <input className="..." /> where class handles background image svg for checked state.
                */}
				<style>{`
          input[type="radio"]:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        `}</style>
			</div>

			{(label || description || error) && (
				<div className="flex flex-col">
					{label && (
						<label
							htmlFor={inputId}
							className={`font-medium ${labelSize} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} text-zinc-900 dark:text-zinc-100`}
						>
							{label}
						</label>
					)}
					{description && (
						<p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
							{description}
						</p>
					)}
					{error && typeof error !== 'boolean' && (
						<p className="text-red-600 text-xs mt-0.5">{error}</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Radio;

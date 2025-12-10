import React from 'react';

export default function Loader({ size = 48 }) {
	return (
		<div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
			<svg
				width={size}
				height={size}
				viewBox="0 0 50 50"
				className="animate-spin"
			>
				<defs>
					<linearGradient id="g" x1="0" x2="1">
						<stop offset="0%" stopColor="#5a73ff" />
						<stop offset="100%" stopColor="#ff8a65" />
					</linearGradient>
				</defs>
				<circle cx="25" cy="25" r="20" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
				<path d="M45 25a20 20 0 0 0-20-20" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" fill="none" />
			</svg>
		</div>
	);
}

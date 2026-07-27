import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';
import {loadFont} from '@remotion/google-fonts/DMSans';

const {fontFamily} = loadFont();

const WALLPAPER = '#ECE5DD';
const INCOMING_BG = '#FFFFFF';
const OUTGOING_BG = '#D9FDD3';
const TEXT_DARK = '#111B21';
const TIME_GREY = 'rgba(17,27,33,0.45)';
const TICK_BLUE = '#53BDEB';

const appear = (frame, start) =>
	interpolate(frame, [start, start + 16], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

const rise = (frame, start) =>
	interpolate(frame, [start, start + 16], [14, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

const Bubble = ({frame, start, align, text, time, sent, width}) => {
	const opacity = appear(frame, start);
	const translateY = rise(frame, start);
	const isOut = align === 'right';

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: isOut ? 'flex-end' : 'flex-start',
				opacity,
				transform: `translateY(${translateY}px)`,
			}}
		>
			<div
				style={{
					maxWidth: width || '76%',
					background: isOut ? OUTGOING_BG : INCOMING_BG,
					borderRadius: 14,
					borderTopRightRadius: isOut ? 2 : 14,
					borderTopLeftRadius: isOut ? 14 : 2,
					padding: '12px 14px 8px',
					boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
				}}
			>
				<div
					style={{
						fontFamily,
						fontSize: 21,
						lineHeight: 1.4,
						color: TEXT_DARK,
						fontWeight: 400,
					}}
				>
					{text}
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						gap: 4,
						marginTop: 4,
					}}
				>
					<span style={{fontFamily, fontSize: 13, color: TIME_GREY}}>
						{time}
					</span>
					{sent ? (
						<svg width="16" height="11" viewBox="0 0 16 11" fill="none">
							<path
								d="M1 5.5L4.5 9L11 1.5"
								stroke={TICK_BLUE}
								strokeWidth="1.4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5.5 5.5L9 9L15.5 1.5"
								stroke={TICK_BLUE}
								strokeWidth="1.4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : null}
				</div>
			</div>
		</div>
	);
};

const TypingDots = ({frame, start, end}) => {
	const opacity = interpolate(
		frame,
		[start, start + 10, end - 10, end],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	return (
		<div style={{display: 'flex', justifyContent: 'flex-start', opacity}}>
			<div
				style={{
					background: INCOMING_BG,
					borderRadius: 14,
					borderTopLeftRadius: 2,
					padding: '14px 18px',
					display: 'flex',
					gap: 6,
					boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
				}}
			>
				{[0, 1, 2].map((i) => {
					const bounce = Math.sin((frame - start) / 4.2 + i * 1.1) * 4;
					return (
						<div
							key={i}
							style={{
								width: 8,
								height: 8,
								borderRadius: '50%',
								background: 'rgba(17,27,33,0.35)',
								transform: `translateY(${bounce}px)`,
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const WhatsAppDemo = () => {
	const frame = useCurrentFrame();

	const endFadeStart = 258;
	const sceneOpacity = interpolate(frame, [endFadeStart, 270], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{background: WALLPAPER}}>
			<AbsoluteFill
				style={{
					opacity: sceneOpacity,
					padding: '28px 20px',
					display: 'flex',
					flexDirection: 'column',
					gap: 14,
					justifyContent: 'flex-start',
				}}
			>
				<Bubble
					frame={frame}
					start={18}
					align="right"
					text="Do you have the blue Ankara in stock?"
					time="1:52 PM"
					sent
				/>

				<TypingDots frame={frame} start={46} end={84} />

				<Bubble
					frame={frame}
					start={84}
					align="left"
					text="Yes, 12 yards left at ₦4,500 per yard. Want me to reserve some for you?"
					time="1:52 PM"
				/>

				<Bubble
					frame={frame}
					start={150}
					align="right"
					text="Yes please, reserve 5 yards"
					time="1:53 PM"
					sent
				/>

				<TypingDots frame={frame} start={176} end={206} />

				<Bubble
					frame={frame}
					start={206}
					align="left"
					text="Done. 5 yards reserved, ₦22,500. Ready for pickup Saturday, 12pm."
					time="1:53 PM"
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

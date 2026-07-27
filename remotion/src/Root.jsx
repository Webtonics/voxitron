import {Composition} from 'remotion';
import {WhatsAppDemo} from './WhatsAppDemo';

export const Root = () => {
	return (
		<>
			<Composition
				id="WhatsAppDemo"
				component={WhatsAppDemo}
				durationInFrames={270}
				fps={30}
				width={600}
				height={1100}
			/>
		</>
	);
};

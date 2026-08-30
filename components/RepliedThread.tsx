import Reveal from "@/components/Reveal";
import Tick from "@/components/Tick";

export default function RepliedThread() {
  return (
    <Reveal as="div" className="thread-phone">
      <div className="thread-phone-head">
        <div className="thread-avatar" aria-hidden="true">VX</div>
        <div>
          <div className="thread-who">New enquiry</div>
          <div className="thread-stat">
            <span className="thread-pulse" aria-hidden="true"></span>
            replied in 3 seconds
          </div>
        </div>
      </div>
      <div className="thread-body">
        <div className="thread-msg thread-msg-in">
          Do you have this in stock, and how much?
          <span className="thread-msg-time mono">14:02</span>
        </div>
        <div className="thread-msg thread-msg-out">
          Yes, in stock. &#8358;12,000. Want me to hold one for you?
          <span className="thread-msg-time mono">
            14:02 <Tick />
          </span>
        </div>
        <div className="thread-msg thread-msg-in">
          Yes please, I&apos;ll come by after work
          <span className="thread-msg-time mono">14:03</span>
        </div>
        <div className="thread-msg thread-msg-out">
          Held for you until 7pm. See you then.
          <span className="thread-msg-time mono">
            14:03 <Tick />
          </span>
        </div>
      </div>
    </Reveal>
  );
}

import cx from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import styles from './Hero.module.css';
import Mattixes from '../public/Mattixes.svg';

// import Mattixes from '../docs/Mattixes.txt';

// import { getMattixes } from '../components/Mattixes';

const subtitle = 'Accessible, Delightful, and Performant';

const Link: React.FC<{
  children: React.ReactNode,
  href?: string;
  target?: string;
  className?: string;
}> = forwardRef(
  ({ children, className, ...props }, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      {...props}
      className={cx(
        'font-bold bg-hero whitespace-nowrap rounded-full px-4 py-2 mr-2 text-xl hover:text-hero focus:outline-none focus-visible:text-hero focus-visible:ring-2 focus-visible:ring-hero transition-colors duration-150 focus-visible:duration-0 hover:font-bold hover:drop-shadow hover:shadow-2xl bg-indigo-500 shadow-lg shadow-indigo-500/50 shadow-lg shadow-indigo-500/40 hover:ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900',
        className
      )}
      ref={ref}
    >
      {children}
    </a>
  )
);

const Links = ({ className }: { className?: string; }) => (
  <>
    <Link
      className={className}
      href="https://github.com/mattixes/bottomsheet/blob/main/GET_STARTED.md#get-started"
    >
      Get started
    </Link>
    <Link
      className={className}
      href="https://github.com/mattixes/bottomsheet"
    >
      GitHub
    </Link>
  </>
);
// The wrapping in <g> is because of Safari 🙄 https://bug-149617-attachments.webkit.org/attachment.cgi?id=262048
const SvgText: React.FC<{ children: React.ReactNode, x?: string; y?: string; className?: string; }> = ({
  children,
  className,
  x = '23',
  y,
  ...props
}) => (
  <g
    {...props}
    className={cx('transform-gpu duration-0 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 drop-shadow-2xl', className)}
  >
    <text
      x={x}
      y={y}
      className="text-hero fill-current font-display extra-bold translate-x-4 font-black select-none pointer-events-none text-3xl transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
    >
      {children}
    </text>
  </g>
);

let immediate = false;
export default function Hero({ className }: { className?: string; }) {
  // @TODO this whole monster needs a total rewrite O_O"
  const [mounted, setMounted] = useState(false);
  const skip = !mounted && immediate ? true : false;
  const [open, setOpen] = useState(true);
  const openClassRef = useRef(false);
  const classNameRef = useRef(null);
  const { y, state } = useSpring<any>({
    config: config.stiff,
    immediate: skip,
    from: { y: '208px', state: 0 },
    to: {
      y: open ? '0px' : '208px',
      state: open ? 1 : 0,
    },
    onFrame: ({ state }) => {
      if (state > 0) {
        if (!openClassRef.current) {
          classNameRef.current.classList.add(
            styles.open,
            skip ? styles.skip : undefined
          );
          openClassRef.current = true;
        }
      } else {
        if (openClassRef.current) {
          classNameRef.current.classList.remove(styles.open, styles.skip);
          openClassRef.current = false;
        }
      }
    },
    onRest: () => {
      if (mounted) {
        immediate = true;
      }
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* <style jsx>{`
      path {
        fill:none;
        stroke:black;
        pointer-events:all;
      }
    `}
      </style> */}

      <style jsx>{`
      path {
        pointer-events:all;
      }
      `}
      </style>
      <div className={cx(styles.wrapper, 'flex justify-center', className)}>
        <div className="inline-flex items-end">
          <svg
            onPointerDown={() => setOpen((open) => !open)}
            className={cx(styles.svg, 'flex-shrink-0 hover:shadow-2xl')}
            width="200"
            height="286"
            viewBox="0 0 200 286"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Phone illustration of a bottom sheet containing the text: React Spring Bottom Sheet"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M33.1779 0C10.0158 0 3.8147e-05 10.4712 3.8147e-05 33.4574V377.457C3.8147e-05 400.443 10.0158 410.496 33.1779 410.496H166.41C188.769 410.496 200 399.634 200 377.457C200 377.457 200 56.4435 200 33.4574C200 10.4712 189.34 0 166.178 0H33.1779Z"
              fill="#592340"
            />
            <animated.path
              style={{
                fill: state.interpolate({ output: ['#fed7e6', '#FC9EC2'] }),
              }}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M49 13.5C49.5 18 52.6325 23 60.5 23H139C146.868 23 149.5 18 150 13.5C150.282 10.9661 151.291 9 155 9L169.527 9.08597C182.598 9.08597 191 16.9649 191 30V379.5C191 392.535 182.598 400.468 169.527 400.468H30.0545C16.9836 400.468 9 392.585 9 379.55V30C9 16.9649 16.929 9 30 9H45C48.7085 9 48.7791 11.5122 49 13.5Z"
              fill="#fed7e6"
            />
            <animated.g
              ref={classNameRef}
              className="transform-gpu origin-center"
              style={{
                ['--tw-translate-y' as any]: y,
                /*
                ['--tw-scale-x' as any]: state.interpolate({
                  output: [0.9, 1],
                }),
                ['--tw-scale-y' as any]: state.interpolate({
                  output: [0.9, 1],
                }),
                // */
              }}
            >
              <path
                d="M9 99.75C9 93.4642 9 90.3213 9.92713 87.8082C11.4459 83.6913 14.6913 80.4459 18.8082 78.9271C21.3213 78 24.4642 78 30.75 78H169.25C175.536 78 178.679 78 181.192 78.9271C185.309 80.4459 188.554 83.6913 190.073 87.8082C191 90.3213 191 93.4642 191 99.75V372C191 380.381 191 384.572 189.764 387.922C187.739 393.412 183.412 397.739 177.922 399.764C174.572 401 170.381 401 162 401H38C29.619 401 25.4285 401 22.0777 399.764C16.5884 397.739 12.2613 393.412 10.2362 387.922C9 384.572 9 380.381 9 372V99.75Z"
                fill="white" className='drop-shadow-2xl'
              />
              <rect
                x="89"
                y="85"
                width="22"
                height="2"
                rx="1"
                fill="hsl(328deg 44% 24% / 50%)"
              />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="inherit"
                height="inherit"
                fill="#ececec"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.2"
                version="1.2"
                viewBox="0 0 2000 857"
                className="world-map">
                <path
                  d="M669.1 851.7l-3-.2h-5l-6-13.6 3.1 2.8 4.3 4.6 7.8 3.7 7.3 1.5-.8 3-4.4.3-3.3-2.1zM638.6 644.7l11.3 10.4 4.6 1 7.3 4.8 5.9 2.5 1.1 2.8-4.2 9.8 5.8 1.7 6.3 1 4.2-1 4.3-5 .3-5.6 2.6-1.3 3.2 3.8.4 5.1-4.2 3.5-3.3 2.6-5.3 6.3-6 8.7-.5 5.2-.4 6.6 1.2 6.4-.9 1.4.4 4.1.3 3.4 7.8 5.5.2 4.4 3.9 2.8.3 3.1-3.3 8.2-7 3.5-10.2 1.3-6-.7 2.1 3.9.1 4.7 1.8 3.2-2.5 2.3-5.1.9-5.6-2.4-1.5 1.7 2.5 6.3 4 1.9 2.3-2 2.5 3.3-4.2 2-2.9 4 1.2 6.3-.1 3.4h-4.8l-3 3.2.1 4.8 6.5 4.6 5.2 1.2.2 5.7-4.6 3.5-.6 7.3-3.5 2.4-.9 2.9 4.2 6.5 4.6 3.5-2.1-.3-4.9-1-12.1-.8-3.5-3.6-1.9-4.6-3.1.4-2.6-2.3-3.1-6.5 2.7-2.8.1-3.9-1.8-3.2.7-5.4-1.1-8.3-1.8-3.7 1.8-1.2-1.4-2.4-2.8-1.2.8-2.7-3.1-2.4-3.7-7.3 1.7-1.3-3.3-7.8-.8-6.5-.2-5.7 2.5-2.3-3.3-6.3-1.6-5.8 3-4.2-1.4-5.4 1.6-6.2-1.4-5.9-1.6-1.2-4.9-11.1 2.1-6.6-1.7-6.2.9-5.9 2.6-6 3.3-4-2-2.5.8-2.1-1.6-10.7 5.6-3.1 1.2-6.7-.9-1.6 4-5.8 7.5 1.6 3.7 4.6 1.6-5.2 6.4.3 1 1.4z"
                  className="Argentina"
                  fill={"red"}></path>
                <path
                  d="M645.5 212.5l-2.2-3.6 2.9-8.5-1.6-1.8-3.7 1-1.1-1.6-5.5 4.7-3.2 4.9-2.8 2.9-2.5 1-1.7.3-1.1 1.5h-9.3l-7.8.1-2.7 1.1-6.8 4.4v-.1l-.9-.4-2 .9-1.9 1.3-1.8-1.1-4.7.8-3.9.9-1.9.8-2.3 2.1 1.8.7 1.7-.4h.3l-.3 1.9-4.8.7-2.8.8-1.7 1-2.6-.6-1.6.3-2.9 1.8-4.6 2-2.7-.4 2-2.2 3.7-3.5 4.1-2.1 1.1-1.8.9-3 3.8-3.5.9-4 1.1 3.9 3.8.9 2.4-2.1-1.4-4.8-.9-2-4-1.2-3.8-.7h-3.9l-3.4-.8-.4-1.4-1.4.9-1.2-.2 1.9-2.1-1.8-.8 1.9-2.4-1.2-1.8 1.7-1.8-5.2-.9-.1-3.6-.8-.8-3.3-.2-4.1-1.2-1.5.8-1.8 1.5-3.3 1-3.1 2.5-5.4-1.7-4.4.8-3.9-1.9-4.6-1-3.3-.4-1-1 .9-3.4h-1.7l-1.3 2.4H377l-5.4-6.1-1.6-2.7-7-2.6 1.3-5.5 3.6-3.7-4.1-2.7 3.1-4.9-2.1-4.4 2.5-3.2 5.1-2.9 3.2-3.8-4.6-3.8 1.4-6.9 1.1-4.2-1.6-2.7-.8-2.4.6-3.1-6.5 1.9-7.6 3.3-.3-3.8-.5-2.6-2.8-1.6-4.2-.2L385.4 87 410 66.6l6 1.3 3.3 2.6 3.7.5 6.3-2.2 7-1.7 5.3.6 8.9-2.3 8.2-1.3.2 2.2 4.5-1.3 3.9-2.5 2.1.6 1.4 4.8 9.5-3.7-3.9 4.1 6-.9 3.2-1.5 4.6.3 3.9 2.2 7.5 2 4.7.9 4.4-.3 2.9 2.8-8.5 2.7 6.4 1.1 11.9-.6 4.4-1 1.4 3.3 7.1-2.7-2.1-2.4 4.5-1.8 5.2-.3 3.9-.5 2.1 1.3 1.5 2.9 5-.4 5.3 2.5 7.2-.9 6 .1 2.4-3.4 4.5-.9 4.9 1.8-4.3 5.2 6.2-4.4 3.2.2 6.4-5.5-1.6-3.3-2.9-2.2 5.5-5.9 8.2-3.8 4.5.9 2 2.3.4 6-5.8 2.6 6.7 1.1-4.4 5.5 8.9-4.2 2.2 3.5-4.3 4 1.3 3.7 7.3-3.9 6.5-4.8 4.7-5.9 5.5.4 5.4.8 3.6 2.7-1.7 2.7-5.1 2.9.9 2.9-2.4 2.7-10.9 3.9-6.5.9-3.2-1.7-3.3 2.8-7.4 4.7-3 2.5-7.7 3.8-6.5.4-5.1 2.4-2.9 3.8-5.7.7-8.7 4.7-9.4 6.5-5 4.6-4.9 6.9 6 1-1.5 5.5-.8 4.6 7.3-1.2 7 2.6 3.3 2.3 1.7 2.8 4.9 1.7 3.6 2.5 7.6.4 4.8.6-3.6 5.2-1.7 6.1.1 6.9 4.4 5.9 4.7-2 5.6-6.4 2.3-9.6-1.7-3.2 9-2.9 7.5-4.2 4.8-4.2 1.7-4-.4-5.1-3.2-4.5 8.9-6.2 1-5.3 3.9-9 3.8-1.4 6.7 1.6 4.2.6 4.5-1.6 3.1 2 3.6 3.4.2 2.2 7.7.5-2.6 4.9-2.3 7.4 3.8 1 1.6 3.5 8.2-3.3 7.5-6.6 4.2-2.7 1.1 5.3 2.6 7.5 2 7.2-3.4 3.8 4.8 3.4 2.9 3.4 6.9 1.6 2.4 1.9v5.2l3.4.8 1.1 2.3-2 6.9-4.3 2.3-4.2 2.2-8.8 2.2-7.9 5-8.6 1.1-10.1-1.4h-7.3l-5.3.4-5.7 4.5-7.4 2.8-10.1 8.2-7.9 5.8 4.7-1 10.9-8.3 12.3-5.2 7.6-.6 3.3 3.1-6.1 4.2-.6 6.7.1 4.8 5.6 3.1 8.6-.9 7.2-7.1-1 4.6 2.5 2.3-7.4 4.1-12.4 3.8-5.8 2.5-7.2 4.6-3.7-.5 1.5-5.3 10.4-5.3-8.1.2-5.9.8z"
                  className="Canada"
                  fill={colorMap[covidMap["Canada"]]}
                  id="canada"></path>
                <text transform="matrix(1 0 0 1 418.5 143.5996)" fontSize="36">Canada</text>
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="inherit"
                height="inherit"
                fill="#ececec"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.2"
                version="1.2"
                viewBox="0 0 2000 857"
              >
                <Mattixes aria-label="Website Logo" height="90%" weight="90%" />
              </svg>
              <SvgText y="220">Bottom</SvgText>
              <SvgText y="266">Sheet</SvgText>
            </animated.g>
          </svg>
          <div className="font-display ml-10 mb-10 text-hero hidden md:block">
            <h1 className={cx(styles.subtitle, 'pb-4 max-w-sm font-bold')}>{subtitle}</h1>
            <div className="mt-4">
              <Links className="text-hero-lighter hover:bg-hero-lighter focus:bg-hero-lighter" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden font-display text-hero px-8 py-4">
        <h1 className={cx(styles.subtitle, 'pb-4')}>{subtitle}</h1>
        <div className="mt-4">
          <Links className="text-white hover:bg-white focus:bg-white" />
        </div>
      </div>
    </>
  );
}

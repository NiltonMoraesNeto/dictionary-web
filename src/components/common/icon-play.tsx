const IconPlay = ({ size = 75 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 75 75"
  >
    <circle cx="37.5" cy="37.5" r="37.5" fill="#A445ED" opacity="0.25"></circle>
    <path
      fill="#A445ED"
      fillRule="evenodd"
      d="M29 27v21l21-10.5z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default IconPlay;

import { Fragment } from "react";

function JobIcon() {
  return (
    <Fragment>
      <svg
        fill="#000000"
        viewBox="0 0 24 24"
        id="rocket-right"
        data-name="Line Color"
        xmlns="http://www.w3.org/2000/svg"
        className="icon line-color w-14 h-14 mb-5"
      >
        {/* Background and tracer elements */}
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        
        {/* Icon elements */}
        <g id="SVGRepo_iconCarrier">
          {/* Secondary path element */}
          <path
            id="secondary"
            d="M15.84,14.18A5.92,5.92,0,0,1,14.32,21L11.5,18.18h0"
            style={{
              fill: "none",
              stroke: "#1d2b2b",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }}
          ></path>
          
          {/* Another secondary path element */}
          <path
            id="secondary-2"
            data-name="secondary"
            d="M9.82,8.16A5.92,5.92,0,0,0,3,9.68L5.82,12.5h0"
            style={{
              fill: "none",
              stroke: "#1d2b2b",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }}
          ></path>
          
          {/* Primary path element */}
          <path
            id="primary"
            d="M10.69,18.79c8-5.81,9.88-12,10.3-14.64A1,1,0,0,0,19.85,3C17.24,3.43,11,5.27,5.21,13.31Zm-2,.8,1.42-1.42L5.83,13.92,4.41,15.34a1,1,0,0,0,0,1.41l2.84,2.84A1,1,0,0,0,8.66,19.59Z"
            style={{
              fill: "none",
              stroke: "#57fffc",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }}
          ></path>
        </g>
      </svg>
    </Fragment>
  );
}

export default JobIcon;
